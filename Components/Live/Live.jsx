import React from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";

function Live() {
  const { resolvedTheme } = useTheme();

  return (
    <div>
      <div className="border-l-2 border-secondary">
        <div
          className={`border-b-2 border-secondary flex justify-center py-2 lg:py-4 text-2xl font-khand font-semibold rounded-tr-4xl shadow-lg shadow-black/30 relative ${
            resolvedTheme === "dark"
              ? "dark-custom-header2-gradient"
              : "custom-header2-gradient text-[#9C004B]"
          }`}
        >
          <h1 className="flex gap-2"><ImFire/> | LIVE |</h1>
        </div>
        <ScrollingCards cards={cardData} />
      </div>
    </div>
  );
}

export default Live;
