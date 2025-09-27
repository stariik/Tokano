import React from "react";
import { Khand } from "next/font/google";
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";

function Live() {
  return (
    <div>
      <div className="border-l-2 border-secondary">
        <div
          className={`border-b-2 border-secondary flex justify-center py-2 lg:py-4 text-2xl ${khandMedium.className} custom-header2-gradient rounded-tr-4xl shadow-lg shadow-black/30 z-10 relative`}
        >
          <h1>LIVE</h1>
        </div>
        <ScrollingCards cards={cardData} />
      </div>
    </div>
  );
}

export default Live;
