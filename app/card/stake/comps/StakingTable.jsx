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
  itemRefs,
}) {
  return (
    <div>
      {/* Header Row */}
      <div className="grid grid-cols-2 bg-[#f5f3fb] text-sm font-semibold text-[#190E79] dark:bg-[#2A1C78] dark:text-white">
        <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9]">
          {title}
        </div>
        <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9] text-center">
          {actionType === "unstake" && (
            <span className="text-red-500">/-Un/</span>
          )}
          {actionTitle}
        </div>
      </div>

      {/* Container with styling */}
      <div className="relative max-h-[440px]">
        {/* Fixed continuous second column background */}
        <div className="absolute inset-0 z-0 grid grid-cols-2">
          <div></div>
          <div className="dark:border-secondary border-l border-[#CDCDE9] bg-gradient-to-b from-[#4000FF] to-[#0C0D1C]"></div>
        </div>

        {/* Data Rows Container */}
        <div
          ref={scrollRef}
          className="relative z-10 max-h-[440px] overflow-x-hidden overflow-y-auto"
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
              key={
                actionType === "claim" ? position.id + "_rewards" : position.id
              }
              ref={
                actionType === "unstake"
                  ? (el) => (itemRefs.current[index] = el)
                  : null
              }
              className={`relative grid grid-cols-2 border-purple-300 text-sm ${
                position.highlight ? "" : ""
              }`}
            >
              {/* First Column */}
              <div
                className={
                  actionType === "unstake"
                    ? "flex cursor-pointer"
                    : "p-2 text-center md:text-lg"
                }
              >
                {actionType === "unstake" ? (
                  <>
                    <div className="dark:border-secondary mx-auto flex min-w-[30px] items-center justify-center border-r border-[#CDCDE9]">
                      <span className="text-sm font-semibold text-[#190E79] dark:text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 p-2 text-center md:text-lg">
                      <div className="font-semibold">{position.staked}</div>
                      <div className="text-xs text-purple-300 md:text-sm">
                        ({position.period})
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold">{position.rewards}</div>
                    <div className="text-xs text-purple-300 md:text-sm">
                      ({position.rewardsSub})
                    </div>
                  </>
                )}
              </div>

              {/* Second Column - Action */}
              <div className="relative text-center">
                <div
                  className="cursor-pointer p-2 hover:bg-[#f5f3fb] md:text-lg dark:hover:bg-[#2A1C78]"
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
                    <div className="absolute top-1/2 left-1/2 z-70 -translate-x-1/2 -translate-y-1/2 transform">
                      <div className="dark:border-secondary min-w-[160px] rounded-lg border-2 border-[#CDCDE9] bg-[#eeeded] p-4 text-center shadow-xl dark:bg-[#0C0D1C]">
                        <div className="mb-3">
                          <div className="text-sm font-semibold text-[#190E79] dark:text-white">
                            {actionTitle.toUpperCase()}?
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            className={`rounded-full px-6 py-2 text-sm font-bold text-[#190E79] dark:text-white ${
                              actionType === "unstake"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            onClick={() => {
                              console.log(
                                `${actionType} YES for position ${popup.positionId}`,
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
                            className="rounded-full bg-gray-600 px-6 py-2 text-sm font-bold text-[#190E79] hover:bg-gray-700 dark:text-white"
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
