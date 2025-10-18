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
      className="h-[57px] w-[57px] xl:h-[80px] xl:w-[80px]"
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
    <Link
      href={`/card/vest`}
      className="font-khand text-primary block rounded-4xl font-semibold transition hover:opacity-90 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #88048A 0%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #9F4EA3 100%)",
      }}
    >
      <div
        className="relative flex rounded-4xl p-4"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(30deg, #88048A 0%, #1A1E5F 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #9F4EA3 100%)",
        }}
      >
        <div className="absolute top-6 right-4">
          <StarIcon />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between pr-4">
            <CiPill
              color="#5ecb89"
              size={24}
            />
            <h1 className="xl:text-2xl 2xl:text-3xl [@media(min-width:1700px)]:text-4xl">
              {title}
            </h1>
          </div>
          <div className="font-khand mt-2 pr-4 text-right text-sm font-normal xl:text-base 2xl:text-lg">
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
            className="mr-26 mb-4 w-20 rounded-2xl lg:rounded-3xl xl:w-24 2xl:w-28"
          />

          <div className="absolute -bottom-6 left-4 z-2 flex w-7/10">
            <div className="mx-4 flex items-center text-xl lg:mx-1 xl:mx-4 xl:text-3xl">
              VEST
            </div>
            <VestIcon />
            <div className="my-auto flex w-full flex-col text-xs xl:text-sm">
              <div
                className="-z-1 -ml-2 flex justify-end rounded-full bg-[#e3f2fd] pr-1 pl-1 text-white dark:bg-transparent"
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
                <div className="font-khand font-normal lg:pr-1 xl:pr-0">
                  TYPE: LIN/MONTHLY <span className="ml-0.5 md:ml-1" /> CLIFF:
                  |5d
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
        <p className="absolute right-5 bottom-0 text-xl text-[#FFB01C]">120M</p>
      </div>
      <div className="flex items-center justify-end gap-2 pr-4 pb-2 xl:gap-6">
        <div
          className="font-khand mt-2 flex rounded-xl bg-[#e3f2fd] px-2 py-0 text-xs font-normal text-white xl:text-sm dark:bg-transparent"
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
