"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { TOKANO_POOL_ID, TOKANO_MINT_ADDRESS } from "@/lib/constants";
import { UserState } from "tokano-sdk";

interface StakingPosition {
  stakeAmount: string;
  lockPeriod: string;
  unclaimedRewards: string;
  rawStake?: UserState;
  isLocked: boolean;
}

interface StakingPositionsTableProps {
  positions?: StakingPosition[];
}

type PopupType = "unstake" | "claim" | null;

const StakingPositionsTable: React.FC<StakingPositionsTableProps> = ({
  positions: externalPositions,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();

  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activePopup, setActivePopup] = useState<{
    type: PopupType;
    index: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch user's staking positions
  const fetchStakingPositions = useCallback(async () => {
    if (!publicKey || !staking) {
      setPositions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userStakes = await staking
        .fetchUserStakeAccounts(publicKey)
        .catch((err) => {
          console.error("Error fetching user stake accounts:", err);
          return [];
        });
      const pools = await staking.fetchStakePools().catch((err) => {
        console.error("Error fetching stake pools:", err);
        return [];
      });

      // Filter for TOKANO pool stakes
      const tokanoStakes = userStakes.filter((stake) => {
        const pool = pools.find((p) => p.poolAddress.equals(stake.poolAddress));
        return pool?.tokenMint.toBase58() === TOKANO_MINT_ADDRESS;
      });

      // Transform to display format
      const formattedPositions: StakingPosition[] = tokanoStakes.map(
        (stake) => {
          const now = Date.now();
          const releaseTime = stake.releaseTime.getTime();
          const isLocked = now < releaseTime;
          const diffMs = releaseTime - now;

          let lockPeriod = "Unlocked";
          if (isLocked) {
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            lockPeriod = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
          }

          return {
            stakeAmount: (
              parseFloat(stake.stakedTokenBalance.toString()) / 1e9
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
            lockPeriod,
            unclaimedRewards: stake.approximateReward.toNumber().toFixed(2),
            rawStake: stake,
            isLocked,
          };
        },
      );

      setPositions(formattedPositions);
    } catch (error) {
      console.error("Error fetching staking positions:", error);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  }, [publicKey, staking]);

  useEffect(() => {
    if (externalPositions && externalPositions.length > 0) {
      setPositions(externalPositions);
      setLoading(false);
    } else {
      fetchStakingPositions();
    }
  }, [externalPositions, fetchStakingPositions]);

  const handleUnstake = (index: number) => {
    const position = positions[index];
    if (position.isLocked) {
      alert("Cannot unstake - position is still locked");
      return;
    }
    setActivePopup({ type: "unstake", index });
  };

  const handleClaim = (index: number) => {
    setActivePopup({ type: "claim", index });
  };

  const handleConfirm = async () => {
    if (
      !activePopup ||
      !publicKey ||
      !staking ||
      !connection ||
      !sendTransaction
    )
      return;

    const position = positions[activePopup.index];
    if (!position.rawStake) return;

    setProcessing(true);

    try {
      let tx;

      if (activePopup.type === "unstake") {
        // Unstake all tokens
        tx = await staking.withdraw({
          walletPk: publicKey,
          poolAddress: position.rawStake.poolAddress,
          accountAddress: position.rawStake.accountAddress,
          amount: position.rawStake.stakedTokenBalance.toString(),
        });
      } else if (activePopup.type === "claim") {
        // Claim rewards
        tx = await staking.getReward({
          walletPk: publicKey,
          poolAddress: position.rawStake.poolAddress,
          accountAddress: position.rawStake.accountAddress,
        });
      }

      if (!tx) return;

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: true,
        maxRetries: 3,
      });
      await connection.confirmTransaction(signature, "confirmed");

      alert(
        activePopup.type === "unstake"
          ? "Successfully unstaked!"
          : "Successfully claimed rewards!",
      );
      await fetchStakingPositions();
    } catch (error: any) {
      console.error(`Error ${activePopup.type}:`, error);
      alert(`Error: ${error?.message || `Failed to ${activePopup.type}`}`);
    } finally {
      setProcessing(false);
      setActivePopup(null);
    }
  };

  const handleCancel = () => {
    setActivePopup(null);
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

  const displayPositions = positions;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="font-khand dark:border-secondary overflow-hidden border-2 border-b-0 border-[#CDCDE9]">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#9A7BF6] to-white px-6 py-2 dark:from-[#4000FF] dark:to-black">
          <h2 className="text-lg font-medium text-[#39317D] dark:text-white">
            Positions
          </h2>
        </div>

        {/* Table Header */}
        <div className="dark:border-secondary border-y border-[#CDCDE9] bg-[#E7E6FF] dark:bg-[#2A1C78]">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-6 py-2"></th>
                <th className="px-6 py-2 text-center text-sm font-normal dark:text-white">
                  stake positions
                </th>
                <th className="px-6 py-2 text-center text-sm font-normal dark:text-white">
                  lock period
                </th>
                <th className="px-2 py-2 text-center text-sm font-normal dark:text-white">
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
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Loading positions...
              </p>
            </div>
          ) : !publicKey ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Connect wallet to view positions
              </p>
            </div>
          ) : displayPositions.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No staking positions found
              </p>
            </div>
          ) : (
            <table className="h-full w-full">
              <tbody className="h-full text-center">
                {displayPositions.map((position, index) => (
                  <tr
                    key={index}
                    // style={{ backgroundColor: "#0A0520" }}
                  >
                    <td className="items w-6 justify-center border-r border-[#CDCDE9] py-4 text-sm dark:border-[#6D6FDF] dark:text-white">
                      {index + 1}.
                    </td>
                    <td
                      className="cursor-pointer border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap transition-colors hover:bg-[#CDCDE9] dark:border-[#6D6FDF] dark:text-white dark:hover:bg-[#220052]"
                      onClick={() => handleUnstake(index)}
                    >
                      {position.stakeAmount}
                    </td>
                    <td className="border-r border-[#CDCDE9] px-6 py-4 text-base whitespace-nowrap text-purple-400 dark:border-[#6D6FDF] dark:text-purple-300">
                      {position.lockPeriod}
                    </td>
                    <td
                      className="cursor-pointer px-6 py-4 text-base whitespace-nowrap transition-colors hover:bg-[#CDCDE9] dark:text-white dark:hover:bg-[#220052]"
                      onClick={() => handleClaim(index)}
                    >
                      {position.unclaimedRewards}
                    </td>
                  </tr>
                ))}
                {/* Filler row to extend borders to full height */}
                <tr className="h-full">
                  <td className="border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td className="border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td className="border-r border-[#CDCDE9] dark:border-[#6D6FDF]"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          )}

          {/* Popup Overlay */}
          {activePopup !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/70">
              <div
                className="dark:border-secondary rounded-2xl border-2 border-[#CDCDE9] px-8 py-6"
                style={{ backgroundColor: "#2A1C78" }}
              >
                <p className="mb-4 text-lg text-white">
                  {processing
                    ? `${activePopup.type === "unstake" ? "Unstaking" : "Claiming"}...`
                    : activePopup.type === "unstake"
                      ? "Unstake?"
                      : "Claim rewards?"}
                </p>
                {!processing && (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleConfirm}
                      className="rounded-lg px-6 py-2 text-white hover:opacity-80"
                      style={{ backgroundColor: "#6D6FDF" }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="rounded-lg border-2 px-6 py-2 text-white hover:opacity-80"
                      style={{
                        borderColor: "#6D6FDF",
                        backgroundColor: "transparent",
                      }}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="dark:border-secondary border-t border-[#CDCDE9] px-6 py-3 text-center text-sm dark:bg-[#0A0520] dark:text-white">
          select a position to unstake or claim reward as soon as{" "}
          <span style={{ color: "#E879F9" }}>the lock period</span> has passed
        </div>
      </div>
    </>
  );
};

export default StakingPositionsTable;
