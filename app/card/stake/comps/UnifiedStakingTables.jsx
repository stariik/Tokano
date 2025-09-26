"use client";
import React from "react";

function UnifiedStakingTables({ data, popup, setPopup, scrollRef, itemRefs }) {
  return (
    <div>
      {/* Headers Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* First Table Header */}
        <div className="border-r border-secondary">
          <div className="grid grid-cols-2 bg-[#2A1C78] text-white text-sm font-semibold">
            <div className="justify-center items-center flex border-y border-secondary">
              Positions
            </div>
            <div className="justify-center items-center text-center flex border-y border-secondary">
              select position to unstake
              <br />
              or claim reward
            </div>
          </div>
        </div>

        {/* Second Table Header */}
        <div>
          <div className="grid grid-cols-2 bg-[#2A1C78] text-white text-sm font-semibold">
            <div className="justify-center items-center flex border-y border-secondary">
              Rewards (Last)
            </div>
            <div className="justify-center items-center text-center flex border-y border-secondary">
              select position to unstake
              <br />
              or claim reward
            </div>
          </div>
        </div>
      </div>

      {/* Unified Scrollable Container */}
      <div className="relative max-h-[440px]">
        {/* Background for both tables */}
        <div className="absolute inset-0 grid grid-cols-2 gap-4 z-0">
          {/* Left table background */}
          <div className="border-r border-secondary">
            <div className="absolute inset-0 grid grid-cols-2">
              <div></div>
              <div className="bg-gradient-to-b from-[#4000FF] to-[#0C0D1C] border-l border-secondary"></div>
            </div>
          </div>
          {/* Right table background */}
          <div>
            <div className="absolute inset-0 grid grid-cols-2">
              <div></div>
              <div className="bg-gradient-to-b from-[#4000FF] to-[#0C0D1C] border-l border-secondary"></div>
            </div>
          </div>
        </div>

        {/* Single Scrollable Data Container */}
        <div
          ref={scrollRef}
          className="relative z-10 max-h-[440px] overflow-y-auto overflow-x-hidden"
          style={{
            scrollBehavior: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {data.map((position, index) => (
            <div key={position.id} className="grid grid-cols-2 gap-4">
              {/* Left Table Row - Positions & Unstake */}
              <div className="border-r border-secondary">
                <div
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`grid grid-cols-2 text-sm border-purple-300 relative ${
                    position.highlight ? "" : ""
                  }`}
                >
                  <div
                    className="flex cursor-pointer"
                    onClick={() =>
                      setPopup({
                        show: true,
                        type: "unstake",
                        positionId: position.id,
                      })
                    }
                  >
                    <div className="flex items-center justify-center border-r border-secondary mx-auto min-w-[30px]">
                      <span className="text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 text-center md:text-lg p-2 hover:bg-[#2A1C78]">
                      <div className="font-semibold">{position.staked}</div>
                      <div className="text-purple-300 text-xs md:text-sm">
                        ({position.period})
                      </div>
                    </div>
                  </div>
                  <div className="text-center relative">
                    {/* Empty second column - popup area */}
                    {/* Popup for unstake */}
                    {popup.show &&
                      popup.positionId === position.id &&
                      popup.type === "unstake" && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                          <div className="bg-[#0C0D1C] border-2 border-secondary rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                            <div className="mb-3">
                              <div className="text-white text-sm font-semibold">
                                UNSTAKE?
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm"
                                onClick={() => {
                                  console.log(
                                    `unstake YES for position ${popup.positionId}`
                                  );
                                  setPopup({
                                    show: false,
                                    type: "",
                                    positionId: null,
                                  });
                                }}
                              >
                                YES
                              </button>
                              <button
                                className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm"
                                onClick={() =>
                                  setPopup({
                                    show: false,
                                    type: "",
                                    positionId: null,
                                  })
                                }
                              >
                                NO
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Right Table Row - Rewards & Claim */}
              <div>
                <div
                  className={`grid grid-cols-2 text-sm border-purple-300 relative ${
                    position.highlight ? "" : ""
                  }`}
                >
                  <div
                    className="text-center p-2 md:text-lg cursor-pointer hover:bg-[#2A1C78]"
                    onClick={() =>
                      setPopup({
                        show: true,
                        type: "claim",
                        positionId: position.id,
                      })
                    }
                  >
                    <div className="font-semibold">{position.rewards}</div>
                    <div className="text-purple-300 md:text-sm text-xs">
                      ({position.rewardsSub})
                    </div>
                  </div>
                  <div className="text-center relative">
                    {/* Empty second column - popup area */}
                    {/* Popup for claim */}
                    {popup.show &&
                      popup.positionId === position.id &&
                      popup.type === "claim" && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                          <div className="bg-[#0C0D1C] border-2 border-secondary rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                            <div className="mb-3">
                              <div className="text-white text-sm font-semibold">
                                CLAIM?
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm"
                                onClick={() => {
                                  console.log(
                                    `claim YES for position ${popup.positionId}`
                                  );
                                  setPopup({
                                    show: false,
                                    type: "",
                                    positionId: null,
                                  });
                                }}
                              >
                                YES
                              </button>
                              <button
                                className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm"
                                onClick={() =>
                                  setPopup({
                                    show: false,
                                    type: "",
                                    positionId: null,
                                  })
                                }
                              >
                                NO
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnifiedStakingTables;