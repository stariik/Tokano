import React from "react";

function GridFilter({ variant = "default" }) {
  if (variant === "portfolio") {
    return (
      <div className="w-full flex flex-col mb-2 text-[#B0B3D6] text-sm font-medium border-b border-[#292B8C]">
        {/* Container 1: REVEAL BY and favorites */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C]">
          <div className="text-white font-bold whitespace-nowrap">
            REVEAL BY:
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-white">⭐ favorites</span>
          </div>
        </div>

        {/* Container 2: any/creator/token and all/vests/locks/pools */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#292B8C]">
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-white">any</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-white">creator</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-white">token</span>
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-white">all</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-white">vests</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-white">locks</span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-white">pools</span>
          </div>
        </div>

        {/* Container 3: Search */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#464794] text-white px-3 py-3 rounded-none border-none text-xs"
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full flex items-center justify-between mb-2 text-[#B0B3D6] text-sm font-medium border-b border-[#292B8C]">
      {/* 1. Text: TOKENS BY PLATFORM */}
      <div className="text-white font-bold whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
        TOKENS BY PLATFORM
      </div>

      {/* 2. Search */}
      <div className="flex-1 border-r border-[#292B8C] flex items-center justify-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#464794] text-white px-3 py-5 rounded-none border border-[#292B8C] text-xs"
        />
      </div>

      {/* 3. Favorites */}
      <div className="whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
        <span className="cursor-pointer hover:text-white">⭐ favorites</span>
      </div>

      {/* 4. Sort */}
      <div className="whitespace-nowrap px-4 py-3 border-r border-[#292B8C] flex items-center justify-center">
        <span className="mr-2">sort:</span>
        <span className="cursor-pointer hover:text-white">time</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">a-z</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">size</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">price</span>
      </div>

      {/* 5. Show */}
      <div className="whitespace-nowrap px-4 py-3 flex items-center justify-center">
        <span className="mr-2">show:</span>
        <span className="cursor-pointer hover:text-white">all</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">locks</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">pools</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">soon</span>
      </div>
    </div>
  );
}

export default GridFilter;
