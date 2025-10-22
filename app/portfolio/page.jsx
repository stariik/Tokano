"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import { TOKENS } from "../../lib/constants";
import StakingScroll from "./comps/StakingScroll";
import RightMenu from "@/Components/RightMenu/RightMenu";

function page() {
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default

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

        <StakingScroll />
      </div>
      <RightMenu />
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
