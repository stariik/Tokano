import React, { useState, useRef } from "react";

interface StakingPosition {
  stakeAmount: string;
  lockPeriod: string;
  unclaimedRewards: string;
}

interface StakingPositionsTableProps {
  positions?: StakingPosition[];
}

type PopupType = "unstake" | "claim" | null;

const StakingPositionsTable: React.FC<StakingPositionsTableProps> = ({
  positions = [],
}) => {
  const [activePopup, setActivePopup] = useState<{
    type: PopupType;
    index: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleUnstake = (index: number) => {
    setActivePopup({ type: "unstake", index });
  };

  const handleClaim = (index: number) => {
    setActivePopup({ type: "claim", index });
  };

  const handleConfirm = () => {
    if (!activePopup) return;

    if (activePopup.type === "unstake") {
      console.log("Unstaking position:", activePopup.index);
      // Add your unstake logic here
    } else if (activePopup.type === "claim") {
      console.log("Claiming rewards for position:", activePopup.index);
      // Add your claim logic here
    }

    setActivePopup(null);
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

  // Sample data if no positions provided
  const samplePositions: StakingPosition[] = [
    {
      stakeAmount: "1,000 ",
      lockPeriod: "30 days",
      unclaimedRewards: "50",
    },
    {
      stakeAmount: "2,500",
      lockPeriod: "60 days",
      unclaimedRewards: "125",
    },
    {
      stakeAmount: "5,000",
      lockPeriod: "90 days",
      unclaimedRewards: "300",
    },
    {
      stakeAmount: "750",
      lockPeriod: "15 days",
      unclaimedRewards: "22.5",
    },
    {
      stakeAmount: "3,200",
      lockPeriod: "45 days",
      unclaimedRewards: "144",
    },
    {
      stakeAmount: "10,000",
      lockPeriod: "180 days",
      unclaimedRewards: "900",
    },
    {
      stakeAmount: "1,850",
      lockPeriod: "30 days",
      unclaimedRewards: "92.5",
    },
    {
      stakeAmount: "4,500",
      lockPeriod: "120 days",
      unclaimedRewards: "540",
    },
    {
      stakeAmount: "6,750",
      lockPeriod: "90 days",
      unclaimedRewards: "405",
    },
    {
      stakeAmount: "8,200",
      lockPeriod: "60 days",
      unclaimedRewards: "410",
    },
  ];

  const displayPositions = positions.length > 0 ? positions : samplePositions;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="font-khand border-[#CDCDE9] dark:border-secondary mt-6 overflow-hidden rounded-4xl border-2">
        {/* Header Section */}
        <div
          className="flex items-center justify-between px-6 py-4"
          // style={{ backgroundColor: "#1A0F3D" }}
        >
          <h2 className="text-lg font-medium dark:text-white">
            My active Staking
          </h2>
          <span className="text-2xl font-bold dark:text-white">FIRED</span>
        </div>

        {/* Table Header */}
        <div
          className="border-[#CDCDE9] dark:border-secondary border-y bg-[#E7E6FF] dark:bg-[#2A1C78]"
          style={
            {
              // borderTop: "1px solid #6D6FDF",
              // borderBottom: "1px solid #6D6FDF",
            }
          }
        >
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
          className={`custom-scrollbar relative max-h-[400px] ${
            activePopup !== null ? "overflow-hidden" : "overflow-y-scroll"
          }`}
        >
          <table className="w-full">
            <tbody className="text-center">
              {displayPositions.map((position, index) => (
                <tr
                  key={index}
                  // style={{ backgroundColor: "#0A0520" }}
                >
                  <td
                    className="items w-6 justify-center py-4 text-sm border-r border-[#CDCDE9] dark:border-[#6D6FDF] dark:text-white"
                  >
                    {index + 1}.
                  </td>
                  <td
                    className="cursor-pointer px-6 py-4 text-base whitespace-nowrap transition-colors border-r border-[#CDCDE9] dark:border-[#6D6FDF] dark:text-white hover:bg-[#CDCDE9] dark:hover:bg-[#220052]"
                    onClick={() => handleUnstake(index)}
                  >
                    {position.stakeAmount}
                  </td>
                  <td
                    className="px-6 py-4 text-base whitespace-nowrap text-purple-400 border-r border-[#CDCDE9] dark:border-[#6D6FDF] dark:text-purple-300"
                  >
                    {position.lockPeriod}
                  </td>
                  <td
                    className="cursor-pointer px-6 py-4 text-base whitespace-nowrap transition-colors dark:text-white hover:bg-[#CDCDE9] dark:hover:bg-[#220052]"
                    onClick={() => handleClaim(index)}
                  >
                    {position.unclaimedRewards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Popup Overlay */}
          {activePopup !== null && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              <div
                className="rounded-2xl border-2 border-[#CDCDE9] dark:border-secondary px-8 py-6"
                style={{ backgroundColor: "#2A1C78" }}
              >
                <p className="mb-4 text-lg text-white">
                  {activePopup.type === "unstake"
                    ? "Unstake?"
                    : "Claim rewards?"}
                </p>
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
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="border-[#CDCDE9] dark:border-secondary border-t px-6 py-3 text-center text-sm dark:bg-[#0A0520] dark:text-white">
          select a position to unstake or claim reward as soon as{" "}
          <span style={{ color: "#E879F9" }}>the lock period</span> has passed
        </div>
      </div>
    </>
  );
};

export default StakingPositionsTable;
