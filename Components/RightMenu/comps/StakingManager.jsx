"use client";
import React, { useState } from "react";

export default function StakingManager() {
  const [selectedPosition, setSelectedPosition] = useState(2);

  // Mock staking data
  const stakingData = [
    {
      id: 1,
      staked: "700,484,120.00",
      period: "32d 04h",
      rewards: "4,120.00",
      rewardsPeriod: "521",
      isUnstakable: true,
    },
    {
      id: 2,
      staked: "700,484,120.00",
      period: "32d 04h",
      rewards: "4,120.00",
      rewardsPeriod: "3200",
      isUnstakable: true,
      isSelected: true,
    },
    {
      id: 3,
      staked: "70,484,120.00",
      period: "02d 04h",
      rewards: "84,120.00",
      rewardsPeriod: "430",
      isUnstakable: false,
    },
    {
      id: 4,
      staked: "22,484,120.00",
      period: "32d 04h",
      rewards: "22,4,120.00",
      rewardsPeriod: "2342",
      isUnstakable: true,
    },
    {
      id: 5,
      staked: "0.00",
      period: "0",
      rewards: "10,120.00",
      rewardsPeriod: "120",
      isUnstakable: false,
    },
    {
      id: 6,
      staked: "700,484,120.00",
      period: "2d 04h",
      rewards: "700,484,120.00",
      rewardsPeriod: "450",
      isUnstakable: true,
    },
    {
      id: 7,
      staked: "700,484,120.00",
      period: "2d 04h",
      rewards: "700,120.00",
      rewardsPeriod: "120,000",
      isUnstakable: true,
    },
  ];

  const handlePositionSelect = (id) => {
    setSelectedPosition(id);
  };

  const handleUnstake = () => {
    console.log(`Unstaking position ${selectedPosition}`);
  };

  const getPositionStatus = (position) => {
    if (position.staked === "0.00") return "empty";
    if (!position.isUnstakable) return "locked";
    return "active";
  };

  return (
    <div className="bg-[#2a1458] border-2 border-purple-400 rounded-lg m-6 overflow-hidden">
      <div className="grid grid-cols-3 h-full">
        {/* Left Column - Staked Positions */}
        <div className="border-r border-purple-400">
          <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">
            <span className="text-red-400">(-Un)</span> Staked (Period)
          </div>
          <div className="h-80 overflow-y-auto">
            {stakingData.map((position) => {
              const status = getPositionStatus(position);
              const isSelected = selectedPosition === position.id;

              return (
                <div
                  key={position.id}
                  onClick={() => handlePositionSelect(position.id)}
                  className={`
                    p-3 border-b border-purple-400 cursor-pointer transition-colors
                    ${isSelected ? 'bg-purple-700 ring-2 ring-red-500' : 'hover:bg-purple-800'}
                    ${status === 'empty' ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-white text-lg font-bold mr-2">
                      {position.id}
                    </span>
                    <div className="text-right flex-1">
                      <div className={`text-lg font-bold ${
                        status === 'locked' ? 'text-red-400' : 'text-white'
                      }`}>
                        {position.staked}
                      </div>
                      <div className={`text-sm ${
                        status === 'locked' ? 'text-red-400' : 'text-gray-300'
                      }`}>
                        ({position.period})
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-1 text-xs text-red-400">
                      → Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Column - Action Buttons */}
        <div className="border-r border-purple-400 flex flex-col">
          <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">
            select position to unstake<br />or claim reward
          </div>
          <div className="flex-1 flex flex-col justify-center items-center p-4 space-y-4">
            <button
              onClick={handleUnstake}
              disabled={!selectedPosition || getPositionStatus(stakingData.find(p => p.id === selectedPosition)) === 'empty'}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full border-2 border-white transition-colors"
            >
              YES
            </button>

            <div className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
              <span>UNSTAKE</span>
              <span className="text-yellow-300">🔥</span>
            </div>

            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full border-2 border-white transition-colors"
            >
              NO
            </button>
          </div>
        </div>

        {/* Right Column - Rewards */}
        <div>
          <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">
            Rewards (Last)
          </div>
          <div className="h-80 overflow-y-auto">
            {stakingData.map((position) => {
              const isSelected = selectedPosition === position.id;

              return (
                <div
                  key={position.id}
                  className={`
                    p-3 border-b border-purple-400 transition-colors
                    ${isSelected ? 'bg-purple-700' : ''}
                  `}
                >
                  <div className="text-right">
                    <div className="text-white text-lg font-bold">
                      {position.rewards}
                    </div>
                    <div className="text-gray-300 text-sm">
                      ({position.rewardsPeriod})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* History Button */}
      <div className="bg-purple-600 border-t border-purple-400 p-2 text-center">
        <button className="text-white font-bold text-sm hover:text-yellow-300 transition-colors flex items-center justify-center w-full">
          <span className="mr-2">▼</span>
          History
        </button>
      </div>
    </div>
  );
}