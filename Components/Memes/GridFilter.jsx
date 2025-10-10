import React from "react";

function GridFilter({ variant = "default" }) {
  if (variant === "portfolio") {
    return (
      <div className="w-full flex flex-col mb-2 text-[#B0B3D6] text-sm font-medium border-b border-[#292B8C]">
        {/* Container 1: REVEAL BY and favorites */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C]">
          <div className="text-[#190E79] dark:text-white font-bold whitespace-nowrap">
            REVEAL BY:
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">⭐ favorites</span>
          </div>
        </div>

        {/* Container 2: any/creator/token and all/vests/locks/pools */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C]">
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">any</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">creator</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">token</span>
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">all</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">vests</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">locks</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">pools</span>
          </div>
        </div>

        {/* Container 3: Search */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#e0dff5] dark:bg-[#464794] text-[#190E79] dark:text-white px-3 py-3 rounded-none border-none text-xs"
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <>
      {/* Mobile/Tablet: Vertical layout */}
      <div className="w-full flex flex-col mb-2 text-[#B0B3D6] text-sm font-medium border-b border-[#292B8C] lg:hidden">
        {/* Row 1: TOKENS BY PLATFORM and favorites */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C]">
          <div className="text-[#190E79] dark:text-white font-bold whitespace-nowrap text-xs">
            TOKENS BY PLATFORM
          </div>
          <div className="whitespace-nowrap text-xs">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">⭐ favorites</span>
          </div>
        </div>

        {/* Row 2: Sort and Show */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C] text-xs">
          <div className="whitespace-nowrap">
            <span className="mr-2">sort:</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">time</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">a-z</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">size</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">price</span>
          </div>
          <div className="whitespace-nowrap">
            <span className="mr-2">show:</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">all</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">locks</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">pools</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">soon</span>
          </div>
        </div>

        {/* Row 3: Search */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#e0dff5] dark:bg-[#464794] text-[#190E79] dark:text-white px-3 py-3 rounded-none border-none text-xs"
          />
        </div>
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden lg:flex w-full items-center justify-between mb-2 text-[#B0B3D6] text-sm font-medium border-b border-[#292B8C]">
        {/* 1. Text: TOKENS BY PLATFORM */}
        <div className="text-[#190E79] dark:text-white whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
          TOKENS BY PLATFORM
        </div>

        {/* 2. Search */}
        <div className="flex-1 border-r border-[#292B8C] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#e0dff5] dark:bg-[#464794] text-[#190E79] dark:text-white px-3 py-5 rounded-none border border-[#292B8C] text-xs"
          />
        </div>

        {/* 3. Favorites */}
        <div className="whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">⭐ favorites</span>
        </div>

        {/* 4. Sort */}
        <div className="whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
          <span className="mr-2">sort:</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">time</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">a-z</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">size</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">price</span>
        </div>

        {/* 5. Show */}
        <div className="whitespace-nowrap px-4 py-3 flex items-center justify-center">
          <span className="mr-2">show:</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">all</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">locks</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">pools</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">soon</span>
        </div>
      </div>
    </>
  );
}

export default GridFilter;
