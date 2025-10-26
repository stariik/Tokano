"use client";
import { useState, useRef, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTokano } from "@/contexts/tokano-sdk-context";
import UnifiedStakingTables from "./UnifiedStakingTables";

interface MyStakingProps {
  pool?: any;
}

function MyStaking({ pool }: MyStakingProps) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();
  const [stakingPositions, setStakingPositions] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "staked" | "unstaked">("all");
  const [loading, setLoading] = useState(false);
  const [rpcLimitError, setRpcLimitError] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    positionId: null,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch user's staking positions for this pool
  useEffect(() => {
    if (publicKey && pool) {
      fetchUserStakingPositions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, pool]);

  const fetchUserStakingPositions = async () => {
    try {
      if (!publicKey || !pool?.poolAddress || !staking) return;

      setLoading(true);

      // Fetch all user stake accounts with batching to avoid RPC limits
      let allStakes: any[] = [];
      try {
        allStakes = await staking.fetchUserStakeAccounts(publicKey);
      } catch (error: any) {
        // If we hit RPC limits, try fetching individually or with smaller batches
        if (
          error?.message?.includes("getMultipleAccounts is limited") ||
          error?.code === -32615
        ) {
          console.warn("RPC limit hit");
          setRpcLimitError(true);
          allStakes = [];
        } else {
          throw error;
        }
      }

      // Ensure pool.poolAddress is a PublicKey
      const poolAddress =
        pool.poolAddress instanceof PublicKey
          ? pool.poolAddress
          : new PublicKey(pool.poolAddress);

      // Filter stakes for this specific pool
      const poolStakes = allStakes.filter((stake: any) =>
        stake.poolAddress.equals(poolAddress),
      );

      setStakingPositions(poolStakes);
    } catch (error) {
      console.error("Error fetching staking positions:", error);
      setStakingPositions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollSnap = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const itemHeight = itemRefs.current[0]?.offsetHeight || 0;

    if (itemHeight === 0) return;

    const currentIndex = Math.round(scrollTop / itemHeight);
    const targetScrollTop = currentIndex * itemHeight;

    if (Math.abs(scrollTop - targetScrollTop) > 5) {
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Handle snap with timeout
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollSnap, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Transform stake data to match UnifiedStakingTables format
  const transformedPositions = stakingPositions.map((stake, index) => {
    const decimals = pool?.tokenInfo?.decimals || 9;
    const stakedAmount = stake.amountStaked
      ? stake.amountStaked.toNumber() / Math.pow(10, decimals)
      : 0;
    const rewardAmount = stake.approximateReward
      ? stake.approximateReward.toNumber() / Math.pow(10, decimals)
      : 0;

    // Calculate time period
    const releaseTime = stake.releaseTime
      ? new Date(stake.releaseTime.getTime())
      : null;
    const now = new Date();
    const timeUntilRelease = releaseTime
      ? Math.max(0, releaseTime.getTime() - now.getTime())
      : 0;
    const daysUntilRelease = Math.floor(timeUntilRelease / (1000 * 60 * 60 * 24));
    const hoursUntilRelease = Math.floor(
      (timeUntilRelease % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    return {
      id: stake.accountAddress?.toBase58() || `stake-${index}`,
      staked: stakedAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      period:
        daysUntilRelease > 0
          ? `${daysUntilRelease}d ${hoursUntilRelease}h`
          : "Unlocked",
      rewards: rewardAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      unlockTime: releaseTime,
      rawStake: stake, // Keep raw stake data for operations
    };
  });

  // Filter positions based on selected filter
  const filteredPositions = transformedPositions.filter((position) => {
    if (filter === "all") return true;
    // Check if stake is active (not fully withdrawn)
    const isStaked =
      position.rawStake.amountStaked &&
      position.rawStake.amountStaked.toNumber() > 0;
    if (filter === "staked") return isStaked;
    if (filter === "unstaked") return !isStaked;
    return true;
  });

  return (
    <div className="font-khand dark:border-secondary mt-6 rounded-2xl border-2 border-[#CDCDE9] text-[#190E79] dark:text-white">
      <div className="flex items-center justify-between gap-8 rounded-t-2xl bg-gradient-to-r px-4 py-3 lg:text-base xl:text-lg dark:from-[#2f01ba] dark:to-[#0C0D1C]">
        <div className="flex w-full justify-between">
          <h2 className="font-medium">My Staking </h2>
          <h2 className="font-bold">{pool?.tokenInfo?.symbol || "FIRED"}</h2>
        </div>
        <div className="flex w-full">
          <h2 className="px-auto ml-2 font-medium">show:</h2>
          <h2 className="border-r-1 font-medium">
            <div
              className={`cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300 ${filter === "all" ? "font-bold" : ""}`}
              onClick={() => setFilter("all")}
            >
              all
            </div>
          </h2>
          <h2 className="border-r-1 font-medium">
            <div
              className={`cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300 ${filter === "staked" ? "font-bold" : ""}`}
              onClick={() => setFilter("staked")}
            >
              staked
            </div>
          </h2>
          <h2 className="font-medium">
            <div
              className={`cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300 ${filter === "unstaked" ? "font-bold" : ""}`}
              onClick={() => setFilter("unstaked")}
            >
              unstaked
            </div>
          </h2>
        </div>
      </div>

      {/* Two Side-by-Side Tables */}
      <div className="relative">
        {rpcLimitError ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="mb-2 text-center text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              ⚠️ RPC Limit Reached
            </p>
            <p className="text-center text-xs">
              Your RPC provider limits the number of accounts that can be
              fetched. Please upgrade your QuickNode plan or use a different RPC
              provider.
            </p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm">Loading staking positions...</p>
          </div>
        ) : filteredPositions.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm">
              {publicKey
                ? "No staking positions found for this pool"
                : "Connect your wallet to view staking positions"}
            </p>
          </div>
        ) : (
          <UnifiedStakingTables
            data={filteredPositions}
            popup={popup}
            setPopup={setPopup}
            scrollRef={scrollContainerRef}
            itemRefs={itemRefs}
          />
        )}

        {/* History Button */}
        <div className="dark:border-secondary relative z-10 mb-2 border-y-1 border-[#CDCDE9] bg-[#f5f3fb] px-4 py-1 text-center dark:bg-[#2A1C78]">
          <button className="font-semibold text-[#190E79] dark:text-white">
            ▼ History
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyStaking;
