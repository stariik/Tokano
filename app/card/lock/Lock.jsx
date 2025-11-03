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

function Lock({ lockData, lockAddress }) {
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
    console.log("=== LOCK DATA DEBUG ===");
    console.log("lockData:", lockData);
    console.log("lockData keys:", lockData ? Object.keys(lockData) : "null");
    console.log("lockAddress:", lockAddress);
  }, [lockData, lockAddress]);

  useEffect(() => {
    const loadTokenInfo = async () => {
      if (lockData?.tokenMint) {
        const mintString = lockData.tokenMint.toBase58();
        const info = await fetchTokenInfo([mintString]);
        setTokenInfo(info[mintString]);
      }
    };
    loadTokenInfo();
  }, [lockData, fetchTokenInfo]);

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
    const addrString = typeof address === 'string' ? address : address.toBase58();
    return `${addrString.slice(0, 4)}...${addrString.slice(-3)}`;
  };

  // Calculate time remaining
  const getTimeRemaining = (unlockTime) => {
    if (!unlockTime) return "N/A";
    const now = Date.now();
    const unlockDate = unlockTime instanceof Date ? unlockTime : new Date(unlockTime);
    const diff = (unlockDate.getTime() - now) / 1000;

    if (diff <= 0) return "Unlocked";

    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
    return `${days}d.${hours}h`;
  };

  // Format amount with decimals
  const formatAmount = (amount, decimals = 6) => {
    if (!amount) return "0";
    const amountNum = typeof amount === 'number' ? amount : Number(amount);
    return (amountNum / Math.pow(10, decimals)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };
  const StakeIcon = () => (
    <svg
      className="h-[47px] w-[47px] lg:h-[57px] lg:w-[80px]"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3456 47.3799C18.8444 47.7464 10.0393 39.6725 9.6789 29.3463C9.3185 19.02 17.5393 10.3519 28.0405 9.98539C38.5418 9.61889 47.3468 17.6928 47.7072 28.019C48.0676 38.3453 39.8469 47.0134 29.3456 47.3799Z"
        fill="white"
      />
      <path
        d="M24.5337 38.1907L24.5337 38.1204C26.2227 36.2671 27.0438 34.6249 26.9969 33.1939C26.9969 32.7951 26.9383 32.3963 26.821 31.9975C26.7037 31.5986 26.516 31.1177 26.2579 30.5547C25.9999 29.9917 25.6363 29.2644 25.1671 28.373C24.7917 27.6223 24.5219 26.9537 24.3577 26.3672C24.1935 25.7807 24.0879 25.159 24.041 24.5022C24.0176 23.5403 24.2052 22.555 24.604 21.5463C25.0263 20.5141 25.6245 19.564 26.3987 18.696L27.7359 18.696L27.7359 15.1067L29.8472 15.1067L29.8472 18.696L32.979 18.696L32.979 18.7664C32.111 19.7282 31.4894 20.5962 31.114 21.3703C30.7387 22.121 30.551 22.8952 30.551 23.6928C30.551 24.2793 30.6566 24.8541 30.8677 25.4171C31.0788 25.9801 31.419 26.7074 31.8882 27.5988C32.5216 28.7483 32.9556 29.6867 33.1902 30.4139C33.4248 31.1177 33.5538 31.845 33.5773 32.5957C33.6007 33.6044 33.4365 34.5545 33.0846 35.446C32.7562 36.314 32.2166 37.2289 31.4659 38.1907L29.8472 38.1907L29.8472 41.6393L27.7359 41.6393L27.7359 38.1907L24.5337 38.1907Z"
        fill="#790E19"
      />
      <path
        d="M29.3696 55.3682C14.2685 55.8952 1.60642 44.2846 1.08817 29.4351C0.569907 14.5856 12.3917 2.1205 27.4929 1.59346C42.594 1.06641 55.2561 12.677 55.7743 27.5265C56.2926 42.376 44.4708 54.8411 29.3696 55.3682Z"
        fill="white"
      />
      <path
        d="M29.0839 47.1787C18.5827 47.5452 9.77757 39.4713 9.41718 29.1451C9.05679 18.8189 17.2776 10.1507 27.7788 9.78422C38.28 9.41771 47.0851 17.4917 47.4455 27.8179C47.8059 38.1441 39.5851 46.8122 29.0839 47.1787Z"
        fill="#0E1C79"
      />
      <path
        d="M27.9561 16.4888C29.0771 16.4888 30.4262 16.6325 31.6201 17.2339C32.8204 17.8385 33.8549 18.9019 34.3457 20.7173C34.3984 20.9124 34.5299 21.6786 34.583 22.5298C34.6097 22.9569 34.6168 23.4101 34.584 23.8276C34.5575 24.1648 34.5034 24.4868 34.4082 24.7554C34.8922 24.8486 35.1838 24.9163 35.2256 24.9263C35.6183 25.02 35.9392 25.3061 36.0762 25.687C36.1209 25.8106 37.0586 28.4504 37.0586 32.0171C37.0586 35.5468 36.1266 38.208 36.0781 38.3423C35.9423 38.7257 35.6208 39.0142 35.2256 39.1079C35.0789 39.1429 31.8142 39.9106 27.9561 39.9106C24.0955 39.9106 20.8284 39.142 20.6855 39.1079C20.3419 39.0259 20.0531 38.7971 19.8945 38.4858L19.835 38.3481C19.7919 38.2293 18.8535 35.5883 18.8535 32.0171C18.8535 28.4781 19.7901 25.8122 19.834 25.6909C19.9698 25.3082 20.2911 25.0202 20.6855 24.9263C20.723 24.9172 20.97 24.8616 21.3799 24.7808C21.3032 24.2708 21.2637 23.7216 21.2637 23.1235C21.2637 20.92 21.8046 19.2535 22.9287 18.1392C24.0527 17.0251 25.7336 16.4888 27.9561 16.4888ZM27.9551 26.5259C25.3622 26.5259 23.0141 26.91 21.9072 27.1245C21.6593 28.0368 21.2559 29.8542 21.2559 32.0171C21.2559 34.2091 21.6576 36.0074 21.9053 36.9087C23.0116 37.1224 25.3625 37.5083 27.9551 37.5083C30.5471 37.5083 32.8946 37.1233 34.002 36.9087C34.2499 35.9964 34.6543 34.1792 34.6543 32.0161C34.6543 29.825 34.2525 28.0258 34.0049 27.1245C32.8984 26.9108 30.5475 26.5259 27.9551 26.5259ZM27.9551 18.8911C26.5528 18.8911 25.4909 19.0719 24.7764 19.6724C24.0683 20.2675 23.6651 21.3079 23.665 23.1235C23.665 23.5888 23.6944 24.0162 23.75 24.4009C24.9462 24.2499 26.4039 24.1235 27.9551 24.1235C29.4915 24.1235 30.9341 24.2453 32.123 24.394C32.1268 24.322 32.1345 24.2397 32.1455 24.1567C32.1817 23.8828 32.2371 23.5196 32.2109 23.1343C32.1725 22.569 32.1477 22.1579 32.1211 21.8462C32.1011 21.6118 32.0809 21.4395 32.0547 21.3052L32.0264 21.1821C31.8373 20.4817 31.538 19.9196 30.9443 19.5269C30.3446 19.1301 29.4223 18.8911 27.9551 18.8911Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3"
      />
      <path
        d="M30.4346 29.0286L31.667 30.2395L31.7734 30.345L31.6689 30.4524L27.5889 34.6047L27.4834 34.7112L27.376 34.6067L26.833 34.0725L26.8262 34.0813L26.7148 33.9817L24.6299 32.1008L24.5186 32.0012L24.6191 31.8899L25.7764 30.6067L25.877 30.4954L25.9883 30.595L27.418 31.884L30.2227 29.0305L30.3271 28.9241L30.4346 29.0286Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3"
      />
    </svg>
  );

  return (
    <div
      className="dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] pb-4 text-[#190E79] lg:mx-0 lg:pb-2 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #5d9beb 10%, #041d33 80%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #2B6EC5 100%)",
      }}
    >
      <div
        className="relative rounded-4xl p-8 pb-0 lg:p-4 lg:pb-0 xl:p-8 xl:pb-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #5d9beb 0%, #041d33 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #2B6EC5 100%)",
        }}
      >
        <div className="absolute top-8 left-4 flex flex-col gap-2 lg:top-6 lg:left-2 lg:gap-2 xl:top-12 xl:left-4 xl:gap-4">
          <div className="rounded-full bg-[#0088cc] p-1 text-base text-white lg:text-xs xl:text-base">
            <FaTelegramPlane />
          </div>
          <div className="rounded-full bg-black p-1 text-base text-white lg:text-xs xl:text-base">
            <FaXTwitter />
          </div>
          <div className="text-base lg:text-xs xl:text-base">
            <TbWorld className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
          </div>
        </div>

        <div className="flex">
          <img
            src="/vest.png"
            className="mb-4 ml-4 h-full w-20 rounded-2xl md:w-24 lg:rounded-3xl xl:ml-8 xl:w-32 2xl:w-38"
          />
          <div className="font-khand ml-4 font-normal lg:ml-2 xl:ml-8">
            <h1 className="font-khand text-lg font-semibold md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              {tokenInfo?.name || "Unknown Token"} ({tokenInfo?.symbol || "N/A"})
            </h1>

            <div className="mt-1 pl-1 text-sm md:text-base lg:text-sm xl:text-lg 2xl:text-xl">
              <p className="flex items-center gap-2">
                Lock ID: {formatAddress(lockAddress)}
                <LuCopy
                  className="cursor-pointer hover:opacity-70 transition-opacity scale-x-[-1]"
                  onClick={() => copyToClipboard(typeof lockAddress === 'string' ? lockAddress : lockAddress?.toBase58(), "lockId")}
                  title="Copy Lock ID"
                />
                {copiedField === "lockId" && (
                  <span className="text-xs md:text-base text-green-500">Copied!</span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Receiver: {formatAddress(lockData?.receiverUser)}
                <LuCopy
                  className="cursor-pointer hover:opacity-70 transition-opacity scale-x-[-1]"
                  onClick={() => copyToClipboard(typeof lockData?.receiverUser === 'string' ? lockData?.receiverUser : lockData?.receiverUser?.toBase58(), "receiver")}
                  title="Copy Receiver"
                />
                {copiedField === "receiver" && (
                  <span className="text-xs md:text-base text-green-500">Copied!</span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Token ID: {formatAddress(lockData?.tokenMint)}
                <LuCopy
                  className="cursor-pointer hover:opacity-70 transition-opacity scale-x-[-1]"
                  onClick={() => copyToClipboard(typeof lockData?.tokenMint === 'string' ? lockData?.tokenMint : lockData?.tokenMint?.toBase58(), "tokenId")}
                  title="Copy Token ID"
                />
                {copiedField === "tokenId" && (
                  <span className="text-xs md:text-base text-green-500">Copied!</span>
                )}
              </p>
              <p>Market cap: {tokenInfo?.mcap ? `$${(tokenInfo.mcap / 1000).toFixed(1)}K` : "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-0 lg:top-4 xl:top-10">
          <div className="ml-4 xl:mr-6">
            <CiPill className="h-5 w-5 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
          </div>

          <div className="font-khand mt-6 rounded-l-2xl bg-[#2B923E] pl-1 text-xs font-normal md:pl-2 md:text-sm dark:bg-[#2B923E]">
            {lockData?.unlockTime ? formatTimestamp(lockData.unlockTime) : "N/A"}
          </div>
          <div className="mt-12 mr-4 flex -translate-y-1/2 transform justify-end">
            <StarIcon />
          </div>
        </div>

        <div className="absolute left-0 z-5 flex w-11/13">
          <div className="font-khand mx-4 flex max-w-20 items-center text-xl font-semibold lg:mx-2 xl:mx-4 xl:text-3xl">
            LOCK
          </div>
          <StakeIcon />
          <div className="font-khand my-auto flex w-5/5 flex-col text-[10px] sm:text-xs font-normal xl:text-sm">
            <div
              className="font-khand -z-1 -ml-4 flex justify-between rounded-full py-1 pr-5 pl-6 font-medium text-white"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(215, 5, 169, 1) 10%, rgba(42, 141, 255, 1) 90%)"
                    : "linear-gradient(90deg, rgba(215, 5, 169, 1) 10%, rgba(42, 141, 255, 1) 90%)",
              }}
            >
              <div>LOCKED: {lockData?.lastUpdateTime ? formatTimestamp(lockData.lastUpdateTime) : "N/A"}</div>
              <div>UNLOCKS: {lockData?.unlockTime ? getTimeRemaining(lockData.unlockTime) : "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="font-khand mt-9 mr-2 text-end text-2xl font-semibold text-[#FFB01C] lg:mt-10 lg:text-3xl">
          {lockData?.lockAmount ? formatAmount(lockData.lockAmount, tokenInfo?.decimals || 6) : "0"}
        </div>
      </div>

      <div className="font-khand mr-10 text-end text-xl font-medium lg:text-2xl">
        locked {tokenInfo?.symbol || ""}
      </div>
    </div>
  );
}

export default Lock;
