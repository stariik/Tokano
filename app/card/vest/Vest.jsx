"use client";
import React, { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { LuCopy } from "react-icons/lu";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";
import { useTokens } from "@/contexts/tokens-context";

import { CiPill } from "react-icons/ci";

function Vest({ vestData, vestAddress }) {
  const { resolvedTheme } = useTheme();
  const { fetchTokenInfo } = useTokens();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Copy to clipboard function
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Debug logging
  useEffect(() => {
    console.log("=== VEST DATA DEBUG ===");
    console.log("vestData:", vestData);
    console.log("vestData keys:", vestData ? Object.keys(vestData) : "null");
    console.log("vestAddress:", vestAddress);
  }, [vestData, vestAddress]);

  useEffect(() => {
    const loadTokenInfo = async () => {
      if (vestData?.tokenMint) {
        const mintString = vestData.tokenMint.toBase58();
        const info = await fetchTokenInfo([mintString]);
        setTokenInfo(info[mintString]);
      }
    };
    loadTokenInfo();
  }, [vestData, fetchTokenInfo]);

  // Format timestamp to DD.MM.YY/HH:MM
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}/${hours}:${minutes}`;
  };

  // Format address
  const formatAddress = (address) => {
    if (!address) return "N/A";
    const addrString =
      typeof address === "string" ? address : address.toBase58();
    return `${addrString.slice(0, 4)}...${addrString.slice(-3)}`;
  };

  // Format schedule type to uppercase
  const formatScheduleType = (scheduleType) => {
    if (!scheduleType) return "N/A";
    return scheduleType.toString().toUpperCase();
  };

  // Calculate cliff period in days
  const getCliffPeriod = (startTime) => {
    if (!startTime) return "N/A";
    const now = Date.now();
    const startDate =
      startTime instanceof Date ? startTime : new Date(startTime);
    const startTimestamp = startDate.getTime();

    if (now >= startTimestamp) return "0d";

    const diffMs = startTimestamp - now;
    const diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
    return `${diffDays}d`;
  };

  // Calculate vesting steps (completed/total)
  const getVestingSteps = (startTime, endTime, scheduleType) => {
    if (!startTime || !endTime || !scheduleType) return "N/A";

    const now = Date.now();
    const startDate =
      startTime instanceof Date ? startTime : new Date(startTime);
    const endDate = endTime instanceof Date ? endTime : new Date(endTime);
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    // Calculate period duration in milliseconds based on schedule type
    let periodMs;
    const scheduleStr = scheduleType.toString().toLowerCase();
    if (scheduleStr === "daily") {
      periodMs = 24 * 60 * 60 * 1000;
    } else if (scheduleStr === "weekly") {
      periodMs = 7 * 24 * 60 * 60 * 1000;
    } else if (scheduleStr === "monthly") {
      periodMs = 30 * 24 * 60 * 60 * 1000; // Approximate month
    } else {
      return "N/A";
    }

    // Total steps
    const totalDuration = endTimestamp - startTimestamp;
    const totalSteps = Math.ceil(totalDuration / periodMs);

    // Completed steps
    if (now < startTimestamp) {
      return `0/${totalSteps}`;
    } else if (now >= endTimestamp) {
      return `${totalSteps}/${totalSteps}`;
    } else {
      const elapsed = now - startTimestamp;
      const completedSteps = Math.floor(elapsed / periodMs);
      return `${completedSteps}/${totalSteps}`;
    }
  };

  // Calculate time remaining until vesting ends
  const getTimeRemaining = (endTime) => {
    if (!endTime) return "N/A";
    const now = Date.now();
    const endDate = endTime instanceof Date ? endTime : new Date(endTime);
    const endTimestamp = endDate.getTime();

    if (now >= endTimestamp) return "0d.0h";

    const diffMs = endTimestamp - now;
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.floor(
      (diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
    );

    return `${diffDays}d.${diffHours}h`;
  };

  // Format amount with decimals
  const formatAmount = (amount, decimals = 6) => {
    if (!amount) return "0";
    const amountNum = typeof amount === "number" ? amount : Number(amount);
    const value = amountNum / Math.pow(10, decimals);

    if (value >= 1000000) {
      const millions = value / 1000000;
      return millions % 1 === 0
        ? `${millions.toFixed(0)}M`
        : `${millions.toFixed(1)}M`;
    } else if (value >= 1000) {
      const thousands = value / 1000;
      return thousands % 1 === 0
        ? `${thousands.toFixed(0)}K`
        : `${thousands.toFixed(1)}K`;
    }
    return value.toFixed(0);
  };
  const VestIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="h-[120px] w-[90px] xl:w-[100px]"
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
    <div
      className="dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] pb-4 text-[#190E79] sm:mx-4 lg:mx-0 lg:pb-2 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #9D05A1 10%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #9C3B8A 100%)",
      }}
    >
      <div
        className="relative rounded-4xl p-8 pb-0 lg:p-4 lg:pb-0 xl:p-8 xl:pb-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #9D05A1 0%, #1A1E5F 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #9C3B8A 100%)",
        }}
      >
        <div className="absolute top-8 left-2 flex flex-col gap-2 md:left-4 lg:top-6 lg:left-2 lg:gap-2 xl:top-12 xl:left-4 xl:gap-4">
          {tokenInfo?.telegram && (
            <a
              href={tokenInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0088cc] p-1 text-base text-white transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <FaTelegramPlane />
            </a>
          )}
          {tokenInfo?.twitter && (
            <a
              href={tokenInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black p-1 text-base text-white transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <FaXTwitter />
            </a>
          )}
          {tokenInfo?.website && (
            <a
              href={tokenInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <TbWorld className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
            </a>
          )}
        </div>

        <div className="flex">
          <div
            className="ml-4 h-20 w-20 rounded-2xl bg-cover bg-center md:ml-6 md:h-24 md:w-24 lg:ml-10 lg:rounded-3xl xl:ml-8 xl:h-32 xl:w-32 2xl:h-38 2xl:w-38"
            style={{
              backgroundImage: `url('${tokenInfo?.icon || "/vest.png"}')`,
            }}
          ></div>
          <div className="font-khand ml-4 font-normal lg:ml-10">
            <h1 className="font-khand text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
              {tokenInfo?.name || "Unknown Token"} ({tokenInfo?.symbol || "N/A"}
              )
            </h1>

            <div className="mt-1 pl-1 text-xs md:text-base lg:text-sm xl:text-lg 2xl:text-xl">
              <p className="flex items-center gap-2">
                Pool ID: {formatAddress(vestAddress)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof vestAddress === "string"
                        ? vestAddress
                        : vestAddress?.toBase58(),
                      "poolId",
                    )
                  }
                  title="Copy Pool ID"
                />
                {copiedField === "poolId" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Creator: {formatAddress(vestData?.walletUser)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof vestData?.walletUser === "string"
                        ? vestData?.walletUser
                        : vestData?.walletUser?.toBase58(),
                      "creator",
                    )
                  }
                  title="Copy Creator"
                />
                {copiedField === "creator" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Token ID: {formatAddress(vestData?.tokenMint)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof vestData?.tokenMint === "string"
                        ? vestData?.tokenMint
                        : vestData?.tokenMint?.toBase58(),
                      "tokenId",
                    )
                  }
                  title="Copy Token ID"
                />
                {copiedField === "tokenId" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Receiver: {formatAddress(vestData?.receiverUser)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof vestData?.receiverUser === "string"
                        ? vestData?.receiverUser
                        : vestData?.receiverUser?.toBase58(),
                      "receiver",
                    )
                  }
                  title="Copy Receiver"
                />
                {copiedField === "receiver" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-0 lg:top-4 xl:top-10">
          <div className="ml-4 xl:mr-6">
            <CiPill className="h-5 w-5 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
          </div>

          <div className="font-khand mt-6 rounded-l-2xl bg-[#2B923E] pr-0.5 pl-1 text-xs font-normal md:pl-2 md:text-sm lg:pr-1 dark:bg-[#2B923E]">
            {vestData?.startTime ? formatTimestamp(vestData.startTime) : "N/A"}
          </div>
          <div className="mt-12 mr-4 flex -translate-y-1/2 transform justify-end">
            <StarIcon />
          </div>
        </div>

        <div className="absolute left-0 z-5 flex w-11/13">
          <div className="font-khand mx-3 flex max-w-20 items-center text-2xl font-semibold sm:text-4xl lg:mx-6 xl:mx-4 xl:text-3xl">
            Vest
          </div>
          <VestIcon />

          <div className="font-khand my-auto flex w-5/5 flex-col gap-1 text-sm font-normal md:text-sm lg:text-base">
            <div
              className="font-khand -z-1 -ml-6 flex w-9/10 justify-between rounded-full py-0.5 pr-4 pl-8 font-normal text-white md:w-4/5 lg:w-4/5 2xl:pr-5 2xl:pl-8"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                    : "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)",
              }}
            >
              <div>
                TYPE:{" "}
                {vestData?.scheduleType
                  ? formatScheduleType(vestData.scheduleType)
                  : "N/A"}
              </div>
              <div>
                CLIFF:{" "}
                {vestData?.startTime
                  ? getCliffPeriod(vestData.startTime)
                  : "N/A"}
              </div>
            </div>

            <div
              className="font-khand -z-1 ml-8 flex w-full justify-between rounded-full py-0.5 pr-2 pl-2 font-normal text-white md:ml-9 md:w-auto lg:ml-12 lg:w-auto xl:ml-20 2xl:ml-32 2xl:pr-5 2xl:pl-6"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                    : "linear-gradient(90deg, rgba(53, 66, 197, 1) 10%, rgba(42, 141, 255, 1) 90%)",
              }}
            >
              <div>
                STEPS:{" "}
                {vestData
                  ? getVestingSteps(
                      vestData.startTime,
                      vestData.endTime,
                      vestData.scheduleType,
                    )
                  : "N/A"}
              </div>
              <div>
                ENDS:{" "}
                {vestData?.endTime ? getTimeRemaining(vestData.endTime) : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="font-khand mt-24 mr-2 text-end text-2xl font-semibold text-[#FFB01C] lg:mt-30 lg:text-3xl">
          {vestData?.totalVestedAmount
            ? formatAmount(vestData.totalVestedAmount, tokenInfo?.decimals || 6)
            : "0"}
        </div>
      </div>

      <div className="font-khand mr-10 lg:mr-6 xl:mr-10 text-end text-xl font-medium lg:text-2xl">
        locked
      </div>
    </div>
  );
}

export default Vest;
