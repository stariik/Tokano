import React from "react";
import Image from "next/image";
import { SiVerizon } from "react-icons/si";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

function Lock({ data, token }) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Support both old (token prop) and new (data prop) usage
  const lockData = data || {};
  const tokenData = data ? {
    name: data.tokenInfo?.name || data.tokenInfo?.symbol || "Unknown Token",
    image: data.tokenInfo?.image || "/image.png",
  } : token;

  const lockAddress = lockData.address?.toBase58() || "";
  const stakersCount = 0; // We don't have count in SDK yet
  const isFav = isFavorite('lock', lockAddress);

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!lockData.unlockTime) return "2d-12h";

    const unlockTime = lockData.unlockTime.getTime ? lockData.unlockTime.getTime() : lockData.timestamp;
    const now = Date.now();
    const diff = unlockTime - now;

    if (diff <= 0) return "UNLOCKED";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d-${hours}h`;
  };

  const handleClick = () => {
    if (lockAddress) {
      router.push(`/card/lock?lock=${lockAddress}`);
    } else {
      router.push("/card/lock");
    }
  };

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (lockAddress) {
      toggleFavorite('lock', lockAddress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full flex-col overflow-hidden rounded shadow-lg cursor-pointer dark:bg-transparent"
      style={{
        background: "var(--tw-gradient)",
      }}
    >
      <style jsx>{`
        div {
          --tw-gradient: linear-gradient(45deg, #5d9beb 10%, #041d33 65%);
        }
      `}</style>
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
      <div className="flex flex-1 flex-col px-3 py-2 pb-1 lg:pb-1.5 lg:px-1.5 xl:px-2 2xl:px-3">
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
            LOCK
          </div>
          <div className="rounded-3xl bg-white">
            <div className="m-1.5 lg:m-2 rounded-2xl bg-[#190E79] p-1.5 lg:p-2">
              <SiVerizon className="h-[10px] w-[10px] text-white xl:h-[14px] xl:w-[14px]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl leading-none font-bold text-[#FFD600]">
              {stakersCount}
            </span>
            <span className="-mt-1 text-xs font-semibold text-[#B0B3D6]">
              stakers
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div
        className="font-khand mx-auto w-30 rounded-xl text-center text-sm font-medium md:text-sm lg:text-xs xl:py-0.5 xl:text-sm"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(90deg, #B4008D 0%, #2A8DFF 100%)"
              : "linear-gradient(90deg, #B4008D 0%, #2A8DFF 100%)",
        }}
      >
        ENDS: | {getTimeRemaining()}
      </div>
    </div>
  );
}

export default Lock;
