"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import PortfolioTokenGrid from "@/Components/Memes/PortfolioTokenGrid";
import Lock from "./Lock";
import PortfolioRightMenu from "@/Components/RightMenu/PortfolioRightMenu";
import StakingPositionsTable from "../stake/comps/StakingPositionsTable";

function LockPageContent() {
  const searchParams = useSearchParams();
  const lockAddress = searchParams.get("lock");
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { lock } = useTokano();
  const { fetchTokenInfo } = useTokens();

  const [lockData, setLockData] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLockData = useCallback(async () => {
    if (!lockAddress || !lock) return;

    setLoading(true);
    try {
      // Fetch the specific lock by address
      const lockPubkey = new PublicKey(lockAddress);
      const data = await lock.fetchLock(lockPubkey);
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

  useEffect(() => {
    const loadTokenInfo = async () => {
      if (lockData?.tokenMint) {
        const mintString = lockData.tokenMint.toBase58();
        const info = await fetchTokenInfo([mintString]);
        setTokenInfo(info[mintString]);
      }
    };
    loadTokenInfo();
  }, [lockData, fetchTokenInfo]);

  return (
    <div className="mx-auto flex max-w-lg justify-center gap-4 md:max-w-full md:px-2 lg:justify-between xl:justify-between xl:py-6 2xl:gap-4 2xl:px-2">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md">
        <PortfolioTokenGrid
          gridCols="grid-cols-2"
          filterTokenMint={lockData?.tokenMint.toBase58() || null}
        />
      </div>
      <div className="grow gap-4 md:max-w-3xl lg:max-w-2xl">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-[#190E79] dark:text-white">
            Loading lock data...
          </div>
        ) : (
          <Lock
            lockData={lockData}
            lockAddress={lockAddress}
          />
        )}
        <div>
          <StakingPositionsTable pool={{ tokenInfo }} />
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
      <LockPageContent />
    </Suspense>
  );
}

export default Page;
