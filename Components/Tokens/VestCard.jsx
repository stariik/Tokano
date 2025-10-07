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
            <h1 className="xl:text-2xl 2xl:text-3xl [@media(min-width:1700px)]:text-4xl ">
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
        <div className="flex flex-col justify-start">
          <img
            src="/vest.png"
            className="w-20 lg:w-28 lg:rounded-3xl rounded-2xl mr-26 mb-4"
          />

          {/*  */}

          <div className="absolute left-4 -bottom-6 w-7/10 z-2 flex">
            <div className="items-center flex mx-4 text-xl lg:text-3xl">
              VEST
            </div>
            <VestIcon />
            <div className="flex flex-col lg:text-sm text-xs my-auto w-full">
              <div
                className="pl-1 pr-1 -ml-2 -z-1 rounded-full text-white flex justify-end"
                style={{
                  background:
                    "linear-gradient(270deg, #2A8DFF 14.74%, #3542C5 88.65%)",
                }}
              >
                <div className={`${khandMedium.className}`}>
                  TYPE: LIN/MONTHLY <span className="ml-0.5 md:ml-1" /> CLIFF: |5d
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
        <p className="absolute right-5 text-[#FFB01C] bottom-0 text-xl">120M</p>
      </div>
      <div className="pb-2 pr-4 flex justify-end items-center gap-6">
        <div
          className={`rounded-xl px-2 py-0 mt-1 flex text-white text-xs md:text-sm ${khandMedium.className}`}
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
