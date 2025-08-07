import React from "react";

function GridFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-2 px-1 text-[#B0B3D6] text-sm font-medium">
      <div>
        <span className="mr-2">sort:</span>
        <span className="cursor-pointer hover:text-white">time</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">a-z</span>
      </div>
      <div>
        <span className="mr-2">view:</span>
        <span className="cursor-pointer hover:text-white">list</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">grid</span>
      </div>
      <div>
        <span className="mr-2">filter:</span>
        <span className="cursor-pointer hover:text-white">all</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">m-cap</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">volume</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">staked</span>
        <span className="mx-1">|</span>
        <span className="cursor-pointer hover:text-white">locked</span>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="ml-auto bg-[#303133] text-white px-2 py-1 rounded border border-[#292B8C] text-xs"
      />
    </div>
  );
}

export default GridFilter;
