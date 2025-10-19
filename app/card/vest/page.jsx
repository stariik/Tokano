import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Vest from "./Vest";
import RightMenu from "@/Components/RightMenu/RightMenu";

function page() {
  return (
    <div className="grid gap-2 py-18 md:px-2 2xl:gap-4 lg:grid-cols-3 lg:py-6 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-7 2xl:gap-4">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-auto max-w-full sm:max-w-2/3 lg:col-span-4 lg:mx-0 lg:max-w-full">
          <div className="">
            <Vest />
          </div>
        </div>
      </div>
      <RightMenu />
    </div>
  );
}

export default page;
