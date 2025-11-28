"use client";

import { useCallback, useEffect, useState } from "react";
import { TokenInfo, useTokens } from "@/contexts/tokens-context";
import { TOKANO_MINT_ADDRESS, TOKANO_POOL_ID } from "@/lib/constants";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { BN } from "@coral-xyz/anchor";

// Inlined TokenRow component
const TokenInfoRow = ({ label, value }) => (
  <div className="grid w-full grid-cols-2 px-2 py-1 text-xs sm:py-2 sm:text-sm md:text-base lg:text-sm xl:text-base">
    <div className="truncate font-semibold">{label}</div>
    <div className="truncate">{value}</div>
  </div>
);

// Inlined TokenTable component
const TokenInfoTable = ({ header, data }) => (
  <div>
    <div className="font-khand dark:border-secondary border-x border-[#CDCDE9]">
      <div className="border-secondary flex items-center justify-start border-b bg-[#f5f3fb] p-1.5 text-sm font-semibold text-[#464B7E] sm:p-2 sm:text-base md:text-lg lg:text-base xl:text-lg dark:bg-[#2A1C78] dark:text-white">
        <h1>{header}</h1>
      </div>
      {data.map((row) => (
        <div
          key={row.id}
          className="col-span-3 bg-[#eeeded] text-[#464B7E] dark:bg-[#120e21] dark:text-white"
        >
          <TokenInfoRow
            label={row.label}
            value={row.value}
          />
        </div>
      ))}
    </div>
  </div>
);

export default function DataTest() {
  const { fetchTokenInfo } = useTokens();
  const { staking } = useTokano();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [stakingInfo, setStakingInfo] = useState<any | null>(null);

  const tokenFetch = useCallback(async () => {
    const res = await fetchTokenInfo([TOKANO_MINT_ADDRESS]);
    return res[TOKANO_MINT_ADDRESS];
  }, [fetchTokenInfo]);

  const stakingFetch = useCallback(async () => {
    if (!tokenInfo) return null;
    const res = await staking.fetchStakePool(TOKANO_POOL_ID);
    const totalTokensStaked = res.totalTokenStaked;
    const totalTokens = tokenInfo.totalSupply;
    const totalStakers = res.totalStakers;
    const rewardDistributed = res.rewardDistributed;
    const totalRewardGenerated = res.totalRewardGenerated;

    return {
      totalTokensStaked,
      totalTokens,
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

  if (!tokenInfo) {
    return <div>Loading Token Info...</div>;
  }

  const tokenData = [
    { id: 1, label: "Supply", value: tokenInfo.totalSupply },
    { id: 2, label: "Holders", value: tokenInfo.holderCount },
    { id: 3, label: "Unsold", value: 0 },
    { id: 4, label: "Unlocked", value: 0 },
    { id: 5, label: "Market Cap (USD)", value: tokenInfo.mcap },
    { id: 6, label: "Price (USD)", value: tokenInfo.usdPrice },
  ];

  const stakingData = stakingInfo
    ? [
        {
          id: 1,
          label: "Total Tokens Staked",
          value: stakingInfo.totalTokensStaked.toString(),
        },
        { id: 2, label: "Total Tokens", value: stakingInfo.totalTokens },
        {
          id: 3,
          label: "Total Stakers",
          value: stakingInfo.totalStakers.toString(),
        },
        {
          id: 4,
          label: "Reward Distributed",
          value: stakingInfo.rewardDistributed.toString(),
        },
        {
          id: 5,
          label: "Total Reward Generated",
          value: stakingInfo.totalRewardGenerated.toString(),
        },
      ]
    : [];

  return (
    <div className="space-y-4 p-4">
      <TokenInfoTable
        header="Token Information"
        data={tokenData}
      />
      {stakingInfo ? (
        <TokenInfoTable
          header="Staking Information"
          data={stakingData}
        />
      ) : (
        <div>Loading Staking Info...</div>
      )}
    </div>
  );
}
