import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import SoonCard from "@/Components/Tokens/SoonCard";

function ScrollingSoonCards({ stakePools = [], vestings = [], locks = [], isMobile = false }) {
  // Helper to shorten addresses
  const shortenAddress = (address) => {
    if (!address || address.length < 12) return address;
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
  };

  const containerClass = isMobile
    ? "space-y-2 px-2"
    : "custom-scroll flex-1 min-h-0 space-y-2 overflow-y-auto px-2 xl:px-4";

  return (
    <div className={containerClass}>
      {/* Show message if no upcoming pools */}
      {stakePools.length === 0 && vestings.length === 0 && locks.length === 0 && (
        <div className="flex items-center justify-center p-8 text-center text-gray-500">
          No upcoming launches at the moment
        </div>
      )}

      {/* Upcoming staking pool cards */}
      {stakePools.map((pool, index) => {
        const tokenName = pool.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = pool.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const poolId = shortenAddress(pool.poolAddress.toBase58());
        const tokenId = shortenAddress(pool.tokenMint.toBase58());

        return (
          <SoonCard
            key={`pool-${pool.poolAddress.toBase58()}`}
            id={index + 1}
            title={title}
            poolId={poolId}
            tokenId={tokenId}
            launchTimestamp={pool.timestamp}
            tokenImage={pool.tokenInfo?.image || "/image.png"}
            poolType="STAKE"
            fullAddress={pool.poolAddress.toBase58()}
          />
        );
      })}

      {/* Upcoming vesting cards */}
      {vestings.map((vest, index) => {
        const tokenName = vest.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = vest.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const poolId = shortenAddress(vest.address.toBase58());
        const tokenId = shortenAddress(vest.tokenMint.toBase58());

        return (
          <SoonCard
            key={`vest-${vest.address.toBase58()}`}
            id={stakePools.length + index + 1}
            title={title}
            poolId={poolId}
            tokenId={tokenId}
            launchTimestamp={vest.timestamp}
            tokenImage={vest.tokenInfo?.image || "/image.png"}
            poolType="VEST"
            fullAddress={vest.address.toBase58()}
          />
        );
      })}

      {/* Locks are not shown in "Launching Soon" as they are created immediately */}
    </div>
  );
}

export default ScrollingSoonCards;
