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
  const { staking } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const [stakePools, setStakePools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStakingPools = useCallback(async () => {
    if (!staking) return;

    setLoading(true);
    try {
      const pools = await staking.fetchStakePools();

      // Fetch token info for all pools
      const mints = pools.map((p) => p.tokenMint.toBase58());
      const tokenInfos = await fetchTokenInfo(mints);

      // Enrich pools with token info and sort by start timestamp (newest first)
      const enrichedPools = pools
        .map((pool) => ({
          ...pool,
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
        }))
        .sort((a, b) => b.startTimestamp.getTime() - a.startTimestamp.getTime());

      setStakePools(enrichedPools);
      console.log("Fetched staking pools:", enrichedPools);
    } catch (error) {
      console.error("Error fetching staking pools:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, fetchTokenInfo]);

  useEffect(() => {
    fetchStakingPools();
  }, [fetchStakingPools]);

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
            Loading live pools...
          </div>
        ) : (
          <ScrollingCards cards={cardData} stakePools={stakePools} />
        )}
      </div>
    </div>
  );
}

export default Live;
