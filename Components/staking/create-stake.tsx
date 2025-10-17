"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { PoolState, UserState } from "tokano-sdk";
import { useBalances } from "@/contexts/balances-context";

interface CreateStakeProps {
  stakePools: PoolState[] | undefined;
  userStakedAccounts: UserState[] | undefined;
  onStakeCreated: () => void;
}

export default function CreateStake({
  stakePools,
  userStakedAccounts,
  onStakeCreated,
}: CreateStakeProps) {
  const { publicKey } = useWallet();
  const { staking } = useTokano();
  const { tokens } = useBalances();

  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");
  const [amount, setAmount] = useState("");

  const selectedPool = stakePools?.find(
    (p) => p.initializer.toBase58() === selectedPoolAddress,
  );
  const userHasStakeInPool = userStakedAccounts?.find(
    (u) => u.poolAddress.toBase58() === selectedPoolAddress,
  );
  const availableToken = tokens.find(
    (t) => t.mintAddress === selectedPool?.tokenMint.toBase58(),
  );

  useEffect(() => {
    if (stakePools && stakePools.length > 0 && !selectedPoolAddress) {
      setSelectedPoolAddress(stakePools[0].initializer.toBase58());
    }
  }, [stakePools, selectedPoolAddress]);

  const handleStake = useCallback(async () => {
    if (!publicKey || !staking || !selectedPoolAddress) {
      alert("Please connect your wallet and select a pool.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount to stake.");
      return;
    }

    try {
      const signature = await staking.stake({
        walletPk: publicKey,
        poolAddress: selectedPool.initializer,
        amount,
        userStakeAccount: userHasStakeInPool,
      });

      alert(`Staked successfully! Signature: ${signature}`);
      onStakeCreated();
    } catch (error) {
      console.error("Error staking:", error);
      alert(`Error staking: ${error}`);
    }
  }, [
    publicKey,
    staking,
    selectedPoolAddress,
    amount,
    userHasStakeInPool,
    onStakeCreated,
    selectedPool,
  ]);

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Stake in a Pool</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <select
          value={selectedPoolAddress}
          onChange={(e) => setSelectedPoolAddress(e.target.value)}
          className="rounded border p-2 disabled:bg-gray-700 disabled:text-white"
          disabled={!stakePools}
        >
          {!stakePools ? (
            <option>Loading pools...</option>
          ) : stakePools.length === 0 ? (
            <option>No pools found</option>
          ) : (
            stakePools.map((pool) => (
              <option
                key={pool.initializer.toBase58()}
                value={pool.initializer.toBase58()}
              >
                {pool.initializer.toBase58().slice(0, 16)}...
              </option>
            ))
          )}
        </select>
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Amount to Stake"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded border p-2"
            disabled={!selectedPool}
          />
          {availableToken && (
            <span className="ml-2 text-sm whitespace-nowrap text-gray-500">
              Max: {availableToken.amount}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleStake}
        disabled={!publicKey || !selectedPool || !amount}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {userHasStakeInPool ? "Add Stake" : "Stake"}
      </button>
    </div>
  );
}
