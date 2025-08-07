import React from "react";
import { Khand } from "next/font/google";
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });
import ScrollableCards from "./ui/ScrollableCards";
import { cardData } from "@/data/data";

function Live() {
  return (
    <div>
      <div className="border-x-2 border-b-2 border-secondary rounded-r-4xl">
        <div
          className={` flex justify-center py-4 text-2xl ${khandMedium.className} custom-header2-gradient rounded-tr-4xl border-y-2 border-secondary shadow-lg shadow-black/30 z-10 relative`}
        >
          <h1>LIVE</h1>
        </div>
        <ScrollableCards cards={cardData} />
      </div>
    </div>
  );
}

export default Live;
