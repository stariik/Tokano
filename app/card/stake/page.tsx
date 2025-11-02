"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { PoolState } from "tokano-sdk";
import TokenGrid from "@/Components/Memes/TokenGrid";
import StakingCard from "@/app/card/stake/comps/StakingCard";
import StakingModule from "@/Components/StakingCard/StakingModule";
import MyStaking from "./comps/MyStaking";
import Details from "@/Components/RightMenu/ui/Details";
import RightMenu from "@/Components/RightMenu/RightMenu";

interface PoolWithTokenInfo extends PoolState {
  tokenInfo?: any;
}

function StakePageContent() {
  const searchParams = useSearchParams();
  const poolAddress = searchParams.get("pool");
  const { staking } = useTokano();
  const { publicKey } = useWallet();
  const { fetchTokenInfo } = useTokens();

  const [pool, setPool] = useState<PoolWithTokenInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pool data
  const fetchPool = useCallback(async () => {
    if (!staking || !poolAddress) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch the specific pool
      const poolData = await staking.fetchStakePool(poolAddress);

      // Fetch token info
      const tokenInfo = await fetchTokenInfo([poolData.tokenMint.toBase58()]);

      setPool({
        ...poolData,
        tokenInfo: tokenInfo[poolData.tokenMint.toBase58()],
      });
    } catch (err) {
      console.error("Error fetching pool:", err);
      setError("Failed to load pool data");
    } finally {
      setLoading(false);
    }
  }, [staking, poolAddress, fetchTokenInfo]);

  useEffect(() => {
    fetchPool();
  }, [fetchPool]);

  // Show loading state
  if (loading) {
    return (
      <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
        <div className="max-w-120">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="w-3xl gap-4">
          <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
            Loading pool data...
          </div>
        </div>
        <div className="relative max-w-120">
          <RightMenu />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !pool) {
    return (
      <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
        <div className="max-w-120">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="w-3xl gap-4">
          <div className="flex items-center justify-center p-12 text-center text-[#190E79] dark:text-white">
            {error || "Pool not found. Please check the URL."}
          </div>
        </div>
        <div className="relative max-w-120">
          <RightMenu />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="max-w-120">
        <TokenGrid
          gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          filterVariant="portfolio"
          filterTokenMint={pool?.tokenMint?.toBase58() || null}
        />
      </div>
      <div className="w-3xl gap-4">
        <StakingCard pool={pool} />
        <StakingModule
          pool={pool}
          onStakeSuccess={fetchPool}
        />

        {/* Show MyStaking on desktop, Details on mobile */}
        <div className="hidden text-[#190E79] lg:block dark:text-white">
          <MyStaking pool={pool} />
        </div>
        <div className="max-w-2xl overflow-hidden rounded-2xl py-6 text-[#190E79] lg:hidden lg:rounded-none dark:text-white">
          <Details />
        </div>
      </div>
      <div className="relative max-w-120">
        <RightMenu />
      </div>
    </div>
  );
}

export default function StakePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
          <div className="max-w-120">
            <TokenGrid
              gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              filterVariant="portfolio"
            />
          </div>
          <div className="w-3xl gap-4">
            <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
              Loading...
            </div>
          </div>
          <div className="relative max-w-120">
            <RightMenu />
          </div>
        </div>
      }
    >
      <StakePageContent />
    </Suspense>
  );
}
