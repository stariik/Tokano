import React from "react";
import { useTheme } from "@/hooks/useTheme";

function TokanoBalanceData() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-stretch">
      <div className="dark:border-secondary flex min-w-[80px] flex-col items-center justify-center border-r-2 border-[#CDCDE9] bg-[#f0edf8] px-4 py-4 dark:bg-[#2d0a5c]">
        {resolvedTheme === "dark" ? (
          // 🌙 DARK MODE SVG
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.3818 0C25.4293 0 32.7637 7.33467 32.7637 16.3818C32.7634 25.4288 25.4291 32.7627 16.3818 32.7627C7.33456 32.7627 0.000263905 25.4288 0 16.3818C0 7.33467 7.3344 0 16.3818 0ZM8.9209 16.9766C8.87691 16.9766 8.83381 16.9917 8.80078 17.0205L5.44238 19.9482C5.31716 20.0574 5.3957 20.2627 5.5625 20.2627H11.5439V21.9492C11.5441 22.0957 11.6606 22.2148 11.8037 22.2148H20.9385C21.0816 22.2148 21.1981 22.0957 21.1982 21.9492V20.2627H27.1777C27.3445 20.2627 27.4221 20.0574 27.2969 19.9482L23.9395 17.0205C23.9064 16.9917 23.8633 16.9766 23.8193 16.9766H8.9209ZM11.5781 8.86426C11.4733 8.86427 11.3887 8.97767 11.3887 9.11719V11.7559H8.94629C8.90229 11.7559 8.8592 11.772 8.82617 11.8008L5.46875 14.7285C5.34354 14.8377 5.42113 15.0429 5.58789 15.043H27.2031C27.3699 15.043 27.4485 14.8377 27.3232 14.7285L23.9648 11.8008C23.9319 11.7721 23.8895 11.756 23.8457 11.7559H21.3535V9.11719C21.3535 8.97766 21.2689 8.86426 21.1641 8.86426H17.5576C17.4528 8.86431 17.3682 8.97769 17.3682 9.11719V11.7559H15.374V9.11719C15.374 8.97766 15.2894 8.86426 15.1846 8.86426H11.5781Z"
              fill="white"
            />
          </svg>
        ) : (
          // ☀️ LIGHT MODE SVG
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.3818 0C25.4293 0 32.7637 7.33467 32.7637 16.3818C32.7634 25.4288 25.4291 32.7627 16.3818 32.7627C7.33456 32.7627 0.000263905 25.4288 0 16.3818C0 7.33467 7.3344 0 16.3818 0ZM8.9209 16.9766C8.87691 16.9766 8.83381 16.9917 8.80078 17.0205L5.44238 19.9482C5.31716 20.0574 5.3957 20.2627 5.5625 20.2627H11.5439V21.9492C11.5441 22.0957 11.6606 22.2148 11.8037 22.2148H20.9385C21.0816 22.2148 21.1981 22.0957 21.1982 21.9492V20.2627H27.1777C27.3445 20.2627 27.4221 20.0574 27.2969 19.9482L23.9395 17.0205C23.9064 16.9917 23.8633 16.9766 23.8193 16.9766H8.9209ZM11.5781 8.86426C11.4733 8.86427 11.3887 8.97767 11.3887 9.11719V11.7559H8.94629C8.90229 11.7559 8.8592 11.772 8.82617 11.8008L5.46875 14.7285C5.34354 14.8377 5.42113 15.0429 5.58789 15.043H27.2031C27.3699 15.043 27.4485 14.8377 27.3232 14.7285L23.9648 11.8008C23.9319 11.7721 23.8895 11.756 23.8457 11.7559H21.3535V9.11719C21.3535 8.97766 21.2689 8.86426 21.1641 8.86426H17.5576C17.4528 8.86431 17.3682 8.97769 17.3682 9.11719V11.7559H15.374V9.11719C15.374 8.97766 15.2894 8.86426 15.1846 8.86426H11.5781Z"
              fill="#0E1379"
            />
          </svg>
        )}
        <span className="text-lg tracking-widest text-[#190E79] uppercase lg:text-base xl:text-lg dark:text-white">
          Tokano
        </span>
      </div>
      <div className="font-khand flex flex-1 flex-col justify-center bg-gradient-to-r from-white dark:from-[#391667] dark:to-[#061a2e]">
        <div className="flex items-center justify-between border-b border-[#7B3FE4] px-4 py-1">
          <span className="text-sm text-[#190E79] xl:text-lg dark:text-white/80">
            Available:
          </span>
          <span className="text-right text-base font-bold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
            13,000,239.<span className="text-sm">127</span>
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-[#7B3FE4] px-4 py-1">
          <span className="text-sm text-[#190E79] xl:text-lg dark:text-white/80">
            Staked:
          </span>
          <span className="text-base font-bold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
            120,000.<span className="text-sm">200</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-1">
          <span className="text-sm text-[#190E79] xl:text-lg dark:text-white/80">
            Locked:
          </span>
          <span className="text-base font-bold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
            120,000.<span className="text-sm">200</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TokanoBalanceData;
