import React from "react";
import { useTheme } from "@/hooks/useTheme";

function GlobalDataRow({ label, data }) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="font-khand dark:border-secondary -m-0.5 flex h-16 border-2 border-[#CDCDE9] text-base font-normal text-[#190E79] dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, rgba(49, 6, 128, 1) 0%, rgba(10, 0, 0, 1) 58%)"
            : "linear-gradient(90deg, rgba(229, 227, 245, 1) 0%, rgba(255, 255, 255, 1) 58%)",
      }}
    >
      {/* Left label - only show if label exists */}
      {label && (
        <div className="dark:border-secondary flex w-[20%] flex-col items-center justify-center border-r-2 border-[#CDCDE9] py-1 text-lg">
          {label}
        </div>
      )}

      {/* Data sections - flexible width based on content */}
      <div className="flex flex-1">
        {data.map((section, index) => {
          const entries = Object.entries(section);
          const isLastSection = index === data.length - 1;

          return (
            <div
              key={index}
              className={`dark:border-secondary flex flex-col justify-center px-2 py-1 text-xs md:text-sm lg:px-1 lg:text-xs xl:px-2 xl:text-sm 2xl:text-base ${
                !isLastSection ? "border-r-2 border-[#CDCDE9]" : ""
              }`}
              style={{ flex: '1 1 auto', minWidth: '0' }}
            >
              {entries.map(([key, value], entryIndex) => (
                <div key={entryIndex} className="flex justify-between whitespace-nowrap">
                  <span>{key}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GlobalDataRow;
