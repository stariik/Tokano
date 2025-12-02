"use client";
import React, { useState, useEffect, useCallback } from "react";
import GridFilter from "./GridFilter";
import Lock from "./TokenCards/Lock";
import Vest from "./TokenCards/Vest";
import Soon from "./TokenCards/Soon";
import Stake from "./TokenCards/Stake";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { useFavorites } from "@/hooks/useFavorites";

function TokenGrid({
  hideOnMobile = true,
  filterVariant = "default",
  gridCols,
  filterTokenMint = null, // For filtering by specific token (stakenomics/pool pages)
  showAll = false, // For home page - show everything
}) {
  const [show, setShow] = useState(false);
  const [stakePools, setStakePools] = useState([]);
  const [vestings, setVestings] = useState([]);
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("time"); // time, a-z, size, price
  const [showType, setShowType] = useState("all"); // all, locks, pools, soon, vests
  const [showFavorites, setShowFavorites] = useState(false);

  const { staking, vesting, lock } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const { isFavorite } = useFavorites();
  const visibilityClass = hideOnMobile ? "hidden lg:block" : "block";

  // Swipe handlers for Meme/Token menu (left side - swipe left to close)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    // Calculate drag offset (only allow dragging left, not right)
    const offset = currentTouch - touchStart;
    if (offset < 0) {
      setDragOffset(offset);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) {
      setDragOffset(0);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    if (isLeftSwipe) {
      setShow(false);
    }
    setDragOffset(0);
  };

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
        staking.program.account.userState.all(),
      ]);

      // Count unique stakers per pool
      const stakersPerPool = {};
      allUserStakes.forEach((userStake) => {
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
        ...pools.map((p) => p.tokenMint.toBase58()),
        ...vestingData.map((v) => v.tokenMint.toBase58()),
        ...lockData.map((l) => l.tokenMint.toBase58()),
      ];
      const uniqueMints = [...new Set(allMints)];

      // Fetch token info for all mints
      const tokenInfos = await fetchTokenInfo(uniqueMints);

      const currentTime = Date.now();

      // Process staking pools - filter out ended pools
      let processedPools = pools
        .filter((pool) => pool.endTimestamp.getTime() > currentTime) // Remove ended pools
        .map((pool) => ({
          ...pool,
          type: pool.startTimestamp.getTime() > currentTime ? "soon" : "stake",
          timestamp: pool.startTimestamp.getTime(),
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
          stakersCount: stakersPerPool[pool.poolAddress.toBase58()]?.size || 0,
        }));

      // Process vestings - filter out ended vestings
      let processedVestings = vestingData
        .filter((vest) => vest.endTime.getTime() > currentTime) // Remove ended vestings
        .map((vest) => ({
          ...vest,
          type: vest.startTime.getTime() > currentTime ? "soon" : "vest",
          timestamp: vest.startTime.getTime(),
          tokenInfo: tokenInfos[vest.tokenMint.toBase58()],
        }));

      // Process locks - filter out unlocked locks
      let processedLocks = lockData
        .filter((lockItem) => lockItem.unlockTime.getTime() > currentTime) // Remove unlocked locks
        .map((lockItem) => ({
          ...lockItem,
          type: "lock",
          timestamp: lockItem.unlockTime.getTime(),
          tokenInfo: tokenInfos[lockItem.tokenMint.toBase58()],
        }));

      // Filter by token mint if specified (for stakenomics/pool pages)
      if (filterTokenMint) {
        processedPools = processedPools.filter(
          (p) => p.tokenMint.toBase58() === filterTokenMint,
        );
        processedVestings = processedVestings.filter(
          (v) => v.tokenMint.toBase58() === filterTokenMint,
        );
        processedLocks = processedLocks.filter(
          (l) => l.tokenMint.toBase58() === filterTokenMint,
        );
      }

      // Sort by timestamp (newest first)
      processedPools.sort((a, b) => b.timestamp - a.timestamp);
      processedVestings.sort((a, b) => b.timestamp - a.timestamp);
      processedLocks.sort((a, b) => b.timestamp - a.timestamp);

      setStakePools(processedPools);
      setVestings(processedVestings);
      setLocks(processedLocks);

      console.log("TokenGrid: Fetched pools:", processedPools.length);
      console.log("TokenGrid: Fetched vestings:", processedVestings.length);
      console.log("TokenGrid: Fetched locks:", processedLocks.length);
    } catch (error) {
      console.error("Error fetching TokenGrid data:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, vesting, lock, fetchTokenInfo, filterTokenMint]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (show && hideOnMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show, hideOnMobile]);

  // Combine all items for rendering
  let allItems = [
    ...stakePools.map((p) => ({ ...p, cardType: p.type })),
    ...vestings.map((v) => ({ ...v, cardType: v.type })),
    ...locks.map((l) => ({ ...l, cardType: l.type })),
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
      // Get the address based on card type
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
        // Sort by total staked/locked amount (if available)
        const sizeA = a.totalStaked?.toNumber() || a.amount?.toNumber() || 0;
        const sizeB = b.totalStaked?.toNumber() || b.amount?.toNumber() || 0;
        return sizeB - sizeA;
      case "price":
        // Sort by token price (if available in tokenInfo)
        const priceA = a.tokenInfo?.price || 0;
        const priceB = b.tokenInfo?.price || 0;
        return priceB - priceA;
      default:
        return b.timestamp - a.timestamp;
    }
  });

  const tokenContentDesktop = (
    <>
      <GridFilter
        variant={filterVariant}
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
            className={`grid gap-2 sm:gap-1 lg:gap-1 xl:gap-2 ${gridCols || "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-9"}`}
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
                  />
                );
              } else if (item.cardType === "soon") {
                return (
                  <Soon
                    key={`soon-${key || idx}`}
                    data={item}
                  />
                );
              } else if (item.cardType === "vest") {
                return (
                  <Vest
                    key={`vest-${key || idx}`}
                    data={item}
                  />
                );
              } else if (item.cardType === "lock") {
                return (
                  <Lock
                    key={`lock-${key || idx}`}
                    data={item}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </>
  );

  const tokenContentMobile = (
    <div
      className={`grid gap-2 p-2 ${gridCols || "grid-cols-1 sm:grid-cols-2"}`}
    >
      {loading ? (
        <div className="col-span-full flex items-center justify-center p-12 text-center">
          Loading tokens...
        </div>
      ) : allItems.length === 0 ? (
        <div className="col-span-full flex items-center justify-center p-12 text-center">
          No tokens found
        </div>
      ) : (
        allItems.map((item, idx) => {
          const key =
            item.cardType === "lock" || item.cardType === "vest"
              ? item.address?.toBase58()
              : item.poolAddress?.toBase58();

          if (item.cardType === "stake") {
            return (
              <Stake
                key={`stake-${key || idx}`}
                data={item}
              />
            );
          } else if (item.cardType === "soon") {
            return (
              <Soon
                key={`soon-${key || idx}`}
                data={item}
              />
            );
          } else if (item.cardType === "vest") {
            return (
              <Vest
                key={`vest-${key || idx}`}
                data={item}
              />
            );
          } else if (item.cardType === "lock") {
            return (
              <Lock
                key={`lock-${key || idx}`}
                data={item}
              />
            );
          }
          return null;
        })
      )}
    </div>
  );

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

      {/* Mobile Menu Button - only show when hideOnMobile is true */}
      {hideOnMobile && (
        <button
          onClick={() => setShow(true)}
          className={`font-khand dark:border-secondary fixed bottom-22 left-0 z-70 flex flex-col items-center justify-center rounded-r-lg border-x-1 border-r-1 border-[#CDCDE9] bg-white px-2 py-1 font-bold text-[#190E79] shadow-2xl transition-all duration-300 ease-in-out [writing-mode:vertical-rl] hover:shadow-xl lg:hidden ${
            show ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          id="tokengrid-menu-button"
          style={{ boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)" }}
        >
          MEM
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {hideOnMobile && show && (
        <div
          className="menu-overlay-active fixed inset-0 z-999 bg-black/60 lg:hidden"
          onClick={() => setShow(false)}
        />
      )}

      {/* Mobile Menu */}
      {hideOnMobile && (
        <div
          className={`fixed top-0 left-0 z-999 flex h-screen w-[95vw] max-w-md transform flex-col overflow-hidden border-r-2 border-[#292B8C] bg-[#fafafa] lg:hidden dark:bg-[#13153A] ${
            isDragging ? "" : "transition-transform duration-300 ease-in-out"
          } ${
            show
              ? "pointer-events-auto translate-x-0"
              : "pointer-events-none -translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            borderTopRightRadius: "1.5rem",
            transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
          }}
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#292B8C] bg-[#fafafa] px-3 py-2 dark:bg-[#13153A]">
            <h2 className="text-xl font-semibold">TOKENS</h2>
            {/* <button
                onClick={() => setShow(false)}
                className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 dark:text-white"
              >
                ×
              </button> */}
          </div>
          <GridFilter
            variant={filterVariant}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showType={showType}
            setShowType={setShowType}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
          <div className="custom-scrollbar flex-1 overflow-y-auto text-[#190E79] dark:text-white">
            {tokenContentMobile}
          </div>
        </div>
      )}

      {/* Desktop view - always visible based on visibilityClass */}
      <div
        className={`dark:border-secondary mx-2 h-full rounded-tr-4xl border-2 border-[#CDCDE9] bg-white dark:bg-[#13153A] ${visibilityClass}`}
      >
        {tokenContentDesktop}
      </div>
    </>
  );
}

export default TokenGrid;
