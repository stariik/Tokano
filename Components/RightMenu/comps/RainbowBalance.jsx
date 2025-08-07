import React from "react";

const percents = [
  { value: "10%", color: "text-white" },
  { value: "25%", color: "text-white" },
  { value: "50%", color: "text-[#2d0a5c]" },
  { value: "75%", color: "text-[#2d0a5c]" },
  { value: "100%", color: "text-[#2d0a5c]" },
];

export default function RainbowBalance() {
  return (
    <div className="overflow-hidden h-7 ">
      {/* Gradient bar with curved right edge */}
      <div
        className="flex items-center h-full gap-1 md:gap-2 px-2"
        style={{
          background:
            "linear-gradient(90deg, #a100ff 0%, #ff0080 40%, #ffb300 100%)",
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
