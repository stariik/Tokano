"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BN } from "@coral-xyz/anchor";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";
import { useTokens } from "@/contexts/tokens-context";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { TOKANO_MINT_ADDRESS, TOKANO_POOL_ID } from "@/lib/constants";

function GlobalData() {
  const { fetchTokenInfo } = useTokens();
  const { staking } = useTokano();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [stakingInfo, setStakingInfo] = useState(null);

  const tokenFetch = useCallback(async () => {
    const res = await fetchTokenInfo([TOKANO_MINT_ADDRESS]);
    return res[TOKANO_MINT_ADDRESS];
  }, [fetchTokenInfo]);

  const stakingFetch = useCallback(async () => {
    if (!tokenInfo) return null;
    const res = await staking.fetchStakePool(TOKANO_POOL_ID);
    const totalTokensStaked = res.totalTokenStaked;
    const totalStakers = res.totalStakers;
    const rewardDistributed = res.rewardDistributed;

    // Calculate total reward generated from rewardRate and time period
    const periodInSeconds = new BN(
      Math.floor((res.endTimestamp.getTime() - res.startTimestamp.getTime()) / 1000)
    );
    const totalRewardGenerated = res.rewardRate.mul(periodInSeconds);

    return {
      totalTokensStaked,
      totalStakers,
      rewardDistributed,
      totalRewardGenerated,
    };
  }, [staking, tokenInfo]);

  useEffect(() => {
    tokenFetch().then((res) => setTokenInfo(res));
  }, [tokenFetch]);

  useEffect(() => {
    if (tokenInfo) {
      stakingFetch().then((res) => setStakingInfo(res));
    }
  }, [tokenInfo, stakingFetch]);

  // Format numbers for display
  const formatNumber = (num) => {
    if (!num) return "0";
    const value = typeof num === 'string' ? parseFloat(num) : num;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
  };

  const formatBN = (bn) => {
    if (!bn) return "0";
    return formatNumber(bn.toString() / 1e9); // Assuming 9 decimals
  };

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
                  supply: tokenInfo ? formatNumber(tokenInfo.totalSupply) : "Loading...",
                  holders: tokenInfo?.holderCount?.toString() || "Loading..."
                },
                { unsold: "500M", unlocked: "200M" },
                {
                  "m-cap": tokenInfo ? `$${formatNumber(tokenInfo.mcap)}` : "Loading...",
                  price: tokenInfo ? `$${parseFloat(tokenInfo.usdPrice).toFixed(3)}` : "Loading..."
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
                  total: stakingInfo ? formatBN(stakingInfo.totalTokensStaked) : "Loading...",
                  stakes: stakingInfo?.totalStakers?.toString() || "Loading..."
                },
                {
                  "active rewards": stakingInfo ? formatBN(stakingInfo.totalRewardGenerated) : "Loading...",
                  "earned rewards": stakingInfo ? formatBN(stakingInfo.rewardDistributed) : "Loading..."
                },
              ]}
            />
          </div>

          {/* LOCKED - 2 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label="LOCKED"
              data={[{ locked: "300M" }, { "unlocks in": "30 days" }]}
            />
          </div>

          {/* VESTING - 3 sections */}
          <div>
            <GlobalDataRow
              label="VESTING"
              data={[
                { locked: "200M" },
                { steps: "12" },
                { "next unlock": "2m/2h" },
              ]}
            />
          </div>
        </div>
      </TokanoToken>
    </div>
  );
}

export default GlobalData;
