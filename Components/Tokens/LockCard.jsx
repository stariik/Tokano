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
            <h1 className="text-xl lg:text-4xl ml-4 xl:ml-6 2xl:ml-8">
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
            className="w-20  md:w-24 lg:w-38 lg:rounded-3xl rounded-2xl ml-2 lg:ml-4 xl:ml-8 mb-4"
          />

          {/*  */}

          <div className="absolute left-0 -bottom-6 w-11/13 z-5 flex">
            <div className="items-center flex mx-4 text-xl lg:text-3xl">
              LOCK
            </div>
            <StakeIcon />
            <div className="flex flex-col lg:text-sm text-xs my-auto w-full">
              <div
                className="pl-4 pr-4 -ml-2 -z-1 rounded-full text-white flex justify-between"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(7,75,163,1) 0%, rgba(4,88,124,1) 36%, rgba(12,224,207,1) 100%)",
                }}
              >
                <div>LOCKED: 21.04.2025</div>
                <div>ENDS: |2d.12h</div>
              </div>
            </div>
          </div>
          {/*  */}
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
