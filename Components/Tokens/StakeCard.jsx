"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { FIcon, SIcon, StakeIcon, StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function StakeCard({ id, title, created, marketCap, wallet }) {
  return (
    <Link
      href={`/card/stake`}
      className="relative block cursor-pointer hover:opacity-90 transition"
    >
      <div
        className={`absolute top-1/4 bg-[#2B923E] p-1 rounded-l-2xl pl-2 right-0 text-xs md:text-sm ${khandSemibold.className}`}
      >
        21.04.25/12:24
      </div>
      <div className="absolute top-3/7 right-2 md:right-4">
        <StarIcon />
      </div>
      <div className="w-full h-full absolute z-10">
        <div className="flex justify-end">
          <div className="flex flex-col justify-between items-end h-[120px] p-4"></div>
        </div>
      </div>

      <div className="text-white shadow bg-[#5951ce] rounded-4xl">
        <div className="grid grid-cols-3 grid-rows-5 md:h-[270px] h-[250px]">
          <div className="row-span-5 rounded-l-4xl left-gradient text-white justify-center flex items-center flex-col md:gap-4 gap-12">
            <img src="/fired.png" className="w-22 md:w-36" />
            <div className="m-4">
              <p className={`text-2xl md:text-4xl ${khandSemibold.className}`}>
                STAKE
              </p>
            </div>
          </div>
          <div className="col-span-2 top-gradient row-span-4 rounded-tr-4xl rounded-br-2xl">
            <div className="flex justify-between items-center pr-5 md:pr-8">
              <h1
                className={`p-4 lg:text-3xl md:text-2xl text-xl ${khandSemibold.className}`}
              >
                {title}
              </h1>
              <CiPill color="#5ecb89" size={30} />
            </div>
            <div
              className={`pl-4 md:leading-5 md:text-lg text-xs ${khandMedium.className}`}
            >
              <p>
                <span className="font-semibold">Pool ID: </span> {wallet}
              </p>
              <p>
                <span className="font-semibold">Token ID: </span> {created}
              </p>

              <p className="mt-6">
                <span className="font-semibold">REWARDS: </span>
                {marketCap}
              </p>
            </div>
            <div className="flex justify-end mr-8 md:mt-4 mt-6">
              <h1
                className={`md:text-5xl text-4xl text-[#FFB01C] ${khandSemibold.className}`}
              >
                1.2K
              </h1>
            </div>
          </div>
          <div className="flex justify-end items-center col-span-2 custom-gradient rounded-br-4xl px-6 md:py-2">
            <h1
              className={`font-semibold text-2xl lg:text-3xl ${khandSemibold.className}`}
            >
              stakers
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default StakeCard;

{
  /* extra */
}
{
  /* <div className="relative">
          <div className="absolute md:pl-6 pl-2 -bottom-1.5">
            <StakeIcon />
          </div>
          <div className="md:pl-12 pl-10 mt-10 md:mt-16 text-xs md:text-sm">
            <div className="ml-4 line1-gradient h-5 md:w-[70%] w-[75%] rounded-r-xl  flex md:pl-6 pl-2 items-center">
              <div className="font-semibold border-r-2 border-indigo-900 pr-1">
                START: 21.04.2025
              </div>
              <div className="font-semibold pl-2">
                ENDS:{" "}
                <span className="border-x-1 px-0.5 md:pr-6"> 2d.12h </span>
              </div>
            </div>
            <div className="mt-1 line2-gradient  h-5 md:w-[70%] w-[75%] rounded-r-xl flex md:pl-10 pl-6 items-center">
              <div className="font-semibold md:pr-5.5 pr-2 border-r-2 border-indigo-900">
                RW POOL: 127M
              </div>
              <div className="font-semibold pl-2">
                LEFT:{" "}
                <span className="border-x-1 px-0.5 pl-1 md:pr-6"> 56%</span>
              </div>
            </div>
          </div>
        </div> */
}
