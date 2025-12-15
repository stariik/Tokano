import {
  Connection,
  type KeyedAccountInfo,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { blob, nu64, struct } from "@solana/buffer-layout";
import BN from "bn.js";

export interface TokenBalanceT {
  amount: string;
  amountRaw: number;
  decimals: number;
  mintAddress: string;
}

export const SOL_MINT = "So11111111111111111111111111111111111111112";

export const SOL_INFO: TokenBalanceT = {
  amount: "0",
  amountRaw: 0,
  decimals: 9,
  mintAddress: SOL_MINT,
};

export const toSmallestUnit = (amount: string, decimals: number): string => {
  if (!amount) {
    return "0";
  }
  let [integer, fraction = ""] = amount.split(".");

  if (!integer) {
    integer = "0";
  }

  // The fraction needs to be padded with zeros to match the token's decimals
  if (fraction.length > decimals) {
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  return new BN(integer + fraction).toString();
};

export const fetchWalletBalances = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT[]> => {
  const solBalance = await fetchSolBalance(connection, publicKey);
  const tokens = await fetchSplTokens(connection, publicKey);

  return [solBalance, ...tokens];
};

const fetchSolBalance = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT> => {
  const accountInfo = await connection.getAccountInfo(publicKey);
  if (!accountInfo) {
    return SOL_INFO;
  }

  return {
    amount: (accountInfo.lamports / 10 ** SOL_INFO.decimals).toString(),
    amountRaw: accountInfo.lamports,
    decimals: 9,
    mintAddress: SOL_MINT,
  };
};

const fetchSplTokens = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT[]> => {
  const resp = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID },
    "confirmed",
  );

  return resp.value
    .map((value) => {
      return {
        mintAddress: value.account.data.parsed.info.mint,
        decimals: value.account.data.parsed.info.tokenAmount.decimals,
        amount: value.account.data.parsed.info.tokenAmount.uiAmountString,
        amountRaw: Number.parseInt(
          value.account.data.parsed.info.tokenAmount.amount,
        ),
      };
    })
    .filter((value) => value.decimals > 0);
};

const ACCOUNT_LAYOUT = struct<{
  mint: Uint8Array;
  owner: Uint8Array;
  amount: number;
}>([blob(32, "mint"), blob(32, "owner"), nu64("amount"), blob(93)]);

export const subscribeToWalletBalances = (
  connection: Connection,
  publicKey: PublicKey,
  findAndReplace: (token: TokenBalanceT) => void,
) => {
  return connection.onProgramAccountChange(
    TOKEN_PROGRAM_ID,
    async (keyedAccountInfo: KeyedAccountInfo) => {
      const parsedData = ACCOUNT_LAYOUT.decode(
        new Uint8Array(keyedAccountInfo.accountInfo.data),
      );
      if (!parsedData) return;
      const mintAddress = new PublicKey(parsedData.mint);
      const amountRaw = parsedData.amount;
      const mintInfo = await connection.getParsedAccountInfo(mintAddress);
      if (!mintInfo || !mintInfo.value) {
        return;
      }
      const decimals = (mintInfo.value.data as ParsedAccountData).parsed.info
        .decimals;

      if (decimals <= 0) return;

      findAndReplace({
        amount: rawAmountToUiString(amountRaw, decimals),
        amountRaw,
        decimals,
        mintAddress: mintAddress.toBase58(),
      });
    },
    {
      commitment: "processed",
      filters: [
        {
          memcmp: {
            offset: ACCOUNT_LAYOUT.offsetOf("owner")!,
            bytes: publicKey.toBase58(),
          },
        },
        {
          dataSize: ACCOUNT_LAYOUT.span,
        },
      ],
    },
  );
};

export function rawAmountToUiString(amount: number, decimals: number) {
  const amountBI = BigInt(amount);
  const decimalMultiplierBI = BigInt(10) ** BigInt(decimals);

  const integerPart = amountBI / decimalMultiplierBI;
  const remainder = amountBI % decimalMultiplierBI;

  // Convert the integer part to a string
  let integerPartString = integerPart.toString();

  // If the remainder is non-zero, add the decimal part
  if (remainder !== BigInt(0)) {
    // Convert the remainder to a string
    const remainderString = remainder.toString().padStart(decimals, "0");
    // Append the decimal point and the remainder to the integer part
    integerPartString += "." + remainderString;
  }

  return integerPartString;
}

export type TransactionListenerCallbackProps = {
  completed: boolean;
  txId: string;
};

export function transactionListener(
  connection: Connection,
  txId: string,
  callback: (
    transactionListenerCallbackProps: TransactionListenerCallbackProps,
  ) => void,
  timeOut = 30_000,
) {
  let isAlreadySent = false;
  let timer: number | null = setTimeout(async () => {
    const txResult = await connection.getTransaction(txId, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
    if (!timer) return;
    if (!isAlreadySent) {
      isAlreadySent = true;
      callback({
        completed: !!txResult && (!txResult.meta || txResult.meta.err === null),
        txId,
      });
    }
  }, timeOut);

  connection.onSignature(
    txId,
    (txResult) => {
      if (timer) clearTimeout(timer);
      timer = null;
      if (!isAlreadySent) {
        isAlreadySent = true;
        callback({
          completed: !!txResult && txResult.err === null,
          txId,
        });
      }
    },
    "confirmed",
  );
}

export const formatNumber = (num) => {
  if (!num) return "0";
  const value = typeof num === "string" ? parseFloat(num) : num;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(2);
};

export const formatBN = (bn, decimals) => {
  if (!bn) return "0";
  return formatNumber(bn.toString() / Math.pow(10, decimals));
};
