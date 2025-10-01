"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import { TOKENS } from "../../lib/constants";
import StakingScroll from "./comps/StakingScroll";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

  return (
    <div className="xl:grid-cols-3 md:grid-cols-2 grid py-18 md:py-6 md:px-6 2xl:px-2">
      <div className="col-span-2  rounded-tr-4xl grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid gridCols="grid-cols-2" filterVariant="portfolio" />
        </div>
        <div className="col-span-4">
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
