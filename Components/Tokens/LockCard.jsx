"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { FIcon, SIcon, StakeIcon, StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function LockCard({ id, title, created, marketCap, wallet }) {
  return (
    <Link
      href={`/card/lock`}
      className={`${khandSemibold.className} rounded-4xl block`}
      style={{
        background: "linear-gradient(90deg, #5d9beb 0%, #041d33 100%)",
      }}
    >
      <div
        className="p-4 relative rounded-4xl flex cursor-pointer hover:opacity-90 transition"
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
              {title}
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
    </Link>
  );
}

export default LockCard;
