import React, { useState, useRef, useEffect } from "react";
import { stakingPositions } from "@/data/stakingPositions";

const TokanoHeader = () => (
  <svg
    width="179"
    height="35"
    viewBox="0 0 179 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M158.273 18.0971C158.273 19.75 158.618 21.2308 159.306 22.5393C160.018 23.8249 160.994 24.835 162.233 25.5697C163.473 26.3043 164.885 26.6716 166.469 26.6716C168.076 26.6716 169.488 26.3043 170.705 25.5697C171.944 24.835 172.908 23.8249 173.597 22.5393C174.309 21.2308 174.665 19.75 174.665 18.0971C174.665 16.4442 174.32 14.9749 173.632 13.6893C172.943 12.3808 171.979 11.3592 170.739 10.6245C169.522 9.88991 168.099 9.52259 166.469 9.52259C164.885 9.52259 163.473 9.88991 162.233 10.6245C160.994 11.3592 160.018 12.3808 159.306 13.6893C158.618 14.9749 158.273 16.4442 158.273 18.0971ZM153.969 18.0971C153.969 16.2835 154.279 14.6191 154.899 13.1039C155.518 11.5887 156.391 10.2802 157.516 9.17823C158.664 8.05333 159.995 7.18096 161.51 6.56111C163.048 5.94127 164.701 5.63135 166.469 5.63135C168.283 5.63135 169.947 5.94127 171.462 6.56111C172.977 7.18096 174.297 8.05333 175.422 9.17823C176.57 10.2802 177.454 11.5887 178.074 13.1039C178.694 14.6191 179.004 16.2835 179.004 18.0971C179.004 19.8878 178.694 21.5522 178.074 23.0903C177.454 24.6284 176.582 25.9599 175.457 27.0848C174.332 28.2097 173 29.0936 171.462 29.7364C169.947 30.3562 168.283 30.6662 166.469 30.6662C164.678 30.6662 163.014 30.3562 161.476 29.7364C159.938 29.0936 158.606 28.2097 157.481 27.0848C156.379 25.9599 155.518 24.6284 154.899 23.0903C154.279 21.5522 153.969 19.8878 153.969 18.0971Z"
      fill="#464B7E"
    />
    <path
      d="M146.8 6.04436H150.794V31.3547L133.198 13.9646V30.1494H129.203V4.83911L146.8 22.2292V6.04436Z"
      fill="#464B7E"
    />
    <path
      d="M109.112 23.9508L109.87 20.5072H121.061L121.853 23.9508H109.112ZM115.414 12.8625L111.626 21.7124L111.557 22.6078L108.217 30.1492H103.637L115.414 4.70117L127.191 30.1492H122.611L119.339 22.8144L119.236 21.8158L115.414 12.8625Z"
      fill="#464B7E"
    />
    <path
      d="M85.6875 6.0437H89.8542V30.1488H85.6875V6.0437ZM98.8075 6.0437H103.697L93.5389 17.3386L104.214 30.1488H99.2208L88.6145 17.4419L98.8075 6.0437Z"
      fill="#464B7E"
    />
    <path
      d="M61.8006 18.0971C61.8006 19.75 62.1449 21.2308 62.8336 22.5393C63.5453 23.8249 64.521 24.835 65.7607 25.5697C67.0004 26.3043 68.4122 26.6716 69.9963 26.6716C71.6033 26.6716 73.0152 26.3043 74.2319 25.5697C75.4716 24.835 76.4358 23.8249 77.1245 22.5393C77.8362 21.2308 78.192 19.75 78.192 18.0971C78.192 16.4442 77.8476 14.9749 77.1589 13.6893C76.4702 12.3808 75.506 11.3592 74.2663 10.6245C73.0496 9.88991 71.6262 9.52259 69.9963 9.52259C68.4122 9.52259 67.0004 9.88991 65.7607 10.6245C64.521 11.3592 63.5453 12.3808 62.8336 13.6893C62.1449 14.9749 61.8006 16.4442 61.8006 18.0971ZM57.4961 18.0971C57.4961 16.2835 57.806 14.6191 58.4259 13.1039C59.0457 11.5887 59.9181 10.2802 61.043 9.17823C62.1908 8.05333 63.5224 7.18096 65.0375 6.56111C66.5757 5.94127 68.2286 5.63135 69.9963 5.63135C71.8099 5.63135 73.4743 5.94127 74.9895 6.56111C76.5046 7.18096 77.8247 8.05333 78.9496 9.17823C80.0974 10.2802 80.9813 11.5887 81.6011 13.1039C82.221 14.6191 82.5309 16.2835 82.5309 18.0971C82.5309 19.8878 82.221 21.5522 81.6011 23.0903C80.9813 24.6284 80.1089 25.9599 78.984 27.0848C77.8591 28.2097 76.5276 29.0936 74.9895 29.7364C73.4743 30.3562 71.8099 30.6662 69.9963 30.6662C68.2056 30.6662 66.5412 30.3562 65.0031 29.7364C63.465 29.0936 62.1334 28.2097 61.0085 27.0848C59.9066 25.9599 59.0457 24.6284 58.4259 23.0903C57.806 21.5522 57.4961 19.8878 57.4961 18.0971Z"
      fill="#464B7E"
    />
    <path
      d="M41.6172 9.7972V6.0437H58.4218V9.7972H52.0512V30.1488H47.9534V9.7972H41.6172Z"
      fill="#464B7E"
    />
    <circle
      cx="15.191"
      cy="15.191"
      r="15.191"
      transform="matrix(-1 0 0 1 32.3828 2)"
      stroke="#464B7E"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M25.2405 17.7766C25.2058 17.7464 25.1612 17.7297 25.1151 17.7297H9.48529C9.43913 17.7297 9.39456 17.7464 9.35991 17.7766L5.83705 20.8481C5.70568 20.9627 5.78744 21.1773 5.96242 21.1773H28.638C28.8129 21.1773 28.8947 20.9627 28.7633 20.8481L25.2405 17.7766Z"
      fill="#464B7E"
    />
    <path
      d="M25.2678 12.2974C25.2332 12.2672 25.1886 12.2505 25.1424 12.2505H9.51263C9.46648 12.2505 9.42191 12.2672 9.38725 12.2974L5.86439 15.3689C5.73302 15.4834 5.81478 15.6981 5.98976 15.6981H28.6653C28.8403 15.6981 28.922 15.4834 28.7907 15.3689L25.2678 12.2974Z"
      fill="#464B7E"
    />
    <path
      d="M22.418 9.44277C22.418 9.30664 22.3351 9.19629 22.2328 9.19629H18.7142C18.6119 9.19629 18.529 9.30664 18.529 9.44277V12.8388C18.529 12.9749 18.6119 13.0852 18.7142 13.0852H22.2328C22.3351 13.0852 22.418 12.9749 22.418 12.8388V9.44277Z"
      fill="#464B7E"
    />
    <path
      d="M16.1953 9.6598C16.1953 9.51006 16.1124 9.38867 16.0101 9.38867H12.4915C12.3893 9.38867 12.3064 9.51006 12.3064 9.6598V13.3954C12.3064 13.5451 12.3893 13.6665 12.4915 13.6665H16.0101C16.1124 13.6665 16.1953 13.5451 16.1953 13.3954V9.6598Z"
      fill="#464B7E"
    />
    <path
      d="M22.3633 19.9479C22.3633 19.7941 22.2415 19.6694 22.0913 19.6694H12.5079C12.3577 19.6694 12.2359 19.7941 12.2359 19.9479V22.9463C12.2359 23.1001 12.3577 23.2248 12.5079 23.2248H22.0913C22.2415 23.2248 22.3633 23.1001 22.3633 22.9463V19.9479Z"
      fill="#464B7E"
    />
  </svg>
);


