import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Lock from "./Lock";
import RightMenu from "@/Components/RightMenu/RightMenu";

function page() {
  return (
    <div className="grid gap-2 md:px-2 lg:grid-cols-3 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-10 2xl:gap-4">
        <div className="col-span-4 max-w-120">
          <TokenGrid
            gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-2 max-w-full sm:mx-auto sm:max-w-2/3 md:mx-0 lg:col-span-6 lg:max-w-full flex justify-center md:block ">

          <div className="">
            <Lock />
          </div>
        </div>
      </div>
      <RightMenu />
    </div>
  );
}

export default page;
