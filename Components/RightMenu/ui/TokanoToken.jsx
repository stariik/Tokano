import React from "react";
import { useTheme } from "@/hooks/useTheme";

const Icon = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3818 0C25.4293 0 32.7637 7.33467 32.7637 16.3818C32.7634 25.4288 25.4291 32.7627 16.3818 32.7627C7.33456 32.7627 0.000263905 25.4288 0 16.3818C0 7.33467 7.3344 0 16.3818 0ZM8.9209 16.9766C8.87691 16.9766 8.83381 16.9917 8.80078 17.0205L5.44238 19.9482C5.31716 20.0574 5.3957 20.2627 5.5625 20.2627H11.5439V21.9492C11.5441 22.0957 11.6606 22.2148 11.8037 22.2148H20.9385C21.0816 22.2148 21.1981 22.0957 21.1982 21.9492V20.2627H27.1777C27.3445 20.2627 27.4221 20.0574 27.2969 19.9482L23.9395 17.0205C23.9064 16.9917 23.8633 16.9766 23.8193 16.9766H8.9209ZM11.5781 8.86426C11.4733 8.86427 11.3887 8.97767 11.3887 9.11719V11.7559H8.94629C8.90229 11.7559 8.8592 11.772 8.82617 11.8008L5.46875 14.7285C5.34354 14.8377 5.42113 15.0429 5.58789 15.043H27.2031C27.3699 15.043 27.4485 14.8377 27.3232 14.7285L23.9648 11.8008C23.9319 11.7721 23.8895 11.756 23.8457 11.7559H21.3535V9.11719C21.3535 8.97766 21.2689 8.86426 21.1641 8.86426H17.5576C17.4528 8.86431 17.3682 8.97769 17.3682 9.11719V11.7559H15.374V9.11719C15.374 8.97766 15.2894 8.86426 15.1846 8.86426H11.5781Z"
        fill={isDark ? "white" : "#292B8C"}
      />
    </svg>
  );
};

function TokanoToken({ children, TableName, className = "", showIcon = false }) {
  return (
    <div className="font-khand">
      <div
        className={`dark:border-secondary -mt-0.5 flex items-center justify-start border-2 border-[#CDCDE9] bg-[#d5d2ec] pl-8 md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl dark:bg-transparent ${className}`}
        style={{
          background: "var(--gradient-tokano-top)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-top: linear-gradient(
              90deg,
              #beb3ff 0%,
              #ffffff 70%
            );
          }
          :global(.dark) div {
            --gradient-tokano-top: linear-gradient(
              90deg,
              rgba(41, 38, 133, 1) 0%,
              rgba(26, 0, 51, 1) 81%
            );
          }
        `}</style>
        {showIcon && <Icon />}
        <h1 className={showIcon ? "ml-4" : ""}>{TableName}</h1>
      </div>
      {children}
      <div
        className="dark:border-secondary -my-0.5 flex justify-end border-2 border-[#CDCDE9] bg-[#d5d2ec] pr-12 md:text-xl lg:text-base xl:text-lg 2xl:text-xl dark:bg-transparent"
        style={{
          background: "var(--gradient-tokano-bottom)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-bottom: linear-gradient(
              90deg,
              rgba(213, 210, 236, 1) 0%,
              rgba(245, 243, 251, 1) 81%
            );
          }
          :global(.dark) div {
            --gradient-tokano-bottom: linear-gradient(
              90deg,
              rgba(41, 38, 133, 1) 0%,
              rgba(26, 0, 51, 1) 81%
            );
          }
        `}</style>
        <h1>Balance in SOL: 203.0123</h1>
      </div>
    </div>
  );
}

export default TokanoToken;
