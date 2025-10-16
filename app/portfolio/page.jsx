"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import { TOKENS } from "../../lib/constants";
import StakingScroll from "./comps/StakingScroll";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

  return (
    <div className="lg:grid-cols-3 grid py-8 lg:py-6 md:px-2 2xl:px-2">
      <div className="lg:col-span-2 w-full rounded-tr-4xl lg:grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="lg:col-span-4 mx-2 sm:mx-auto max-w-full sm:max-w-2/3 lg:max-w-full">
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
