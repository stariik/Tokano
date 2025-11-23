import React from "react";
import Image from "next/image";
import { SiVerizon } from "react-icons/si";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";
import { StakeGrad } from "./GradientComps";

function Stake({ data, token }) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Support both old (token prop) and new (data prop) usage
  const poolData = data || {};
  const tokenData = data
    ? {
        name: data.tokenInfo?.name || data.tokenInfo?.symbol || "Unknown Token",
        image: data.tokenInfo?.image || "/image.png",
      }
    : token;

  const poolAddress = poolData.poolAddress?.toBase58() || "";
  const stakersCount = 0; // We don't have stakers count in SDK yet
  const isFav = isFavorite("stake", poolAddress);

  const handleClick = () => {
    if (poolAddress) {
      router.push(`/card/stake?pool=${poolAddress}`);
    } else {
      router.push("/card/stake");
    }
  };

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (poolAddress) {
      toggleFavorite("stake", poolAddress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="font-khand relative flex w-full cursor-pointer flex-col overflow-hidden rounded bg-[#f5f3fb] shadow-lg dark:bg-transparent"
      style={{
        background: "var(--tw-gradient)",
      }}
    >
      <style jsx>{`
        div {
          --tw-gradient: linear-gradient(45deg, #170d56 10%, #432ccd 65%);
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
      <div className="flex flex-1 flex-col px-1 pt-1.5 sm:pt-2 xl:px-2">
        {/* Title & Star */}
        <div className="mb-1.5 flex items-center justify-between sm:mb-2">
          <span className="font-khand text-[11px] leading-tight font-semibold tracking-tight text-[#E6E6E6] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
            {tokenData.name}
          </span>
          <span
            className="ml-1.5 cursor-pointer transition-transform hover:scale-110"
            onClick={handleStarClick}
          >
            <StarIcon filled={isFav} />
          </span>
        </div>

        {/* Stats Row */}
        <div className="font-khand relative flex items-center justify-between gap-1 font-semibold">
          <StakeGrad poolData={poolData} />
          <div className="flex flex-col">
            <div className="flex justify-end gap-0 text-base text-[#FFB01C] sm:text-lg md:text-xl lg:text-xl 2xl:text-2xl">
              {stakersCount > 0 ? `${stakersCount}K` : "0"}
            </div>
            <div className="-ml-1.5 text-xs text-white sm:-ml-2 sm:text-sm md:ml-0">
              stakers
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
    </div>
  );
}

export default Stake;
