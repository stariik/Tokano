import React, { useState, useRef, useEffect } from "react";
import { stakingPositions } from "@/data/stakingPositions";

function Details() {
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    positionId: null,
  });

  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleScrollSnap = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const itemHeight = itemRefs.current[0]?.offsetHeight || 0;

    if (itemHeight === 0) return;

    const currentIndex = Math.round(scrollTop / itemHeight);
    const targetScrollTop = currentIndex * itemHeight;

    if (Math.abs(scrollTop - targetScrollTop) > 5) {
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout;

    const handleScroll = () => {
      // Handle snap with timeout
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollSnap, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div>
      <div className="dark:border-secondary border-2  border-[#CDCDE9]">
        <div className="bg-gradient-to-r from-[#9876ffa3] to-white px-4 py-1 xl:py-2 2xl:py-3 dark:from-[#2f01ba] dark:to-[#0C0D1C]">
          <h2 className="text-xl">Details</h2>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-2 bg-white font-semibold text-[#190E79] md:grid-cols-3 text-xs 2xl:text-sm dark:bg-[#2A1C78] dark:text-white">
          <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9] bg-[#4244C4] py-2 text-white dark:bg-[#2A1C78]">
            <span className="text-red-500">/-Un/</span>Staked (Period)
          </div>
          <div className="dark:border-secondary hidden items-center justify-center border-1 border-[#CDCDE9] text-center md:flex">
            select position to unstake
            <br />
            or claim reward
          </div>
          <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9] bg-[#4244C4] text-white dark:bg-[#2A1C78]">
            Rewards (Last)
          </div>
        </div>

        {/* Container with fixed background */}
        <div className="relative max-h-[440px]">
          {/* Fixed continuous middle column background */}
          <div className="absolute inset-0 z-0 grid grid-cols-3">
            <div></div>
            <div className="dark:border-secondary hidden border-x border-[#CDCDE9] bg-gradient-to-b from-white to-[#e7e7e7] md:block dark:from-[#4000FF] dark:to-[#0C0D1C]"></div>
            <div></div>
          </div>

          {/* Data Rows Container with scroll in third column */}
          <div
            ref={scrollContainerRef}
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
            {stakingPositions.map((position, index) => (
              <div
                key={position.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative grid grid-cols-2 border-purple-300 text-sm md:grid-cols-3 ${
                  position.highlight ? "" : ""
                }`}
              >
                <div className="flex cursor-pointer">
                  <div className="dark:border-secondary mx-auto flex min-w-[30px] lg:min-w-[16px] items-center justify-center border-r border-[#CDCDE9]">
                    <span className="text-sm font-semibold text-[#190E79] dark:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div
                    className="flex-1 p-2 text-center hover:bg-[#f5f3fb] text-sm 2xl:text-lg dark:hover:bg-[#2A1C78]"
                    onClick={() =>
                      setPopup({
                        show: true,
                        type: "unstake",
                        positionId: position.id,
                      })
                    }
                  >
                    <div className="">{position.staked}</div>
                    <div className="text-xs text-purple-300 md:text-sm">
                      ({position.period})
                    </div>
                  </div>
                </div>
                <div className="relative hidden text-center md:block">
                  {/* Empty middle column for desktop */}
                </div>
                {/* Popup positioned absolutely - works on both mobile and desktop */}
                {popup.show && popup.positionId === position.id && (
                  <div className="absolute top-1/2 left-1/2 z-70 -translate-x-1/2 -translate-y-1/2 transform">
                    {/* Connecting line - left side for unstake (first column) */}
                    {popup.type === "unstake" && (
                      <div className="absolute top-1/2 right-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>
                    )}
                    {/* Connecting line - right side for claim (third column) */}
                    {popup.type === "claim" && (
                      <div className="absolute top-1/2 left-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>
                    )}
                    <div className="dark:border-secondary min-w-[160px] rounded-lg border-2 border-[#CDCDE9] bg-[#eeeded] p-4 text-center shadow-xl dark:bg-[#0C0D1C]">
                      <div className="mb-3">
                        <div className="text-sm font-semibold text-[#190E79] dark:text-white">
                          {popup.type === "unstake" ? "UNSTAKE?" : "CLAIM?"}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          className={`rounded-full px-6 py-2 text-sm font-bold text-white ${
                            popup.type === "unstake"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          onClick={() => {
                            console.log(
                              `${popup.type} YES for position ${popup.positionId}`,
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
                          className="rounded-full bg-gray-600 px-6 py-2 text-sm font-bold text-white hover:bg-gray-700"
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
                <div
                  className="dark:border-secondary cursor-pointer border-r border-[#CDCDE9] text-center text-sm 2xl:text-lg"
                  onClick={() =>
                    setPopup({
                      show: true,
                      type: "claim",
                      positionId: position.id,
                    })
                  }
                >
                  <div className="v">{position.rewards}</div>
                  <div className="text-xs text-purple-300 md:text-sm">
                    ({position.rewardsSub})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Button */}
        <div className="dark:border-secondary relative z-50 mb-2 border-y-1 border-[#CDCDE9] bg-[#4244C4] px-4 py-1 text-center dark:bg-[#2A1C78]">
          <button className="font-semibold text-white">▼ History</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
