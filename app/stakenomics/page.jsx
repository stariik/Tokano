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
