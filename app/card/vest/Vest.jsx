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
      className="h-[57px] w-[57px] lg:h-[80px] lg:w-[80px]"
      fill="none"
    >
      <circle
        cx="40"
        cy="40"
        r="40"
        fill="white"
      />

      <circle
        cx="40"
        cy="40"
        r="27"
        fill="#2D178D"
      />

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
      className="dark:border-secondary mx-4 rounded-3xl border-1 border-[#CDCDE9] pb-4 text-[#190E79] lg:mx-0 lg:pb-2 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #9D05A1 10%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #9C3B8A 100%)",
      }}
    >
      <div
        className="relative rounded-4xl p-8 pb-0 lg:p-4 lg:pb-0 xl:p-8 xl:pb-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #9D05A1 0%, #1A1E5F 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #9C3B8A 100%)",
        }}
      >
        <div className="absolute top-8 left-4 flex flex-col gap-2 lg:top-6 lg:left-2 lg:gap-2 xl:top-12 xl:left-4 xl:gap-4">
          <div className="rounded-full bg-[#0088cc] p-1 text-base text-white lg:text-xs xl:text-base">
            <FaTelegramPlane />
          </div>
          <div className="rounded-full bg-black p-1 text-base text-white lg:text-xs xl:text-base">
            <FaXTwitter />
          </div>
          <div className="text-base lg:text-xs xl:text-base">
            <TbWorld className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
          </div>
        </div>

        <div className="flex">
          <img
            src="/vest.png"
            className="mb-4 ml-4 h-full w-20 rounded-2xl md:w-24 lg:rounded-3xl xl:ml-8 xl:w-32 2xl:w-38"
          />
          <div className="font-khand ml-4 font-normal lg:ml-2 xl:ml-8">
            <h1 className="font-khand text-lg font-semibold md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              YOU'RE FIRED (FIRED)
            </h1>

            <div className="mt-1 pl-1 text-sm md:text-base lg:text-sm xl:text-lg 2xl:text-xl">
              <p>Pool ID: 0x4v49...hssdas</p>
              <p>Creator: Anonymouse</p>
              <p>Token ID: 0x4v49...hssdas</p>
              <p>Market cap: $4.3K</p>
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-0">
          <div className="ml-4 lg:mr-12 xl:mr-6">
            <CiPill size={28} />
          </div>

          <div className="font-khand mt-6 rounded-l-2xl bg-[#2B923E] pl-1 text-xs font-normal md:pl-2 md:text-sm dark:bg-[#2B923E]">
            21.04.25/12:24
          </div>
          <div className="mt-12 mr-4 flex -translate-y-1/2 transform justify-end">
            <StarIcon />
          </div>
        </div>

        <div className="absolute left-0 z-5 flex w-11/13">
          <div className="font-khand mx-4 flex max-w-20 items-center text-xl font-semibold lg:mx-2 xl:mx-4 xl:text-3xl">
            Vest
          </div>
          <VestIcon />

          <div className="font-khand my-auto flex w-5/5 flex-col text-xs font-normal xl:text-sm">
            <div
              className="font-khand -z-1 -ml-4 flex w-auto justify-between rounded-full py-1 pr-1 pl-4 font-normal text-white md:w-2/3 lg:w-4/5 2xl:pr-5 2xl:pl-6"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                    : "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)",
              }}
            >
              <div>LOCKED: 21.04.2025</div>
              <div>ENDS: |2d.12h</div>
            </div>

            <div
              className="font-khand -z-1 ml-14 flex w-6/7 justify-between rounded-full py-1 pr-2 pl-2 font-normal text-white md:w-2/3 lg:ml-12 lg:w-auto xl:ml-26 2xl:ml-32 2xl:pr-5 2xl:pl-6"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                    : "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)",
              }}
            >
              <div>LOCKED: 21.04.2025</div>
              <div>ENDS: |2d.12h</div>
            </div>
          </div>
        </div>

        <div className="font-khand mt-14 mr-4 text-end text-2xl font-semibold text-[#FFB01C] lg:mt-16 lg:text-3xl">
          120M
        </div>
      </div>

      <div className="font-khand mr-12 text-end text-xl font-medium lg:text-2xl">
        locked
      </div>
    </div>
  );
}

export default Vest;
