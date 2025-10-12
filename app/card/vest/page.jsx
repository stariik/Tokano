import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Vest from "./Vest";

function page() {
  return (
    <div className="grid py-18 md:grid-cols-2 md:px-6 md:py-6 xl:grid-cols-3 2xl:px-2">
      <div className="col-span-2 grid gap-2 rounded-tr-4xl lg:grid-cols-7 2xl:gap-8">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="col-span-4">
          <div className="">
            <Vest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
