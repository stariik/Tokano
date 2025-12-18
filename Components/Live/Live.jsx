"use client";
import React, { useEffect, useState, useCallback } from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { useWallet } from "@solana/wallet-adapter-react";

function Live() {
  const { resolvedTheme } = useTheme();
  const { publicKey } = useWallet();
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
        staking.fetchStakePools().catch((err) => {
          console.error("Error fetching stake pools:", err);
          return [];
        }),
        vesting.fetchAllVestings().catch(() => []),
        lock.fetchAllLocks().catch(() => []),
      ]);

      const stakersPerPool = {};
      if (publicKey) {
        const allUserStakes = await staking.fetchUserStakeAccounts(publicKey);
        allUserStakes.forEach((userStake) => {
          const poolAddress = userStake.poolAddress.toBase58();
          if (!stakersPerPool[poolAddress]) {
            stakersPerPool[poolAddress] = new Set();
          }
          stakersPerPool[poolAddress].add(userStake.initializerUser.toBase58());
        });
      }

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

      // Enrich and filter staking pools - only show LIVE pools (startTimestamp <= now AND endTimestamp > now)
      const enrichedPools = pools
        .map((pool) => ({
          ...pool,
          type: "pool",
          timestamp: pool.startTimestamp.getTime(),
          tokenInfo: tokenInfos[pool.tokenMint.toBase58()],
          stakersCount: stakersPerPool[pool.poolAddress.toBase58()]?.size || 0,
        }))
        .filter(
          (pool) =>
            pool.timestamp <= currentTime &&
            pool.endTimestamp.getTime() > currentTime,
        )
        .sort((a, b) => b.timestamp - a.timestamp);

      // Enrich and filter vestings - only show LIVE vestings (startTime <= now AND endTime > now)
      const enrichedVestings = vestingData
        .map((vest) => ({
          ...vest,
          type: "vest",
          timestamp: vest.startTime.getTime(),
          tokenInfo: tokenInfos[vest.tokenMint.toBase58()],
        }))
        .filter(
          (vest) =>
            vest.timestamp <= currentTime &&
            vest.endTime.getTime() > currentTime,
        )
        .sort((a, b) => b.timestamp - a.timestamp);

      // Enrich and filter locks - only show LIVE locks (not yet unlocked: unlockTime > now)
      const enrichedLocks = lockData
        .map((lockItem) => ({
          ...lockItem,
          type: "lock",
          timestamp: lockItem.unlockTime.getTime(),
          tokenInfo: tokenInfos[lockItem.tokenMint.toBase58()],
        }))
        .filter((lockItem) => lockItem.unlockTime.getTime() > currentTime)
        .sort((a, b) => b.timestamp - a.timestamp);

      // Combine all LIVE items, sort by timestamp (newest first), and limit to 20 total
      const allItems = [...enrichedPools, ...enrichedVestings, ...enrichedLocks]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20);

      // Separate back into their types
      const limitedPools = allItems.filter((item) => item.type === "pool");
      const limitedVestings = allItems.filter((item) => item.type === "vest");
      const limitedLocks = allItems.filter((item) => item.type === "lock");

      setStakePools(limitedPools);
      setVestings(limitedVestings);
      setLocks(limitedLocks);

      console.log("Fetched staking pools:", enrichedPools);
      console.log("Fetched vestings:", enrichedVestings);
      console.log("Fetched locks:", enrichedLocks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [staking, vesting, lock, fetchTokenInfo, publicKey]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="dark:border-secondary dark:bg-dark mx-auto flex max-h-352 overflow-hidden rounded-tr-4xl border-2 border-[#CDCDE9] bg-white lg:mx-0 lg:max-h-332 xl:max-h-359 2xl:max-h-378">
      <div className="flex w-full flex-col lg:rounded-tr-4xl">
        <div
          className={`dark:border-secondary font-khand relative z-10 flex justify-center border-b-2 border-[#CDCDE9] py-2 text-2xl font-semibold shadow-lg shadow-black/30 lg:py-4 ${
            resolvedTheme === "dark"
              ? "bg-gradient-to-r from-[#140110] to-[#8C0773]"
              : "bg-gradient-to-r from-[#FFFFFF] to-[#F6C8FF] text-[#9C004B]"
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
