import React from "react";
import Image from "next/image";

function TokenCard({ token }) {
  return (
    <div className="relative flex w-[220px] flex-col overflow-hidden rounded border-2 border-[#292B8C] bg-[#f5f5f7] shadow-lg dark:bg-[#23264A]">
      {/* Token Image */}
      <div className="relative aspect-[1.6/1] w-full bg-black">
        <Image
          src="/image.png"
          alt={token.name}
          fill
          className="object-cover"
          sizes="220px"
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-1 flex-col px-3 py-2">
        {/* Title & Star */}
        <div className="mb-1 flex items-center justify-between">
          <span
            className="text-[1.05rem] leading-tight font-bold tracking-tight text-[#E6E6E6]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {token.name}
          </span>
          <span className="ml-2 text-xl text-[#FF00A8]">★</span>
        </div>
        {/* Stats Row */}
        <div className="mb-1 flex items-center justify-between">
          <div className="flex flex-col items-end">
            <span className="text-3xl leading-none font-bold text-[#FFD600]">
              {token.stakers}
            </span>
            <span className="-mt-1 text-xs font-semibold text-[#B0B3D6]">
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
