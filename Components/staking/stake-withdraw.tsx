"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { UserState } from "tokano-sdk";

interface StakeWithdrawProps {
  selectedUserStakedAccount: UserState | null;
  onAction: () => void;
}

export default function StakeWithdraw({
  selectedUserStakedAccount,
  onAction,
}: StakeWithdrawProps) {
  const { publicKey } = useWallet();
  const { staking } = useTokano();
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const handleGetReward = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount) return;

    try {
      const signature = await staking?.getReward({
        walletPk: publicKey,
        poolAddress: selectedUserStakedAccount.poolAddress,
      });
      console.log("Get Reward Signature:", signature);
      alert(`Get Reward successful! Signature: ${signature}`);
      onAction();
    } catch (error) {
      console.error("Error getting reward:", error);
      alert(`Error getting reward: ${error}`);
    }
  }, [publicKey, selectedUserStakedAccount, staking, onAction]);

  const handleUnstake = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount || !unstakeAmount) return;

    try {
      const signature = await staking?.withdraw({
        walletPk: publicKey,
        poolAddress: selectedUserStakedAccount.poolAddress,
        amount: unstakeAmount,
      });
      console.log("Unstake Signature:", signature);
      alert(`Unstake successful! Signature: ${signature}`);
      onAction();
      setUnstakeAmount("");
    } catch (error) {
      console.error("Error unstaking:", error);
      alert(`Error unstaking: ${error}`);
    }
  }, [publicKey, selectedUserStakedAccount, staking, onAction, unstakeAmount]);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleGetReward}
        disabled={!selectedUserStakedAccount || !publicKey}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        Get Reward
      </button>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Amount to Unstake"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
          className="rounded border p-2"
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
          className="rounded bg-red-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          Unstake
        </button>
      </div>
    </div>
  );
}
