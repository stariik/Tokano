import React from "react";
import TokenCard from "./TokenCard";
import GridFilter from "./GridFilter";
import { tokens } from "@/data/data";

function TokenGrid() {
  return (
    <div className="bg-[#13153A] p-4 rounded-2xl border border-[#292B8C]">
      <GridFilter />
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "70vh", minHeight: "400px" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tokens.map((token, idx) => (
            <TokenCard
              key={idx}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TokenGrid;
