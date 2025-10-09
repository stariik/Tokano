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
    <div className="overflow-hidden h-7 ">
      {/* Gradient bar with curved right edge */}
      <div
        className="flex items-center h-full gap-1 md:gap-2 px-2"
        style={{
          background: resolvedTheme === "dark"
            ? "linear-gradient(90deg, #a100ff 0%, #ff0080 40%, #ffb300 100%)"
            : "linear-gradient(90deg, #d580ff 0%, #ff80bf 40%, #ffd480 100%)",
          borderRadius: "0 0 0 0",
          position: "relative",
          height: "100%",
        }}
      >
        {percents.map((item) => (
          <span
            key={item.value}
            className={`${item.color} font-bold text-xs`}
            style={{ fontFamily: "inherit" }}
          >
            {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
