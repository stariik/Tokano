"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { BalanceLoadState, useBalances } from "@/contexts/balances-context";
import { SOL_MINT, transactionListener } from "@/lib/balances";

interface CreatePoolProps {
  onPoolCreated: () => void;
}

export default function CreatePool({ onPoolCreated }: CreatePoolProps) {
  const { staking } = useTokano();
  const { connection } = useConnection();
  const { tokens, loadState } = useBalances();
  const { publicKey, signTransaction } = useWallet();

  const [tokenMint, setTokenMint] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardPeriodInSeconds, setRewardPeriodInSeconds] = useState("");
  const [lockingPeriodForStakers, setLockingPeriodForStakers] = useState("");
  const [startTime, setStartTime] = useState("");

  const availableTokens = tokens.filter((t) => t.mintAddress !== SOL_MINT);
  const selectedToken = availableTokens.find(
    (t) => t.mintAddress === tokenMint,
  );

  useEffect(() => {
    if (availableTokens.length > 0 && !tokenMint) {
      setTokenMint(availableTokens[0].mintAddress);
    }
  }, [availableTokens, tokenMint]);

  const handleCreatePool = useCallback(async () => {
    if (!publicKey || !staking) {
      alert("Please connect your wallet first.");
      return;
    }

    if (
      !tokenMint ||
      !rewardAmount ||
      !rewardPeriodInSeconds ||
      !lockingPeriodForStakers ||
      !startTime
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const startTimeStamp = Math.floor(new Date(startTime).getTime() / 1000);

      const tx = await staking.initializePool({
        walletPk: publicKey,
        tokenMint: new PublicKey(tokenMint),
        rewardAmount,
        rewardPeriodInSeconds,
        lockingPeriodForStakers,
        startTimeStamp,
      });

      // Always add recent blockhash
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
        onPoolCreated();
      });
    } catch (error) {
      // todo: show tx generation error
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    staking,
    tokenMint,
    rewardAmount,
    rewardPeriodInSeconds,
    lockingPeriodForStakers,
    startTime,
    signTransaction,
    connection,
    onPoolCreated,
  ]);

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Create a New Stake Pool</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <select
          value={tokenMint}
          onChange={(e) => setTokenMint(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
          disabled={loadState !== BalanceLoadState.LOADED}
        >
          {loadState !== BalanceLoadState.LOADED ? (
            <option>Loading tokens...</option>
          ) : availableTokens.length === 0 ? (
            <option>No eligible tokens found</option>
          ) : (
            availableTokens.map((token) => (
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
          <input
            type="number"
            placeholder="Reward Amount"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            className="w-full rounded border-gray-600 bg-gray-800 p-2 text-white"
          />
          {selectedToken && (
            <span className="ml-2 text-sm whitespace-nowrap text-gray-500">
              Max: {selectedToken.amount} ({selectedToken.decimals})
            </span>
          )}
        </div>
        <input
          type="number"
          placeholder="Reward Period (seconds)"
          value={rewardPeriodInSeconds}
          onChange={(e) => setRewardPeriodInSeconds(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <input
          type="number"
          placeholder="Locking Period (seconds)"
          value={lockingPeriodForStakers}
          onChange={(e) => setLockingPeriodForStakers(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>
      <button
        onClick={handleCreatePool}
        disabled={!publicKey || availableTokens.length === 0}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        Create Pool
      </button>
    </div>
  );
}
