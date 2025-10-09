import React, { useState, useRef, useEffect } from "react";

function Details() {
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    positionId: null,
  });

  const scrollContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
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

  const updateScrollIndicator = () => {
    if (!scrollContainerRef.current || !scrollIndicatorRef.current) return;

    const container = scrollContainerRef.current;
    const indicator = scrollIndicatorRef.current;

    if (container.scrollHeight <= container.clientHeight) {
      indicator.style.display = "none";
      return;
    }

    indicator.style.display = "block";
    const scrollPercentage =
      container.scrollTop / (container.scrollHeight - container.clientHeight);
    const trackHeight = container.clientHeight;
    const thumbHeight = Math.max(
      (container.clientHeight / container.scrollHeight) * trackHeight,
      20
    );
    const maxTop = trackHeight - thumbHeight;

    indicator.style.height = `${thumbHeight}px`;
    indicator.style.top = `${scrollPercentage * maxTop}px`;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout;
    let animationFrame;

    const handleScroll = () => {
      // Update indicator immediately without lag
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateScrollIndicator);

      // Handle snap with timeout
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollSnap, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollIndicator();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div>
      <div className="mx-6 border-2 border-t-0 border-secondary">
        <div className="bg-gradient-to-r from-[#2f01ba] to-[#0C0D1C] px-4 py-3">
          <h2 className="text-xl font-medium">Details</h2>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 bg-[#f5f3fb] dark:bg-[#2A1C78] text-[#190E79] dark:text-white text-sm font-semibold">
          <div className="justify-center items-center flex border-y border-secondary py-2">
            <span className="text-red-500">/-Un/</span>Staked (Period)
          </div>
          <div className="hidden justify-center items-center text-center md:flex border-1 border-secondary">
            select position to unstake
            <br />
            or claim reward
          </div>
          <div className="justify-center items-center flex border-y border-secondary">
            Rewards (Last)
          </div>
        </div>

        {/* Container with fixed background */}
        <div className="relative max-h-[440px]">
          {/* Mini scrollbar indicator */}
          <div className="absolute right-2 top-0 bottom-0 w-0.5 z-30">
            <div className="absolute -left-1 top-0 bottom-0 w-px bg-secondary"></div>
            <div className="w-0.5 h-full bg-gray-700/20 rounded-full relative">
              <div
                ref={scrollIndicatorRef}
                className="absolute right-0 w-0.5 bg-purple-500 mt-2 mb-4 rounded-full"
                style={{ minHeight: "15px", transition: "none" }}
              ></div>
            </div>
          </div>

          {/* Fixed continuous middle column background */}
          <div className="absolute inset-0 grid grid-cols-3 z-0">
            <div></div>
            <div className="hidden md:block bg-gradient-to-b from-[#4000FF] to-[#0C0D1C] border-x border-secondary"></div>
            <div></div>
          </div>

          {/* Data Rows Container with scroll in third column */}
          <div
            ref={scrollContainerRef}
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
            {[
              {
                id: 1,
                staked: "700,484,120.00",
                period: "32d 04h",
                rewards: "4,120.00",
                rewardsSub: "521",
              },
              {
                id: 2,
                staked: "700,484,120.00",
                period: "32d 04h",
                rewards: "4,120.00",
                rewardsSub: "3200",
                highlight: true,
              },
              {
                id: 3,
                staked: "70,484,120.00",
                period: "02d 04h",
                rewards: "84,120.00",
                rewardsSub: "430",
              },
              {
                id: 4,
                staked: "22,484,120.00",
                period: "32d 04h",
                rewards: "22,4,120.00",
                rewardsSub: "2342",
              },
              {
                id: 5,
                staked: "0.00",
                period: "0",
                rewards: "10,120.00",
                rewardsSub: "120",
              },
              {
                id: 6,
                staked: "700,484,120.00",
                period: "2d 04h",
                rewards: "700,484,120.00",
                rewardsSub: "450",
              },
              {
                id: 7,
                staked: "700,484,120.00",
                period: "2d 04h",
                rewards: "700,120.00",
                rewardsSub: "120,000",
              },
              {
                id: 8,
                staked: "500,484,120.00",
                period: "15d 08h",
                rewards: "15,320.00",
                rewardsSub: "890",
              },
              {
                id: 9,
                staked: "300,484,120.00",
                period: "7d 12h",
                rewards: "8,450.00",
                rewardsSub: "245",
              },
              {
                id: 10,
                staked: "150,200,000.00",
                period: "45d 02h",
                rewards: "25,800.00",
                rewardsSub: "1,200",
              },
              {
                id: 11,
                staked: "850,350,500.00",
                period: "12d 18h",
                rewards: "12,750.00",
                rewardsSub: "680",
              },
              {
                id: 12,
                staked: "92,120,800.00",
                period: "8d 06h",
                rewards: "3,900.00",
                rewardsSub: "185",
              },
            ].map((position, index) => (
              <div
                key={position.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`grid grid-cols-2 md:grid-cols-3 text-sm border-purple-300 relative ${
                  position.highlight ? "" : ""
                }`}
              >
                <div className="flex cursor-pointer">
                  <div className="flex items-center justify-center border-r border-secondary mx-auto min-w-[30px]">
                    <span className="text-sm font-semibold text-[#190E79] dark:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div
                    className="flex-1 text-center md:text-lg p-2 hover:bg-[#f5f3fb] dark:hover:bg-[#2A1C78]"
                    onClick={() =>
                      setPopup({
                        show: true,
                        type: "unstake",
                        positionId: position.id,
                      })
                    }
                  >
                    <div className="font-semibold">{position.staked}</div>
                    <div className="text-purple-300 text-xs md:text-sm">
                      ({position.period})
                    </div>
                  </div>
                </div>
                <div className="hidden md:block text-center relative">
                  {/* Empty middle column for desktop */}
                </div>
                {/* Popup positioned absolutely - works on both mobile and desktop */}
                {popup.show && popup.positionId === position.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                    {/* Connecting line - left side for unstake (first column) */}
                    {popup.type === "unstake" && (
                      <div className="absolute top-1/2 right-full w-8 h-px bg-purple-400 transform -translate-y-1/2"></div>
                    )}
                    {/* Connecting line - right side for claim (third column) */}
                    {popup.type === "claim" && (
                      <div className="absolute top-1/2 left-full w-8 h-px bg-purple-400 transform -translate-y-1/2"></div>
                    )}
                    <div className="bg-[#eeeded] dark:bg-[#0C0D1C] border-2 border-secondary rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                      <div className="mb-3">
                        <div className="text-[#190E79] dark:text-white text-sm font-semibold">
                          {popup.type === "unstake" ? "UNSTAKE?" : "CLAIM?"}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          className={`px-6 py-2 rounded-full text-[#190E79] dark:text-white font-bold text-sm ${
                            popup.type === "unstake"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          onClick={() => {
                            console.log(
                              `${popup.type} YES for position ${popup.positionId}`
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
                          className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-[#190E79] dark:text-white font-bold text-sm"
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
                  className="text-center cursor-pointer hover:bg-[#f5f3fb] dark:hover:bg-[#2A1C78] border-r border-secondary md:text-lg mr-3"
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
              </div>
            ))}
          </div>
        </div>

        {/* History Button */}
        <div className="bg-[#f5f3fb] dark:bg-[#2A1C78] border-y-1 border-secondary px-4 py-1 text-center relative z-50 mb-2">
          <button className="text-[#190E79] dark:text-white font-semibold">▼ History</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
