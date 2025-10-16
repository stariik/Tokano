import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Vest from "./Vest";

function page() {
  return (
    <div className="lg:grid-cols-3 grid py-18 lg:py-6 md:px-6 2xl:px-2">
      <div className="lg:col-span-2 w-full rounded-tr-4xl lg:grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="lg:col-span-4 mx-auto lg:mx-0 max-w-full sm:max-w-2/3 lg:max-w-full">
          <div className="">
            <Vest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
