import React from "react";
import { useTheme } from "@/hooks/useTheme";

function StakeButton() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center">
      <button
        className="flex min-w-[80px] cursor-pointer items-center justify-between gap-1 rounded-full border-2 border-white py-1 pr-2 pl-1 text-xs transition-all duration-200 sm:min-w-[120px] sm:gap-2 sm:border-4 sm:py-2 sm:pr-4 sm:pl-2 sm:text-base md:min-w-[160px] md:text-xl"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(90deg, #003c2f 0%, #00c6c6 100%)"
              : "linear-gradient(90deg, #003c2f 0%, #00c6c6 100%)",
          boxShadow: "0 2px 8px 0 #0002",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-200 sm:h-7 sm:w-7 md:h-9 md:w-9">
          <svg
            width="8"
            height="21"
            viewBox="0 0 8 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.747178 17.9401L0.747178 17.8855C2.05819 16.447 2.69549 15.1724 2.65907 14.0617C2.65907 13.7522 2.61355 13.4426 2.52251 13.1331C2.43147 12.8235 2.2858 12.4503 2.0855 12.0133C1.88521 11.5763 1.60298 11.0118 1.23881 10.3199C0.947471 9.7372 0.738073 9.21825 0.610614 8.76304C0.483154 8.30783 0.401216 7.8253 0.364799 7.31546C0.34659 6.56891 0.492258 5.80416 0.801803 5.02119C1.12956 4.22001 1.59387 3.48257 2.19475 2.80885L3.23264 2.80885L3.23264 0.0229492L4.87141 0.0229492L4.87141 2.80885L7.30225 2.80885L7.30225 2.86348C6.62853 3.61003 6.146 4.28374 5.85467 4.88463C5.56333 5.4673 5.41766 6.06818 5.41766 6.68727C5.41766 7.14248 5.4996 7.58859 5.66348 8.0256C5.82736 8.4626 6.09138 9.02707 6.45555 9.71899C6.94718 10.6112 7.28404 11.3395 7.46612 11.904C7.64821 12.4503 7.74835 13.0147 7.76656 13.5974C7.78477 14.3804 7.65731 15.1178 7.38418 15.8097C7.12927 16.4835 6.71047 17.1936 6.1278 17.9401L4.87141 17.9401L4.87141 20.6168L3.23264 20.6168L3.23264 17.9401L0.747178 17.9401Z"
              fill="#180F43"
            />
          </svg>
        </span>
        <span
          className="text-xs font-bold text-white sm:text-base md:text-2xl"
          style={{ fontFamily: "inherit" }}
        >
          STAKE
        </span>
      </button>
    </div>
  );
}

export default StakeButton;
