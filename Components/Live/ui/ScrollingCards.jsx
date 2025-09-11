import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import StakeCard from "../../Tokens/StakeCard";
import VestCard from "@/Components/Tokens/VestCard";
import LockCard from "@/Components/Tokens/LockCard";
import SoonCard from "@/Components/Tokens/SoonCard";

function ScrollingCards({ cards }) {
  return (
    <div className="max-h-306 overflow-y-auto space-y-2 custom-scroll xl:px-4 px-2">
      {cards.map((item) => (
        <React.Fragment key={item.id}>
          <VestCard
            title={item.title}
            created={item.created}
            marketCap={item.marketCap}
            wallet={item.wallet}
          />
          <StakeCard
            title={item.title}
            created={item.created}
            marketCap={item.marketCap}
            wallet={item.wallet}
          />
          <SoonCard />
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
