'use client';

import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import StakingCard from "@/app/card/stake/comps/StakingCard";
import StakingModule from "@/Components/StakingCard/StakingModule";
import MyStaking from "./comps/MyStaking";
import Details from "@/Components/RightMenu/ui/Details";

function page() {
  return (
    <div className="xl:grid-cols-3 md:grid-cols-2 grid py-18 md:py-6 md:px-6 2xl:px-2">
      <div className="col-span-2  rounded-tr-4xl grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid gridCols="grid-cols-2" filterVariant="portfolio" />
        </div>
        <div className="col-span-4">
          <div className="">
            <StakingCard />
          </div>
          <div className="mt-8">
            <StakingModule />
          </div>
          {/* Show MyStaking on desktop, Details on mobile */}
          <div className="hidden md:block text-white">
            <MyStaking />
          </div>
          <div className="md:hidden text-white py-6">
            <Details />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
