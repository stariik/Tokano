"use client";

import React from "react";
import Link from "next/link";
import { CiPill } from "react-icons/ci";
import { StarIcon } from "../icons";
import { useTheme } from "@/hooks/useTheme";
import { useFavorites } from "@/hooks/useFavorites";

const StakeIcon = () => (
  <svg
    className="h-[34px] w-[34px] lg:h-[38px] lg:w-[38px] xl:h-[47px] xl:w-[47px]"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.3456 47.5459C18.8444 47.9136 10.0393 39.8136 9.6789 29.4542C9.3185 19.0947 17.5393 10.3987 28.0405 10.031C38.5418 9.6633 47.3468 17.7632 47.7072 28.1227C48.0676 38.4821 39.8469 47.1782 29.3456 47.5459Z"
      fill="white"
    />
    <path
      d="M24.5337 38.3273L24.5337 38.2567C26.2227 36.3974 27.0438 34.75 26.9969 33.3144C26.9969 32.9143 26.9383 32.5142 26.821 32.1141C26.7037 31.714 26.516 31.2315 26.2579 30.6667C25.9999 30.1018 25.6363 29.3723 25.1671 28.4779C24.7917 27.7248 24.5219 27.0541 24.3577 26.4657C24.1935 25.8773 24.0879 25.2537 24.041 24.5947C24.0176 23.6297 24.2052 22.6413 24.604 21.6293C25.0263 20.5937 25.6245 19.6406 26.3987 18.7698L27.7359 18.7698L27.7359 15.1689L29.8472 15.1689L29.8472 18.7698L32.979 18.7698L32.979 18.8404C32.111 19.8053 31.4894 20.6761 31.114 21.4528C30.7387 22.2059 30.551 22.9825 30.551 23.7827C30.551 24.3711 30.6566 24.9477 30.8677 25.5125C31.0788 26.0774 31.419 26.807 31.8882 27.7013C32.5216 28.8545 32.9556 29.7959 33.1902 30.5255C33.4248 31.2315 33.5538 31.9611 33.5773 32.7142C33.6007 33.7262 33.4365 34.6794 33.0846 35.5737C32.7562 36.4445 32.2166 37.3624 31.4659 38.3273L29.8472 38.3273L29.8472 41.7869L27.7359 41.7869L27.7359 38.3273L24.5337 38.3273Z"
      fill="#0E1379"
    />
    <path
      d="M29.3657 55.56C14.2646 56.0887 1.60252 44.4407 1.08426 29.5434C0.565999 14.6461 12.3878 2.14089 27.4889 1.61215C42.5901 1.08341 55.2522 12.7314 55.7704 27.6287C56.2887 42.526 44.4669 55.0312 29.3657 55.56Z"
      fill="white"
    />
    <path
      d="M29.0878 47.3442C18.5866 47.7119 9.78148 39.612 9.42109 29.2525C9.06069 18.8931 17.2815 10.197 27.7827 9.82932C38.2839 9.46164 47.089 17.5616 47.4494 27.921C47.8098 38.2805 39.589 46.9765 29.0878 47.3442Z"
      fill="#190E79"
    />
    <path
      d="M24.2759 38.1254L24.2759 38.0548C25.9649 36.1955 26.786 34.5481 26.7391 33.1125C26.7391 32.7124 26.6804 32.3123 26.5631 31.9122C26.4458 31.5121 26.2582 31.0296 26.0001 30.4648C25.7421 29.8999 25.3784 29.1704 24.9093 28.276C24.5339 27.5229 24.2641 26.8522 24.0999 26.2638C23.9357 25.6754 23.8301 25.0517 23.7832 24.3928C23.7597 23.4278 23.9474 22.4394 24.3462 21.4274C24.7685 20.3918 25.3667 19.4387 26.1409 18.5679L27.4781 18.5679L27.4781 14.967L29.5894 14.967L29.5894 18.5679L32.7212 18.5679L32.7212 18.6385C31.8532 19.6034 31.2316 20.4742 30.8562 21.2509C30.4809 22.004 30.2932 22.7806 30.2932 23.5808C30.2932 24.1692 30.3988 24.7458 30.6099 25.3106C30.821 25.8755 31.1612 26.6051 31.6304 27.4994C32.2638 28.6526 32.6978 29.594 32.9324 30.3236C33.167 31.0296 33.296 31.7592 33.3194 32.5123C33.3429 33.5243 33.1787 34.4775 32.8268 35.3718C32.4984 36.2426 31.9588 37.1605 31.2081 38.1254L29.5894 38.1254L29.5894 41.585L27.4781 41.585L27.4781 38.1254L24.2759 38.1254Z"
      fill="white"
    />
  </svg>
);

