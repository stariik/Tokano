import React, { useState, useRef, useEffect } from "react";

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
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollSnap, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div>
      <div className="mx-6 mt-4 border-2 border-secondary rounded">
        <div className="bg-gradient-to-r from-[#4000FF] to-[#27224100] px-4 py-3">
          <h2 className="text-xl font-medium">Details</h2>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-3 bg-[#2A1C78] text-white text-sm font-semibold">
          <div className="justify-center items-center flex border-y border-secondary"><span className="text-red-500">/-Un/</span>Staked (Period)</div>
          <div className="justify-center items-center text-center flex border-1 border-secondary">
            select position to unstake
            <br />
            or claim reward
          </div>
          <div className="justify-center items-center flex border-y border-secondary">Rewards (Last)</div>
        </div>

        {/* Scrollable Data Rows Container */}
        <div
          ref={scrollContainerRef}
          className="max-h-[440px] overflow-y-auto"
          style={{
            scrollBehavior: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#A855F7 transparent'
          }}
        >
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
          ].map((position, index) => (
            <div
              key={position.id}
              ref={el => itemRefs.current[index] = el}
              className={`grid grid-cols-3 text-sm border-purple-300 ${
                position.highlight ? "" : ""
              }`}
            >
              <div
                className="text-center md:text-lg cursor-pointer hover:bg-purple-500 p-2 border-x border-secondary"
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
              <div className="text-center relative">
                {/* Empty middle column with popup positioning */}
                {popup.show && popup.positionId === position.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                    <div className="bg-purple-900 border-2 border-purple-600 rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                      <div className="mb-3">
                        <div className="text-white text-sm font-semibold">
                          {popup.type === "unstake" ? "UNSTAKE?" : "CLAIM?"}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          className={`px-6 py-2 rounded-full text-white font-bold text-sm ${
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
              <div
                className="text-center cursor-pointer hover:bg-purple-500 border-x border-secondary md:text-lg"
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

        {/* History Button */}
        <div className="bg-purple-700 px-4 py-2 text-center">
          <button className="text-white font-semibold">▼ History</button>
        </div>
      </div>

      {/* Background Overlay for Popup */}
      {popup.show && (
        <div
          className="fixed inset-0 bg-black/30 z-60"
          onClick={() => setPopup({ show: false, type: "", positionId: null })}
        />
      )}
    </div>
  );
}

export default Details;
