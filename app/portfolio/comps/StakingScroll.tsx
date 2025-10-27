"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useBalances, BalanceLoadState } from "@/contexts/balances-context";
import { useTokens } from "@/contexts/tokens-context";
import { SOL_MINT } from "@/lib/balances";
import { UserState, PoolState } from "tokano-sdk";
import StakeCard from "../../../Components/Tokens/StakeCard";
import VestCard from "../../../Components/Tokens/VestCard";
import LockCard from "../../../Components/Tokens/LockCard";

interface StakingScrollProps {
  selectedTokenIndex: number;
}

type SortFilter = "all" | "pools" | "staking" | "vest" | "lock";

interface UserStakeWithPool extends UserState {
  pool?: PoolState;
  totalStakers?: number;
}

function StakingScroll({ selectedTokenIndex }: StakingScrollProps) {
  const { publicKey } = useWallet();
  const { staking, vesting, lock } = useTokano();
  const { tokens, loadState } = useBalances();
  const { fetchTokenInfo } = useTokens();

  const [userStakes, setUserStakes] = useState<UserStakeWithPool[]>([]);
  const [userVests, setUserVests] = useState<any[]>([]);
  const [userLocks, setUserLocks] = useState<any[]>([]);
  const [poolDetails, setPoolDetails] = useState<PoolState[]>([]);
  const [userCreatedPools, setUserCreatedPools] = useState<PoolState[]>([]);
  const [sortFilter, setSortFilter] = useState<SortFilter>("all");
  const [loading, setLoading] = useState(false);

  // Filter out SOL from tokens
  const displayTokens = tokens.filter(
    (token) => token.mintAddress !== SOL_MINT,
  );
  const selectedToken = displayTokens[selectedTokenIndex];

  // Fetch user stakes for selected token
  const fetchUserStakes = useCallback(async () => {
    if (!publicKey || !staking || !selectedToken) return;

    setLoading(true);
    try {
      // Get all user stake accounts
      const allStakes = await staking.fetchUserStakeAccounts(publicKey);

      // Get all pools to match with stakes
      const pools = await staking.fetchStakePools();
      setPoolDetails(pools);

      // Filter stakes for selected token and enrich with pool data
      const tokenStakes = allStakes
        .map((stake) => {
          const pool = pools.find((p) =>
            p.poolAddress.equals(stake.poolAddress),
          );
          return { ...stake, pool };
        })
        .filter(
          (stake) =>
            stake.pool?.tokenMint.toBase58() === selectedToken.mintAddress,
        );

      // Note: Total stakers count is not available from SDK
      // Using pool data to get approximate count (demo value)
      const stakesWithStakerCount = tokenStakes.map((stake) => ({
        ...stake,
        totalStakers: 0, // TODO: Implement when SDK provides method to get all pool stakers
      }));

      setUserStakes(stakesWithStakerCount);
    } catch (error) {
      console.error("Error fetching user stakes:", error);
      setUserStakes([]);
    } finally {
      setLoading(false);
    }
  }, [publicKey, staking, selectedToken]);

  // Fetch user created pools
  const fetchUserCreatedPools = useCallback(async () => {
    if (!publicKey || !staking || !selectedToken) return;

    setLoading(true);
    try {
      const pools = await staking.fetchUserCreatedStakePools(publicKey);

      // Filter pools for selected token
      const tokenPools = pools.filter(
        (pool) => pool.tokenMint.toBase58() === selectedToken.mintAddress,
      );

      setUserCreatedPools(tokenPools);
    } catch (error) {
      console.error("Error fetching user created pools:", error);
      setUserCreatedPools([]);
    } finally {
      setLoading(false);
    }
  }, [publicKey, staking, selectedToken]);

  // Fetch user vesting positions
  const fetchUserVests = useCallback(async () => {
    if (!publicKey || !vesting || !selectedToken) return;

    try {
      const allVests = await vesting.fetchUserVestings(publicKey);
      // fetchUserVestingAccounts
      // Filter vests for selected token
      const tokenVests = allVests.filter(
        (vest: any) => vest.tokenMint?.toBase58() === selectedToken.mintAddress,
      );

      setUserVests(tokenVests);
    } catch (error) {
      console.error("Error fetching user vests:", error);
      setUserVests([]);
    }
  }, [publicKey, vesting, selectedToken]);

  // Fetch user lock positions
  const fetchUserLocks = useCallback(async () => {
    if (!publicKey || !lock || !selectedToken) return;

    try {
      const allLocks = await lock.fetchUserLocks(publicKey);
      // fetchUserLockAccounts
      // Filter locks for selected token
      const tokenLocks = allLocks.filter(
        (lockItem: any) =>
          lockItem.tokenMint?.toBase58() === selectedToken.mintAddress,
      );

      setUserLocks(tokenLocks);
    } catch (error) {
      console.error("Error fetching user locks:", error);
      setUserLocks([]);
    }
  }, [publicKey, lock, selectedToken]);

  useEffect(() => {
    fetchUserStakes();
    fetchUserCreatedPools();
    fetchUserVests();
    fetchUserLocks();
  }, [fetchUserStakes, fetchUserCreatedPools, fetchUserVests, fetchUserLocks]);

  // Determine what to display based on filter
  const displayData = React.useMemo(() => {
    if (sortFilter === "all") {
      // Show everything: stakes, pools, vests, locks
      return {
        stakes: userStakes,
        pools: userCreatedPools,
        vests: userVests,
        locks: userLocks,
        showAll: true,
      };
    } else if (sortFilter === "pools") {
      // Show only created pools
      return {
        stakes: [],
        pools: userCreatedPools,
        vests: [],
        locks: [],
        showAll: false,
      };
    } else if (sortFilter === "staking") {
      // Show only user stakes
      return {
        stakes: userStakes,
        pools: [],
        vests: [],
        locks: [],
        showAll: false,
      };
    } else if (sortFilter === "vest") {
      // Show only vests
      return {
        stakes: [],
        pools: [],
        vests: userVests,
        locks: [],
        showAll: false,
      };
    } else if (sortFilter === "lock") {
      // Show only locks
      return {
        stakes: [],
        pools: [],
        vests: [],
        locks: userLocks,
        showAll: false,
      };
    }

    return {
      stakes: userStakes,
      pools: [],
      vests: [],
      locks: [],
      showAll: false,
    };
  }, [userStakes, userCreatedPools, userVests, userLocks, sortFilter]);

  // Calculate total staked across all pools for this token
  const totalPoolStaked = React.useMemo(() => {
    if (!selectedToken) return "0";

    const total = poolDetails
      .filter((pool) => pool.tokenMint.toBase58() === selectedToken.mintAddress)
      .reduce((sum, pool) => sum + pool.totalTokenStaked.toNumber(), 0);

    const decimals = selectedToken.decimals;
    const formattedTotal = (total / Math.pow(10, decimals)).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );

    return formattedTotal;
  }, [poolDetails, selectedToken]);

  // Format timestamp to "DD.MM.YY/HH:MM"
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}/${hours}:${minutes}`;
  };

  // Render empty states
  if (!publicKey) {
    return (
      <div className="font-khand dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] text-[#190E79] dark:text-white">
        <div className="dark:border-secondary border-b-1 border-[#CDCDE9] py-2 pl-6 text-xl">
          YOU ARE STAKING
        </div>
        <div className="flex items-center justify-center p-12 text-center text-base">
          Connect wallet to view your stakes
        </div>
      </div>
    );
  }

  if (loadState === BalanceLoadState.LOADING || loading) {
    return (
      <div className="font-khand dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] text-[#190E79] dark:text-white">
        <div className="dark:border-secondary border-b-1 border-[#CDCDE9] py-2 pl-6 text-xl">
          YOU ARE STAKING
        </div>
        <div className="flex items-center justify-center p-12 text-center text-base">
          Loading stakes...
        </div>
      </div>
    );
  }

  if (!selectedToken) {
    return (
      <div className="font-khand dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] text-[#190E79] dark:text-white">
        <div className="dark:border-secondary border-b-1 border-[#CDCDE9] py-2 pl-6 text-xl">
          YOU ARE STAKING
        </div>
        <div className="flex items-center justify-center p-12 text-center text-base">
          No token selected
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
      `}</style>
      <div className="font-khand dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] text-[#190E79] dark:text-white">
        <div className="dark:border-secondary border-b-1 border-[#CDCDE9] py-2 pl-6 text-xl">
          YOU ARE STAKING
        </div>
        <div className="flex justify-between bg-[#fafafa] py-2 pr-8 pl-16 text-lg dark:bg-[#231570]">
          <div>
            {selectedToken.info?.symbol || selectedToken.info?.name || "TOKEN"}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortFilter("all")}
              className={`${sortFilter === "all" ? "font-bold underline" : ""}`}
            >
              all
            </button>
            <span>|</span>
            <button
              onClick={() => setSortFilter("pools")}
              className={`${sortFilter === "pools" ? "font-bold underline" : ""}`}
            >
              pools
            </button>
            <span>|</span>
            <button
              onClick={() => setSortFilter("staking")}
              className={`${sortFilter === "staking" ? "font-bold underline" : ""}`}
            >
              staking
            </button>
            <span>|</span>
            <button
              onClick={() => setSortFilter("vest")}
              className={`${sortFilter === "vest" ? "font-bold underline" : ""}`}
            >
              vest
            </button>
            <span>|</span>
            <button
              onClick={() => setSortFilter("lock")}
              className={`${sortFilter === "lock" ? "font-bold underline" : ""}`}
            >
              lock
            </button>
          </div>
        </div>
        <div className="custom-scrollbar mx-2 max-h-200 overflow-y-auto p-3">
          {displayData.showAll ? (
            // Show everything (all filter)
            <>
              {displayData.stakes.length === 0 &&
              displayData.pools.length === 0 &&
              displayData.vests.length === 0 &&
              displayData.locks.length === 0 ? (
                <div className="flex items-center justify-center p-8 text-center text-base">
                  No activities for{" "}
                  {selectedToken.info?.symbol ||
                    selectedToken.info?.name ||
                    "this token"}
                </div>
              ) : (
                <>
                  {/* Render user stakes */}
                  {displayData.stakes.map((stake, index) => {
                    if (!stake.pool) return null;

                    const decimals = selectedToken.decimals;
                    const rewards =
                      stake.approximateReward.toNumber() /
                      Math.pow(10, decimals);

                    return (
                      <div
                        key={`stake-${stake.accountAddress.toBase58()}`}
                        className="mb-4"
                      >
                        <StakeCard
                          id={index + 1}
                          title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                          created={selectedToken.mintAddress}
                          marketCap={`${rewards.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                          wallet={stake.pool.poolAddress.toBase58()}
                          poolAddress={stake.pool.poolAddress.toBase58()}
                          variant="portfolio"
                          stakeTimestamp={formatTimestamp(
                            stake.releaseTime.getTime() / 1000 -
                              stake.pool.poolLockPeriod.toNumber(),
                          )}
                          stakersCount={stake.totalStakers || 0}
                          poolEndTimestamp={
                            stake.pool.endTimestamp.getTime() / 1000
                          }
                        />
                      </div>
                    );
                  })}

                  {/* Render created pools */}
                  {displayData.pools.map((pool, index) => {
                    const decimals = selectedToken.decimals;
                    const totalRewards =
                      pool.rewardDistributed.toNumber() /
                      Math.pow(10, decimals);

                    return (
                      <div
                        key={`pool-${pool.poolAddress.toBase58()}`}
                        className="mb-4"
                      >
                        <StakeCard
                          id={displayData.stakes.length + index + 1}
                          title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                          created={selectedToken.mintAddress}
                          marketCap={`${totalRewards.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                          wallet={pool.poolAddress.toBase58()}
                          poolAddress={pool.poolAddress.toBase58()}
                          variant="portfolio"
                          stakeTimestamp={formatTimestamp(
                            pool.startTimestamp.getTime() / 1000,
                          )}
                          stakersCount={0}
                          poolEndTimestamp={pool.endTimestamp.getTime() / 1000}
                        />
                      </div>
                    );
                  })}

                  {/* TODO: Render vests when implemented */}
                  {/* TODO: Render locks when implemented */}
                </>
              )}
            </>
          ) : sortFilter === "pools" ? (
            // Show only created pools
            displayData.pools.length === 0 ? (
              <div className="flex items-center justify-center p-8 text-center text-base">
                No pools created for{" "}
                {selectedToken.info?.symbol ||
                  selectedToken.info?.name ||
                  "this token"}
              </div>
            ) : (
              displayData.pools.map((pool, index) => {
                const decimals = selectedToken.decimals;
                const totalRewards =
                  pool.rewardDistributed.toNumber() / Math.pow(10, decimals);

                return (
                  <div
                    key={pool.poolAddress.toBase58()}
                    className="mb-4"
                  >
                    <StakeCard
                      id={index + 1}
                      title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                      created={selectedToken.mintAddress}
                      marketCap={`${totalRewards.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                      wallet={pool.poolAddress.toBase58()}
                      poolAddress={pool.poolAddress.toBase58()}
                      variant="portfolio"
                      stakeTimestamp={formatTimestamp(
                        pool.startTimestamp.getTime() / 1000,
                      )}
                      stakersCount={0}
                      poolEndTimestamp={pool.endTimestamp.getTime() / 1000}
                    />
                  </div>
                );
              })
            )
          ) : displayData.stakes.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-center text-base">
              {sortFilter === "vest" || sortFilter === "lock"
                ? `No ${sortFilter} activities for ${selectedToken.info?.symbol || selectedToken.info?.name || "this token"}`
                : `No active stakes for ${selectedToken.info?.symbol || selectedToken.info?.name || "this token"}`}
            </div>
          ) : (
            displayData.stakes.map((stake, index) => {
              if (!stake.pool) return null;

              const decimals = selectedToken.decimals;
              const rewards =
                stake.approximateReward.toNumber() / Math.pow(10, decimals);

              return (
                <div
                  key={stake.accountAddress.toBase58()}
                  className="mb-4"
                >
                  <StakeCard
                    id={index + 1}
                    title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                    created={selectedToken.mintAddress}
                    marketCap={`${rewards.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                    wallet={stake.pool.poolAddress.toBase58()}
                    poolAddress={stake.pool.poolAddress.toBase58()}
                    variant="portfolio"
                    stakeTimestamp={formatTimestamp(
                      stake.releaseTime.getTime() / 1000 -
                        stake.pool.poolLockPeriod.toNumber(),
                    )}
                    stakersCount={stake.totalStakers || 0}
                    poolEndTimestamp={stake.pool.endTimestamp.getTime() / 1000}
                  />
                </div>
              );
            })
          )}

          {/* Render Vest Cards */}
          {displayData.vests.map((vest, index) => {
            const decimals = selectedToken.decimals;
            const vestedAmount = vest.amount
              ? vest.amount.toNumber() / Math.pow(10, decimals)
              : 0;

            return (
              <div
                key={vest.accountAddress?.toBase58() || `vest-${index}`}
                className="mb-4"
              >
                <VestCard
                  id={index + 1}
                  title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                  created={selectedToken.mintAddress}
                  marketCap={`${vestedAmount.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                  wallet={vest.receiver?.toBase58() || "N/A"}
                />
              </div>
            );
          })}

          {/* Render Lock Cards */}
          {displayData.locks.map((lockItem, index) => {
            const decimals = selectedToken.decimals;
            const lockedAmount = lockItem.amount
              ? lockItem.amount.toNumber() / Math.pow(10, decimals)
              : 0;

            return (
              <div
                key={lockItem.accountAddress?.toBase58() || `lock-${index}`}
                className="mb-4"
              >
                <LockCard
                  id={index + 1}
                  title={`${selectedToken.info?.name || "Unknown"} (${selectedToken.info?.symbol || "N/A"})`}
                  created={selectedToken.mintAddress}
                  marketCap={`${lockedAmount.toFixed(2)} ${selectedToken.info?.symbol || ""}`}
                  wallet={lockItem.receiver?.toBase58() || "N/A"}
                />
              </div>
            );
          })}
        </div>
        <div className="dark:border-secondary border-t-1 border-[#CDCDE9] py-2 text-center">
          total tokens staking: {totalPoolStaked}{" "}
          {selectedToken.info?.symbol || ""}
        </div>
      </div>
    </>
  );
}

export default StakingScroll;
