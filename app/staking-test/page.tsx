"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PoolState, UserState } from "tokano-sdk";
import CreatePool from "@/Components/staking/create-pool";
import CreateStake from "@/Components/staking/create-stake";

export default function TestPage() {
  const { publicKey } = useWallet();
  const { staking } = useTokano();
  const [stakePools, setStakePools] = useState<PoolState[]>();
  const [userStakedAccounts, setUserStakedAccounts] = useState<UserState[]>();
  const [userCreatedStakePools, setUserCreatedStakePools] =
    useState<PoolState[]>();
  const [selectedUserStakedAccount, setSelectedUserStakedAccount] =
    useState<UserState | null>(null);
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const fetchStakingPools = useCallback(async () => {
    const pools = await staking?.fetchStakePools();
    console.log("Pools", pools);
    setStakePools(pools);
  }, [staking]);

  const fetchUserStakeAccounts = useCallback(async () => {
    if (!publicKey) return;
    const accounts = await staking?.fetchUserStakeAccounts(publicKey);
    console.log("User Staked Accounts", accounts);
    setUserStakedAccounts(accounts);
    if (accounts && accounts.length > 0) {
      setSelectedUserStakedAccount(accounts[0]);
    } else {
      setSelectedUserStakedAccount(null);
    }
  }, [publicKey, staking]);

  const fetchUserCreatedStakePools = useCallback(async () => {
    if (!publicKey) return;
    const pools = await staking?.fetchUserCreatedStakePools(publicKey);
    console.log("User Created Stake Pools", pools);
    setUserCreatedStakePools(pools);
  }, [publicKey, staking]);

  const handlePoolCreated = useCallback(() => {
    fetchStakingPools();
    fetchUserCreatedStakePools();
  }, [fetchStakingPools, fetchUserCreatedStakePools]);

  const handleStakeCreated = useCallback(() => {
    fetchUserStakeAccounts();
    fetchStakingPools();
  }, [fetchUserStakeAccounts, fetchStakingPools]);

  const handleGetReward = useCallback(async () => {
    if (!publicKey || !selectedUserStakedAccount) return;

    try {
      const signature = await staking?.getReward({
        walletPk: publicKey,
        poolAddress: selectedUserStakedAccount.poolAddress,
      });
      console.log("Get Reward Signature:", signature);
      alert(`Get Reward successful! Signature: ${signature}`);
      // Re-fetch user accounts to see updated rewards
      fetchUserStakeAccounts();
    } catch (error) {
      console.error("Error getting reward:", error);
      alert(`Error getting reward: ${error}`);
    }
  }, [publicKey, selectedUserStakedAccount, staking, fetchUserStakeAccounts]);

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
      fetchUserStakeAccounts();
      fetchStakingPools();
      setUnstakeAmount("");
    } catch (error) {
      console.error("Error unstaking:", error);
      alert(`Error unstaking: ${error}`);
    }
  }, [
    publicKey,
    selectedUserStakedAccount,
    staking,
    fetchUserStakeAccounts,
    fetchStakingPools,
    unstakeAmount,
  ]);

  useEffect(() => {
    if (publicKey) {
      fetchUserStakeAccounts();
    }
  }, [publicKey, fetchUserStakeAccounts]);

  useEffect(() => {
    fetchStakingPools();
  }, [fetchStakingPools]);

  useEffect(() => {
    if (publicKey) {
      fetchUserCreatedStakePools();
    }
  }, [publicKey, fetchUserCreatedStakePools]);

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPoolAddress = event.target.value;
    const selectedAccount =
      userStakedAccounts?.find(
        (acc) => acc.poolAddress.toBase58() === selectedPoolAddress,
      ) || null;
    setSelectedUserStakedAccount(selectedAccount);
  };

  return (
    <div className="max-w-2/3 p-4">
      <h1 className="mb-4 text-2xl font-bold">Staking Test Page</h1>

      <CreatePool onPoolCreated={handlePoolCreated} />
      <CreateStake
        stakePools={stakePools}
        userStakedAccounts={userStakedAccounts}
        onStakeCreated={handleStakeCreated}
      />

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Stake Pools</h2>
        {stakePools === undefined ? (
          <p>Loading stake pools...</p>
        ) : stakePools.length === 0 ? (
          <p>No stake pools found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {stakePools.map((pool, index) => (
              <div
                key={index}
                className="rounded bg-gray-800 p-4"
              >
                <h3 className="font-semibold">
                  Pool {pool.poolAddress.toBase58()}
                </h3>
                <p>Initializer: {pool.initializer.toBase58()}</p>
                <p>Total Token Staked: {pool.totalTokenStaked.toString()}</p>
                <p>Token Mint: {pool.tokenMint.toBase58()}</p>
                <p>Reward Rate: {pool.rewardRate.toString()}</p>
                <p>Pool Lock Period: {pool.poolLockPeriod.toString()}</p>
                <p>
                  Last Update Time:{" "}
                  {new Date(pool.lastUpdateTime).toLocaleString()}
                </p>
                <p>Reward Distributed: {pool.rewardDistributed.toString()}</p>
                {/*<p>Start Timestamp: {pool.startTimestamp}</p>*/}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">User Staked Accounts</h2>
        {userStakedAccounts === undefined ? (
          <p>Loading user staked accounts...</p>
        ) : userStakedAccounts.length === 0 ? (
          <p>No user staked accounts found.</p>
        ) : (
          <div>
            <div className="mb-4">
              <label
                htmlFor="user-staked-accounts-select"
                className="mr-2"
              >
                Select Account:
              </label>
              <select
                id="user-staked-accounts-select"
                onChange={handleAccountChange}
                value={selectedUserStakedAccount?.poolAddress.toBase58() || ""}
                className="rounded border p-2"
              >
                {userStakedAccounts.map((account) => (
                  <option
                    key={account.poolAddress.toBase58()}
                    value={account.poolAddress.toBase58()}
                  >
                    {account.poolAddress.toBase58()}
                  </option>
                ))}
              </select>
            </div>

            {selectedUserStakedAccount && (
              <div className="mb-4 rounded bg-gray-800 p-4">
                <h3 className="font-semibold">Selected Account Details</h3>
                <p>
                  Initializer:{" "}
                  {selectedUserStakedAccount.initializerUser.toBase58()}
                </p>
                <p>
                  Pool Address:{" "}
                  {selectedUserStakedAccount.poolAddress.toBase58()}
                </p>
                <p>
                  Staked Token Balance:{" "}
                  {selectedUserStakedAccount.stakedTokenBalance.toString()}
                </p>
                <p>Rewards: {selectedUserStakedAccount.rewards.toString()}</p>
                {/*<p>Release Time: {selectedUserStakedAccount.releaseTime}</p>*/}
              </div>
            )}

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
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">User Created Stake Pools</h2>
        {userCreatedStakePools === undefined ? (
          <p>Loading user created stake pools...</p>
        ) : userCreatedStakePools.length === 0 ? (
          <p>No user created stake pools found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {userCreatedStakePools.map((pool, index) => (
              <div
                key={index}
                className="rounded bg-gray-800 p-4"
              >
                <h3 className="font-semibold">
                  Pool {pool.poolAddress.toBase58()}
                </h3>
                <p>Initializer: {pool.initializer.toBase58()}</p>
                <p>Total Token Staked: {pool.totalTokenStaked.toString()}</p>
                <p>Token Mint: {pool.tokenMint.toBase58()}</p>
                <p>Reward Rate: {pool.rewardRate.toString()}</p>
                <p>Pool Lock Period: {pool.poolLockPeriod.toString()}</p>
                <p>
                  Last Update Time:{" "}
                  {new Date(pool.lastUpdateTime).toLocaleString()}
                </p>
                <p>Reward Distributed: {pool.rewardDistributed.toString()}</p>
                {/*<p>Start Timestamp: {pool.startTimestamp}</p>*/}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
