import React from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";

function Live() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mx-auto lg:mx-0">
      <div className="border-2 border-[#CDCDE9] dark:border-secondary lg:rounded-tr-4xl overflow-hidden h-full">
        <div
          className={`border-b-2 border-[#CDCDE9] dark:border-secondary  flex justify-center py-2 lg:py-4 text-2xl font-khand font-semibold shadow-lg shadow-black/30 relative ${
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
