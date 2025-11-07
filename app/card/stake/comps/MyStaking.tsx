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
  const { publicKey, sendTransaction } = useWallet();
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
    isLocked: false,
    remainingTime: "",
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleUnstake = async (positionId: string) => {
    try {
      if (!publicKey || !staking || !connection) return;

      const position = transformedPositions.find((p) => p.id === positionId);
      if (!position || !position.rawStake) return;

      setProcessing(true);
      setError(null);

      // Use SDK withdraw method to unstake all
      const tx = await staking.withdraw({
        walletPk: publicKey,
        poolAddress: position.rawStake.poolAddress,
        accountAddress: position.rawStake.accountAddress,
        amount: position.rawStake.amountStaked.toString(),
      });

      // Set recent blockhash and fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction
      const signature = await sendTransaction(tx, connection);

      await connection.confirmTransaction(signature, "confirmed");

      setSuccess("Successfully unstaked tokens!");
      await fetchUserStakingPositions();

      setTimeout(() => setSuccess(null), 5000);
    } catch (error: any) {
      console.error("Error unstaking:", error);
      setError(error?.message || "Failed to unstake tokens");
      setTimeout(() => setError(null), 5000);
    } finally {
      setProcessing(false);
      setPopup({ show: false, type: "", positionId: null, isLocked: false, remainingTime: "" });
    }
  };

  const handleClaim = async (positionId: string) => {
    try {
      if (!publicKey || !staking || !connection) return;

      const position = transformedPositions.find((p) => p.id === positionId);
      if (!position || !position.rawStake) return;

      setProcessing(true);
      setError(null);

      // Use SDK getReward method
      const tx = await staking.getReward({
        walletPk: publicKey,
        poolAddress: position.rawStake.poolAddress,
        accountAddress: position.rawStake.accountAddress,
      });

      // Set recent blockhash and fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction
      const signature = await sendTransaction(tx, connection);

      await connection.confirmTransaction(signature, "confirmed");

      setSuccess("Successfully claimed rewards!");
      await fetchUserStakingPositions();

      setTimeout(() => setSuccess(null), 5000);
    } catch (error: any) {
      console.error("Error claiming rewards:", error);
      setError(error?.message || "Failed to claim rewards");
      setTimeout(() => setError(null), 5000);
    } finally {
      setProcessing(false);
      setPopup({ show: false, type: "", positionId: null, isLocked: false, remainingTime: "" });
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

  // Format numbers with K and M
  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else if (num < 1 && num > 0) {
      // For small decimal numbers, use toFixed to avoid scientific notation
      return num.toFixed(6).replace(/\.?0+$/, '');
    } else {
      return num.toString();
    }
  };

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

    // Calculate time units
    const monthsUntilRelease = Math.floor(
      timeUntilRelease / (1000 * 60 * 60 * 24 * 30),
    );
    const daysUntilRelease = Math.floor(
      (timeUntilRelease % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
    );
    const hoursUntilRelease = Math.floor(
      (timeUntilRelease % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesUntilRelease = Math.floor(
      (timeUntilRelease % (1000 * 60 * 60)) / (1000 * 60),
    );

    // Build period string based on available time
    let periodString = "";
    if (timeUntilRelease > 0) {
      const parts = [];
      if (monthsUntilRelease > 0) parts.push(`${monthsUntilRelease}mo`);
      if (daysUntilRelease > 0) parts.push(`${daysUntilRelease}d`);
      if (hoursUntilRelease > 0) parts.push(`${hoursUntilRelease}h`);
      if (minutesUntilRelease > 0 && monthsUntilRelease === 0) parts.push(`${minutesUntilRelease}m`);

      periodString = parts.length > 0
        ? `Locked for ${parts.slice(0, 2).join(' ')}`
        : "Locked";
    } else {
      periodString = "Unlocked";
    }

    return {
      id: stake.accountAddress?.toBase58() || `stake-${index}`,
      staked: formatNumber(stakedAmount),
      period: periodString,
      rewards: formatNumber(rewardAmount),
      rewardsSub: "", // Skip for now as requested
      unlockTime: releaseTime,
      isLocked: timeUntilRelease > 0,
      remainingTime: periodString,
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

      {/* Success/Error Messages */}
      {(success || error) && (
        <div className="px-4 py-2">
          {success && (
            <p className="text-center text-sm font-semibold text-green-600 dark:text-green-400">
              ✓ {success}
            </p>
          )}
          {error && (
            <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
              ✗ {error}
            </p>
          )}
        </div>
      )}

      {/* Two Side-by-Side Tables */}
      <div className="relative">
        {rpcLimitError ? (
          <div className="flex flex-col items-center justify-center px-4 py-8">
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
            onUnstake={handleUnstake}
            onClaim={handleClaim}
            processing={processing}
          />
        )}

        {/* History Button */}
        {/* <div className="dark:border-secondary relative z-10 mb-2 border-y-1 border-[#CDCDE9] bg-[#f5f3fb] px-4 py-1 text-center dark:bg-[#2A1C78]">
          <button className="font-semibold text-[#190E79] dark:text-white">
            ▼ History
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default MyStaking;
