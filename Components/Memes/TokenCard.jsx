import React from "react";
import Image from "next/image";

function TokenCard({ token }) {
  return (
    <div className="bg-[#23264A] rounded border-2 border-[#292B8C] flex flex-col w-[220px] overflow-hidden relative shadow-lg">
      {/* Token Image */}
      <div className="w-full aspect-[1.6/1] bg-black relative">
        <Image
          src={token.image}
          alt={token.name}
          fill
          className="object-cover"
          sizes="220px"
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-col flex-1 px-3 py-2">
        {/* Title & Star */}
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[1.05rem] font-bold text-[#E6E6E6] leading-tight tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {token.name}
          </span>
          <span className="text-[#FF00A8] text-xl ml-2">★</span>
        </div>
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col text-[0.95rem] text-[#B0B3D6] leading-tight">
            <span>
              m cap: <span className="text-white">{token.mcap}</span>
            </span>
            <span>
              staked: <span className="text-[#00FFB2]">{token.staked}</span> /{" "}
              <span className="text-white">{token.stakedPercent}</span>
            </span>
            <span>
              frozen: <span className="text-[#FFD600]">{token.frozen}</span> /{" "}
              <span className="text-white">{token.frozenPercent}</span>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#FFD600] text-3xl font-bold leading-none">
              {token.stakers}
            </span>
            <span className="text-[#B0B3D6] text-xs font-semibold -mt-1">
              stakers
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between w-full px-2 py-1"
        style={{
          background: "linear-gradient(90deg, #2d3a8c 0%, #12e6c8 100%)",
        }}
      >
        <span className="bg-[#23264A] text-[#12e6c8] text-lg font-bold px-2 py-0.5 rounded">
          {token.timeLeft}
        </span>
        <span className="bg-[#FF00A8] text-white text-lg font-bold px-2 py-0.5 rounded ml-2">
          {token.percent}
        </span>
      </div>
    </div>
  );
}

export default TokenCard;
