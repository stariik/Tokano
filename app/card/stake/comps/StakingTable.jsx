"use client";
import React from "react";

function StakingTable({
  title,
  actionTitle,
  actionType,
  actionColor,
  data,
  popup,
  setPopup,
  scrollRef,
  itemRefs
}) {
  return (
    <div>
      {/* Header Row */}
      <div className="grid grid-cols-2 bg-[#2A1C78] text-white text-sm font-semibold">
        <div className="justify-center items-center flex border-y border-secondary">
          {title}
        </div>
        <div className="justify-center items-center text-center flex border-y border-secondary">
          {actionType === "unstake" && <span className="text-red-500">/-Un/</span>}
          {actionTitle}
        </div>
      </div>

      {/* Container with styling */}
      <div className="relative max-h-[440px]">
        {/* Fixed continuous second column background */}
        <div className="absolute inset-0 grid grid-cols-2 z-0">
          <div></div>
          <div className="bg-gradient-to-b from-[#4000FF] to-[#0C0D1C] border-l border-secondary"></div>
        </div>

        {/* Data Rows Container */}
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
            <div
              key={actionType === "claim" ? position.id + "_rewards" : position.id}
              ref={actionType === "unstake" ? (el) => (itemRefs.current[index] = el) : null}
              className={`grid grid-cols-2 text-sm border-purple-300 relative ${
                position.highlight ? "" : ""
              }`}
            >
              {/* First Column */}
              <div className={actionType === "unstake" ? "flex cursor-pointer" : "text-center p-2 md:text-lg"}>
                {actionType === "unstake" ? (
                  <>
                    <div className="flex items-center justify-center border-r border-secondary mx-auto min-w-[30px]">
                      <span className="text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 text-center md:text-lg p-2">
                      <div className="font-semibold">{position.staked}</div>
                      <div className="text-purple-300 text-xs md:text-sm">
                        ({position.period})
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold">{position.rewards}</div>
                    <div className="text-purple-300 md:text-sm text-xs">
                      ({position.rewardsSub})
                    </div>
                  </>
                )}
              </div>

              {/* Second Column - Action */}
              <div className="text-center relative">
                <div
                  className="cursor-pointer hover:bg-[#2A1C78] p-2 md:text-lg"
                  onClick={() =>
                    setPopup({
                      show: true,
                      type: actionType,
                      positionId: position.id,
                    })
                  }
                >
                  <div className={`font-semibold ${actionColor}`}>
                    {actionTitle.toUpperCase()}
                  </div>
                </div>

                {/* Popup */}
                {popup.show &&
                  popup.positionId === position.id &&
                  popup.type === actionType && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                      <div className="bg-[#0C0D1C] border-2 border-secondary rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                        <div className="mb-3">
                          <div className="text-white text-sm font-semibold">
                            {actionTitle.toUpperCase()}?
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            className={`px-6 py-2 rounded-full text-white font-bold text-sm ${
                              actionType === "unstake"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            onClick={() => {
                              console.log(
                                `${actionType} YES for position ${popup.positionId}`
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default StakingTable;