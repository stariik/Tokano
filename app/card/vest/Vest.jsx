"use client";
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";

import { CiPill } from "react-icons/ci";

function Vest() {
  const { resolvedTheme } = useTheme();
  const VestIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="w-[57px] h-[57px] lg:w-[80px] lg:h-[80px]"
      fill="none"
    >
      <circle cx="40" cy="40" r="40" fill="white" />

      <circle cx="40" cy="40" r="27" fill="#2D178D" />

      <path
        d="M28 34h8v8h8v8h8"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      className="rounded-3xl pb-4 lg:pb-8 border-1 border-secondary text-[#190E79] dark:text-white lg:mx-0 mx-4"
      style={{
        background: resolvedTheme === "dark"
          ? "linear-gradient(90deg, #9D05A1 10%, #1A1E5F 100%)"
          : "linear-gradient(90deg, #f5c4ed 10%, #e8e4f8 100%)",
      }}
    >
      <div
        className="rounded-3xl p-8 pb-0 relative"
        style={{
          background: resolvedTheme === "dark"
            ? "linear-gradient(45deg, #9D05A1 0%, #1A1E5F 100%)"
            : "linear-gradient(45deg, #f5c4ed 0%, #e8e4f8 100%)",
        }}
      >
        <div className="absolute top-8 lg:top-16 left-4 flex flex-col lg:gap-4 gap-2">
          <div className="bg-[#e3f2fd] dark:bg-[#0088cc] rounded-full p-1">
            <FaTelegramPlane />
          </div>
          <div className="bg-black p-1 rounded-full">
            <FaXTwitter />
          </div>
          <div className="">
            <TbWorld size={25} />
          </div>
        </div>

        <div className="flex">
          <img
            src="/vest.png"
            className="w-20 md:w-24 lg:w-38 h-full lg:rounded-3xl rounded-2xl ml-4 xl:ml-8 mb-4"
          />
          <div className="font-khand font-normal ml-4 lg:ml-8">
            <h1
              className="font-khand font-semibold xl:text-4xl lg:text-2xl md:text-xl text-lg"
            >
              YOU'RE FIRED (FIRED)
            </h1>

            <div className="pl-1 text-sm md:text-base lg:text-lg xl:text-xl mt-1">
              <p>Pool ID: 0x4v49...hssdas</p>
              <p>Creator: Anonymouse</p>
              <p>Token ID: 0x4v49...hssdas</p>
              <p>Market cap: $4.3K</p>
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-0">
          <div className="ml-4 lg:mr-12">
            <CiPill size={28} />
          </div>

          <div
            className="mt-6 bg-[#2B923E] dark:bg-[#2B923E] rounded-l-2xl pl-1 md:pl-2  text-xs md:text-sm font-khand font-normal"
          >
            21.04.25/12:24
          </div>
          <div className="flex justify-end mr-4 mt-12 transform -translate-y-1/2">
            <StarIcon />
          </div>
        </div>

        <div className="absolute left-0  w-11/13 z-5 flex">
          <div
            className="items-center flex mx-4 text-xl lg:text-3xl font-khand font-semibold"
          >
            Vest
          </div>
          <VestIcon />

          <div
            className="flex flex-col lg:text-sm text-xs my-auto w-5/5 font-khand font-normal"
          >
            <div
              className="pl-4 2xl:pl-6 pr-1 2xl:pr-5 -ml-4 py-1 -z-1 rounded-full text-[#190E79] dark:text-white flex justify-between w-6/7 md:w-2/3 font-khand font-normal"
              style={{
                background: resolvedTheme === "dark"
                  ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                  : "linear-gradient(90deg, rgba(227, 242, 253, 1) 10%, rgba(200, 230, 250, 1) 90%)",
              }}
            >
              <div>LOCKED: 21.04.2025</div>
              <div>ENDS: |2d.12h</div>
            </div>

            <div
              className="pl-2 2xl:pl-6 pr-2 2xl:pr-5 py-1 -z-1 rounded-full text-[#190E79] dark:text-white flex justify-between w-6/7 md:w-2/3 ml-14 lg:ml-26 xl:ml-32 2xl:ml-46 font-khand font-normal"
              style={{
                background: resolvedTheme === "dark"
                  ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                  : "linear-gradient(90deg, rgba(227, 242, 253, 1) 10%, rgba(200, 230, 250, 1) 90%)",
              }}
            >
              <div>LOCKED: 21.04.2025</div>
              <div>ENDS: |2d.12h</div>
            </div>
          </div>
        </div>

        <div
          className="text-[#FFB01C] text-end text-2xl lg:text-3xl font-khand font-semibold mr-4 mt-14 lg:mt-18"
        >
          120M
        </div>
      </div>

      <div
        className="mr-12 text-end text-xl lg:text-2xl font-khand font-medium"
      >
        locked
      </div>
    </div>
  );
}

export default Vest;
