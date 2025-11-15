"use client";

import React from "react";
import Link from "next/link";
import "@/Components/Live/styles/scrollcard.css";
import { FIcon, SIcon, StakeIcon, StarIcon } from "../icons";
import { CiPill } from "react-icons/ci";
import { useTheme } from "@/hooks/useTheme";
import { useFavorites } from "@/hooks/useFavorites";

function StakeCard({
  id,
  title,
  created,
  marketCap,
  wallet,
  variant = "default",
  stakeTimestamp,
  stakersCount,
  poolEndTimestamp,
  poolAddress,
  poolData, // Add poolData prop for accessing reward info
  tokenImage = null,
  isPreview = false,
}) {
  const { resolvedTheme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite("stake", poolAddress);

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (poolAddress) {
      toggleFavorite("stake", poolAddress);
    }
  };

  // Calculate time remaining until pool ends
  const calculateTimeLeft = () => {
    if (!poolEndTimestamp) return "0d.0h";

    const now = Math.floor(Date.now() / 1000);
    const secondsLeft = poolEndTimestamp - now;

    if (secondsLeft <= 0) return "Ended";

    const days = Math.floor(secondsLeft / 86400);
    const hours = Math.floor((secondsLeft % 86400) / 3600);

    return `${days}d.${hours}h`;
  };

  // Calculate percentage of rewards left
  const calculateRewardsLeft = () => {
    if (!poolData || !poolData.rewardRate || !poolData.rewardDistributed) {
      return "0";
    }

    const totalRewards = parseFloat(poolData.rewardRate.toString());
    const distributed = parseFloat(poolData.rewardDistributed.toString());

    if (totalRewards === 0) return "0";

    const rewardsLeft = totalRewards - distributed;
    const percentage = (rewardsLeft / totalRewards) * 100;

    return Math.max(0, Math.min(100, percentage)).toFixed(0);
  };

  // Format stakers count (e.g., 1234 -> "1.2K")
  const formatStakersCount = (count) => {
    if (!count || count === 0) return "0";
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Format address to short version (first 6 and last 3 chars)
  const formatAddress = (address) => {
    if (!address || address === "N/A") return "N/A";
    if (address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
  };
  const StakeIcon = () => (
    <svg
      className="h-[47px] w-[47px] lg:h-[50px] lg:w-[50px] xl:h-[57px] xl:w-[57px]"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3456 47.1409C18.8444 47.5074 10.0393 39.4335 9.6789 29.1072C9.3185 18.781 17.5393 10.1129 28.0405 9.74637C38.5418 9.37987 47.3468 17.4538 47.7072 27.78C48.0676 38.1062 39.8469 46.7744 29.3456 47.1409Z"
        fill="white"
      />
      <path
        d="M24.5337 37.9517L24.5337 37.8813C26.2227 36.0281 27.0438 34.3859 26.9969 32.9549C26.9969 32.5561 26.9383 32.1573 26.821 31.7584C26.7037 31.3596 26.516 30.8787 26.2579 30.3157C25.9999 29.7527 25.6363 29.0254 25.1671 28.134C24.7917 27.3833 24.5219 26.7147 24.3577 26.1282C24.1935 25.5417 24.0879 24.92 24.041 24.2632C24.0176 23.3013 24.2052 22.316 24.604 21.3073C25.0263 20.2751 25.6245 19.325 26.3987 18.457L27.7359 18.457L27.7359 14.8677L29.8472 14.8677L29.8472 18.457L32.979 18.457L32.979 18.5273C32.111 19.4892 31.4894 20.3572 31.114 21.1313C30.7387 21.882 30.551 22.6562 30.551 23.4538C30.551 24.0403 30.6566 24.6151 30.8677 25.1781C31.0788 25.7411 31.419 26.4683 31.8882 27.3598C32.5216 28.5093 32.9556 29.4477 33.1902 30.1749C33.4248 30.8787 33.5538 31.606 33.5773 32.3567C33.6007 33.3654 33.4365 34.3155 33.0846 35.207C32.7562 36.075 32.2166 36.9899 31.4659 37.9517L29.8472 37.9517L29.8472 41.4003L27.7359 41.4003L27.7359 37.9517L24.5337 37.9517Z"
        fill="#0E1379"
      />
      <path
        d="M29.3657 55.1292C14.2646 55.6562 1.60252 44.0456 1.08426 29.1961C0.566001 14.3466 12.3878 1.88149 27.4889 1.35444C42.5901 0.827399 55.2522 12.438 55.7704 27.2875C56.2887 42.137 44.4669 54.6021 29.3657 55.1292Z"
        fill="white"
      />
      <path
        d="M29.08 46.9397C18.5788 47.3062 9.77367 39.2323 9.41327 28.9061C9.05288 18.5799 17.2737 9.9117 27.7749 9.5452C38.2761 9.1787 47.0812 17.2526 47.4416 27.5789C47.802 37.9051 39.5812 46.5732 29.08 46.9397Z"
        fill="#190E79"
      />
      <path
        d="M24.268 37.7506L24.268 37.6802C25.9571 35.8269 26.7782 34.1847 26.7313 32.7537C26.7313 32.3549 26.6726 31.9561 26.5553 31.5573C26.438 31.1585 26.2504 30.6775 25.9923 30.1145C25.7343 29.5515 25.3706 28.8243 24.9014 27.9328C24.5261 27.1821 24.2563 26.5135 24.0921 25.927C23.9279 25.3405 23.8223 24.7189 23.7754 24.062C23.7519 23.1002 23.9396 22.1149 24.3384 21.1061C24.7607 20.0739 25.3589 19.1238 26.1331 18.2558L27.4702 18.2558L27.4702 14.6665L29.5816 14.6665L29.5816 18.2558L32.7134 18.2558L32.7134 18.3262C31.8454 19.288 31.2238 20.156 30.8484 20.9302C30.473 21.6809 30.2854 22.455 30.2854 23.2526C30.2854 23.8391 30.3909 24.4139 30.6021 24.9769C30.8132 25.5399 31.1534 26.2672 31.6226 27.1586C32.256 28.3081 32.69 29.2465 32.9246 29.9738C33.1592 30.6775 33.2882 31.4048 33.3116 32.1555C33.3351 33.1642 33.1709 34.1143 32.819 35.0058C32.4906 35.8738 31.951 36.7887 31.2003 37.7506L29.5816 37.7506L29.5816 41.1991L27.4702 41.1991L27.4702 37.7506L24.268 37.7506Z"
        fill="white"
      />
    </svg>
  );

  return (
    <Link
      href={poolAddress ? `/card/stake?pool=${poolAddress}` : `/card/stake`}
      className="font-khand text-primary block rounded-4xl font-semibold transition hover:opacity-90 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #5951ce 0%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #d0c7f5 0%, #e8e4f8 100%)",
      }}
    >
      <div
        className="relative flex rounded-4xl p-4"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(30deg, #5951ce 0%, #1A1E5F 100%)"
              : "linear-gradient(30deg, #d0c7f5 0%, #e8e4f8 100%)",
        }}
      >
        {/* Right side elements */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <CiPill
            color="#5ecb89"
            size={24}
            // className="md:h-[30px] md:w-[30px]"
          />
        </div>
        <div className="font-khand absolute top-12 right-0 rounded-l-2xl bg-[#2B923E] pl-2 text-xs font-normal text-white md:top-16 xl:text-sm dark:bg-[#2B923E]">
          {stakeTimestamp || "N/A"}
        </div>
        <div
          className="absolute top-2/3 right-4 z-10 -translate-y-1/2 transform cursor-pointer transition-transform hover:scale-110 md:right-6"
          onClick={handleStarClick}
        >
          <StarIcon filled={isFav} />
        </div>

        <div className="relative ml-2 flex flex-col justify-start md:ml-0 lg:ml-2">
          <div className="h-20 w-20 md:h-24 md:w-24">
            <img
              src={tokenImage || "/fired.png"}
              className="mr-4 w-full h-full rounded-2xl object-cover md:rounded-3xl lg:rounded-4xl"
            />
          </div>
          <div className="mt-8 lg:mt-6 xl:mt-8">
            <div className="absolute left-0 z-5 flex w-80">
              <div className="mx-2 flex items-center text-xl md:mx-4 lg:mx-1 xl:mx-4 xl:text-3xl">
                STAKE
              </div>
              <StakeIcon />
              <div className="mt-2 flex flex-col text-xs text-white xl:text-sm">
                <div
                  className={`${variant === "portfolio" ? "pr-6" : "pr-6 sm:pr-12 xl:pr-14 2xl:pr-18"} -z-1 -ml-6 rounded-full pl-8`}
                  style={{
                    background:
                      resolvedTheme === "dark"
                        ? "linear-gradient(90deg, rgba(7,75,163,1) 0%, rgba(4,88,124,1) 36%, rgba(12,224,207,1) 100%)"
                        : "linear-gradient(90deg, rgba(7,75,163,1) 0%, rgba(4,88,124,1) 36%, rgba(12,224,207,1) 100%)",
                  }}
                >
                  ENDS: |{calculateTimeLeft()}
                </div>

                <div
                  className="-z-1 mr-2 -ml-6 rounded-full pr-0 pl-8"
                  style={{
                    background:
                      resolvedTheme === "dark"
                        ? "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)"
                        : "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)",
                  }}
                >
                  LEFT: |{calculateRewardsLeft()}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex w-full flex-col pr-8">
          <div className="flex w-full items-center justify-start pl-2 md:pl-4">
            <h1 className="xl:text-2xl 2xl:text-3xl [@media(min-width:1700px)]:text-4xl">
              {title}
            </h1>
          </div>
          <div className="font-khand mt-1 pl-2 text-left text-xs font-normal leading-tight md:mt-2 md:pl-4 xl:text-base">
            <p>
              <span className="">Pool ID: </span>{" "}
              {formatAddress(wallet)}
            </p>
            <p>
              <span className="">Token ID: </span>{" "}
              {formatAddress(created)}
            </p>
            <p className="">
              <span className="">REWARDS: </span>
              {marketCap}
            </p>
          </div>
        </div>
        <p className="font-khand absolute right-2 bottom-0 pr-6 text-lg font-semibold text-[#FFB01C] md:right-5 md:pr-2 md:text-2xl">
          {formatStakersCount(stakersCount)}
        </p>
      </div>
      <div className="flex items-center justify-end gap-6 pr-4 pb-2">
        <p className="pr-1 text-lg lg:text-xl xl:text-2xl">stakers</p>
      </div>
    </Link>
  );
}

export default StakeCard;

{
  /*  */
}
