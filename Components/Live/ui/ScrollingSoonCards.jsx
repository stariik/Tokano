import React from "react";
import "@/Components/Live/styles/scrollbar.css";
import SoonCard from "@/Components/Tokens/SoonCard";

function ScrollingCards({ cards }) {
  return (
    <div className="custom-scroll space-y-2 overflow-y-auto px-2 xl:px-4 ">
      {cards.map((item) => (
        <SoonCard key={item.id} />
      ))}
    </div>
  );
}

export default ScrollingCards;
