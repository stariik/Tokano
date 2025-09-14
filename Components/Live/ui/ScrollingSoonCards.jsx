import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import SoonCard from "@/Components/Tokens/SoonCard";

function ScrollingCards({ cards }) {
  return (
    <div className="max-h-306 overflow-y-auto space-y-2 custom-scroll xl:px-4 px-2">
      {cards.map((item) => (
        <SoonCard key={item.id} />
      ))}
    </div>
  );
}

export default ScrollingCards;
