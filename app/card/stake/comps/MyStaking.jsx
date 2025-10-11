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
    <div className="mt-6 border-2 border-secondary rounded-2xl text-[#190E79] dark:text-white">
      <div className="bg-gradient-to-r dark:from-[#2f01ba] dark:to-[#0C0D1C] px-4 py-3 rounded-t-2xl">
        <h2 className="text-xl font-medium">Details</h2>
      </div>

      {/* Two Side-by-Side Tables */}
      <div className="relative">
        {/* Mini scrollbar indicator - moved to the very right */}
        <div className="absolute right-2 top-[60px] bottom-0 w-0.5 z-30">
          <div className="absolute -left-1 top-0 bottom-0 w-px bg-secondary"></div>
          <div className="w-0.5 h-full bg-gray-700/20 rounded-full relative">
            <div
              ref={scrollIndicatorRef}
              className="absolute right-0 w-0.5 bg-purple-500  mb-4 rounded-full"
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
        <div className="bg-[#f5f3fb] dark:bg-[#2A1C78] border-y-1 border-secondary px-4 py-1 text-center relative z-10 mb-2">
          <button className="text-[#190E79] dark:text-white font-semibold">▼ History</button>
        </div>
      </div>
    </div>
  );
}

export default MyStaking;
