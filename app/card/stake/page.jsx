"use client";

import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import StakingCard from "@/app/card/stake/comps/StakingCard";
import StakingModule from "@/Components/StakingCard/StakingModule";
import MyStaking from "./comps/MyStaking";
import Details from "@/Components/RightMenu/ui/Details";
import RightMenu from "@/Components/RightMenu/RightMenu";

function page() {
  return (
    <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="max-w-120">
        <TokenGrid
          gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="w-3xl gap-4">
        <StakingCard />
        <StakingModule />

        {/* Show MyStaking on desktop, Details on mobile */}
        <div className="hidden text-[#190E79] lg:block dark:text-white">
          <MyStaking />
        </div>
        <div className="max-w-2xl overflow-hidden rounded-2xl py-6 text-[#190E79] lg:hidden lg:rounded-none dark:text-white">
          <Details />
        </div>
      </div>
      <RightMenu />
    </div>
  );
}

export default page;
