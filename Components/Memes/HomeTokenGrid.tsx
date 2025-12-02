"use client";
import React, { useState, useEffect, useCallback } from "react";
import Lock from "./TokenCards/Lock";
import GridFilter from "./GridFilter";
import Vest from "./TokenCards/Vest";
import Soon from "./TokenCards/Soon";
import Stake from "./TokenCards/Stake";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { useFavorites } from "@/hooks/useFavorites";

interface HomeTokenGridProps {
  gridCols?: string;
}

interface TokenInfo {
  name?: string;
  symbol?: string;
  price?: number;
}

interface BaseItem {
  tokenMint: any;
  timestamp: number;
  tokenInfo?: TokenInfo;
  cardType: "stake" | "soon" | "vest" | "lock";
  address?: any;
  poolAddress?: any;
  totalStaked?: any;
  amount?: any;
}

function HomeTokenGrid({
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9",
}: HomeTokenGridProps) {
  const [stakePools, setStakePools] = useState<any[]>([]);
  const [vestings, setVestings] = useState<any[]>([]);
  const [locks, setLocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("time");
  const [showType, setShowType] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);

  const { staking, vesting, lock } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const { isFavorite } = useFavorites();

  // Fetch all blockchain data
  const fetchAllData = useCallback(async () => {
    if (!staking || !vesting || !lock) return;

    setLoading(true);
    try {
      // Fetch all data in parallel
      const [pools, vestingData, lockData, allUserStakes] = await Promise.all([
        staking.fetchStakePools(),
        vesting.fetchAllVestings(),
        lock.fetchAllLocks(),
        (staking as any).program.account.userState.all(),
      ]);

      // Count unique stakers per pool
      const stakersPerPool: Record<string, Set<string>> = {};
      allUserStakes.forEach((userStake: any) => {
        const poolAddress = userStake.account.poolAddress.toBase58();
        if (!stakersPerPool[poolAddress]) {
          stakersPerPool[poolAddress] = new Set();
        }
        stakersPerPool[poolAddress].add(
          userStake.account.stakerUser.toBase58()
        );
      });

      // Collect all unique token mints
      const allMints = [
        ...pools.map((p: any) => p.tokenMint.toBase58()),
        ...vestingData.map((v: any) => v.tokenMint.toBase58()),
        ...lockData.map((l: any) => l.tokenMint.toBase58()),
      ];
      const uniqueMints = [...new Set(allMints)];

      // Fetch token info for all mints
      const tokenInfos = await fetchTokenInfo(uniqueMints);

      const currentTime = Date.now();

      // Process staking pools - filter out ended pools
      const processedPools = pools
        .filter((pool: any) => pool.endTimestamp.getTime() > currentTime)
        .map((pool: any) => ({
          ...pool,
          type: pool.startTimestamp.getTime() > currentTime ? "soon" : "stake",
          timestamp: pool.startTimestamp.getTime(),
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
          stakersCount: stakersPerPool[pool.poolAddress.toBase58()]?.size || 0,
        }));

      // Process vestings - filter out ended vestings
      const processedVestings = vestingData
        .filter((vest: any) => vest.endTime.getTime() > currentTime)
        .map((vest: any) => ({
          ...vest,
          type: vest.startTime.getTime() > currentTime ? "soon" : "vest",
          timestamp: vest.startTime.getTime(),
          tokenInfo: tokenInfos[vest.tokenMint.toBase58()],
        }));

      // Process locks - filter out unlocked locks
      const processedLocks = lockData
        .filter((lockItem: any) => lockItem.unlockTime.getTime() > currentTime)
        .map((lockItem: any) => ({
          ...lockItem,
          type: "lock",
          timestamp: lockItem.unlockTime.getTime(),
          tokenInfo: tokenInfos[lockItem.tokenMint.toBase58()],
        }));

      // Sort by timestamp (newest first)
      processedPools.sort((a: any, b: any) => b.timestamp - a.timestamp);
      processedVestings.sort((a: any, b: any) => b.timestamp - a.timestamp);
      processedLocks.sort((a: any, b: any) => b.timestamp - a.timestamp);

      setStakePools(processedPools);
      setVestings(processedVestings);
      setLocks(processedLocks);

      console.log("HomeTokenGrid: Fetched pools:", processedPools.length);
      console.log("HomeTokenGrid: Fetched vestings:", processedVestings.length);
      console.log("HomeTokenGrid: Fetched locks:", processedLocks.length);
    } catch (error) {
      console.error("Error fetching HomeTokenGrid data:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, vesting, lock, fetchTokenInfo]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Combine all items for rendering
  let allItems: BaseItem[] = [
    ...stakePools.map((p) => ({ ...p, cardType: p.type as "stake" | "soon" })),
    ...vestings.map((v) => ({ ...v, cardType: v.type as "vest" | "soon" })),
    ...locks.map((l) => ({ ...l, cardType: "lock" as const })),
  ];

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    allItems = allItems.filter((item) => {
      const tokenName = item.tokenInfo?.name?.toLowerCase() || "";
      const tokenSymbol = item.tokenInfo?.symbol?.toLowerCase() || "";
      const tokenMint = item.tokenMint?.toBase58().toLowerCase() || "";
      return (
        tokenName.includes(query) ||
        tokenSymbol.includes(query) ||
        tokenMint.includes(query)
      );
    });
  }

  // Apply show type filter
  if (showType !== "all") {
    allItems = allItems.filter((item) => {
      if (showType === "stake") return item.cardType === "stake";
      if (showType === "vests") return item.cardType === "vest";
      if (showType === "locks") return item.cardType === "lock";
      if (showType === "soon") return item.cardType === "soon";
      return item.cardType === showType;
    });
  }

  // Apply favorites filter
  if (showFavorites) {
    allItems = allItems.filter((item) => {
      let address = "";
      let type = "";

      if (item.cardType === "lock") {
        address = item.address?.toBase58() || "";
        type = "lock";
      } else if (item.cardType === "vest") {
        address = item.address?.toBase58() || "";
        type = "vest";
      } else if (item.cardType === "stake" || item.cardType === "soon") {
        address = item.poolAddress?.toBase58() || "";
        type = "stake";
      }

      return address && isFavorite(type, address);
    });
  }

  // Apply sorting
  allItems.sort((a, b) => {
    switch (sortBy) {
      case "time":
        return b.timestamp - a.timestamp;
      case "a-z":
        const nameA = a.tokenInfo?.name?.toLowerCase() || "";
        const nameB = b.tokenInfo?.name?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      case "size":
        const sizeA = a.totalStaked?.toNumber() || a.amount?.toNumber() || 0;
        const sizeB = b.totalStaked?.toNumber() || b.amount?.toNumber() || 0;
        return sizeB - sizeA;
      case "price":
        const priceA = a.tokenInfo?.price || 0;
        const priceB = b.tokenInfo?.price || 0;
        return priceB - priceA;
      default:
        return b.timestamp - a.timestamp;
    }
  });

  return (
    <>
      <style
        jsx
        global
      >{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6 !important;
          border-radius: 2px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed !important;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none !important;
        }
        .custom-scrollbar {
          scrollbar-width: thin !important;
          scrollbar-color: #8b5cf6 transparent !important;
        }
      `}</style>

      {/* Simple visible container for home page */}
      <div className="dark:border-secondary h-full w-full rounded-tr-4xl border-2 border-[#CDCDE9] bg-white md:mx-2 dark:bg-[#1B1E31]">
        <GridFilter
          variant="default"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showType={showType}
          setShowType={setShowType}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
        <div
          className="custom-scrollbar m-2 max-h-200 overflow-y-auto text-[#190E79] sm:m-3 lg:m-2 xl:m-3 xl:max-h-200 2xl:max-h-220 dark:text-white"
          style={{ minHeight: "400px" }}
        >
          {loading ? (
            <div className="flex items-center justify-center p-12 text-center">
              Loading tokens...
            </div>
          ) : allItems.length === 0 ? (
            <div className="flex items-center justify-center p-12 text-center">
              No tokens found
            </div>
          ) : (
            <div
              className={`grid gap-2 sm:gap-1 lg:gap-1 xl:gap-2 ${gridCols}`}
            >
              {allItems.map((item, idx) => {
                const key =
                  item.cardType === "lock" || item.cardType === "vest"
                    ? item.address?.toBase58()
                    : item.poolAddress?.toBase58();

                if (item.cardType === "stake") {
                  return (
                    <Stake
                      key={`stake-${key || idx}`}
                      data={item}
                      token={undefined}
                    />
                  );
                } else if (item.cardType === "soon") {
                  return (
                    <Soon
                      key={`soon-${key || idx}`}
                      data={item}
                      token={undefined}
                    />
                  );
                } else if (item.cardType === "vest") {
                  return (
                    <Vest
                      key={`vest-${key || idx}`}
                      data={item}
                      token={undefined}
                    />
                  );
                } else if (item.cardType === "lock") {
                  return (
                    <Lock
                      key={`lock-${key || idx}`}
                      data={item}
                      token={undefined}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeTokenGrid;
