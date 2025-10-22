import React from "react";
import ScrollingCards from "./ui/ScrollingCards";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { ImFire } from "react-icons/im";

function Live() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="dark:border-secondary mx-auto flex max-h-352 lg:max-h-332 overflow-hidden border-2 border-[#CDCDE9] lg:mx-0 xl:max-h-359 2xl:max-h-378">
      <div className="flex  w-full flex-col lg:rounded-tr-4xl">
        <div
          className={`dark:border-secondary font-khand relative flex justify-center border-b-2 border-[#CDCDE9] py-2 text-2xl font-semibold shadow-lg shadow-black/30 lg:py-4 ${
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
