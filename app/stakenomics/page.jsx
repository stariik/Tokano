"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import FundCards from "@/Components/stakenomics/FundCards";
import { TOKENS, getTokenById } from "../../lib/constants";
import RightMenu from "@/Components/RightMenu/RightMenu";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

  const selectedTokenData = getTokenById(selectedToken);

  return (
    <div className="grid gap-2 md:px-2 lg:grid-cols-3 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-10 2xl:gap-4">
        <div className="col-span-4 max-w-120">
          <TokenGrid
            gridCols="grid-cols-2"
            filterVariant="portfolio"
          />
        </div>
        <div className="mx-2 max-w-full sm:mx-auto sm:max-w-2/3 md:mx-0 lg:col-span-6 lg:max-w-full flex justify-center md:block 2xl:flex 2xl:flex-col">
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
      <RightMenu />
    </div>
  );
}

export default page;
