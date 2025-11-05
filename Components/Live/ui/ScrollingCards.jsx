import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import StakeCard from "../../Tokens/StakeCard";
import VestCard from "@/Components/Tokens/VestCard";
import LockCard from "@/Components/Tokens/LockCard";

function ScrollingCards({ stakePools = [], vestings = [], locks = [] }) {
  // Format timestamp to DD.MM.YY/HH:MM
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}/${hours}:${minutes}`;
  };

  return (
    <div className="custom-scroll flex-1 min-h-0 space-y-2 overflow-y-auto px-2 xl:px-4">
      {/* Real staking pool cards */}
      {stakePools.map((pool, index) => {
        const tokenName = pool.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = pool.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const created = pool.poolAddress.toBase58();
        const marketCap = pool.tokenInfo?.mcap
          ? `$${(pool.tokenInfo.mcap / 1000).toFixed(1)}K`
          : "N/A";
        const wallet = pool.poolAddress.toBase58();
        const tokenImage = pool.tokenInfo?.icon || null;

        return (
          <StakeCard
            key={`pool-${pool.poolAddress.toBase58()}`}
            id={index + 1}
            title={title}
            created={created}
            marketCap={marketCap}
            wallet={wallet}
            poolAddress={pool.poolAddress.toBase58()}
            variant="live"
            stakeTimestamp={formatTimestamp(pool.startTimestamp)}
            stakersCount={0}
            poolEndTimestamp={pool.endTimestamp.getTime() / 1000}
            poolData={pool}
            tokenImage={tokenImage}
          />
        );
      })}

      {/* Real vesting cards */}
      {vestings.map((vest, index) => {
        const tokenName = vest.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = vest.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const created = vest.address.toBase58();
        const marketCap = vest.tokenInfo?.mcap
          ? `$${(vest.tokenInfo.mcap / 1000).toFixed(1)}K`
          : "N/A";
        const wallet = vest.address.toBase58();
        const tokenDecimals = vest.tokenInfo?.decimals || 9;
        const tokenImage = vest.tokenInfo?.icon || null;

        return (
          <VestCard
            key={`vest-${vest.address.toBase58()}`}
            title={title}
            created={created}
            marketCap={marketCap}
            wallet={wallet}
            variant="live"
            vestTimestamp={formatTimestamp(vest.startTime)}
            vestEndTimestamp={formatTimestamp(vest.endTime)}
            vestData={vest}
            tokenDecimals={tokenDecimals}
            tokenImage={tokenImage}
          />
        );
      })}

      {/* Real lock cards */}
      {locks.map((lockItem, index) => {
        const tokenName = lockItem.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = lockItem.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const created = lockItem.address.toBase58();
        const marketCap = lockItem.tokenInfo?.mcap
          ? `$${(lockItem.tokenInfo.mcap / 1000).toFixed(1)}K`
          : "N/A";
        const wallet = lockItem.address.toBase58();
        const tokenDecimals = lockItem.tokenInfo?.decimals || 9;
        const tokenImage = lockItem.tokenInfo?.icon || null;

        return (
          <LockCard
            key={`lock-${lockItem.address.toBase58()}`}
            title={title}
            created={created}
            marketCap={marketCap}
            wallet={wallet}
            variant="live"
            lockTimestamp={formatTimestamp(lockItem.unlockTime)}
            lockData={lockItem}
            tokenDecimals={tokenDecimals}
            tokenImage={tokenImage}
          />
        );
      })}
    </div>
  );
}

export default ScrollingCards;
