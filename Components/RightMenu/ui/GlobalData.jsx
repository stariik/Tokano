"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";
import { useTokens } from "@/contexts/tokens-context";
import { useTokano } from "@/contexts/tokano-sdk-context";
import {
  TOKANO_MINT_ADDRESS,
  TOKANO_POOL_ID,
  TOKANO_PUMP_LIQUIDITY_POOL_ADDRESS,
  TOKANO_LOCK_ADDRESS,
  TOKANO_VESTING_ADDRESS,
} from "@/lib/constants";
import { formatBN, formatNumber } from "@/lib/balances";

function GlobalData() {
  const { connection } = useConnection();
  const { fetchTokenInfo } = useTokens();
  const { staking, vesting, lock } = useTokano();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [stakingInfo, setStakingInfo] = useState(null);
  const [unsoldTokenBalance, setUnsoldTokenBalance] = useState(null);
  const [vestingInfo, setVestingInfo] = useState(null);
  const [lockInfo, setLockInfo] = useState(null);

  const tokenFetch = useCallback(async () => {
    const res = await fetchTokenInfo([TOKANO_MINT_ADDRESS]);
    return res[TOKANO_MINT_ADDRESS];
  }, [fetchTokenInfo]);

  const stakingFetch = useCallback(async () => {
    if (!tokenInfo || !staking) return null;
    try {
      const res = await staking.fetchStakePool(TOKANO_POOL_ID);
      const totalTokensStaked = res.totalTokenStaked;
      const totalStakers = res.totalStakers;
      const rewardDistributed = res.rewardDistributed;

      // Calculate total reward generated from rewardRate and time period
      const periodInSeconds = new BN(
        Math.floor(
          (res.endTimestamp.getTime() - res.startTimestamp.getTime()) / 1000,
        ),
      );
      const totalRewardGenerated = res.rewardRate.mul(periodInSeconds);

      return {
        totalTokensStaked,
        totalStakers,
        rewardDistributed,
        totalRewardGenerated,
      };
    } catch (error) {
      console.error("Error fetching staking data:", error);
      return null;
    }
  }, [staking, tokenInfo]);

  const fetchUnsoldTokens = useCallback(async () => {
    try {
      const balances = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(TOKANO_PUMP_LIQUIDITY_POOL_ADDRESS),
        { mint: new PublicKey(TOKANO_MINT_ADDRESS) },
      );
      if (balances.value.length > 0) {
        return {
          mintAddress: balances.value[0].account.data.parsed.info.mint,
          decimals:
            balances.value[0].account.data.parsed.info.tokenAmount.decimals,
          amount:
            balances.value[0].account.data.parsed.info.tokenAmount
              .uiAmountString,
          amountRaw: Number.parseInt(
            balances.value[0].account.data.parsed.info.tokenAmount.amount,
          ),
        };
      }
    } catch (error) {
      console.error("Error fetching unsold tokens:", error);
    }
    return null;
  }, [connection]);

  const fetchLock = useCallback(async () => {
    if (!lock) return null;
    try {
      const allLocks = await lock.fetchAllLocks();
      const result = allLocks.find(
        (l) => l.address.toBase58() === TOKANO_LOCK_ADDRESS,
      );
      return result || null;
    } catch (error) {
      console.error("Error fetching lock data:", error);
      return null;
    }
  }, [lock]);

  const fetchVest = useCallback(async () => {
    if (!vesting) return null;
    try {
      const allVestings = await vesting.fetchAllVestings();
      const result = allVestings.find(
        (v) => v.address.toBase58() === TOKANO_VESTING_ADDRESS,
      );
      return result || null;
    } catch (error) {
      console.error("Error fetching vesting data:", error);
      return null;
    }
  }, [vesting]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // First fetch token info as staking depends on it
        const token = await tokenFetch();
        setTokenInfo(token);

        // Fetch other data in parallel
        const [staking, unsold, lock, vest] = await Promise.all([
          stakingFetch(),
          fetchUnsoldTokens(),
          fetchLock(),
          fetchVest(),
        ]);

        setStakingInfo(staking);
        setUnsoldTokenBalance(unsold);
        setLockInfo(lock);
        setVestingInfo(vest);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [tokenFetch, stakingFetch, fetchUnsoldTokens, fetchLock, fetchVest]);

  return (
    <div className="px-2 xl:px-4 2xl:px-6">
      <TokanoToken
        TableName={"Global Data"}
        showIcon={true}
      >
        <div className="font-khand dark:bg[#231570] dark:border-secondary grid grid-cols-4 border-x-2 border-[#CDCDE9] bg-[#BEB3FF] py-0.5 pr-6 pl-4 text-xs xl:text-sm 2xl:text-base dark:bg-[#231570]">
          <div className="my-1 ml-4"></div>
        </div>
        <div className="dark:border-secondary flex flex-col border-2 border-[#CDCDE9] bg-[#beb3ffae] dark:bg-[#231570]">
          {/* TOKENS - 3 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label=""
              data={[
                {
                  supply: tokenInfo
                    ? formatNumber(tokenInfo.totalSupply)
                    : "Loading...",
                  holders: tokenInfo?.holderCount?.toString() || "Loading...",
                },
                {
                  unsold: unsoldTokenBalance
                    ? formatNumber(unsoldTokenBalance.amount)
                    : "Loading...",
                  unlocked: lockInfo
                    ? formatBN(lockInfo.lockAmount, tokenInfo.decimals)
                    : "Loading...",
                },
                {
                  "m-cap": tokenInfo
                    ? `$${formatNumber(tokenInfo.mcap)}`
                    : "Loading...",
                  price: tokenInfo
                    ? `$${parseFloat(tokenInfo.usdPrice).toFixed(3)}`
                    : "Loading...",
                },
              ]}
            />
          </div>

          {/* STAKED - 2 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label="STAKED"
              data={[
                {
                  total: stakingInfo
                    ? formatBN(
                        stakingInfo.totalTokensStaked,
                        tokenInfo.decimals,
                      )
                    : "Loading...",
                  stakes: stakingInfo?.totalStakers?.toString() || "Loading...",
                },
                {
                  "active rewards": stakingInfo
                    ? formatBN(
                        stakingInfo.totalRewardGenerated,
                        tokenInfo.decimals,
                      )
                    : "Loading...",
                  "earned rewards": stakingInfo
                    ? formatBN(
                        stakingInfo.rewardDistributed,
                        tokenInfo.decimals,
                      )
                    : "Loading...",
                },
              ]}
            />
          </div>

          {/* LOCKED - 2 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label="LOCKED"
              data={[
                {
                  locked: lockInfo
                    ? formatBN(lockInfo.lockAmount, tokenInfo.decimals)
                    : "Loading...",
                },
                {
                  "unlocks in":
                    lockInfo && lockInfo.unlockTime
                      ? (() => {
                          const now = Date.now();
                          const unlockTime = lockInfo.unlockTime.getTime();
                          const diffMs = unlockTime - now;
                          if (diffMs <= 0) return "Unlocked";
                          const diffDays = Math.floor(
                            diffMs / (1000 * 60 * 60 * 24),
                          );
                          const diffHours = Math.floor(
                            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                          );
                          return diffDays > 0
                            ? `${diffDays}d ${diffHours}h`
                            : `${diffHours}h`;
                        })()
                      : "Loading...",
                },
              ]}
            />
          </div>

          {/* VESTING - 3 sections */}
          <div>
            <GlobalDataRow
              label="VESTING"
              data={[
                {
                  locked:
                    vestingInfo &&
                    vestingInfo.totalVestedAmount &&
                    vestingInfo.totalWithdrawnAmount
                      ? formatBN(
                          vestingInfo.totalVestedAmount.sub(
                            vestingInfo.totalWithdrawnAmount,
                          ),
                          tokenInfo.decimals,
                        )
                      : "Loading...",
                },
                {
                  claimable:
                    vestingInfo && vestingInfo.currentlyClaimableAmount
                      ? formatBN(
                          vestingInfo.currentlyClaimableAmount,
                          tokenInfo.decimals,
                        )
                      : "Loading...",
                },
                {
                  "ends in":
                    vestingInfo && vestingInfo.endTime
                      ? (() => {
                          const now = Date.now();
                          const endTime = vestingInfo.endTime.getTime();
                          const diffMs = endTime - now;
                          if (diffMs <= 0) return "Completed";
                          const diffDays = Math.floor(
                            diffMs / (1000 * 60 * 60 * 24),
                          );
                          const diffHours = Math.floor(
                            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                          );
                          return diffDays > 0
                            ? `${diffDays}d/${diffHours}h`
                            : `${diffHours}h`;
                        })()
                      : "Loading...",
                },
              ]}
            />
          </div>
        </div>
      </TokanoToken>
    </div>
  );
}

export default GlobalData;
