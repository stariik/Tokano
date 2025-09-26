"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function VestCard({ id, title, created, marketCap, wallet }) {
  return (
    <Link
      href={`/card/vest`}
      className={`${khandSemibold.className} block rounded-4xl hover:opacity-90 transition`}
      style={{ background: "linear-gradient(90deg, #88048A 0%, #1A1E5F 100%)" }}
    >
      <div
        className="p-4 relative rounded-4xl flex"
        style={{
          background: "linear-gradient(30deg, #88048A 0%, #1A1E5F 100%)",
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
        <div className="flex justify-end mr-12">
          <img
            src="/vest.png"
            className="w-22 md:w-28  rounded-3xl md:rounded-4xl ml-2 lg:ml-4 xl:ml-8"
          />
        </div>
        <p className="absolute right-5 text-[#FFB01C] bottom-0 text-xl">120M</p>
      </div>
      <div className="pb-2 pr-4 flex justify-end items-center gap-6">
        <div
          className={`rounded-xl px-2 py-0 flex text-white text-sm md:text-base ${khandMedium.className}`}
          style={{
            background:
              "linear-gradient(270deg, #2A8DFF 14.74%, #3542C5 88.65%)",
          }}
        >
          PARTS: 123K LEFT: 56% ENDS: |2d.12h
        </div>
        <p className="text-lg">locked</p>
      </div>
    </Link>
  );
}

export default VestCard;
