"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { PoolState } from "tokano-sdk";
import StakingCard from "@/app/card/stake/comps/StakingCard";
import StakingModule from "@/Components/StakingCard/StakingModule";
import StakingPositionsTable from "./comps/StakingPositionsTable";
import Details from "@/Components/RightMenu/ui/Details";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";

interface PoolWithTokenInfo extends PoolState {
  tokenInfo?: any;
  stakersCount?: number;
}

function StakePageContent() {
  const searchParams = useSearchParams();
  const poolAddress = searchParams.get("pool");
  const { staking } = useTokano();
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
      const poolData = await staking
        .fetchStakePool(poolAddress)
        .catch((err) => {
          console.error("Error fetching pool:", err);
          return null;
        });

      // DEBUG: Fetch raw account data directly from the program
      try {
        const program = (staking as any).program;
        if (program) {
          const rawAccount = await program.account.poolState.fetch(poolAddress);
          console.log("🔍 DEBUG - Raw Account Data from Program:", {
            totalStakers_raw: (rawAccount as any).totalStakers,
            total_stakers_raw: (rawAccount as any).total_stakers,
            rawAccountKeys: Object.keys(rawAccount),
          });
        }
      } catch (debugErr) {
        console.error("Debug fetch error:", debugErr);
      }

      // Check if pool data is valid
      if (!poolData) {
        setError("Pool not found or invalid");
        setLoading(false);
        return;
      }

      // Fetch token info
      const tokenInfo = await fetchTokenInfo([poolData.tokenMint.toBase58()]);

      // Debug: Check totalStakers value and try different field names
      const rawPoolData = poolData as any;
      console.log("🔍 DEBUG - Pool Data:", {
        totalStakers_camel: rawPoolData.totalStakers,
        totalStakers_snake: rawPoolData.total_stakers,
        allKeys: Object.keys(rawPoolData),
        totalStakersToNumber: rawPoolData.totalStakers?.toNumber?.(),
        poolAddress: poolData.poolAddress.toBase58(),
      });

      // Try to get the correct staker count - check both snake_case and camelCase
      let stakersCount = 0;
      if (
        rawPoolData.totalStakers !== undefined &&
        rawPoolData.totalStakers !== null
      ) {
        stakersCount =
          typeof rawPoolData.totalStakers?.toNumber === "function"
            ? rawPoolData.totalStakers.toNumber()
            : Number(rawPoolData.totalStakers);
      } else if (
        rawPoolData.total_stakers !== undefined &&
        rawPoolData.total_stakers !== null
      ) {
        stakersCount =
          typeof rawPoolData.total_stakers?.toNumber === "function"
            ? rawPoolData.total_stakers.toNumber()
            : Number(rawPoolData.total_stakers);
      }

      console.log("🔍 DEBUG - Final stakersCount:", stakersCount);

      setPool({
        ...poolData,
        tokenInfo: tokenInfo[poolData.tokenMint.toBase58()],
        stakersCount,
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
      <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
          <PortfolioTokenGrid
            gridCols="grid-cols-2"
            filterTokenMint={null}
          />
        </div>
        <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
          <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
            Loading pool data...
          </div>
        </div>
        <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
          <PortfolioRightMenu />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !pool) {
    return (
      <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
          <PortfolioTokenGrid
            gridCols="grid-cols-2"
            filterTokenMint={null}
          />
        </div>
        <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
          <div className="flex items-center justify-center p-12 text-center text-[#190E79] dark:text-white">
            {error || "Pool not found. Please check the URL."}
          </div>
        </div>
        <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
          <PortfolioRightMenu />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid
          gridCols="grid-cols-2"
          filterTokenMint={pool?.tokenMint.toBase58() || null}
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
        <StakingCard pool={pool} />
        <StakingModule
          pool={pool}
          onStakeSuccess={fetchPool}
        />

        {/* Show StakingPositionsTable on desktop, Details on mobile */}
        <div>
          <StakingPositionsTable
            pool={pool}
            onRefresh={fetchPool}
          />
        </div>
      </div>
      <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

export default function StakePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
            <PortfolioTokenGrid
              gridCols="grid-cols-2"
              filterTokenMint={null}
            />
          </div>
          <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
            <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
              Loading...
            </div>
          </div>
          <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
            <PortfolioRightMenu />
          </div>
        </div>
      }
    >
      <StakePageContent />
    </Suspense>
  );
}
