"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { transactionListener } from "@/lib/balances";

interface ClaimLockProps {
  lockAccountAddress: PublicKey;
  onLockClaimed: () => void;
}

export const ClaimLock = ({
  lockAccountAddress,
  onLockClaimed,
}: ClaimLockProps) => {
  const { lock } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const handleClaim = useCallback(async () => {
    if (!publicKey || !lock || !signTransaction) {
      alert(
        "Please connect your wallet and ensure the lock program is initialized.",
      );
      return;
    }

    try {
      const tx: Transaction = await lock.withdraw({
        lockAddress: lockAccountAddress,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());

      transactionListener(connection, txId, (completed) => {
        if (completed) {
          // todo: show transaction completed notification
        } else {
          // todo: show transaction could not be completed notification
        }
        onLockClaimed();
      });
    } catch (error) {
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    lock,
    lockAccountAddress,
    connection,
    signTransaction,
    onLockClaimed,
  ]);

  return (
    <button
      onClick={handleClaim}
      disabled={!publicKey}
      className="mt-2 rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600 disabled:bg-gray-400"
    >
      Claim
    </button>
  );
};

export default ClaimLock;
