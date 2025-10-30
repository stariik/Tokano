"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import TokenGrid from "@/Components/Memes/TokenGrid";
import Lock from "./Lock";
import RightMenu from "@/Components/RightMenu/RightMenu";

function LockPageContent() {
  const searchParams = useSearchParams();
  const lockAddress = searchParams.get("lock");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { lock } = useTokano();

  const [lockData, setLockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLockData = useCallback(async () => {
    if (!lockAddress || !lock) return;

    setLoading(true);
    try {
      // Fetch all locks and find the one matching the address
      const allLocks = await lock.fetchAllLocks();
      const data = allLocks.find((l) => l.address.toBase58() === lockAddress);
      setLockData(data);
      console.log("Lock data fetched:", data);
    } catch (error) {
      console.error("Error fetching lock data:", error);
    } finally {
      setLoading(false);
    }
  }, [lockAddress, lock]);

  useEffect(() => {
    fetchLockData();
  }, [fetchLockData]);

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
          <div className="p-8 text-center">Loading lock data...</div>
        ) : (
          <Lock
            lockData={lockData}
            lockAddress={lockAddress}
          />
        )}
      </div>
      <div className="relative max-w-120">
        <RightMenu />
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LockPageContent />
    </Suspense>
  );
}

export default Page;
