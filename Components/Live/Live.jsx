"use client";
import React, { useEffect, useState, useCallback } from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";

function Live() {
  const { resolvedTheme } = useTheme();
  const { staking, vesting, lock } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const [stakePools, setStakePools] = useState([]);
  const [vestings, setVestings] = useState([]);
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    if (!staking || !vesting || !lock) return;

    setLoading(true);
    try {
      // Fetch all data in parallel
      const [pools, vestingData, lockData] = await Promise.all([
        staking.fetchStakePools(),
        vesting.fetchAllVestings(),
        lock.fetchAllLocks(),
      ]);

      // Collect all unique token mints
      const allMints = [
        ...pools.map((p) => p.tokenMint.toBase58()),
        ...vestingData.map((v) => v.tokenMint.toBase58()),
        ...lockData.map((l) => l.tokenMint.toBase58()),
      ];
      const uniqueMints = [...new Set(allMints)];

      // Fetch token info for all mints
      const tokenInfos = await fetchTokenInfo(uniqueMints);

      // Enrich and sort staking pools by start timestamp (newest first)
      const enrichedPools = pools
        .map((pool) => ({
          ...pool,
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
        }))
        .sort((a, b) => b.startTimestamp.getTime() - a.startTimestamp.getTime());

      // Enrich and sort vestings by start time (newest first)
      const enrichedVestings = vestingData
        .map((vest) => ({
          ...vest,
          tokenInfo: tokenInfos[vest.tokenMint.toBase58()],
        }))
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

      // Enrich and sort locks by unlock time (newest first)
      const enrichedLocks = lockData
        .map((lockItem) => ({
          ...lockItem,
          tokenInfo: tokenInfos[lockItem.tokenMint.toBase58()],
        }))
        .sort((a, b) => b.unlockTime.getTime() - a.unlockTime.getTime());

      setStakePools(enrichedPools);
      setVestings(enrichedVestings);
      setLocks(enrichedLocks);

      console.log("Fetched staking pools:", enrichedPools);
      console.log("Fetched vestings:", enrichedVestings);
      console.log("Fetched locks:", enrichedLocks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, vesting, lock, fetchTokenInfo]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="dark:border-secondary mx-auto flex max-h-352 lg:max-h-332 overflow-hidden border-2 border-[#CDCDE9] lg:mx-0 xl:max-h-359 2xl:max-h-378">
      <div className="flex  w-full flex-col lg:rounded-tr-4xl">
        <div
          className={`dark:border-secondary font-khand relative flex justify-center border-b-2 border-[#CDCDE9] py-2 text-2xl font-semibold shadow-lg shadow-black/30 lg:py-4 ${
            resolvedTheme === "dark"
              ? "dark-custom-header2-gradient"
              : "custom-header2-gradient text-[#9C004B]"
          }`}
        >
          <h1 className="flex gap-2">
            <ImFire /> | LIVE |
          </h1>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-8 text-center">
            Loading live data...
          </div>
        ) : (
          <ScrollingCards
            stakePools={stakePools}
            vestings={vestings}
            locks={locks}
          />
        )}
      </div>
    </div>
  );
}

export default Live;
