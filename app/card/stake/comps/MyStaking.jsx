"use client";
import React, { useState, useRef, useEffect } from "react";
import { stakingPositions } from "/data/data.js";
import UnifiedStakingTables from "./UnifiedStakingTables";

function MyStaking() {
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
      20,
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
    <div className="font-khand mt-6 rounded-2xl border-2 border-[#CDCDE9] dark:border-secondary text-[#190E79] dark:text-white">
      <div className="flex items-center justify-between gap-8 rounded-t-2xl bg-gradient-to-r px-4 py-3 dark:from-[#2f01ba] dark:to-[#0C0D1C]">
        <div className="flex w-full justify-between">
          <h2 className="text-xl font-medium">My Staking </h2>
          <h2 className="text-xl font-bold">FIRED</h2>
        </div>
        <div className="flex w-full">
          <h2 className="px-auto ml-6 text-xl font-medium">show:</h2>
          <h2 className="border-r-1 text-xl font-medium">
            <div className="cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300">
              all
            </div>
          </h2>
          <h2 className="border-r-1 text-xl font-medium">
            <div className="cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300">
              staked
            </div>
          </h2>
          <h2 className="text-xl font-medium">
            <div className="cursor-pointer rounded px-2 transition hover:text-purple-600 dark:hover:text-purple-300">
              unstaked
            </div>
          </h2>
        </div>
      </div>

      {/* Two Side-by-Side Tables */}
      <div className="relative">
        {/* Mini scrollbar indicator - moved to the very right */}
        <div className="absolute top-[60px] right-2 bottom-0 z-30 w-0.5">
          <div className="bg-secondary absolute top-0 bottom-0 -left-1 w-px"></div>
          <div className="relative h-full w-0.5 rounded-full bg-gray-700/20">
            <div
              ref={scrollIndicatorRef}
              className="absolute right-0 mb-4 w-0.5 rounded-full bg-purple-500"
              style={{ minHeight: "15px", transition: "none" }}
            ></div>
          </div>
        </div>

        <UnifiedStakingTables
          data={stakingPositions}
          popup={popup}
          setPopup={setPopup}
          scrollRef={scrollContainerRef}
          itemRefs={itemRefs}
        />

        {/* History Button */}
        <div className="border-[#CDCDE9] dark:border-secondary relative z-10 mb-2 border-y-1 bg-[#f5f3fb] px-4 py-1 text-center dark:bg-[#2A1C78]">
          <button className="font-semibold text-[#190E79] dark:text-white">
            ▼ History
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyStaking;
