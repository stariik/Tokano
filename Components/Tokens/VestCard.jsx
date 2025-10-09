"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { useTheme } from "@/hooks/useTheme";

function VestCard({ id, title, created, marketCap, wallet }) {
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
    <Link
      href={`/card/vest`}
      className="font-khand font-semibold block rounded-4xl hover:opacity-90 transition dark:text-white text-primary"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #88048A 0%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #9F4EA3 100%)",
      }}
    >
      <div
        className="p-4 relative rounded-4xl flex"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(30deg, #88048A 0%, #1A1E5F 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #9F4EA3 100%)",
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
          <div className="pr-4 text-right mt-2 font-khand font-normal">
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
                className="pl-1 pr-1 -ml-2 -z-1 rounded-full text-white flex justify-end bg-[#e3f2fd] dark:bg-transparent"
                style={{
                  background: "var(--gradient-vest-top)",
                }}
              >
                <style jsx>{`
                  div {
                    --gradient-vest-top: linear-gradient(
                      270deg,
                      #2a8dff 14.74%,
                      #3542c5 88.65%
                    );
                  }
                `}</style>
                <div className="font-khand font-normal">
                  TYPE: LIN/MONTHLY <span className="ml-0.5 md:ml-1" /> CLIFF:
                  |5d
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
          className="rounded-xl px-2 py-0 mt-1 flex text-white text-xs md:text-sm font-khand font-normal bg-[#e3f2fd] dark:bg-transparent"
          style={{
            background: "var(--gradient-vest-bottom)",
          }}
        >
          <style jsx>{`
            div {
              --gradient-vest-bottom: linear-gradient(
                270deg,
                #2a8dff 14.74%,
                #3542c5 88.65%
              );
            }
          `}</style>
          PARTS: 123K LEFT: 56% ENDS: |2d.12h
        </div>
        <p className="text-lg text-white">locked</p>
      </div>
    </Link>
  );
}

export default VestCard;
