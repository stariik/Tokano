import React from "react";

const percents = [
  { value: "10%", color: "white" },
  { value: "25%", color: "white" },
  { value: "50%", color: "#330E79" },
  { value: "75%", color: "#330E79" },
  { value: "100%", color: "#330E79" },
];

export default function RainbowBalance() {
  const handlePercentClick = (percent) => {
    // TODO: Add functionality when needed
  };

  return (
    <div className="h-7 overflow-hidden rainbow-balance-wrapper">
      <div
        className="flex h-full items-center justify-between gap-2 px-2  xl:px-3 2xl:px-4"
        style={{
          background: "linear-gradient(90deg, rgba(109, 17, 179, 1) 10%, rgba(249, 44, 157, 1) 35%, rgba(255, 212, 42, 1) 89%)",
          height: "100%",
        }}
      >
        {percents.map((item) => (
          <span
            key={item.value}
            onClick={() => handlePercentClick(item.value)}
            className="text-xs font-bold xl:text-sm cursor-pointer select-none"
            style={{
              color: item.color,
              fontFamily: "inherit"
            }}
          >
            {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
