"use client";

import React from "react";

function UnifiedStakingTables({ data, popup, setPopup, scrollRef, itemRefs }) {
  return (
    <div>
      {/* Headers Row */}
      <div className="font-khand grid grid-cols-2 gap-4 font-medium">
        {/* First Table Header */}
        <div className="border-[#CDCDE9] dark:border-secondary border-r">
          <div className="grid grid-cols-2 bg-[#f5f3fb] text-xs font-semibold text-[#190E79] 2xl:text-sm dark:bg-[#2A1C78] dark:text-white">
            <div className="border-[#CDCDE9] dark:border-secondary flex items-center justify-center border-y">
              Positions
            </div>
            <div className="border-[#CDCDE9] dark:border-secondary flex items-center justify-center border-y text-center">
              select position to unstake
              <br />
              or claim reward
            </div>
          </div>
        </div>

        {/* Second Table Header */}
        <div>
          <div className="grid grid-cols-2 bg-[#f5f3fb] text-sm font-semibold text-[#190E79] dark:bg-[#2A1C78] dark:text-white">
            <div className="border-[#CDCDE9] dark:border-secondary flex items-center justify-center border-y border-l">
              Rewards (Last)
            </div>
            <div className="border-[#CDCDE9] dark:border-secondary flex items-center justify-center border-y text-center">
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
        <div className="absolute inset-0 z-0 grid grid-cols-2 gap-4">
          {/* Left table background */}
          <div className="border-[#CDCDE9] dark:border-secondary border-r">
            <div className="absolute inset-0 grid grid-cols-2">
              <div></div>
              <div className=""></div>
            </div>
          </div>
          {/* Right table background */}
          <div className="">
            <div className="absolute inset-0 grid grid-cols-2">
              <div></div>
              <div className="-l border-[#CDCDE9] dark:border-secondary"></div>
            </div>
          </div>
        </div>

        {/* Single Scrollable Data Container */}
        <div
          ref={scrollRef}
          className="scrollbar-thin relative z-10 max-h-[440px] overflow-x-hidden overflow-y-scroll"
          style={{
            scrollBehavior: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#a855f7 transparent",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #a855f7;
              border-radius: 3px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #9333ea;
            }
          `}</style>

          {data.map((position, index) => (
            <div
              key={position.id}
              className="font-khand grid grid-cols-2 gap-4 font-medium"
            >
              {/* Left Table Row - Positions & Unstake */}
              <div className="">
                <div
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`relative grid grid-cols-2 border-purple-300 text-sm ${
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
                    <div className="border-[#CDCDE9] dark:border-secondary mx-auto flex min-w-[30px] items-center justify-center border-r">
                      <span className="font-khand text-sm font-medium lg:font-semibold text-[#190E79] dark:text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="border-[#CDCDE9] dark:border-secondary min-w-full flex-1 border-r-1 p-2 text-center hover:bg-[#f5f3fb] md:text-lg dark:hover:bg-[#2A1C78]">
                      <div className="font-semibold">{position.staked}</div>
                      <div className="text-xs text-purple-300 md:text-sm">
                        ({position.period})
                      </div>
                    </div>
                  </div>
                  <div className="relative text-center">
                    {/* Empty second column - popup area */}
                    {/* Popup for unstake */}
                    {popup.show &&
                      popup.positionId === position.id &&
                      popup.type === "unstake" && (
                        <div className="absolute top-1/2 left-3/5 z-70 flex -translate-x-1/2 -translate-y-1/2 transform">
                          <div className="absolute top-1/2 right-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>
                          <div className="border-[#CDCDE9] dark:border-secondary min-w-[100px] rounded-lg border-2 bg-[#eeeded] p-2 text-center shadow-xl lg:p-4 dark:bg-[#0C0D1C]">
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-[#190E79] lg:text-sm dark:text-white">
                                UNSTAKE?
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                className="rounded-full bg-red-500 px-6 py-1 text-sm font-bold hover:bg-red-600 lg:py-2 text-white"
                                onClick={() => {
                                  console.log(
                                    `unstake YES for position ${popup.positionId}`,
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
                                className="rounded-full bg-gray-600 px-6 py-1 text-sm font-bold hover:bg-gray-700 lg:py-2 text-white"
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
                  className={`relative grid grid-cols-2 border-purple-300 text-sm ml-1 ${
                    position.highlight ? "" : ""
                  }`}
                >
                  <div
                    className="border-[#CDCDE9] dark:border-secondary cursor-pointer border-x-1 p-2 text-center hover:bg-[#f5f3fb] md:text-lg dark:hover:bg-[#2A1C78]"
                    onClick={() =>
                      setPopup({
                        show: true,
                        type: "claim",
                        positionId: position.id,
                      })
                    }
                  >
                    <div className="font-semibold">{position.rewards}</div>
                    <div className="text-xs text-purple-300 md:text-sm">
                      ({position.rewardsSub})
                    </div>
                  </div>
                  <div className="relative text-center">
                    {/* Empty second column - popup area */}
                    {/* Popup for claim */}
                    {popup.show &&
                      popup.positionId === position.id &&
                      popup.type === "claim" && (
                        <div className="absolute top-1/2 left-1/2 z-70 -translate-x-1/2 -translate-y-1/2 transform">
                          <div className="absolute top-1/2 right-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>

                          <div className="border-[#CDCDE9] dark:border-secondary min-w-[100px] rounded-lg border-2 bg-[#eeeded] p-2 text-center shadow-xl lg:p-4 dark:bg-[#0C0D1C]">
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-[#190E79] lg:text-sm dark:text-white">
                                CLAIM?
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                className="rounded-full bg-green-500 px-6 py-1 text-sm font-bold  hover:bg-green-600 lg:py-2 text-white"
                                onClick={() => {
                                  console.log(
                                    `claim YES for position ${popup.positionId}`,
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
                                className="rounded-full bg-gray-600 px-6 py-1 text-sm font-bold  hover:bg-gray-700 lg:py-2 text-white"
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
