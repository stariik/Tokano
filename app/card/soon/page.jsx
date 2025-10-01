import { tokens } from "@/data/data";
import React from "react";
import TokenCard from "@/Components/Memes/TokenCard";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Soon from "./Soon";

function page() {
  return (
    <div className="xl:grid-cols-3 md:grid-cols-2 grid py-18 md:py-6 md:px-6 2xl:px-2">
      <div className="col-span-2  rounded-tr-4xl grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid gridCols="grid-cols-2" />
        </div>
        <div className="col-span-4">
          <div className="">
            <Soon />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default page;
