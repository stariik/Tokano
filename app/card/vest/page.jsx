"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import Vest from "./Vest";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";
import VestPositionsTable from "../stake/comps/VestPositionsTable";

function VestPageContent() {
  const searchParams = useSearchParams();
  const vestAddress = searchParams.get("vest");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { vesting } = useTokano();
  const { fetchTokenInfo } = useTokens();

  const [vestData, setVestData] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVestData = useCallback(async () => {
    if (!vestAddress || !vesting) return;

    setLoading(true);
    try {
      // Fetch the specific vesting by address
      const vestingAddress = new PublicKey(vestAddress);
      const data = await vesting.fetchVesting(vestingAddress);
      setVestData(data);
      console.log("Vest data fetched:", data);
    } catch (error) {
      console.error("Error fetching vest data:", error);
    } finally {
      setLoading(false);
    }
  }, [vestAddress, vesting]);

  useEffect(() => {
    fetchVestData();
  }, [fetchVestData]);

  useEffect(() => {
    const loadTokenInfo = async () => {
      if (vestData?.tokenMint) {
        const mintString = vestData.tokenMint.toBase58();
        const info = await fetchTokenInfo([mintString]);
        setTokenInfo(info[mintString]);
      }
    };
    loadTokenInfo();
  }, [vestData, fetchTokenInfo]);

  return (
    <div className="mx-auto mt-4 flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:mt-0 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid
          gridCols="grid-cols-2"
          filterTokenMint={vestData?.tokenMint.toBase58() || null}
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
            Loading vest data...
          </div>
        ) : (
          <Vest
            vestData={vestData}
            vestAddress={vestAddress}
          />
        )}
        <div>
          <VestPositionsTable
            vestState={{ tokenInfo, ...vestData }}
            onClaimed={fetchVestData}
          />
        </div>
      </div>
      <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
            <PortfolioTokenGrid
              gridCols="grid-cols-2"
              filterTokenMint={null}
            />
          </div>
          <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
            <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
              Loading...
            </div>
          </div>
          <div className="max-w-xs lg:w-full lg:max-w-sm 2xl:max-w-md">
            <PortfolioRightMenu />
          </div>
        </div>
      }
    >
      <VestPageContent />
    </Suspense>
  );
}

export default Page;
