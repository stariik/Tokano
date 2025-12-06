import React from "react";
import Image from "next/image";
import { FaStairs } from "react-icons/fa6";
import { StarIcon } from "@/Components/icons";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

const VestIcon = () => (
  <svg
    width="35"
    height="34"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5387 29.5397C7.24587 29.8291 0.292523 23.4532 0.00792232 15.2986C-0.276679 7.14404 6.21524 0.298827 14.508 0.00940178C22.8008 -0.280023 29.7542 6.09594 30.0388 14.2505C30.3234 22.4051 23.8314 29.2503 15.5387 29.5397Z"
      fill="white"
    />
    <path
      d="M15.529 25.1525C9.76226 25.3538 4.92695 20.92 4.72904 15.2493C4.53113 9.57872 9.04556 4.81861 14.8123 4.61735C20.579 4.41609 25.4143 8.84988 25.6123 14.5205C25.8102 20.1911 21.2957 24.9512 15.529 25.1525Z"
      fill="#190E79"
    />
    <path
      d="M9.37891 11.5664H13.195V14.9024H16.8998V18.1562H20.3619"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function Lock({ data, token }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Support both old (token prop) and new (data prop) usage
  const vestData = data || {};
  const tokenData = data
    ? {
        name: data.tokenInfo?.name || data.tokenInfo?.symbol || "Unknown Token",
        image: data.tokenInfo?.icon || "/image.png",
      }
    : token;

  const vestAddress = vestData.address?.toBase58() || "";

  // Format vested amount
  const formatAmount = (amount, decimals = 9) => {
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

  const isFav = isFavorite("vest", vestAddress);

  // Get schedule type name
  const getScheduleType = () => {
    if (!vestData.scheduleType && vestData.scheduleType !== 0) return "LINEAR";

    const scheduleNames = {
      0: "SECONDLY",
      1: "MINUTELY",
      2: "HOURLY",
      3: "DAILY",
      4: "WEEKLY",
      5: "MONTHLY",
      6: "QUARTERLY",
      7: "YEARLY",
      8: "TILL THE END",
    };

    return scheduleNames[vestData.scheduleType] || "LINEAR";
  };

  // Calculate time remaining until end
  const getTimeRemaining = () => {
    if (!vestData.endTime) return "2d-12h";

    const endTime = vestData.endTime.getTime
      ? vestData.endTime.getTime()
      : vestData.endTime;
    const now = Date.now();
    const diff = endTime - now;

    if (diff <= 0) return "ENDED";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d-${hours}h`;
  };

  const handleClick = () => {
    if (vestAddress) {
      router.push(`/card/vest?vest=${vestAddress}`);
    } else {
      router.push("/card/vest");
    }
  };

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (vestAddress) {
      toggleFavorite("vest", vestAddress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="font-khand relative flex w-full cursor-pointer flex-col overflow-hidden rounded shadow-lg"
      style={{
        background: "linear-gradient(45deg, #88048B 10%, #110C58 65%)",
      }}
    >
      {/* Token Image */}
      <div className="relative aspect-[1.1/1] w-full bg-black">
        <Image
          src={tokenData.image}
          alt={tokenData.name}
          fill
          className="static! object-cover"
          sizes="500px"
        />
      </div>
      {/* Card Content */}
      <div className="mb-2 flex flex-1 flex-col px-3 pt-2 lg:mb-0 lg:px-1.5 xl:px-2 2xl:px-3">
        {/* Title & Star */}
        <div className="mb-1 flex items-center justify-between">
          <span className="font-khand text-[12px] leading-tight font-semibold tracking-tight text-[#E6E6E6] md:text-[14px] lg:text-[10px] xl:text-[14px]">
            {tokenData.name}
          </span>
          <span
            className="ml-2 cursor-pointer transition-transform hover:scale-110"
            onClick={handleStarClick}
          >
            <StarIcon filled={isFav} />
          </span>
        </div>
        {/* Stats Row */}
        <div className="font-khand flex items-center justify-between font-semibold">
          <div className="flex text-xl text-white lg:text-lg xl:text-2xl">
            VEST
          </div>
          <div className="">
            <div className="">
              <VestIcon />
            </div>
          </div>
          <div className="mt-1 flex flex-col items-end">
            <span className="text-xl leading-none font-bold text-[#FFD600]">
              {vestData?.totalVestedAmount
                ? formatAmount(
                    vestData.totalVestedAmount,
                    vestData.tokenInfo?.decimals || 9,
                  )
                : "0"}
            </span>
            <span className="-mt-1 text-sm font-semibold text-white">
              locked
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mb-1 flex flex-row justify-between gap-1 text-white">
        <div
          className="font-khand flex h-5 basis-40 items-center justify-center rounded-r-xl text-center text-[11px] font-medium lg:text-xs"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          TYPE: {getScheduleType()}
        </div>
        <div
          className="font-khand flex h-5 w-30 items-center justify-center rounded-l-xl text-center text-[11px] font-medium lg:text-xs"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          ENDS: | {getTimeRemaining()}
        </div>
      </div>
    </div>
  );
}

export default Lock;
