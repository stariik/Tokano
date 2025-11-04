import React from "react";
import RightMenu from "@/Components/RightMenu/RightMenu";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Soon from "./Soon";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";

function page() {
  return (
    <div className="mx-auto flex justify-center gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:justify-between lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <TokenGrid
          gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl">
        <Soon />
      </div>
      <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

export default page;
