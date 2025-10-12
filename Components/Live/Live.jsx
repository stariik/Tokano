import React from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";

function Live() {
  const { resolvedTheme } = useTheme();

  return (
    <div>
      <div className="border-secondary border-l-2">
        <div
          className={`border-secondary font-khand relative flex justify-center rounded-tr-4xl border-b-2 py-2 text-2xl font-semibold shadow-lg shadow-black/30 lg:py-4 ${
            resolvedTheme === "dark"
              ? "dark-custom-header2-gradient"
              : "custom-header2-gradient text-[#9C004B]"
          }`}
        >
          <h1 className="flex gap-2">
            <ImFire /> | LIVE |
          </h1>
        </div>
        <ScrollingCards cards={cardData} />
      </div>
    </div>
  );
}

export default Live;
