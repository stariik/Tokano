import React from "react";
import "@/Components/Live/styles/scrollcard.css";
import { FIcon, SIcon, StakeIcon, StarIcon } from "../../icons";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function ScrollCard({ key, title, created, marketCap, wallet }) {
  return (
    <div className="relative">
      <div className=" w-full h-full absolute z-10">
        <div className="flex justify-end">
          <div className="flex flex-col justify-between items-end h-[120px] p-4">
            <CiPill color="#5ecb89" size={35} />
            <StarIcon />
           
          </div>
        </div>
        {/* extra */}
        <div className="relative">
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
        </div>
      </div>

      <div key={key} className="text-white shadow bg-[#5951ce] rounded-4xl ">
        <div className="grid grid-cols-3 grid-rows-5 md:h-[270px] h-[250px]">
          <div className="row-span-5 rounded-l-4xl left-gradient text-white">
            <img src="/fired.png" className="md:m-8 m-4 w-22 md:w-32" />
          </div>
          <div className="col-span-2 top-gradient row-span-4 rounded-tr-4xl rounded-br-2xl">
            <div>
              <h1
                className={`pl-4 pt-2 md:text-3xl text-xl ${khandSemibold.className}`}
              >
                {title}
              </h1>
            </div>
            <div
              className={`pl-4 md:leading-5 md:text-lg text-xs ${khandMedium.className}`}
            >
              <p>
                <span className="font-semibold">ID: </span> {wallet}
              </p>
              <p>
                <span className="font-semibold">Created: </span>
                {created}
              </p>
              <p>
                <span className="font-semibold">Market Cap: </span>
                {marketCap}
              </p>
            </div>
            <div className="flex justify-end pr-2 md:mt-0 mt-6">
              <h1 className={`md:text-5xl text-4xl ${khandSemibold.className}`}>
                21K
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center col-span-2 custom-gradient rounded-br-4xl px-2 md:py-2">
            <div className="flex-1 md:text-center">
              <p className="text-xs md:text-sm">Longest: 10d | Largest: 100k</p>
            </div>
            <h1 className={`font-semibold text-2xl ${khandSemibold.className}`}>
              stakers
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollCard;
