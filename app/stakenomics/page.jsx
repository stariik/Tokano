"use client";
import { React, useState } from "react";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import CryptoWallet from "@/Components/stakenomics/CryptoWallet";
import FundCards from "@/Components/stakenomics/FundCards";
import { TOKENS, getTokenById } from "../../lib/constants";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";
import { useBalances, BalanceLoadState } from "@/contexts/balances-context";
import { SOL_MINT } from "@/lib/balances";

function page() {
  const { tokens: walletTokens, loadState } = useBalances();
  const [selectedToken, setSelectedToken] = useState(3); // LIMASIRA is selected by default (for fallback)
  const [selectedWalletTokenIndex, setSelectedWalletTokenIndex] = useState(0);

  // Use real wallet tokens if available, otherwise use mock tokens
  const useWalletTokens =
    loadState === BalanceLoadState.LOADED && walletTokens.length > 0;

  // Filter out SOL from available tokens for fund operations
  const availableTokens = walletTokens.filter(
    (token) => token.mintAddress !== SOL_MINT,
  );

  const selectedTokenData =
    useWalletTokens && availableTokens.length > 0
      ? {
          ...availableTokens[selectedWalletTokenIndex],
          id: availableTokens[selectedWalletTokenIndex].mintAddress,
          name:
            availableTokens[selectedWalletTokenIndex].info?.name ||
            "Unknown Token",
          tokenId: availableTokens[selectedWalletTokenIndex].mintAddress,
          ticker:
            availableTokens[selectedWalletTokenIndex].info?.symbol || "N/A",
          balance: availableTokens[selectedWalletTokenIndex].amount,
        }
      : getTokenById(selectedToken);

  return (
    <div className="mx-auto flex justify-center lg:justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid
          gridCols="grid-cols-2"
          filterTokenMint={selectedTokenData?.tokenId || null}
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl lg:max-w-xl">
        <CryptoWallet
          selectedTokenIndex={selectedWalletTokenIndex}
          onTokenSelect={setSelectedWalletTokenIndex}
        />
        <FundCards
          selectedToken={selectedToken}
          selectedTokenData={selectedTokenData}
        />
      </div>
      <div className="max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

export default page;
