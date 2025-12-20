"use client";

import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { transactionListener } from "@/lib/balances";

interface VestPositionsTableProps {
  vestState?: any; // expected to include tokenInfo and vest fields
  onClaimed?: () => void;
}

const VestPositionsTable: React.FC<VestPositionsTableProps> = ({
  vestState,
  onClaimed,
}) => {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { vesting } = useTokano();
  const [claimOpen, setClaimOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formatTokenAmount = (amount: any, decimals = 9) => {
    const value = parseFloat((amount ?? 0).toString()) / Math.pow(10, decimals);
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const getTimeRemaining = (releaseTime: Date) => {
    if (!releaseTime) return "-";
    const now = Date.now();
    const releaseTimeMs =
      typeof releaseTime === "number" ? releaseTime : releaseTime.getTime();
    const diff = releaseTimeMs - now;

    if (diff <= 0) return "UNLOCKED";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes}m`;
    }
  };

  const pageState = vestState;
  const tokenInfo = pageState?.tokenInfo;
  const decimals = tokenInfo?.decimals ?? 9;

  const belongsToUser =
    !!publicKey && pageState
      ? (() => {
          try {
            const pk = publicKey.toBase58();
            const receiver =
              pageState.receiverUser?.toBase58?.() || pageState.receiverUser;
            const initializer =
              pageState.initializerUser?.toBase58?.() ||
              pageState.initializerUser;
            return pk === receiver || pk === initializer;
          } catch (e) {
            return false;
          }
        })()
      : false;

  return (
    <div>
      <div className="font-khand dark:border-secondary mt-6 overflow-hidden rounded-4xl border-2 border-[#CDCDE9]">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-medium dark:text-white">
            My active Vesting
          </h2>
          <span className="text-2xl font-bold dark:text-white">
            {tokenInfo?.symbol ?? "TOKEN"}
          </span>
        </div>

        <div className="dark:border-secondary border-y border-[#CDCDE9] bg-[#E7E6FF] dark:bg-[#2A1C78]">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-6 py-2"></th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  vested amount
                </th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  vesting period
                </th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  claimable
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div className={`custom-scrollbar relative h-100 overflow-y-scroll`}>
          {!publicKey ? (
            <div className="flex h-full items-center justify-center">
              <p className="dark:text-white">
                Connect wallet to view positions
              </p>
            </div>
          ) : !pageState ? (
            <div className="flex h-full items-center justify-center">
              <p className="dark:text-white">No position data available</p>
            </div>
          ) : !belongsToUser ? (
            <div className="flex h-full items-center justify-center">
              <p className="dark:text-white">
                This account does not belong to your connected wallet
              </p>
            </div>
          ) : (
            <table className="h-full w-full">
              <tbody className="h-full text-center">
                <tr
                  onClick={() => {
                    if (!belongsToUser) return;
                    const claimable = pageState?.currentlyClaimableAmount ?? 0;
                    if (Number(claimable) > 0) setClaimOpen(true);
                  }}
                  className={`${belongsToUser && Number(pageState?.currentlyClaimableAmount ?? 0) > 0 ? "cursor-pointer hover:bg-[#CDCDE9] dark:hover:bg-[#220052]" : ""}`}
                  title={belongsToUser ? "Click to claim" : undefined}
                >
                  <td className="items w-1/29 justify-center border-r border-[#CDCDE9] py-4 text-sm dark:border-[#6D6FDF] dark:text-white">
                    1.
                  </td>
                  <td className="w-2/7 border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap dark:border-[#6D6FDF] dark:text-white">
                    {formatTokenAmount(
                      pageState.totalVestedAmount ?? 0,
                      decimals,
                    )}
                  </td>
                  <td className="w-2/7 border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap dark:border-[#6D6FDF] dark:text-purple-300">
                    {getTimeRemaining(pageState.endTime)}
                  </td>
                  <td className="w-2/7 px-6 py-4 text-base whitespace-nowrap dark:text-white">
                    {formatTokenAmount(
                      pageState.currentlyClaimableAmount ?? 0,
                      decimals,
                    )}
                  </td>
                </tr>
                <tr className="h-full">
                  <td className="w-6 border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td className="w-1/3 border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td className="w-1/3 border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td className="w-1/3"></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="dark:border-secondary border-t border-[#CDCDE9] px-6 py-3 text-center text-sm dark:bg-[#0A0520] dark:text-white">
          This table shows the vesting attached to this page if it belongs to
          your connected wallet.
        </div>
      </div>

      {/* Claim popup overlay (inline handler copied from ClaimVesting) */}
      {claimOpen && pageState && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="dark:border-secondary rounded-2xl border-2 border-[#CDCDE9] bg-[#2A1C78] px-8 py-6">
            <p className="mb-4 text-lg text-white">Claim vested funds?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  if (!publicKey || !vesting || !signTransaction) {
                    alert(
                      "Please connect your wallet and ensure the vesting program is initialized.",
                    );
                    return;
                  }
                  try {
                    setProcessing(true);
                    const tx: Transaction = await vesting.withdraw({
                      vestingAddress: pageState.address,
                    });

                    const { blockhash } = await connection.getLatestBlockhash();
                    tx.recentBlockhash = blockhash;
                    tx.feePayer = publicKey;

                    const signedTx = await signTransaction(tx);
                    const txId = await connection.sendRawTransaction(
                      signedTx.serialize(),
                    );

                    transactionListener(connection, txId, (completed) => {
                      setProcessing(false);
                      setClaimOpen(false);
                      if (completed) {
                        alert("Vesting claim completed");
                      } else {
                        alert("Vesting claim failed");
                      }
                      onClaimed?.();
                    });
                  } catch (err) {
                    setProcessing(false);
                    console.error("Error generating transaction:", err);
                    alert(`Error: ${err?.message ?? err}`);
                  }
                }}
                disabled={processing}
                className="rounded-lg px-6 py-2 text-white"
                style={{ backgroundColor: "#6D6FDF" }}
              >
                {processing ? "Processing..." : "Yes"}
              </button>
              <button
                onClick={() => setClaimOpen(false)}
                disabled={processing}
                className="rounded-lg border-2 px-6 py-2 text-white"
                style={{
                  borderColor: "#6D6FDF",
                  backgroundColor: "transparent",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VestPositionsTable;
