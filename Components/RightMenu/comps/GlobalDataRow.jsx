import React from "react";
import { useTheme } from "@/hooks/useTheme";

function GlobalDataRow() {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="-m-0.5 font-khand grid grid-cols-10 border-2 dark:border-secondary border-[#CDCDE9] text-base font-normal text-[#190E79] dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, rgba(49, 6, 128, 1) 0%, rgba(10, 0, 0, 1) 58%)"
            : "linear-gradient(90deg, rgba(229, 227, 245, 1) 0%, rgba(255, 255, 255, 1) 58%)",
      }}
    >
      {/* Left label */}
      <div className="col-span-2 flex flex-col items-center justify-center border-r-2 border-[#CDCDE9] dark:border-secondary py-1 text-lg">
        VESTED
      </div>
      {/* Supply and holders */}
      <div className="col-span-3 flex flex-col justify-center border-r-2 border-[#CDCDE9] dark:border-secondary px-2 py-1 text-xs md:text-lg">
        <div>
          supply: <span className="ml-2">1.00073B</span>
        </div>
        <div>
          holders: <span className="ml-2">3111</span>
        </div>
      </div>
      {/* m-cap and price */}
      <div className="col-span-5 flex flex-col justify-center px-2 py-1 text-xs md:text-lg">
        <div>
          m-cap: <span className="ml-2">$12m / 1244 SOL</span>
        </div>
        <div>
          price: <span className="ml-2">$0.003 / 0.e7_233 SOL</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalDataRow;
