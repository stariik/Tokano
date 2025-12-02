"use client";

import { useCallback, useEffect, useState } from "react";
import { TokenInfo, useTokens } from "@/contexts/tokens-context";
import {
  TOKANO_LOCK_ADDRESS,
  TOKANO_MINT_ADDRESS,
  TOKANO_POOL_ID,
  TOKANO_PUMP_LIQUIDITY_POOL_ADDRESS,
  TOKANO_VESTING_ADDRESS,
} from "@/lib/constants";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { BN } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { LockState, VestingState } from "tokano-sdk";
import { TokenBalanceT } from "@/lib/balances";

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
  const { connection } = useConnection();
  const { fetchTokenInfo } = useTokens();
  const { staking, vesting, lock } = useTokano();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [stakingInfo, setStakingInfo] = useState<any | null>(null);
  const [vestingInfo, setVestingInfo] = useState<VestingState | null>(null);
  const [lockInfo, setLockInfo] = useState<LockState | null>(null);
  const [unsoldTokenBalance, setUnsoldTokenBalance] =
    useState<TokenBalanceT | null>(null);

  const fetchUnsoldTokens = useCallback(async () => {
    const balances = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(TOKANO_PUMP_LIQUIDITY_POOL_ADDRESS),
      {
        mint: new PublicKey(TOKANO_MINT_ADDRESS),
      },
    );
    const result: TokenBalanceT = balances.value.map((value) => {
      return {
        mintAddress: value.account.data.parsed.info.mint,
        decimals: value.account.data.parsed.info.tokenAmount.decimals,
        amount: value.account.data.parsed.info.tokenAmount.uiAmountString,
        amountRaw: Number.parseInt(
          value.account.data.parsed.info.tokenAmount.amount,
        ),
      };
    })[0];

    if (!result) return;
    setUnsoldTokenBalance(result);
  }, [connection]);

  const fetchLock = useCallback(async () => {
    const allLocks = await lock.fetchAllLocks();
    const result = allLocks.find(
      (l) => l.address.toBase58() === TOKANO_LOCK_ADDRESS,
    );
    if (!result) return;
    setLockInfo(result);
  }, [lock]);

  const fetchVest = useCallback(async () => {
    const allVestings = await vesting.fetchAllVestings();
    const result = allVestings.find(
      (v) => v.address.toBase58() === TOKANO_VESTING_ADDRESS,
    );
    if (!result) return;
    setVestingInfo(result);
  }, [vesting]);

  const tokenFetch = useCallback(async () => {
    const res = await fetchTokenInfo([TOKANO_MINT_ADDRESS]);
    if (!res[TOKANO_MINT_ADDRESS]) return;
    setTokenInfo(res[TOKANO_MINT_ADDRESS]);
  }, [fetchTokenInfo]);

  const stakingFetch = useCallback(async () => {
    if (!tokenInfo) return null;
    const res = await staking.fetchStakePool(TOKANO_POOL_ID);
    const totalTokensStaked = res.totalTokenStaked;
    const totalTokens = tokenInfo.totalSupply;
    const totalStakers = res.totalStakers;
    const rewardDistributed = res.rewardDistributed;

    // Calculate total reward generated from rewardRate and time period
    const periodInSeconds = new BN(
      Math.floor(
        (res.endTimestamp.getTime() - res.startTimestamp.getTime()) / 1000,
      ),
    );
    const totalRewardGenerated = res.rewardRate.mul(periodInSeconds);

    const result = {
      totalTokensStaked,
      totalTokens,
      totalStakers,
      rewardDistributed,
      totalRewardGenerated,
    };

    setStakingInfo(result);
  }, [staking, tokenInfo]);

  useEffect(() => {
    console.log("Fetching");
    Promise.allSettled([
      tokenFetch(),
      stakingFetch(),
      fetchVest(),
      fetchLock(),
      fetchUnsoldTokens(),
    ])
      .then(() => console.log("All data fetched"))
      .catch((e) => console.error(e));
  }, [fetchLock, fetchUnsoldTokens, fetchVest, stakingFetch, tokenFetch]);

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
