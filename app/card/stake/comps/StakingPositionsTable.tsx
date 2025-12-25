"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { UserState, PoolState } from "tokano-sdk";
import { transactionListener } from "@/lib/balances";

interface PoolWithTokenInfo extends PoolState {
  tokenInfo?: any;
}

interface StakingPositionsTableProps {
  pool?: PoolWithTokenInfo;
  onRefresh?: () => void;
}

type PopupType = "unstake" | "claim" | null;

const StakingPositionsTable: React.FC<StakingPositionsTableProps> = ({
  pool,
  onRefresh,
}) => {
  const { staking } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const [activePopup, setActivePopup] = useState<{
    type: PopupType;
    index: number;
  } | null>(null);
  const [userPositions, setUserPositions] = useState<UserState[]>([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch user positions for this pool
  const fetchUserPositions = useCallback(async () => {
    if (!staking || !pool || !publicKey) {
      setUserPositions([]);
      return;
    }

    try {
      setLoading(true);
      const positions = await staking
        .fetchUserStakeAccountsForPool(publicKey, pool.poolAddress)
        .catch((err) => {
          console.error("Error fetching user stake accounts for pool:", err);
          return [];
        });
      setUserPositions(positions);
    } catch (error) {
      console.error("Error fetching user positions:", error);
      setUserPositions([]);
    } finally {
      setLoading(false);
    }
  }, [staking, pool, publicKey]);

  useEffect(() => {
    fetchUserPositions();
  }, [fetchUserPositions]);

  const handleUnstake = (index: number) => {
    setActivePopup({ type: "unstake", index });
  };

  const handleClaim = (index: number) => {
    setActivePopup({ type: "claim", index });
  };

  const handleConfirm = async () => {
    if (!activePopup || !publicKey || !pool || !signTransaction) return;

    const position = userPositions[activePopup.index];
    if (!position) return;

    setProcessing(true);

    try {
      let tx;
      if (activePopup.type === "unstake") {
        // Withdraw full amount
        tx = await staking?.withdraw({
          walletPk: publicKey,
          poolAddress: position.poolAddress,
          accountAddress: position.accountAddress,
          amount: position.stakedTokenBalance.toString(),
        });
      } else if (activePopup.type === "claim") {
        // Get rewards
        tx = await staking?.getReward({
          walletPk: publicKey,
          poolAddress: position.poolAddress,
          accountAddress: position.accountAddress,
        });
      }

      if (!tx) {
        throw new Error("Failed to create transaction");
      }

      // Add recent blockhash and fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction with skipPreflight to avoid simulation errors
      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
      });

      // Listen for transaction completion
      transactionListener(connection, txId, (completed) => {
        setProcessing(false);
        if (completed) {
          alert(
            activePopup.type === "unstake"
              ? "Successfully unstaked!"
              : "Successfully claimed rewards!",
          );
          fetchUserPositions();
          onRefresh?.();
        } else {
          alert("Transaction failed. Please try again.");
        }
      });

      setActivePopup(null);
    } catch (error) {
      setProcessing(false);
      console.error("Transaction error:", error);
      alert(`Error: ${error.message || "Transaction failed"}`);
      setActivePopup(null);
    }
  };

  const handleCancel = () => {
    setActivePopup(null);
  };

  // Format token amount with decimals
  const formatTokenAmount = (amount: any, decimals = 9) => {
    const value = parseFloat(amount.toString()) / Math.pow(10, decimals);
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  // Calculate time remaining until unlock
  const getTimeRemaining = (releaseTime: Date) => {
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

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1E1E1E;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #6D6FDF;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #8B8EFF;
    }
  `;

  const tokenSymbol = pool?.tokenInfo?.symbol || "TOKEN";

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="font-khand dark:border-secondary mt-6 overflow-hidden rounded-4xl border-2 border-[#CDCDE9]">
        {/* Header Section */}
        <div
          className="flex items-center justify-between px-6 py-4"
          // style={{ backgroundColor: "#1A0F3D" }}
        >
          <h2 className="text-lg font-medium dark:text-white">
            My active Staking
          </h2>
          <span className="text-2xl font-bold dark:text-white">
            {tokenSymbol}
          </span>
        </div>

        {/* Table Header */}
        <div className="dark:border-secondary border-y border-[#CDCDE9] bg-[#E7E6FF] dark:bg-[#2A1C78]">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-6 py-2"></th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  stake positions
                </th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  lock period
                </th>
                <th className="w-1/3 px-6 py-2 text-center text-sm font-normal dark:text-white">
                  unclaimed rewards
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body - Scrollable */}
        <div
          ref={scrollRef}
          className={`custom-scrollbar relative h-[400px] ${
            activePopup !== null ? "overflow-hidden" : "overflow-y-scroll"
          }`}
        >
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="dark:text-white">Loading positions...</p>
            </div>
          ) : userPositions.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="dark:text-white">
                {publicKey
                  ? "No staking positions found"
                  : "Connect wallet to view positions"}
              </p>
            </div>
          ) : (
            <table className="h-full w-full">
              <tbody className="h-full text-center">
                {userPositions.map((position, index) => {
                  const timeRemaining = getTimeRemaining(position.releaseTime);
                  const isUnlocked = timeRemaining === "UNLOCKED";

                  // Debug: log decimals being used
                  const decimals = pool?.tokenInfo?.decimals || 9;
                  if (index === 0) {
                    console.log(
                      "Pool decimals:",
                      decimals,
                      "Pool tokenInfo:",
                      pool?.tokenInfo,
                    );
                  }

                  return (
                    <tr
                      key={position.accountAddress.toBase58()}
                      // style={{ backgroundColor: "#0A0520" }}
                    >
                      <td className="items w-1/29 justify-center border-r border-[#CDCDE9] py-4 text-sm dark:border-[#6D6FDF] dark:text-white">
                        {index + 1}.
                      </td>
                      <td
                        className={`w-2/7 border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap transition-colors dark:border-[#6D6FDF] dark:text-white ${
                          isUnlocked
                            ? "cursor-pointer hover:bg-[#CDCDE9] dark:hover:bg-[#220052]"
                            : "cursor-not-allowed opacity-50"
                        }`}
                        onClick={() => isUnlocked && handleUnstake(index)}
                        title={
                          isUnlocked
                            ? "Click to unstake"
                            : "Locked - wait for unlock time"
                        }
                      >
                        {formatTokenAmount(
                          position.stakedTokenBalance,
                          decimals,
                        )}
                      </td>
                      <td
                        className={`w-2/7 border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap dark:border-[#6D6FDF] ${
                          isUnlocked
                            ? "text-green-400 dark:text-green-300"
                            : "text-purple-400 dark:text-purple-300"
                        }`}
                      >
                        {timeRemaining}
                      </td>
                      <td
                        className="w-2/7 cursor-pointer px-6 py-4 text-base whitespace-nowrap transition-colors hover:bg-[#CDCDE9] dark:text-white dark:hover:bg-[#220052]"
                        onClick={() => handleClaim(index)}
                      >
                        {formatTokenAmount(
                          position.approximateReward,
                          decimals,
                        )}
                      </td>
                    </tr>
                  );
                })}
                {/* Filler row to extend borders to full height */}
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

        {/* Footer Section */}
        <div className="dark:border-secondary border-t border-[#CDCDE9] px-6 py-3 text-center text-sm dark:bg-[#0A0520] dark:text-white">
          select a position to unstake or claim reward as soon as{" "}
          <span style={{ color: "#E879F9" }}>the lock period</span> has passed
        </div>
      </div>

      {/* Popup Overlay */}
      {activePopup !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/70"
          onClick={handleCancel}
        >
          <div
            className="dark:border-secondary rounded-2xl border-2 border-[#CDCDE9] px-8 py-6"
            style={{ backgroundColor: "#2A1C78" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-lg text-white">
              {activePopup.type === "unstake"
                ? "Unstake all tokens?"
                : "Claim rewards?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                disabled={processing}
                className="rounded-lg px-6 py-2 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: "#6D6FDF" }}
              >
                {processing ? "Processing..." : "Yes"}
              </button>
              <button
                onClick={handleCancel}
                disabled={processing}
                className="rounded-lg border-2 px-6 py-2 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
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
    </>
  );
};

export default StakingPositionsTable;
