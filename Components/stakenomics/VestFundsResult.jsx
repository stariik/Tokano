import React from "react";
import { StarIcon } from "@/Components/icons";
import { CiPill } from "react-icons/ci";
import { useTheme } from "@/hooks/useTheme";

function VestFundsResult({ token, formData }) {
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

  // Helper function to format wallet address
  const formatWallet = (wallet) => {
    if (!wallet || typeof wallet !== 'string' || wallet.length <= 16) return wallet || "0x0000...0000";
    return `${wallet.slice(0, 8)}...${wallet.slice(-3)}`;
  };

  const VestIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="h-[47px] w-[47px] lg:h-[57px] lg:w-[80px]"
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
      className="dark:border-secondary rounded-3xl border-1 border-[#CDCDE9] pb-2 text-[#190E79] lg:mx-0 lg:pb-4 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #9D05A1 10%, #1A1E5F 100%)"
            : "linear-gradient(90deg, #EFEFEF 0%, #9C3B8A 100%)",
      }}
    >
      <div
        className="relative rounded-3xl px-4 pt-4 md:px-8"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #9D05A1 0%, #1A1E5F 100%)"
              : "linear-gradient(45deg, #EFEFEF 30%, #9C3B8A 100%)",
        }}
      >
        <div className="flex flex-row-reverse">
          <img
            src="/vest.png"
            className="ml-4 h-full w-20 rounded-2xl md:w-24 lg:w-28 lg:rounded-3xl xl:ml-8"
          />
          <div className="font-khand ml-4 font-normal lg:ml-8">
            <h1 className="font-khand mr-18 text-lg font-semibold md:text-xl lg:mr-32 lg:text-2xl xl:mr-12 xl:text-4xl">
              {token?.name || "TOKEN NAME"}
            </h1>

            <div className="mt-1 ml-12 pl-1 text-sm md:text-base lg:text-base 2xl:text-xl">
              <p>Vest ID: {formatWallet(formData?.recipientWallet)}</p>
              <p>Token ID: {formatWallet(token?.id)}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-0">
          <div className="mt-6 ml-4 lg:mr-12">
            <CiPill size={28} />
          </div>
        </div>

        <div className="absolute left-0 z-5 flex w-12/13 md:w-11/13">
          <div className="font-khand mx-2 flex items-center text-xl font-semibold md:mx-4 lg:text-3xl">
            VEST
          </div>
          <VestIcon />
          <div className="font-khand my-auto flex w-3/5 flex-col text-xs font-normal md:w-5/5 lg:text-sm">
            <div
              className="font-khand -z-1 mt-2 -ml-2 flex w-9/10 justify-between rounded-full bg-[#e3f2fd] py-1 pr-2 pl-4 font-normal text-white md:-ml-4 md:w-2/3 lg:w-3/4 xl:w-6/7 2xl:w-4/5 2xl:pr-5 2xl:pl-6 dark:bg-transparent"
              style={{
                background: "var(--gradient-vest-1)",
              }}
            >
              <style jsx>{`
                div {
                  --gradient-vest-1: linear-gradient(
                    270deg,
                    #2a8dff 14.74%,
                    #3542c5 88.65%
                  );
                }
              `}</style>
              <div>
                START:{" "}
                {formData?.activationDateTime
                  ? new Date(formData.activationDateTime).toLocaleDateString(
                      "en-GB",
                    )
                  : "11.22.3333"}
              </div>
              <div>CLIFF: {formData?.cliffPeriod || "0"} days</div>
            </div>

            <div
              className="font-khand -z-1 mt-1 ml-3 flex w-12/13 justify-between rounded-full bg-[#e3f2fd] py-1 pr-2 pl-2 font-normal text-white sm:ml-8 md:w-5/6 lg:ml-10 xl:ml-8 2xl:ml-14 2xl:pr-5 2xl:pl-6 dark:bg-transparent"
              style={{
                background: "var(--gradient-vest-2)",
              }}
            >
              <style jsx>{`
                div {
                  --gradient-vest-2: linear-gradient(
                    270deg,
                    #2a8dff 14.74%,
                    #3542c5 88.65%
                  );
                }
              `}</style>
              <div>MODEL: {formData?.releaseModel || "monthly"}</div>
              <div>
                RECIPIENT:{" "}
                {formData?.recipientWallet && typeof formData.recipientWallet === 'string'
                  ? `${formData.recipientWallet.slice(
                      0,
                      6,
                    )}...${formData.recipientWallet.slice(-4)}`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="font-khand mt-8 mr-1 text-end text-2xl font-semibold text-[#FFB01C] lg:text-3xl">
          {formatNumber(formData?.tokenAmount)}
        </div>
      </div>

      <div className="font-khand mr-6 text-end text-xl font-medium md:mr-12 lg:text-2xl">
        vesting
      </div>
    </div>
  );
}

export default VestFundsResult;
