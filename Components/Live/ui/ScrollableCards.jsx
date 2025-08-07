import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import ScrollCard from "../comps/ScrollCard";

function  ScrollableCards({ cards }) {
  return (
    <div className="max-h-306 overflow-y-auto space-y-2 custom-scroll xl:px-4 px-2">
      {cards.map((item) => (
        <ScrollCard
          key={item.id}
          title={item.title}
          created={item.created}
          marketCap={item.marketCap}
          wallet={item.wallet}
        />
      ))}
    </div>
  );
}

export default ScrollableCards;
