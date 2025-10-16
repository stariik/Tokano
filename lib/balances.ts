import {
  Connection,
  type KeyedAccountInfo,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenBalanceT } from "@/contexts/balances-context";
import { blob, nu64, struct, u8 } from "@solana/buffer-layout";

export const SOL_MINT = "11111111111111111111111111111111";

export const SOL_INFO: TokenBalanceT = {
  amount: "0",
  amountRaw: 0,
  decimals: 9,
  mintAddress: SOL_MINT,
};

export const fetchWalletBalances = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT[]> => {
  const solBalance = await fetchSolBalance(connection, publicKey);
  const tokens = await fetchSplTokens(connection, publicKey);

  return [solBalance, ...tokens];
};

export const fetchSolBalance = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT> => {
  const accountInfo = await connection.getAccountInfo(publicKey);
  if (!accountInfo) {
    return SOL_INFO;
  }

  return {
    amount: (accountInfo.lamports / SOL_INFO.decimals).toString(),
    amountRaw: accountInfo.lamports,
    decimals: 9,
    mintAddress: SOL_MINT,
  };
};

export const fetchSplTokens = async (
  connection: Connection,
  publicKey: PublicKey,
): Promise<TokenBalanceT[]> => {
  const resp = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID },
    "confirmed",
  );

  console.log("Resp", resp);

  return resp.value.map((value) => {
    return {
      mintAddress: value.account.data.parsed.info.mint,
      decimals: value.account.data.parsed.info.tokenAmount.decimals,
      amount: value.account.data.parsed.info.tokenAmount.uiAmountString,
      amountRaw: Number.parseInt(
        value.account.data.parsed.info.tokenAmount.amount,
      ),
    };
  });
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
