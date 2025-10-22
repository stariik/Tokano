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
    <div className="grid gap-2 py-18 md:px-2 lg:grid-cols-3 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-7 2xl:gap-4">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-2 max-w-full sm:mx-auto sm:max-w-2/3 lg:col-span-4 lg:max-w-full">
          <div className="">
            <StakingCard />
          </div>
          <div className="mt-4 xl:mt-6">
            <StakingModule />
          </div>
          {/* Show MyStaking on desktop, Details on mobile */}
          <div className="hidden text-[#190E79] lg:block dark:text-white">
            <MyStaking />
          </div>
          <div className="max-w-2xl overflow-hidden rounded-2xl py-6 text-[#190E79] lg:hidden lg:rounded-none dark:text-white">
            <Details />
          </div>
        </div>
      </div>
      <RightMenu />
    </div>
  );
}

export default page;
