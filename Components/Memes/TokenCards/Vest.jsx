import React from "react";
import Image from "next/image";
import { FaStairs } from "react-icons/fa6";
import { StarIcon } from "@/Components/icons";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

function Lock({ data, token }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Support both old (token prop) and new (data prop) usage
  const vestData = data || {};
  const tokenData = data ? {
    name: data.tokenInfo?.name || data.tokenInfo?.symbol || "Unknown Token",
    image: data.tokenInfo?.image || "/image.png",
  } : token;

  const vestAddress = vestData.address?.toBase58() || "";
  const lockersCount = 0; // We don't have count in SDK yet
  const isFav = isFavorite('vest', vestAddress);

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
      toggleFavorite('vest', vestAddress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded shadow-lg"
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
      <div className="flex flex-1 flex-col px-3 py-2 lg:px-1.5 xl:px-2 2xl:px-3">
        {/* Title & Star */}
        <div className="mb-1 flex items-center justify-between">
          <span
            className="font-khand text-[12px] leading-tight font-semibold tracking-tight text-[#E6E6E6] md:text-[14px] lg:text-[10px] xl:text-[14px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {tokenData.name}
          </span>
          <span
            className="ml-2 cursor-pointer hover:scale-110 transition-transform"
            onClick={handleStarClick}
          >
            <StarIcon filled={isFav} />
          </span>
        </div>
        {/* Stats Row */}
        <div className="font-khand mb-1 flex items-center justify-between font-semibold">
          <div className="flex text-xl text-white lg:text-lg xl:text-2xl">
            Vest
          </div>
          <div className="rounded-3xl bg-white">
            <div className="m-1.5 rounded-2xl bg-[#190E79] p-1.5 lg:m-2 lg:p-2">
              <FaStairs className="h-[10px] w-[10px] text-white xl:h-[14px] xl:w-[14px]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
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
      <div className="flex flex-row justify-between gap-1 text-white">
        <div
          className="font-khand flex h-6 basis-40 items-center justify-center rounded-r-xl text-center text-[11px] font-medium lg:text-xs"
          style={{
            background: "linear-gradient(90deg, #3542C5 0%, #2A8DFF 100%)",
          }}
        >
          TYPE: LIN/MONTHLY
        </div>
        <div
          className="font-khand flex h-6 w-30 items-center justify-center rounded-l-xl text-center text-[11px] font-medium lg:text-xs"
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
