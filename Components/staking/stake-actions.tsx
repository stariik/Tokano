"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { UserState } from "tokano-sdk";
import { transactionListener } from "@/lib/balances";

interface StakeWithdrawProps {
  selectedUserStakedAccount: UserState | null;
  onAction: () => void;
}

export default function StakeActions({
  selectedUserStakedAccount,
  onAction,
}: StakeWithdrawProps) {
  const { staking } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const handleGetReward = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount) return;

    try {
      const tx = await staking?.getReward({
        walletPk: publicKey,
        poolAddress: selectedUserStakedAccount.poolAddress,
        accountAddress: selectedUserStakedAccount.accountAddress,
      });
      // Always add recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());

      // todo: transaction sent, we're waiting for the tx confirmation
      transactionListener(connection, txId, (completed) => {
        if (completed) {
          // todo: show transaction completed notification
        } else {
          // todo: show transaction could not be completed notification
        }
        onAction();
      });
    } catch (error) {
      // todo: show tx generation error
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    selectedUserStakedAccount,
    staking,
    connection,
    signTransaction,
    onAction,
  ]);

  const handleUnstake = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount || !unstakeAmount) return;

    try {
      const tx = await staking?.withdraw({
        walletPk: publicKey,
        poolAddress: selectedUserStakedAccount.poolAddress,
        accountAddress: selectedUserStakedAccount.accountAddress,
        amount: unstakeAmount,
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
        onAction();
      });
    } catch (error) {
      console.error("Error unstaking:", error);
      alert(`Error unstaking: ${error}`);
    }
  }, [
    publicKey,
    selectedUserStakedAccount,
    unstakeAmount,
    staking,
    connection,
    signTransaction,
    onAction,
  ]);

  const handleCloseAccount = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount) return;

    try {
      const tx = await staking?.closeStakeAccount({
        walletPk: publicKey,
        accountAddress: selectedUserStakedAccount.accountAddress,
      });
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      console.log("Transaction sent: ", txId);

      transactionListener(connection, txId, (completed) => {
        if (completed) {
          console.log("Transaction completed");
        } else {
          console.log("Transaction failed");
        }
        onAction();
      });
    } catch (error) {
      console.error("Error closing account:", error);
      alert(`Error closing account: ${error}`);
    }
  }, [
    publicKey,
    selectedUserStakedAccount,
    staking,
    connection,
    signTransaction,
    onAction,
  ]);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleGetReward}
        disabled={!selectedUserStakedAccount || !publicKey}
        className="rounded bg-blue-500 px-4 py-2 text-xs text-white disabled:bg-gray-400 lg:text-sm"
      >
        Get Reward
      </button>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Amount to Unstake"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
          className="rounded border p-2 text-xs lg:text-sm"
          disabled={!selectedUserStakedAccount}
        />
        <button
          onClick={handleUnstake}
          disabled={
            !selectedUserStakedAccount ||
            !publicKey ||
            !unstakeAmount ||
            parseFloat(unstakeAmount) <= 0
          }
          className="rounded bg-red-500 px-4 py-2 text-xs text-white disabled:bg-gray-400 lg:text-sm"
        >
          Unstake
        </button>
      </div>
      <button
        onClick={handleCloseAccount}
        disabled={!selectedUserStakedAccount || !publicKey}
        className="rounded bg-red-700 px-4 py-2 text-xs text-white disabled:bg-gray-400 lg:text-sm"
      >
        Close Account
      </button>
    </div>
  );
}
