import { tokens } from "@/data/data";
import React from "react";
import TokenCard from "@/Components/Memes/TokenCard";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Soon from "./Soon";

function page() {
  return (
    <div className="lg:grid-cols-3 grid py-18 lg:py-6 md:px-6 2xl:px-2">
      <div className="lg:col-span-2 w-full rounded-tr-4xl lg:grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="lg:col-span-4 mx-2 sm:mx-auto max-w-full sm:max-w-2/3 lg:max-w-full">
          <div className="">
            <Soon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
