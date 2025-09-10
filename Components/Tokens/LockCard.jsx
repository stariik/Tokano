import React from "react";
import "@/Components/Live/styles/scrollcard.css";
import { FIcon, SIcon, StakeIcon, StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function LockCard({ key, title, created, marketCap, wallet }) {
  return (
    <div
      className={` ${khandSemibold.className} rounded-4xl`}
      style={{
        background: "linear-gradient(90deg, #5d9beb 0%, #041d33 100%);",
      }}
    >
      <div
        className="p-4 relative rounded-4xl flex"
        style={{
          background: "linear-gradient(30deg, #5d9beb 0%, #041d33 100%)",
        }}
      >
        <div className="absolute right-6 top-6">
          <StarIcon />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between pr-4 items-center">
            <CiPill color="#5ecb89" size={30} />
            <h1 className="text-2xl md:text-4xl ml-4 xl:ml-6 2xl:ml-8">
              YOU'RE FIRED (FIRED)
            </h1>
          </div>
          <div className={`pr-4 text-right mt-2 ${khandMedium.className}`}>
            <p>
              <span className="font-semibold">Pool ID: </span> {wallet}
            </p>
            <p>
              <span className="font-semibold">Token ID: </span> {created}
            </p>
          </div>
        </div>
        <div className="flex justify-end  mr-12">
          <img
            src="/vest.png"
            className="w-22 md:w-28 h-22 md:h-28 rounded-3xl md:rounded-4xl ml-2 lg:ml-4 xl:ml-8 "
          />
        </div>
        <p className="absolute right-5 text-[#FFB01C] bottom-0 text-xl">120M</p>
      </div>
      <div className="pb-2 pr-4 flex justify-end items-center gap-6">
        
        <p className="text-lg">locked</p>
      </div>

      {/* <div className="grid grid-cols-3 grid-rows-3 gap-0 ">
        <div className="col-span-3 row-span-2">
          <div className="col-span-3  text-right flex">
            <div className="flex justify-between items-center gap-2 m-4">
              <CiPill color="#5ecb89" size={30} />
              <h1 className="text-2xl md:text-4xl">YOU'RE FIRED (FIRED)</h1>
            </div>

            <div className="">
              <img src="/vest.png" className="w-22 md:w-28 rounded-4xl mt-3" />
              <div className="absolute right-4 top-4">
                <StarIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="pr-4">
          <p>
            <span className="font-semibold">Pool ID: </span> {wallet}
          </p>
          <p>
            <span className="font-semibold">Token ID: </span>
            {created}
          </p>
        </div>
        <div
          className="flex justify-center items-center w-full rounded-b-4xl mt-2 col-span-3"
          style={{
            background: "linear-gradient(90deg, #88048A 0%, #1A1E5F 100%)",
          }}
        >
          <p className="text-4xl">Vest</p>
        </div>
      </div> */}
    </div>
  );
}

export default LockCard;
