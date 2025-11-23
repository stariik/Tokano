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
        image: data.tokenInfo?.image || "/image.png",
      }
    : token;

  const vestAddress = vestData.address?.toBase58() || "";
  const lockersCount = 0; // We don't have count in SDK yet
  const isFav = isFavorite("vest", vestAddress);

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
      <div className="relative aspect-[1.6/1] w-full bg-black">
        <Image
          src={tokenData.image}
          alt={tokenData.name}
          fill
          className="static! object-cover"
          sizes="220px"
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
            Vest
          </div>
          <div className="">
            <div className="">
              <VestIcon />
            </div>
          </div>
          <div className="mt-1 flex flex-col items-end">
            <span className="text-xl leading-none font-bold text-[#FFD600]">
              {lockersCount}
            </span>
            <span className="-mt-1 text-sm font-semibold text-[#B0B3D6]">
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
          TYPE: LIN/MONTHLY
        </div>
        <div
          className="font-khand flex h-5 w-30 items-center justify-center rounded-l-xl text-center text-[11px] font-medium lg:text-xs"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          ENDS: | 2d-12h
        </div>
      </div>
    </div>
  );
}

export default Lock;
