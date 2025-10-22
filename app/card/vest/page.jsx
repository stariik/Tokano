import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Vest from "./Vest";
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
      <div className="w-3xl">
        <Vest />
      </div>
      <RightMenu />
    </div>
  );
}

export default page;
