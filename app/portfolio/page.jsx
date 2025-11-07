"use client";
import { React, useState } from "react";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import StakingScroll from "./comps/StakingScroll";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";

function page() {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

  return (
    <div className="mx-auto flex justify-center gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:justify-between lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid gridCols="grid-cols-2" />
      </div>
      <div className="grow gap-4 md:max-w-3xl">
        <CryptoWallet
          selectedTokenIndex={selectedTokenIndex}
          onTokenSelect={setSelectedTokenIndex}
        />

        <StakingScroll selectedTokenIndex={selectedTokenIndex} />
      </div>
      <div className="max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

export default page;

// <div className="mx-auto grid gap-4 sm:max-w-lg md:max-w-full md:grid-cols-2 md:px-2 lg:grid-cols-3 lg:gap-2 lg:py-6 2xl:gap-4 2xl:px-2">
//   <div className="w-full gap-2 rounded-tr-4xl lg:col-span-2 lg:grid lg:grid-cols-10 2xl:flex 2xl:gap-4">
//     <div className="col-span-4 max-w-120">
//       <TokenGrid
//         gridCols="grid-cols-2"
//         filterVariant="portfolio"
//       />
//     </div>
//     <div className="mx-2 flex max-w-full flex-col justify-center sm:mx-auto md:mx-0 md:block lg:col-span-6 lg:max-w-full 2xl:max-w-3xl">
//       <div className="">
//         <CryptoWallet
//           selectedToken={selectedToken}
//           setSelectedToken={setSelectedToken}
//           tokens={TOKENS}
//         />
//       </div>
//       <div className="mt-4">
//         <StakingScroll />
//       </div>
//     </div>
//   </div>
//   <RightMenu />
// </div>
