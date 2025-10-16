"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import FundCards from "@/Components/stakenomics/FundCards";
import { TOKENS, getTokenById } from "../../lib/constants";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

  const selectedTokenData = getTokenById(selectedToken);

  return (
    <div className="lg:grid-cols-3 grid py-2 lg:py-6 md:px-6 2xl:px-2">
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
          <div>
            <FundCards
              selectedToken={selectedToken}
              selectedTokenData={selectedTokenData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
