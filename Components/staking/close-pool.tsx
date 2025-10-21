"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PoolState } from "tokano-sdk";
import { PublicKey } from "@solana/web3.js";
import { transactionListener } from "@/lib/balances";

interface ClosePoolProps {
  pool: PoolState;
  onPoolClosed: () => void;
}

export default function ClosePool({ pool, onPoolClosed }: ClosePoolProps) {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();

  const handleClosePool = useCallback(
    async (poolAddress: PublicKey) => {
      if (!publicKey) return;
      try {
        const tx = await staking?.closePool({
          walletPk: publicKey,
          poolAddress,
        });
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;

        const signedTx = await signTransaction(tx);
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
          onPoolClosed();
        });
      } catch (error) {
        console.error("Error closing account:", error);
        alert(`Error closing account: ${error}`);
      }
    },
    [publicKey, staking, connection, signTransaction, onPoolClosed],
  );

  return (
    <button
      onClick={() => handleClosePool(pool.poolAddress)}
      disabled={
        pool.totalTokenStaked > 0 || pool.endTimestamp.getTime() > Date.now()
      }
      className="mt-2 rounded bg-red-700 px-4 py-2 text-white disabled:bg-gray-400"
    >
      Close Pool
    </button>
  );
}
