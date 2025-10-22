"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import { TOKENS } from "../../lib/constants";
import StakingScroll from "./comps/StakingScroll";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

  return (
    <div className="grid py-2 md:px-6 lg:grid-cols-3 lg:py-6 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-7 2xl:gap-8">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-2 max-w-full sm:mx-auto sm:max-w-2/3 lg:col-span-4 lg:mx-0 lg:max-w-full">
          <div className="">
            <CryptoWallet
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              tokens={TOKENS}
            />
          </div>
          <div className="mt-4">
            <StakingScroll />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
