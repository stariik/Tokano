import React from "react";
import Image from "next/image";

function TokenCard({ token }) {
  return (
    <div className="bg-[#f5f5f7] dark:bg-[#23264A] rounded border-2 border-[#292B8C] flex flex-col w-[220px] overflow-hidden relative shadow-lg">
      {/* Token Image */}
      <div className="w-full aspect-[1.6/1] bg-black relative">
        <Image
          src="/image.png"
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
    </div>
  );
}

export default TokenCard;
