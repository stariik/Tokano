"use client";
import React, { useEffect, useState, useCallback } from "react";
import ScrollingSoonCards from "../Live/ui/ScrollingSoonCards";
import SoonCard from "@/Components/Tokens/SoonCard";
import { useTheme } from "@/hooks/useTheme";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";

function LaunchingSoon({ isMobile = false }) {
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

      const currentTime = Date.now();

      // Enrich and filter staking pools - only show UPCOMING pools (startTimestamp > now)
      const enrichedPools = pools
        .map((pool) => ({
          ...pool,
          type: "pool",
          timestamp: pool.startTimestamp.getTime(),
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
        }))
        .filter((pool) => pool.timestamp > currentTime)
        .sort((a, b) => a.timestamp - b.timestamp); // Sort by soonest first

      // Enrich and filter vestings - only show UPCOMING vestings (startTime > now)
      const enrichedVestings = vestingData
        .map((vest) => ({
          ...vest,
          type: "vest",
          timestamp: vest.startTime.getTime(),
          tokenInfo: tokenInfos[vest.tokenMint.toBase58()],
        }))
        .filter((vest) => vest.timestamp > currentTime)
        .sort((a, b) => a.timestamp - b.timestamp); // Sort by soonest first

      // Locks don't have a start time, they are created and locked immediately
      // So we don't show them in "Launching Soon"

      // Combine all UPCOMING items, sort by timestamp (soonest first), and limit to 20 total
      const allItems = [...enrichedPools, ...enrichedVestings]
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 20);

      // Separate back into their types
      const limitedPools = allItems.filter((item) => item.type === "pool");
      const limitedVestings = allItems.filter((item) => item.type === "vest");

      setStakePools(limitedPools);
      setVestings(limitedVestings);
      setLocks([]); // No locks in launching soon

      console.log("Fetched upcoming staking pools:", enrichedPools);
      console.log("Fetched upcoming vestings:", enrichedVestings);
    } catch (error) {
      console.error("Error fetching upcoming data:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, vesting, lock, fetchTokenInfo]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (isMobile) {
    return (
      <div className="dark:border-secondary border-[#CDCDE9]">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-center">
            Loading upcoming pools...
          </div>
        ) : (
          <ScrollingSoonCards
            stakePools={stakePools}
            vestings={vestings}
            locks={locks}
            isMobile={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className="dark:border-secondary dark:bg-dark hidden max-h-332 overflow-hidden border-2 border-[#CDCDE9] bg-white xl:flex xl:max-h-359 xl:flex-col 2xl:max-h-378 2xl:max-w-[620px]">
      <div
        className={`dark:border-secondary font-khand relative z-10 flex justify-center border-b-2 border-[#CDCDE9] py-4 text-2xl font-semibold shadow-lg shadow-black/30 ${
          resolvedTheme === "dark"
            ? "bg-gradient-to-r from-[#050047] to-[#4530B5]"
            : "text-primary bg-gradient-to-r from-[#FDFDFD] to-[#E4DEFF]"
        }`}
      >
        <h1>| Launching Soon |</h1>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-8 text-center">
          Loading upcoming pools...
        </div>
      ) : (
        <ScrollingSoonCards
          stakePools={stakePools}
          vestings={vestings}
          locks={locks}
        />
      )}
    </div>
  );
}

export default LaunchingSoon;
