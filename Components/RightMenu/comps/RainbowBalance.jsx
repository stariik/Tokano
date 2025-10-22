import React from "react";
import { useTheme } from "@/hooks/useTheme";

const percents = [
  { value: "10%", color: "text-[#190E79] dark:text-white" },
  { value: "25%", color: "text-[#190E79] dark:text-white" },
  { value: "50%", color: "text-[#2d0a5c]" },
  { value: "75%", color: "text-[#2d0a5c]" },
  { value: "100%", color: "text-[#2d0a5c]" },
];

export default function RainbowBalance() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="h-7 overflow-hidden">
      {/* Gradient bar with curved right edge */}
      <div
        className="flex h-full items-center gap-1 px-2 md:gap-2 lg:gap-1 xl:gap-3"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(90deg, #a100ff 0%, #ff0080 40%, #ffb300 100%)"
              : "linear-gradient(90deg, #a100ff 0%, #ff0080 40%, #ffb300 100%)",
          borderRadius: "0 0 0 0",
          position: "relative",
          height: "100%",
        }}
      >
        {percents.map((item) => (
          <span
            key={item.value}
            className={`${item.color} text-xs font-bold xl:text-sm`}
            style={{ fontFamily: "inherit" }}
          >
            {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
