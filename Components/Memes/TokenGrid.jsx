"use client";
import React from "react";
// import TokenCard from "./TokenCard";
import Lock from "./TokenCards/Lock";
import GridFilter from "./GridFilter";
import { tokens } from "@/data/data";
import Vest from "./TokenCards/Vest";
import Soon from "./TokenCards/Soon";

function TokenGrid({ gridCols = "grid-cols-2", hideOnMobile = true }) {
  const visibilityClass = hideOnMobile ? "hidden lg:block" : "block";

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
      <div
        className={`bg-[#13153A] p-4 rounded-2xl border border-[#292B8C] ${visibilityClass}`}
      >
        <GridFilter />
        <div
          className="overflow-y-auto text-white custom-scrollbar"
          style={{ maxHeight: "100vh", minHeight: "400px" }}
        >
          <div className={`grid gap-3 ${gridCols}`}>
            {tokens.map((token, idx) => (
              <React.Fragment key={idx}>
                <Soon
                  token={{
                    image: token.image,
                    name: token.name,
                    mcap: token.mcap,
                    staked: token.staked,
                    stakedPercent: token.stakedPercent,
                    frozen: token.frozen,
                    frozenPercent: token.frozenPercent,
                    stakers: token.stakers,
                    timeLeft: token.timeLeft,
                    percent: token.percent,
                  }}
                />
                <Lock
                  token={{
                    image: token.image,
                    name: token.name,
                    mcap: token.mcap,
                    staked: token.staked,
                    stakedPercent: token.stakedPercent,
                    frozen: token.frozen,
                    frozenPercent: token.frozenPercent,
                    stakers: token.stakers,
                    timeLeft: token.timeLeft,
                    percent: token.percent,
                  }}
                />
                <Vest
                  token={{
                    image: token.image,
                    name: token.name,
                    mcap: token.mcap,
                    staked: token.staked,
                    stakedPercent: token.stakedPercent,
                    frozen: token.frozen,
                    frozenPercent: token.frozenPercent,
                    stakers: token.stakers,
                    timeLeft: token.timeLeft,
                    percent: token.percent,
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenGrid;
