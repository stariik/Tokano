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
    <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="max-w-120">
        <TokenGrid
          gridCols="grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="w-3xl gap-4">
        <CryptoWallet
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          tokens={TOKENS}
        />
        <FundCards
          selectedToken={selectedToken}
          selectedTokenData={selectedTokenData}
        />
      </div>
      <RightMenu />
    </div>
  );
}

export default page;

// <div className="mx-auto grid gap-4 sm:max-w-lg md:max-w-full md:grid-cols-2 md:px-2 lg:grid-cols-3 lg:gap-2 lg:py-6 2xl:gap-4 2xl:px-2">
//   <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-10 2xl:gap-4">
//     <div className="col-span-4 max-w-120">
//       <TokenGrid
//         gridCols="grid-cols-2"
//         filterVariant="portfolio"
//       />
//     </div>
//     <div className="mx-2 flex max-w-full flex-col justify-center sm:mx-auto md:mx-0 md:block lg:col-span-6 lg:max-w-full">
//       <div className="">
//         <CryptoWallet
//           selectedToken={selectedToken}
//           setSelectedToken={setSelectedToken}
//           tokens={TOKENS}
//         />
//       </div>
//       <div>
//         <FundCards
//           selectedToken={selectedToken}
//           selectedTokenData={selectedTokenData}
//         />
//       </div>
//     </div>
//   </div>
//   <RightMenu />
// </div>