function Details() {
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    positionId: null,
  });

  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

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

  // Calculate popup position based on clicked item
  const getPopupPosition = () => {
    if (!popup.show || !itemRefs.current.length || !containerRef.current) return {};

    const positionIndex = stakingPositions.findIndex(p => p.id === popup.positionId);
    if (positionIndex === -1) return {};

    const itemElement = itemRefs.current[positionIndex];
    const containerElement = containerRef.current;

    if (!itemElement || !containerElement) return {};

    const itemRect = itemElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();

    const top = itemRect.top - containerRect.top + itemRect.height / 2;

    return {
      top: `${top}px`,
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <div>
      <div className="dark:border-secondary border-2 border-[#CDCDE9]">
        <div className="bg-gradient-to-r from-[#9876ffa3] to-white px-4 py-1 xl:py-2 2xl:py-3 dark:from-[#2f01ba] dark:to-[#0C0D1C]">
          <h2 className="text-xl">Details</h2>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-2 bg-white text-xs font-semibold text-[#190E79] md:grid-cols-3 2xl:text-sm dark:bg-[#2A1C78] dark:text-white">
          <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9] bg-[#4244C4] py-2 text-white dark:bg-[#2A1C78]">
            <span className="text-red-500">/-Un/</span>Staked (Period)
          </div>
          <div className="dark:border-secondary hidden items-center justify-center border-1 border-[#CDCDE9] text-center md:flex">
            select position to unstake
            or claim reward
          </div>
          <div className="dark:border-secondary flex items-center justify-center border-y border-[#CDCDE9] bg-[#4244C4] text-white dark:bg-[#2A1C78]">
            Rewards (Last)
          </div>
        </div>

        {/* Container with fixed background */}
        <div ref={containerRef} className="relative max-h-[440px]">
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
              pointerEvents: popup.show ? "none" : "auto",
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
                  <div className="dark:border-secondary mx-auto flex min-w-[30px] items-center justify-center border-r border-[#CDCDE9] lg:min-w-[16px]">
                    <span className="text-sm font-semibold text-[#190E79] dark:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div
                    className="flex-1 p-2 text-center text-sm hover:bg-[#f5f3fb] 2xl:text-lg dark:hover:bg-[#2A1C78]"
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

          {/* Popup rendered outside scroll container */}
          {popup.show && (
            <div
              className="absolute z-50"
              style={getPopupPosition()}
            >
              {/* Connecting line - left side for unstake (first column) */}
              {popup.type === "unstake" && (
                <div className="absolute top-1/2 right-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>
              )}
              {/* Connecting line - right side for claim (third column) */}
              {popup.type === "claim" && (
                <div className="absolute top-1/2 left-full h-px w-8 -translate-y-1/2 transform bg-purple-400"></div>
              )}
              <div className="dark:border-secondary min-w-[100px] rounded-lg border-2 border-[#CDCDE9] bg-[#eeeded] p-2 text-center shadow-xl dark:bg-[#0C0D1C]">
                <div className="mb-2">
                  <div className="text-xs font-semibold text-[#190E79] dark:text-white">
                    {popup.type === "unstake" ? "UNSTAKE?" : "CLAIM?"}
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <button
                    className={`rounded-full px-4 py-1 text-xs font-bold text-white ${
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
                    className="rounded-full bg-gray-600 px-4 py-1 text-xs font-bold text-white hover:bg-gray-700"
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

        {/* History Button */}
        <div className="dark:border-secondary flex justify-center relative mb-2 border-y-1 border-[#CDCDE9] bg-[#f5f3fb] px-4 py-1 text-center dark:bg-[#140b2a]">
          {/* <button className="font-semibold text-white">▼ History</button> */}
          <TokanoHeader />
        </div>
      </div>
    </div>
  );
}

export default Details;
