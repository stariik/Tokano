"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PoolState, UserState } from "tokano-sdk";

export default function TestPage() {
  const { publicKey } = useWallet();
  const { staking } = useTokano();
  const [stakePools, setStakePools] = useState<PoolState[]>();
  const [userStakedAccounts, setUserStakedAccounts] = useState<UserState[]>();
  const [userCreatedStakePools, setUserCreatedStakePools] =
    useState<PoolState[]>();

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
  }, [publicKey, staking]);

  const fetchUserCreatedStakePools = useCallback(async () => {
    if (!publicKey) return;
    const pools = await staking?.fetchUserCreatedStakePools(publicKey);
    console.log("User Created Stake Pools", pools);
    setUserCreatedStakePools(pools);
  }, [publicKey, staking]);

  useEffect(() => {
    fetchUserStakeAccounts();
  }, [fetchUserStakeAccounts]);

  useEffect(() => {
    fetchStakingPools();
  }, [fetchStakingPools]);

  useEffect(() => {
    fetchUserCreatedStakePools();
  }, [fetchUserCreatedStakePools]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Staking Test Page</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Stake Pools</h2>
        {stakePools ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stakePools.map((pool) => (
              <div
                key={pool.poolAddress.toBase58()}
                className="rounded bg-gray-100 p-4"
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
                <p>Start Timestamp: {pool.startTimestamp}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading stake pools...</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">User Staked Accounts</h2>
        {userStakedAccounts ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userStakedAccounts.map((account) => (
              <div
                key={account.accountAddress.toBase58()}
                className="rounded bg-gray-100 p-4"
              >
                <h3 className="font-semibold">
                  Account {account.accountAddress.toBase58()}
                </h3>
                <p>Initializer: {account.initializerUser.toBase58()}</p>
                <p>Pool Address: {account.poolAddress.toBase58()}</p>
                <p>
                  Staked Token Balance: {account.stakedTokenBalance.toString()}
                </p>
                <p>Rewards: {account.rewards.toString()}</p>
                <p>Release Time: {account.releaseTime}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading user staked accounts...</p>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">User Created Stake Pools</h2>
        {userCreatedStakePools ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userCreatedStakePools.map((pool) => (
              <div
                key={pool.poolAddress.toBase58()}
                className="rounded bg-gray-100 p-4 text-black"
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
        ) : (
          <p>Loading user created stake pools...</p>
        )}
      </div>
    </div>
  );
}
