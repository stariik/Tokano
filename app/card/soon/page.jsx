import React, { Suspense } from "react";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import Soon from "./Soon";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";

function page() {
  return (
    <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid
          gridCols="grid-cols-2"
          filterTokenMint={null}
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
              Loading...
            </div>
          }
        >
          <Soon />
        </Suspense>
      </div>
      <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

export default page;
