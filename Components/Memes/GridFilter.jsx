import React from "react";

function GridFilter({ variant = "default" }) {
  if (variant === "portfolio") {
    return (
      <div className="mb-2 flex w-full flex-col border-b border-[#292B8C] text-sm font-medium text-[#B0B3D6]">
        {/* Container 1: REVEAL BY and favorites */}
        <div className="flex items-center justify-between border-b border-[#292B8C] px-4 py-3">
          <div className="font-bold whitespace-nowrap text-[#190E79] dark:text-white">
            REVEAL BY:
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              ⭐ favorites
            </span>
          </div>
        </div>

        {/* Container 2: any/creator/token and all/vests/locks/pools */}
        <div className="flex items-center justify-between border-b border-[#292B8C] px-4 py-3">
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              any
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              creator
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              token
            </span>
          </div>
          <div className="whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              all
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              vests
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              locks
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              pools
            </span>
          </div>
        </div>

        {/* Container 3: Search */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-none border-none bg-[#e0dff5] px-3 py-3 text-xs text-[#190E79] dark:bg-[#464794] dark:text-white"
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <>
      {/* Mobile/Tablet: Vertical layout */}
      <div className="mb-2 flex w-full flex-col border-b border-[#292B8C] text-sm font-medium text-[#B0B3D6] lg:hidden">
        {/* Row 1: TOKENS BY PLATFORM and favorites */}
        <div className="flex items-center justify-between border-b border-[#292B8C] px-4 py-3">
          <div className="text-xs font-bold whitespace-nowrap text-[#190E79] dark:text-white">
            TOKENS BY PLATFORM
          </div>
          <div className="text-xs whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              ⭐ favorites
            </span>
          </div>
        </div>

        {/* Row 2: Sort and Show */}
        <div className="flex items-center justify-between border-b border-[#292B8C] px-4 py-3 text-xs">
          <div className="whitespace-nowrap">
            <span className="mr-2">sort:</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              time
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              a-z
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              size
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              price
            </span>
          </div>
          <div className="whitespace-nowrap">
            <span className="mr-2">show:</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              all
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              locks
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              pools
            </span>
            <span className="mx-1">|</span>
            <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
              soon
            </span>
          </div>
        </div>

        {/* Row 3: Search */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-none border-none bg-[#e0dff5] px-3 py-3 text-xs text-[#190E79] dark:bg-[#464794] dark:text-white"
          />
        </div>
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="mb-2 hidden w-full items-center justify-between border-b border-[#292B8C] text-sm font-medium text-[#B0B3D6] lg:flex">
        {/* 1. Text: TOKENS BY PLATFORM */}
        <div className="flex items-center justify-center border-r border-[#292B8C] px-4 py-3 whitespace-nowrap text-[#190E79] dark:text-white">
          TOKENS BY PLATFORM
        </div>

        {/* 2. Search */}
        <div className="flex flex-1 items-center justify-center border-r border-[#292B8C]">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-none border border-[#292B8C] bg-[#e0dff5] px-3 py-5 text-xs text-[#190E79] dark:bg-[#464794] dark:text-white"
          />
        </div>

        {/* 3. Favorites */}
        <div className="flex items-center justify-center border-r border-[#292B8C] px-4 py-3 whitespace-nowrap">
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            ⭐ favorites
          </span>
        </div>

        {/* 4. Sort */}
        <div className="flex items-center justify-center border-r border-[#292B8C] px-4 py-3 whitespace-nowrap">
          <span className="mr-2">sort:</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            time
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            a-z
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            size
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            price
          </span>
        </div>

        {/* 5. Show */}
        <div className="flex items-center justify-center px-4 py-3 whitespace-nowrap">
          <span className="mr-2">show:</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            all
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            locks
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            pools
          </span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:text-[#190E79] dark:text-white">
            soon
          </span>
        </div>
      </div>
    </>
  );
}

export default GridFilter;
