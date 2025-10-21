"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PoolState, UserState } from "tokano-sdk";
import CreatePool from "@/Components/staking/create-pool";
import CreateStake from "@/Components/staking/create-stake";
import StakeActions from "@/Components/staking/stake-actions";
import ClosePool from "@/Components/staking/close-pool";
import { TokenInfo, useTokens } from "@/contexts/tokens-context";

interface PoolStateWithTokenInfo extends PoolState {
  tokenInfo?: TokenInfo;
}

interface UserStateWithTokenInfo extends UserState {
  tokenInfo?: TokenInfo;
}

export default function StakingTestPage() {
  const { publicKey } = useWallet();
  const { staking } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const [stakePools, setStakePools] = useState<PoolStateWithTokenInfo[]>();
  const [userStakedAccounts, setUserStakedAccounts] =
    useState<UserStateWithTokenInfo[]>();
  const [userCreatedStakePools, setUserCreatedStakePools] =
    useState<PoolStateWithTokenInfo[]>();
  const [selectedUserStakedAccount, setSelectedUserStakedAccount] =
    useState<UserStateWithTokenInfo | null>(null);

  const fetchStakingPools = useCallback(async () => {
    if (!staking) return;
    const pools = await staking.fetchStakePools();
    console.log("Pools", pools);
    const mints = pools.map((p) => p.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedPools = pools.map((pool) => ({
      ...pool,
      tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
    }));
    setStakePools(enrichedPools);
  }, [staking, fetchTokenInfo]);

  const fetchUserStakeAccounts = useCallback(async () => {
    if (!publicKey || !staking || !stakePools) return;
    const accounts = await staking.fetchUserStakeAccounts(publicKey);
    console.log("User Staked Accounts", accounts);

    const enrichedAccounts = accounts.map((account) => {
      const pool = stakePools.find((p) =>
        p.poolAddress.equals(account.poolAddress),
      );
      return {
        ...account,
        tokenInfo: pool?.tokenInfo,
      };
    });

    setUserStakedAccounts(enrichedAccounts);
    if (enrichedAccounts && enrichedAccounts.length > 0) {
      setSelectedUserStakedAccount(enrichedAccounts[0]);
    } else {
      setSelectedUserStakedAccount(null);
    }
  }, [publicKey, staking, stakePools]);

  const fetchUserCreatedStakePools = useCallback(async () => {
    if (!publicKey || !staking) return;
    const pools = await staking.fetchUserCreatedStakePools(publicKey);
    console.log("User Created Stake Pools", pools);
    const mints = pools.map((p) => p.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedPools = pools.map((pool) => ({
      ...pool,
      tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
    }));
    setUserCreatedStakePools(enrichedPools);
  }, [publicKey, staking, fetchTokenInfo]);

  const handlePoolCreated = useCallback(() => {
    fetchStakingPools();
    fetchUserCreatedStakePools();
  }, [fetchStakingPools, fetchUserCreatedStakePools]);

  const handleStakeCreated = useCallback(() => {
    fetchUserStakeAccounts();
    fetchStakingPools();
  }, [fetchUserStakeAccounts, fetchStakingPools]);

  const handleWithdrawAction = useCallback(() => {
    fetchUserStakeAccounts();
    fetchStakingPools();
  }, [fetchUserStakeAccounts, fetchStakingPools]);

  const handlePoolClosed = useCallback(() => {
    fetchUserCreatedStakePools();
    fetchStakingPools();
  }, [fetchUserCreatedStakePools, fetchStakingPools]);

  useEffect(() => {
    fetchStakingPools();
  }, [fetchStakingPools]);

  useEffect(() => {
    if (publicKey && stakePools) {
      fetchUserStakeAccounts();
    }
  }, [publicKey, stakePools, fetchUserStakeAccounts]);

  useEffect(() => {
    if (publicKey) {
      fetchUserCreatedStakePools();
    }
  }, [publicKey, fetchUserCreatedStakePools]);

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAccontAddress = event.target.value;
    const selectedAccount =
      userStakedAccounts?.find(
        (acc) => acc.accountAddress.toBase58() === selectedAccontAddress,
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
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Pool {pool.poolAddress.toBase58()}
                  </h3>
                  {pool.tokenInfo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={pool.tokenInfo.icon}
                        alt={pool.tokenInfo.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-bold">
                        {pool.tokenInfo.name} ({pool.tokenInfo.symbol})
                      </span>
                    </div>
                  )}
                </div>
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
                <p>Start Timestamp: {pool.startTimestamp.toString()}</p>
                <p>End Timestamp: {pool.endTimestamp.toString()}</p>
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
                value={
                  selectedUserStakedAccount?.accountAddress.toBase58() || ""
                }
                className="rounded border p-2"
              >
                {userStakedAccounts.map((account) => (
                  <option
                    key={account.accountAddress.toBase58()}
                    value={account.accountAddress.toBase58()}
                  >
                    {account.accountAddress.toBase58()}
                  </option>
                ))}
              </select>
            </div>

            {selectedUserStakedAccount && (
              <div className="mb-4 rounded bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Selected Account Details</h3>
                  {selectedUserStakedAccount.tokenInfo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedUserStakedAccount.tokenInfo.icon}
                        alt={selectedUserStakedAccount.tokenInfo.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-bold">
                        {selectedUserStakedAccount.tokenInfo.name} (
                        {selectedUserStakedAccount.tokenInfo.symbol})
                      </span>
                    </div>
                  )}
                </div>
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
                <p>
                  Approx. Rewards:{" "}
                  {selectedUserStakedAccount.approximateReward.toNumber()}
                </p>
                <p>
                  Release Time:{" "}
                  {selectedUserStakedAccount.releaseTime.toString()}
                </p>
              </div>
            )}

            <StakeActions
              selectedUserStakedAccount={selectedUserStakedAccount}
              onAction={handleWithdrawAction}
            />
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
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Pool {pool.poolAddress.toBase58()}
                  </h3>
                  {pool.tokenInfo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={pool.tokenInfo.icon}
                        alt={pool.tokenInfo.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-bold">
                        {pool.tokenInfo.name} ({pool.tokenInfo.symbol})
                      </span>
                    </div>
                  )}
                </div>
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
                <p>Start Timestamp: {pool.startTimestamp.toString()}</p>
                <p>End Timestamp: {pool.endTimestamp.toString()}</p>
                <ClosePool
                  pool={pool}
                  onPoolClosed={handlePoolClosed}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
