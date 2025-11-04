"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import TokenGrid from "@/Components/Memes/TokenGrid";
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
    <div className="mx-auto flex justify-center gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:justify-between lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <TokenGrid
          gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl">
        {loading ? (
          <div className="p-8 text-center">Loading vest data...</div>
        ) : (
          <Vest
            vestData={vestData}
            vestAddress={vestAddress}
          />
        )}
      </div>
      <div className="lg:w-full lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
        <PortfolioRightMenu />
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VestPageContent />
    </Suspense>
  );
}

export default Page;
