"use client";

import React from "react";
import { Khand } from "next/font/google";
import { CiPill } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });

const StakingCard = ({ data }) => {
  // This is mock data, replace with API data later
  const mockData = {
    name: "YOU'RE FIRED (FIRED)",
    poolId: "0x4v49...hssdas",
    creator: "0x4v49...hssdas",
    tokenId: "0xfca9...bfed1d",
    marketCap: "$4.3K",
    stakingEnds: "2d-12-45",
    rewards: "56",
    stakers: "21",
    longest: "10d",
    largest: "100k",
    timestamp: "21.04.25 | 12:43",
  };

  const {
    name,
    poolId,
    creator,
    tokenId,
    marketCap,
    stakingEnds,
    rewards,
    stakers,
    longest,
    largest,
    timestamp,
  } = data || mockData;

  return (
    <div className="w-full bg-[#2A1F63] rounded-[32px] relative overflow-hidden p-4">
      {/* Social Links */}
      {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button className="bg-[#229ED9] p-2 rounded-full">
          <FaTelegramPlane className="w-4 h-4 text-white" />
        </button>
        <button className="bg-black p-2 rounded-full">
          <FaXTwitter className="w-4 h-4 text-white" />
        </button>
        <button className="bg-[#5951CE] p-2 rounded-full">
          <TbWorld className="w-4 h-4 text-white" />
        </button>
      </div> */}

      {/* Timestamp */}
      {/* <div className="absolute top-4 right-4 bg-[#2B923E] text-white text-sm px-3 py-1 rounded-l-xl">
        {timestamp}
      </div> */}

      {/* Token Info */}
      <div className="flex items-start justify-center w-full gap-6 mt-6">
        <div className="rounded-2xl p-3">
          <img src="/fired.png" alt="Token Logo" className="w-40 h-40" />
        </div>
        <div className="flex-1 ">
          <h2 className={`text-white text-4xl mb-2 ${khandSemibold.className}`}>
            {name}
          </h2>
          <div className="grid gap-1 text-white">
            <p>
              Pool ID: <span className="opacity-80">{poolId}</span>
            </p>
            <p>
              Creator: <span className="opacity-80">{creator}</span>
            </p>
            <p>
              Token ID: <span className="opacity-80">{tokenId}</span>
            </p>
            <p>
              Market Cap: <span className="opacity-80">{marketCap}</span>
            </p>
          </div>
        </div>
        <div className="absolute top-4 right-16">
          <CiPill className="w-6 h-6 text-[#5ECB89]" />
        </div>
      </div>

      {/* Staking Progress */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#2A1F63]" />
            </div>
            <span className="text-white text-xl">STAKING POOL</span>
          </div>
          <span className="text-white">ENDS | {stakingEnds} |</span>
        </div>
        <div className="relative h-3 mt-2">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00F5FF]" />
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3DCD] to-[#FF3DCD]"
            style={{ width: `${rewards}%` }}
          />
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-white">REWARDS |{rewards}%|</span>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[#FFB01C] text-6xl font-bold">{stakers}</div>
          <div className="text-white text-2xl -mt-2">stakers</div>
        </div>
        <div className="text-right">
          <div className="text-white text-sm">
            Longest: {longest} | Largest: {largest}
          </div>
        </div>
      </div>

      {/* Background Star */}
      <div className="absolute top-12 right-12">
        <svg
          className="w-8 h-8 text-[#FF3DCD]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      </div>
    </div>
  );
};

export default StakingCard;
