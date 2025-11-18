"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { LuCopy } from "react-icons/lu";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useTokens } from "@/contexts/tokens-context";
import { CiPill } from "react-icons/ci";

function Soon() {
  const { resolvedTheme } = useTheme();
  const { staking, vesting, lock } = useTokano();
  const { fetchTokenInfo } = useTokens();
  const searchParams = useSearchParams();

  const [copiedField, setCopiedField] = useState(null);
  const [poolData, setPoolData] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const type = searchParams.get("type"); // 'stake', 'vest', or 'lock'
  const poolAddress = searchParams.get("pool");
  const vestAddress = searchParams.get("vest");
  const lockAddress = searchParams.get("lock");

  useEffect(() => {
    const fetchData = async () => {
      if (!staking || !vesting || !lock) return;

      setLoading(true);
      try {
        let data = null;

        if (type === "stake" && poolAddress) {
          data = await staking.fetchStakePool(poolAddress);
          data.type = "stake";
        } else if (type === "vest" && vestAddress) {
          const allVestings = await vesting.fetchAllVestings();
          data = allVestings.find((v) => v.address.toBase58() === vestAddress);
          if (data) data.type = "vest";
        } else if (type === "lock" && lockAddress) {
          const allLocks = await lock.fetchAllLocks();
          data = allLocks.find((l) => l.address.toBase58() === lockAddress);
          if (data) data.type = "lock";
        }

        if (data) {
          setPoolData(data);

          // Fetch token info
          const mintString = data.tokenMint.toBase58();
          console.log("Fetching token info for mint:", mintString);
          const info = await fetchTokenInfo([mintString]);
          console.log("Token info fetched:", info[mintString]);
          setTokenInfo(info[mintString]);
        }
      } catch (error) {
        console.error("Error fetching soon pool data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    type,
    poolAddress,
    vestAddress,
    lockAddress,
    staking,
    vesting,
    lock,
    fetchTokenInfo,
  ]);

  // Copy to clipboard function
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

  // Calculate countdown
  const getCountdown = (launchTime) => {
    if (!launchTime) return "N/A";
    const now = Date.now();
    const launchDate =
      launchTime instanceof Date ? launchTime : new Date(launchTime);
    const diff = launchDate.getTime() - now;

    if (diff <= 0) return "LIVE NOW";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const StakeIcon = () => (
    <svg
      className="h-full w-[47px] lg:w-[70px]"
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        Loading upcoming pool data...
      </div>
    );
  }

  if (!poolData) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        No pool data found
      </div>
    );
  }

  const tokenName = tokenInfo?.name || "Unknown Token";
  const tokenSymbol = tokenInfo?.symbol || "N/A";
  const tokenIcon = tokenInfo?.icon || "/vest.png";
  const address = poolData.poolAddress || poolData.address;
  const launchTime = poolData.startTimestamp || poolData.startTime;

  return (
    <div
      className="dark:border-secondary rounded-4xl border-1 border-[#CDCDE9] pb-4 text-[#190E79] lg:mx-0 lg:pb-6 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #170D56 10%, #622CCD 80%)"
            : "linear-gradient(90deg, #DBD4EA 10%, #D1B8F8 80%)",
      }}
    >
      <div
        className="relative rounded-4xl p-8 pb-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #170D56 0%, #622CCD 100%)"
              : "linear-gradient(180deg, #FFFFFF 40%, #DBD4EA 100%)",
        }}
      >
        <div className="absolute top-8 left-4 flex flex-col gap-2 lg:top-16 lg:gap-4">
          {tokenInfo?.telegram && (
            <a
              href={tokenInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#e3f2fd] p-1 transition-opacity hover:opacity-80 dark:bg-[#0088cc]"
            >
              <FaTelegramPlane />
            </a>
          )}
          {tokenInfo?.twitter && (
            <a
              href={tokenInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black p-1 transition-opacity hover:opacity-80"
            >
              <FaXTwitter />
            </a>
          )}
          {tokenInfo?.website && (
            <a
              href={tokenInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <TbWorld size={25} />
            </a>
          )}
        </div>

        <div className="flex">
          <img
            src={tokenIcon}
            className="mb-4 ml-4 h-full w-20 rounded-2xl md:w-24 lg:w-38 lg:rounded-3xl xl:ml-8"
            onError={(e) => {
              e.target.src = "/vest.png";
            }}
          />
          <div className="font-khand ml-4 font-normal lg:ml-8">
            <h1 className="font-khand text-lg font-semibold md:text-xl lg:text-2xl xl:text-4xl">
              {tokenName} ({tokenSymbol})
            </h1>

            <div className="mt-1 pl-1 text-sm md:text-base lg:text-lg xl:text-xl">
              <p className="flex items-center gap-2">
                {type === "stake" ? "Pool" : type === "vest" ? "Vest" : "Lock"}{" "}
                ID: {formatAddress(address)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof address === "string"
                        ? address
                        : address?.toBase58(),
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
                Creator:{" "}
                {formatAddress(poolData.initializer || poolData.receiverUser)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof (poolData.initializer || poolData.receiverUser) ===
                        "string"
                        ? poolData.initializer || poolData.receiverUser
                        : (
                            poolData.initializer || poolData.receiverUser
                          )?.toBase58(),
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
                Token ID: {formatAddress(poolData.tokenMint)}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() =>
                    copyToClipboard(
                      typeof poolData.tokenMint === "string"
                        ? poolData.tokenMint
                        : poolData.tokenMint?.toBase58(),
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
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-0">
          <div className="ml-4 lg:mr-12">
            <CiPill size={28} />
          </div>

          <div className="mt-12 mr-4 flex -translate-y-1/2 transform justify-end">
            <StarIcon />
          </div>
        </div>

        <div className="absolute left-0 z-5 mt-4 flex w-11/13">
          <div className="font-khand ml-3 flex max-w-20 items-center text-xl font-semibold md:mx-4 lg:text-2xl">
            {type === "stake"
              ? "STAKING POOL"
              : type === "vest"
                ? "VEST"
                : "LOCK"}
          </div>
          <div className="mr-4">
            <StakeIcon />
          </div>
          <div className="font-khand mx-auto my-auto flex w-full flex-col text-xs font-normal lg:text-sm">
            <div
              className="absolute -right-16 bottom-6 -z-1 flex h-2 w-6/7 bg-white lg:-right-27 lg:bottom-8 lg:w-9/10"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(234, 217, 255, 1) 0%, rgba(243, 243, 243, 0) 100%"
                    : "linear-gradient(90deg, rgba(255, 245, 255, 1) 0%, rgba(255, 255, 255, 0) 100%",
              }}
            ></div>
            <div
              className="font-khand -z-1 ml-0 flex justify-center rounded-full py-0.5 pr-1 pl-1 text-sm font-bold text-[#311880] lg:-ml-4 lg:pr-5 lg:pl-6 lg:text-base"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, rgba(237,144,45,1) 20%, rgba(249, 44, 157, 1) 50%,  rgba(237,144,45,1) 90%)"
                    : "linear-gradient(90deg, rgba(237,144,45,1) 20%, rgba(249, 44, 157, 1) 50%,  rgba(237,144,45,1) 90%)",
              }}
            >
              <div>LAUNCHING IN: {getCountdown(launchTime)}</div>
            </div>
          </div>
        </div>

        <div className="font-khand mt-12 pt-12 text-2xl font-semibold lg:mt-16 lg:text-3xl">
          {/* Empty space for layout */}
        </div>
      </div>

      <div className="font-khand mt-4 flex justify-center text-end text-xl font-medium lg:text-2xl">
        {/* Empty space for layout */}
        POLL SIZE 1.2M FIRED
      </div>
    </div>
  );
}

export default Soon;
