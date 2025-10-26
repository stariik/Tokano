"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import FundCards from "@/Components/stakenomics/FundCards";
import { TOKENS, getTokenById } from "../../lib/constants";
import RightMenu from "@/Components/RightMenu/RightMenu";
import { useBalances, BalanceLoadState } from "@/contexts/balances-context";
import { SOL_MINT } from "@/lib/balances";

function page() {
  const { tokens: walletTokens, loadState } = useBalances();
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default (for fallback)
  const [selectedWalletTokenIndex, setSelectedWalletTokenIndex] = useState(0);

  // Use real wallet tokens if available, otherwise use mock tokens
  const useWalletTokens = loadState === BalanceLoadState.LOADED && walletTokens.length > 0;

  // Filter out SOL from available tokens for fund operations
  const availableTokens = walletTokens.filter((token) => token.mintAddress !== SOL_MINT);

  const selectedTokenData = useWalletTokens && availableTokens.length > 0
    ? {
        ...availableTokens[selectedWalletTokenIndex],
        id: availableTokens[selectedWalletTokenIndex].mintAddress,
        name: availableTokens[selectedWalletTokenIndex].info?.name || "Unknown Token",
        tokenId: availableTokens[selectedWalletTokenIndex].mintAddress,
        ticker: availableTokens[selectedWalletTokenIndex].info?.symbol || "N/A",
        balance: availableTokens[selectedWalletTokenIndex].amount,
      }
    : getTokenById(selectedToken);

  return (
    <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="max-w-120">
        <TokenGrid
          gridCols="grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="w-3xl gap-4">
        <CryptoWallet />
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