function SoonCard({
  id,
  title = "YOU'RE FIRED (FIRED)",
  poolId = "0xdl3…ezx41",
  tokenId = "0xfc9…ed1d",
  launchTimestamp,
  tokenImage = "/image.png",
  poolType = "STAKE", // Can be "STAKE", "VEST", or "LOCK"
  fullAddress = "" // Full address for favorites (not shortened)
}) {
  const { resolvedTheme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Determine the type for favorites
  const favoriteType = poolType.toLowerCase(); // 'stake' or 'vest'
  const addressForFavorite = fullAddress || poolId;
  const isFav = isFavorite(favoriteType, addressForFavorite);

  // Handle star click
  const handleStarClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    toggleFavorite(favoriteType, addressForFavorite);
  };

  // Calculate countdown from launchTimestamp
  const getCountdown = () => {
    if (!launchTimestamp) return "23d 45h 12m";

    const now = Date.now();
    const diff = launchTimestamp - now;

    if (diff <= 0) return "LIVE NOW";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <Link
      href={`/card/soon`}
      className="text-primary block rounded-4xl pb-4 transition hover:opacity-90 lg:pb-4 xl:pb-8 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg,rgba(23,13,86,1) 50%,rgba(98,44,205,1) 100%)"
            : "linear-gradient(90deg, rgb(215 204 255) 50%, rgb(149 139 227) 100%)",
      }}
    >
      <div
        className="relative grid grid-cols-3 items-center justify-between rounded-4xl"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg,rgba(23,13,86,1) 35%,rgba(98,44,205,1) 100%)"
              : "linear-gradient(45deg, rgb(208 199 245) 35%, rgb(202 199 221) 100%)",
        }}
      >
        <div>
          <img
            src={tokenImage}
            alt={title}
            className="mt-2 ml-4 w-24 h-24 md:mt-4 md:ml-8 lg:ml-4 lg:w-28 lg:h-28 xl:ml-4 xl:w-36 xl:h-36 rounded-4xl object-cover"
          />
        </div>

        <div className="col-span-2">
          <div className="relative flex w-1/5 justify-center md:w-1/4 md:pl-0">
            <CiPill
              color="#5ecb89"
              className="absolute top-1 xl:h-6 xl:w-6"
            />
          </div>
          <div className="flex-col items-center justify-center text-center">
            <p className="text-md font-khand mt-2 font-semibold md:text-lg lg:text-base xl:text-xl 2xl:text-2xl">
              {title}
            </p>
            <h1 className="font-khand text-xl font-bold md:text-2xl lg:mt-4 lg:text-2xl 2xl:text-4xl">
              LAUNCHING SOON
            </h1>
            <p
              className="font-khand mx-auto mt-2 w-38 rounded-2xl text-xs font-semibold text-[#311880] lg:w-38 lg:text-sm xl:w-48"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg,rgba(255,212,42,1) 0%,rgba(249,44,157,1) 55%,rgba(237,221,83,1) 100%)"
                    : "linear-gradient(90deg,rgba(255,212,42,1) 0%,rgba(249,44,157,1) 55%,rgba(237,221,83,1) 100%)",
              }}
            >
              LAUNCHING IN : {getCountdown()}
            </p>
            <div
              className="absolute top-1/2 right-0.5 xl:right-2 2xl:right-4 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleStarClick}
            >
              <StarIcon filled={isFav} />
            </div>
          </div>
        </div>
        <div className="relative mx-auto my-6">
          <div className="absolute -top-[20px] -left-[35px] flex gap-2 lg:-left-[40px] xl:-left-[50px]">
            <div className="font-khand mt-4 font-semibold lg:text-xl xl:text-2xl 2xl:text-3xl">
              {poolType}
            </div>
            <div className="z-10 mt-2 rounded-full bg-[#f5f3fb] p-1 pr-0 pl-2 lg:mt-1 xl:mt-0 dark:bg-[#2A1C7B]">
              <StakeIcon />
            </div>
          </div>
          <div className="absolute top-[20px] left-[80px] h-[3px] rounded-full bg-gradient-to-r from-[#002382] from-25% to-[#8B0000] xl:w-[100px] 2xl:w-[280px] dark:from-[#190E79]"></div>
        </div>
        <div className="font-khand mt-4 pl-1 text-xs lg:pl-2 xl:pl-4 2xl:text-base">
          Pool ID: {poolId}
        </div>
        <div className="font-khand mt-4 text-xs 2xl:text-base">
          Token ID: {tokenId}
        </div>
      </div>
    </Link>
  );
}

export default SoonCard;
