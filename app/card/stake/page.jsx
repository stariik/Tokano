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
    <div className="lg:grid-cols-3 gap-2 2xl:gap-4 grid py-18 lg:py-6 md:px-2 2xl:px-2">
      <div className="lg:col-span-2 w-full rounded-tr-4xl lg:grid gap-2 2xl:gap-4 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="lg:col-span-4 mx-2 sm:mx-auto max-w-full sm:max-w-2/3 lg:max-w-full">
          <div className="">
            <StakingCard />
          </div>
          <div className="mt-4 xl:mt-6 ">
            <StakingModule />
          </div>
          {/* Show MyStaking on desktop, Details on mobile */}
          <div className="hidden lg:block text-[#190E79] dark:text-white">
            <MyStaking />
          </div>
          <div className="lg:hidden text-[#190E79] dark:text-white py-6 max-w-2xl rounded-2xl overflow-hidden lg:rounded-none">
            <Details />
          </div>
        </div>
      </div>
      <RightMenu />
    </div>
    
  );
}

export default page;
