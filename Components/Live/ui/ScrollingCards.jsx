import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import StakeCard from "../../Tokens/StakeCard";
import VestCard from "@/Components/Tokens/VestCard";
import LockCard from "@/Components/Tokens/LockCard";
import SoonCard from "@/Components/Tokens/SoonCard";

function ScrollingCards({ cards, stakePools = [] }) {
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
      {/* Real staking pool cards - moved to top */}
      {stakePools.map((pool, index) => {
        const tokenName = pool.tokenInfo?.name || "Unknown Token";
        const tokenSymbol = pool.tokenInfo?.symbol || "N/A";
        const title = `${tokenName} (${tokenSymbol})`;
        const created = pool.poolAddress.toBase58();
        const marketCap = pool.tokenInfo?.mcap
          ? `$${(pool.tokenInfo.mcap / 1000).toFixed(1)}K`
          : "N/A";
        const wallet = pool.poolAddress.toBase58();

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
          />
        );
      })}

      {/* Keep demo Vest and Lock cards - moved to bottom */}
      {cards.map((item) => (
        <React.Fragment key={`demo-${item.id}`}>
          <VestCard
            title={item.title}
            created={item.created}
            marketCap={item.marketCap}
            wallet={item.wallet}
          />
          <LockCard
            title={item.title}
            created={item.created}
            marketCap={item.marketCap}
            wallet={item.wallet}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ScrollingCards;
