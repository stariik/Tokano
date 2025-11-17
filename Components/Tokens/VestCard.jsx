"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { useTheme } from "@/hooks/useTheme";
import { useFavorites } from "@/hooks/useFavorites";

function VestCard({
  id,
  title,
  created,
  marketCap,
  wallet,
  vestData,
  tokenDecimals,
  isPreview = false,
  previewData = null,
  tokenImage = null,
}) {
  const { resolvedTheme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite("vest", wallet);

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wallet) {
      toggleFavorite("vest", wallet);
    }
  };

  const shortenAddress = (address) => {
    if (!address || address.length < 12) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Format amount with proper decimals
  const formatAmount = (amount, decimals = 9) => {
    if (!amount) return "0";
    const amountNum = typeof amount === "number" ? amount : Number(amount);
    const value = amountNum / Math.pow(10, decimals);

    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTokenAmountSimple = (amount) => {
    if (!amount) return "0";
    const value = parseFloat(amount);
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const shortenReleaseModel = (model) => {
    if (!model) return "MO";
    switch (model.toLowerCase()) {
      case "daily":
        return "DA";
      case "weekly":
        return "WE";
      case "monthly":
        return "MO";
      default:
        return "MO";
    }
  };

  // Get release model from SDK scheduleType
  const getScheduleTypeShort = (scheduleType) => {
    // VestingSchedule enum: Daily = 3, Weekly = 4, Monthly = 5
    if (scheduleType === 3) return "DA";
    if (scheduleType === 4) return "WE";
    if (scheduleType === 5) return "MO";
    return "MO";
  };

  // Calculate duration in appropriate units from start/end time
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return { value: 0, unit: "months" };
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

    // Convert to appropriate unit
    if (durationDays >= 30) {
      return { value: Math.floor(durationDays / 30), unit: "months" };
    } else if (durationDays >= 7) {
      return { value: Math.floor(durationDays / 7), unit: "weeks" };
    } else {
      return { value: durationDays, unit: "days" };
    }
  };

  const VestIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="w-[57px] xl:w-[80px]"
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

  const CardWrapper = isPreview ? "div" : Link;
  const wrapperProps = isPreview
    ? {}
    : {
        href: wallet ? `/card/vest?vest=${wallet}` : `/card/vest`,
      };

  return (
    <CardWrapper
      {...wrapperProps}
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
        {!isPreview && (
          <div
            className="absolute top-6 right-4 z-10 cursor-pointer transition-transform hover:scale-110"
            onClick={handleStarClick}
          >
            <StarIcon filled={isFav} />
          </div>
        )}
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between pr-2 sm:pr-4">
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
              <span className="">Pool ID: </span> {shortenAddress(wallet)}
            </p>
            <p>
              <span className="">Token ID: </span> {shortenAddress(created)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <img
            src={tokenImage || "/vest.png"}
            className="mr-16 mb-4 h-14 w-14 rounded-2xl object-cover sm:mr-26 sm:h-20 sm:w-20 lg:mr-24 lg:h-18 lg:w-18 lg:rounded-2xl xl:h-24 xl:w-24 xl:rounded-3xl 2xl:h-28 2xl:w-28"
          />

          <div className="absolute -bottom-5 left-1 z-2 flex w-7/10 sm:-bottom-3 sm:left-4">
            <div className="mx-2 flex items-center text-xl md:mx-1 xl:mx-4 xl:text-3xl">
              VEST
            </div>
            <VestIcon />
            <div className="my-auto flex w-full flex-col text-[10px] sm:text-xs xl:text-sm">
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
                <div className="font-khand flex justify-between font-normal lg:pr-1 xl:pr-0 w-1/2 mx-auto">
                  {isPreview ? (
                    <>
                      <span>TYPE: {shortenReleaseModel(previewData?.releaseModel || "monthly")}</span>
                      <span>CLIFF: {previewData?.cliffPeriod || "0"}d</span>
                    </>
                  ) : vestData ? (
                    <>
                      <span>TYPE: {getScheduleTypeShort(vestData.scheduleType)}</span>
                      <span>START: {formatDate(vestData.startTime)}</span>
                    </>
                  ) : (
                    <>
                      <span>TYPE: LIN/MONTHLY</span>
                      <span>CLIFF: |5d</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
        <p className="absolute right-5 bottom-0 text-xl text-[#FFB01C]">
          {vestData?.totalVestedAmount
            ? formatAmount(vestData.totalVestedAmount, tokenDecimals)
            : "0"}
        </p>
      </div>
      <div className="flex items-center justify-end gap-1 pr-4 pb-2 sm:gap-2 xl:gap-6">
        <div
          className="font-khand mt-1 flex justify-between rounded-xl px-2 py-0 text-[10px] font-normal text-white sm:-mt-2 sm:text-xs xl:text-sm dark:bg-transparent w-[90px] [@media(min-width:385px)]:w-[110px] sm:w-[160px] md:w-[120px] lg:w-[180px] xl:w-[140px] 2xl:w-[230px]"
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
          {isPreview ? (
            <>
              <span>PARTS: {previewData?.duration || "0"}</span>
              <span>LEFT: {formatTokenAmountSimple(previewData?.tokenAmount || "0")}</span>
            </>
          ) : vestData ? (
            (() => {
              const duration = calculateDuration(
                vestData.startTime,
                vestData.endTime,
              );
              const leftAmount = vestData.totalVestedAmount
                ? formatAmount(
                    vestData.totalVestedAmount.toString(),
                    tokenDecimals,
                  )
                : "0";
              return (
                <>
                  <span>PARTS: {duration.value}</span>
                  <span>LEFT: {leftAmount}</span>
                </>
              );
            })()
          ) : (
            "LEFT: 56% ENDS: |2d.12h"
          )}
        </div>
        <p className="text-lg text-white mb-2">locked</p>
      </div>
    </CardWrapper>
  );
}

export default VestCard;
