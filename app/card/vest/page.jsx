"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import Vest from "./Vest";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";

function VestPageContent() {
  const searchParams = useSearchParams();
  const vestAddress = searchParams.get("vest");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { vesting } = useTokano();

  const [vestData, setVestData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVestData = useCallback(async () => {
    if (!vestAddress || !vesting) return;

    setLoading(true);
    try {
      // Fetch all vestings and find the one matching the address
      const allVestings = await vesting.fetchAllVestings();
      const data = allVestings.find(
        (v) => v.address.toBase58() === vestAddress,
      );
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

  return (
    <div className="mx-auto flex justify-center gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
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
      </div>
      <div className="max-w-xs lg:max-w-sm lg:w-full 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex justify-center gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
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
      <div className="max-w-xs lg:max-w-sm lg:w-full 2xl:max-w-md">
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
