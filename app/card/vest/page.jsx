"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTokano } from "@/contexts/tokano-sdk-context";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Vest from "./Vest";
import RightMenu from "@/Components/RightMenu/RightMenu";

function Page() {
  const searchParams = useSearchParams();
  const vestAddress = searchParams.get("pool");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { vesting } = useTokano();

  const [vestData, setVestData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVestData = useCallback(async () => {
    if (!vestAddress || !vesting) return;

    setLoading(true);
    try {
      const vestPubkey = new PublicKey(vestAddress);
      const data = await vesting.fetchVestingAccount(vestPubkey);
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
    <div className="mx-auto flex justify-between gap-4 sm:max-w-lg md:max-w-full md:px-2 lg:py-6 2xl:gap-4 2xl:px-2">
      <div className="max-w-120">
        <TokenGrid
          gridCols="grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          filterVariant="portfolio"
        />
      </div>
      <div className="w-3xl">
        {loading ? (
          <div className="p-8 text-center">Loading vest data...</div>
        ) : (
          <Vest vestData={vestData} vestAddress={vestAddress} />
        )}
      </div>
      <RightMenu />
    </div>
  );
}

export default Page;
