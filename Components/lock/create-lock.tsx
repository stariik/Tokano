"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { toSmallestUnit, transactionListener } from "@/lib/balances";
import { BalanceLoadState, useBalances } from "@/contexts/balances-context";
import { NumericFormat, type NumberFormatValues } from "react-number-format";

interface CreateLockProps {
  onLockCreated: () => void;
}

export const CreateLock = ({ onLockCreated }: CreateLockProps) => {
  const { lock } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const { tokens, loadState } = useBalances();

  const [receiverPk, setReceiverPk] = useState("");
  const [tokenMint, setTokenMint] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [unlockTimestamp, setUnlockTimestamp] = useState("");

  const selectedToken = tokens.find((t) => t.mintAddress === tokenMint);

  useEffect(() => {
    if (tokens.length > 0 && !tokenMint) {
      setTokenMint(tokens[0].mintAddress);
    }
  }, [tokens, tokenMint]);

  const handleCreateLock = useCallback(async () => {
    if (
      !publicKey ||
      !receiverPk ||
      !tokenMint ||
      !lockAmount ||
      !unlockTimestamp ||
      !selectedToken
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!lock) {
      alert("Lock program not initialized.");
      return;
    }

    try {
      const amountInSmallestUnit = toSmallestUnit(
        lockAmount,
        selectedToken.decimals,
      );

      const tx: Transaction = await lock.initializeLock({
        walletPk: publicKey,
        receiverPk: new PublicKey(receiverPk),
        tokenMint: new PublicKey(tokenMint),
        lockAmount: amountInSmallestUnit,
        unlockTimestamp: Math.floor(new Date(unlockTimestamp).getTime() / 1000),
      });

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction!(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      console.log("Transaction sent: ", txId);

      // todo: transaction sent, we're waiting for the tx confirmation
      transactionListener(connection, txId, (completed) => {
        if (completed) {
          // todo: show transaction completed notification
          console.log("Transaction completed");
        } else {
          // todo: show transaction could not be completed notification
          console.log("Transaction failed");
        }
        onLockCreated();
      });
    } catch (error) {
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    receiverPk,
    tokenMint,
    lockAmount,
    unlockTimestamp,
    lock,
    connection,
    signTransaction,
    onLockCreated,
    selectedToken,
  ]);

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Create New Lock</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Receiver Public Key"
          value={receiverPk}
          onChange={(e) => setReceiverPk(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <select
          value={tokenMint}
          onChange={(e) => setTokenMint(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
          disabled={loadState !== BalanceLoadState.LOADED}
        >
          {loadState !== BalanceLoadState.LOADED ? (
            <option>Loading tokens...</option>
          ) : tokens.length === 0 ? (
            <option>No eligible tokens found</option>
          ) : (
            tokens.map((token) => (
              <option
                key={token.mintAddress}
                value={token.mintAddress}
              >
                {token.mintAddress.slice(0, 16)}...
              </option>
            ))
          )}
        </select>
        <div className="flex items-center">
          <NumericFormat
            placeholder="Lock Amount"
            value={lockAmount}
            onValueChange={(values: NumberFormatValues) =>
              setLockAmount(values.value)
            }
            valueIsNumericString={true}
            allowNegative={false}
            thousandSeparator=","
            decimalScale={selectedToken?.decimals}
            className="w-full rounded border-gray-600 bg-gray-800 p-2 text-white"
          />
          {selectedToken && (
            <span className="ml-2 text-sm whitespace-nowrap text-gray-500">
              Max: {selectedToken.amount}
            </span>
          )}
        </div>
        <input
          type="datetime-local"
          value={unlockTimestamp}
          onChange={(e) => setUnlockTimestamp(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <button
        onClick={handleCreateLock}
        disabled={!publicKey || tokens.length === 0}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        Create Lock
      </button>
    </div>
  );
};

export default CreateLock;
