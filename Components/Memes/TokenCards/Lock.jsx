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
  const tokenData = data
    ? {
        name: data.tokenInfo?.name || data.tokenInfo?.symbol || "Unknown Token",
        image: data.tokenInfo?.image || "/image.png",
      }
    : token;

  const lockAddress = lockData.address?.toBase58() || "";
  const stakersCount = 0; // We don't have count in SDK yet
  const isFav = isFavorite("lock", lockAddress);

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!lockData.unlockTime) return "2d-12h";

    const unlockTime = lockData.unlockTime.getTime
      ? lockData.unlockTime.getTime()
      : lockData.timestamp;
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
      toggleFavorite("lock", lockAddress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded shadow-lg dark:bg-transparent"
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
      <div className="flex flex-1 flex-col px-3 pt-2 lg:px-1.5 xl:px-2 2xl:px-3">
        {/* Title & Star */}
        <div className="flex items-center justify-between">
          <span
            className="font-khand text-[12px] leading-tight font-semibold tracking-tight text-[#E6E6E6] md:text-[14px] lg:text-[10px] xl:text-[14px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
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
            LOCK
          </div>
          <div className="rounded-3xl bg-white">
            <div className="m-1.5 rounded-2xl bg-[#190E79] p-1.5 lg:p-2">
              <svg
                width="13"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0C6.2409 0 7.95294 0.321703 8.48828 2.31543C8.54333 2.52143 8.77876 4.01367 8.48828 4.62695H8.4873C8.81702 4.68887 9.01681 4.7354 9.04102 4.74121C9.2328 4.7873 9.38908 4.92813 9.45605 5.11523C9.47836 5.17728 10 6.65276 10 8.64648C9.99995 10.6235 9.48031 12.1128 9.45801 12.1748C9.39167 12.3632 9.234 12.5047 9.04102 12.5508C8.96471 12.5691 7.14722 13 5 13C2.85617 13 1.04065 12.5704 0.958984 12.5508C0.767038 12.5047 0.609886 12.3641 0.542969 12.1768C0.520181 12.1133 5.25867e-05 10.6397 0 8.64648C0 6.67326 0.517745 5.18579 0.541992 5.11816C0.608311 4.9297 0.765908 4.78733 0.958984 4.74121C0.9807 4.73589 1.14626 4.69672 1.4209 4.64355C1.37046 4.33994 1.3457 4.00934 1.3457 3.64551C1.34583 1.19292 2.54181 1.54267e-07 5 0ZM4.99902 5.47461C3.50261 5.47465 2.15235 5.70349 1.55469 5.82227C1.41674 6.32099 1.17383 7.37898 1.17383 8.64648C1.17387 9.93098 1.4148 10.9769 1.55273 11.4697C2.14965 11.5879 3.50235 11.8173 4.99902 11.8174C6.49572 11.8174 7.84669 11.5885 8.44434 11.4697C8.58228 10.971 8.8252 9.91301 8.8252 8.64551C8.82518 7.3615 8.58325 6.31507 8.44531 5.82227C7.84818 5.70407 6.49559 5.47461 4.99902 5.47461ZM7.44824 4.46289C7.45378 4.46362 7.45933 4.46411 7.46484 4.46484C7.4633 4.46387 7.4615 4.46289 7.45996 4.46191C7.4558 4.46306 7.45182 4.46264 7.44824 4.46289ZM4.99902 1.18164C3.42857 1.18171 2.51965 1.58494 2.51953 3.64551C2.51953 3.94326 2.54018 4.21539 2.58008 4.45703C3.26026 4.36783 4.10178 4.29201 4.99902 4.29199C5.90385 4.29199 6.75042 4.37007 7.43262 4.45996C7.35895 4.42398 7.48781 4.05822 7.45996 3.64551C7.41722 3.01206 7.40344 2.71613 7.35352 2.53223C7.13633 1.72209 6.65199 1.18164 4.99902 1.18164Z"
                  fill="white"
                />
                <path
                  d="M5 0C6.2409 0 7.95294 0.321703 8.48828 2.31543C8.54333 2.52143 8.77876 4.01367 8.48828 4.62695H8.4873C8.81702 4.68887 9.01681 4.7354 9.04102 4.74121C9.2328 4.7873 9.38908 4.92813 9.45605 5.11523C9.47836 5.17728 10 6.65276 10 8.64648C9.99995 10.6235 9.48031 12.1128 9.45801 12.1748C9.39167 12.3632 9.234 12.5047 9.04102 12.5508C8.96471 12.5691 7.14722 13 5 13C2.85617 13 1.04065 12.5704 0.958984 12.5508C0.767038 12.5047 0.609886 12.3641 0.542969 12.1768C0.520181 12.1133 5.25867e-05 10.6397 0 8.64648C0 6.67326 0.517745 5.18579 0.541992 5.11816C0.608311 4.9297 0.765908 4.78733 0.958984 4.74121C0.9807 4.73589 1.14626 4.69672 1.4209 4.64355C1.37046 4.33994 1.3457 4.00934 1.3457 3.64551C1.34583 1.19292 2.54181 1.54267e-07 5 0ZM4.99902 5.47461C3.50261 5.47465 2.15235 5.70349 1.55469 5.82227C1.41674 6.32099 1.17383 7.37898 1.17383 8.64648C1.17387 9.93098 1.4148 10.9769 1.55273 11.4697C2.14965 11.5879 3.50235 11.8173 4.99902 11.8174C6.49572 11.8174 7.84669 11.5885 8.44434 11.4697C8.58228 10.971 8.8252 9.91301 8.8252 8.64551C8.82518 7.3615 8.58325 6.31507 8.44531 5.82227C7.84818 5.70407 6.49559 5.47461 4.99902 5.47461ZM7.44824 4.46289C7.45378 4.46362 7.45933 4.46411 7.46484 4.46484C7.4633 4.46387 7.4615 4.46289 7.45996 4.46191C7.4558 4.46306 7.45182 4.46264 7.44824 4.46289ZM4.99902 1.18164C3.42857 1.18171 2.51965 1.58494 2.51953 3.64551C2.51953 3.94326 2.54018 4.21539 2.58008 4.45703C3.26026 4.36783 4.10178 4.29201 4.99902 4.29199C5.90385 4.29199 6.75042 4.37007 7.43262 4.45996C7.35895 4.42398 7.48781 4.05822 7.45996 3.64551C7.41722 3.01206 7.40344 2.71613 7.35352 2.53223C7.13633 1.72209 6.65199 1.18164 4.99902 1.18164Z"
                  stroke="white"
                />
                <path
                  d="M7 7.67773L4.61133 10L4.22754 9.63965L4.2207 9.64746L3 8.59668L3.67773 7.87891L4.57715 8.65332L6.27832 7L7 7.67773Z"
                  fill="white"
                />
                <path
                  d="M7 7.67773L4.61133 10L4.22754 9.63965L4.2207 9.64746L3 8.59668L3.67773 7.87891L4.57715 8.65332L6.27832 7L7 7.67773Z"
                  stroke="white"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1 flex flex-col items-center">
            <span className="text-xl leading-none font-bold text-[#FFD600]">
              {stakersCount}
            </span>
            <span className="-mt-1 text-xs font-semibold text-[#B0B3D6]">
              locked
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
              ? "linear-gradient(90deg, #B4008D 30%, #2A8DFF 80%)"
              : "linear-gradient(90deg, #B4008D 30%, #2A8DFF 80%)",
        }}
      >
        ENDS: | {getTimeRemaining()}
      </div>
    </div>
  );
}

export default Lock;
