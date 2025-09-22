import React from "react";
import Image from "next/image";
import { Khand } from "next/font/google";
import { SiVerizon } from "react-icons/si";

const khandMedium = Khand({ subsets: ["latin"], weight: "500" });
const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });

function Lock({ token }) {
  return (
    <div
      className="rounded border-2 border-[#292B8C] flex flex-col w-[220px] overflow-hidden relative shadow-lg"
      style={{
        background: "linear-gradient(45deg, #5d9beb 10%, #041d33 65%)",
      }}
    >
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
            className={`text-[14px] font-bold text-[#E6E6E6] leading-tight tracking-tight ${khandSemibold.className}`}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {token.name}
          </span>
          <span className="text-[#FF00A8] text-xl ml-2">★</span>
        </div>
        {/* Stats Row */}
        <div
          className={`flex items-center justify-between mb-1 ${khandSemibold.className}`}
        >
          <div className="text-2xl flex">LOCK</div>
          <div className="bg-white rounded-3xl">
            <div className="bg-[#190E79] p-2 m-2 rounded-2xl">
              <SiVerizon size={14} />

            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#FFD600] text-xl font-bold leading-none">
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
        className={`"h-6 w-30 mx-auto rounded-xl text-center ${khandMedium.className}`}
        style={{
          background: "linear-gradient(90deg, #B4008D 0%, #2A8DFF 100%)",
        }}
      >
        ENDS: | 2d-12h
      </div>
    </div>
  );
}

export default Lock;
