import React from "react";
import Image from "next/image";
import { FaStairs } from "react-icons/fa6";

function Lock({ token }) {
  return (
    <div
      className="relative flex w-full flex-col overflow-hidden rounded border-2 border-[#292B8C] shadow-lg"
      style={{
        background: "linear-gradient(45deg, #88048B 10%, #110C58 65%)",
      }}
    >
      {/* Token Image */}
      <div className="relative aspect-[1.6/1] w-full bg-black">
        <Image
          src="/image.png"
          alt={token.name}
          fill
          className="static! object-cover"
          sizes="220px"
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-1 flex-col px-3 py-2">
        {/* Title & Star */}
        <div className="mb-1 flex items-center justify-between">
          <span
            className="font-khand text-[12px] leading-tight font-semibold tracking-tight text-[#E6E6E6] md:text-[14px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {token.name}
          </span>
          <span className="ml-2 text-xl text-[#FF00A8]">★</span>
        </div>
        {/* Stats Row */}
        <div className="font-khand mb-1 flex items-center justify-between font-semibold">
          <div className="flex text-xl text-white lg:text-2xl">Vest</div>
          <div className="rounded-3xl bg-white">
            <div className="m-2 rounded-2xl bg-[#190E79] p-2">
              <FaStairs className="h-[10px] w-[10px] text-white lg:h-[14px] lg:w-[14px]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl leading-none font-bold text-[#FFD600]">
              {token.stakers}
            </span>
            <span className="-mt-1 text-sm font-semibold text-[#B0B3D6]">
              locked
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flex flex-row justify-between gap-1 text-white">
        <div
          className="font-khand h-6 basis-40 rounded-r-xl text-center text-xs font-medium md:text-sm"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          TYPE: LIN/MONTHLY
        </div>
        <div
          className="font-khand h-6 w-30 rounded-l-xl text-center text-xs font-medium md:text-sm"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          ENDS: | 2d-12h
        </div>
      </div>
    </div>
  );
}

export default Lock;
