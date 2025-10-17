"use client";
import React from "react";
import StakeCard from "../../../Components/Tokens/StakeCard";
import { cardData } from "@/data/data";

function StakingScroll({ stakingData = [] }) {
  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
      `}</style>
      <div className="font-khand rounded-3xl border-1 border-[#CDCDE9] dark:border-secondary text-[#190E79] dark:text-white">
        <div className="border-b-1 border-[#CDCDE9] dark:border-secondary py-2 pl-6 text-xl">
          YOU ARE STAKING
        </div>
        <div className="flex justify-between bg-[#fafafa] py-2 pr-8 pl-16 text-lg dark:bg-[#231570]">
          <div>LIMASIRA</div>
          <div>all | time | size</div>
        </div>
        <div className="custom-scrollbar mx-2 max-h-200 overflow-y-auto p-3">
          {cardData.map((stake, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <StakeCard
                id={stake.id}
                title={stake.title}
                created={stake.created}
                marketCap={stake.marketCap}
                wallet={stake.wallet}
                variant="portfolio"
              />
            </div>
          ))}
        </div>
        <div className="border-t-1 border-[#CDCDE9] dark:border-secondary py-2 text-center">
          total tokens staking: 12,45,110.12 LIMAS
        </div>
      </div>
    </>
  );
}

export default StakingScroll;
