import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { StarIcon } from "@/Components/icons";
import { CiPill } from "react-icons/ci";
import { useTheme } from "@/hooks/useTheme";

function StakingPoolResult({ token, formData }) {
  const { resolvedTheme } = useTheme();
  // Helper function to format numbers
  const formatNumber = (num) => {
    if (!num) return "0";
    const number = parseFloat(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    }
    return number.toLocaleString();
  };

  // Calculate launching countdown
  const getLaunchingCountdown = () => {
    if (!formData?.activationDateTime || formData.activationDateTime === "IMMEDIATELY") {
      return "LIVE NOW";
    }

    const activationTime = new Date(formData.activationDateTime).getTime();
    const now = Date.now();
    const diff = activationTime - now;

    if (diff <= 0) {
      return "LIVE NOW";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} days ${hours} hours`;
    } else if (hours > 0) {
      return `${hours} hours ${minutes} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const StakeIcon = () => (
    <svg
      className="absolute -mr-1 h-full w-[47px] lg:w-[80px]"
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
    <div
      className="dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] pb-4 text-[#190E79] lg:pb-12 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #2f1f7b 10%, #622ea9 80%)"
            : "linear-gradient(90deg, rgb(255 255 255) 0%, rgb(206 193 255) 100%)",
      }}
    >
      <div
        className="relative rounded-3xl p-4 pb-0 md:p-6 md:pb-2"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #2f1f7b 0%, #622ea9 100%)"
              : "linear-gradient(45deg, rgb(255 255 255) 0%, rgb(232, 228, 248) 100%)",
        }}
      >
        <div className="grid grid-cols-3 items-center">
          <img
            src="/vest.png"
            className="mb-4 w-16 rounded-2xl  xl:ml-4 2xl:ml-10 md:w-18 lg:w-16 xl:w-22 lg:rounded-3xl "
          />
          <div className="font-khand font-normal col-span-2">
            <h1 className="font-khand text-base font-semibold md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">
              {token?.name || "TOKEN NAME"}
            </h1>

            <div className="mt-1 pl-1 text-xs md:text-sm lg:text-base 2xl:text-base">
              <p>Pool ID: {formData?.poolId || "0x0000...0000"}</p>
              <p>Creator: {formData?.creator ? `${formData.creator.slice(0, 4)}...${formData.creator.slice(-4)}` : "Anonymous"}</p>
              <p>Token ID: {token?.id ? (token.id.length > 12 ? `${token.id.slice(0, 6)}...${token.id.slice(-4)}` : token.id) : "0x0000...0000"}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-10 right-0">
          <div className="mr-2 flex justify-end lg:mr-12">
            <CiPill size={36} />
          </div>

          <div className="font-khand mt-2 rounded-l-2xl bg-[#2B923E] pr-2 pl-2 text-[10px] font-normal text-white md:mt-6 lg:text-sm lg:text-xs xl:text-sm dark:bg-[#2B923E]">
            {formData?.activationDateTime === "IMMEDIATELY"
              ? "IMMEDIATELY"
              : formData?.activationDateTime
                ? new Date(formData.activationDateTime)
                    .toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(",", "")
                : "DD.MM.YY HH:MM"}
          </div>
        </div>

        <div
          className="font-khand mx-auto w-fit mt-2 mb-10 rounded-2xl px-4 text-center text-sm font-semibold text-[#311880] md:text-sm lg:text-lg 2xl:text-2xl"
          style={{
            background:
              resolvedTheme === "dark"
                ? "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)"
                : "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)",
          }}
        >
          {getLaunchingCountdown() === "LIVE NOW" ? "LIVE NOW" : `LAUNCHING IN: ${getLaunchingCountdown()}`}
        </div>

        <div className="font-khand relative text-end text-xl font-medium lg:text-2xl">
          <div className="absolute -bottom-4 lg:-bottom-8 xl:-bottom-11 z-5 mt-2 flex w-full">
            <div className="font-khand 2xl:mx-4 flex max-w-20 items-center text-xl font-semibold lg:text-xl text-left">
              <div className="leading-tight">
                <div>STAKING</div>
                <div>POOL</div>
              </div>
            </div>
            <div className="font-khand relative my-auto flex w-full flex-col text-xs font-normal lg:text-sm">
              <StakeIcon />

              <div
                className="font-khand -z-1 ml-8 w-3/4 rounded-full py-0.5 lg:py-1 pr-2 pl-4 font-medium text-white md:pl-10"
                style={{
                  background:
                    resolvedTheme === "dark"
                      ? "linear-gradient(90deg, rgba(7,75,163,1) 0%, rgba(4,88,124,1) 36%, rgba(12,224,207,1) 100%)"
                      : "linear-gradient(90deg, rgba(7,75,163,1) 0%, rgba(4,88,124,1) 36%, rgba(12,224,207,1) 100%)",
                }}
              >
                <div className="flex justify-between">
                  <span>ENDS: </span>
                  <span>
                    {formData?.unstakingPeriodDays || "0"} days{" "}
                    {formData?.unstakingPeriodHours || "0"} hours
                  </span>
                </div>
              </div>
              <div
                className="font-khand -z-1 ml-8 w-2/3 rounded-full py-0.5 lg:py-1 pr-2 pl-4 font-medium text-black md:pl-10"
                style={{
                  background:
                    resolvedTheme === "dark"
                      ? "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)"
                      : "linear-gradient(90deg, rgba(109, 17, 179, 1) 0%, rgba(249, 44, 157, 1) 45%, rgba(255, 212, 42, 1) 100%)",
                }}
              >
                <div className="flex justify-between">
                  <span>REWARDS: </span>
                  {formatNumber(formData?.rewardAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingPoolResult;
