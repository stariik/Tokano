import { tokens } from "@/data/data";
import React from "react";
import TokenCard from "@/Components/Memes/TokenCard";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Soon from "./Soon";

function page() {
  return (
    <div className="grid py-18 md:px-6 lg:grid-cols-3 lg:py-6 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-7 2xl:gap-8">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-2 max-w-full sm:mx-auto sm:max-w-2/3 lg:col-span-4 lg:max-w-full">
          <div className="">
            <Soon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
