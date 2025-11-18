import React from "react";

const percents = [
  { value: "10%", color: "white" },
  { value: "25%", color: "white" },
  { value: "50%", color: "#330E79" },
  { value: "75%", color: "#330E79" },
  { value: "100%", color: "#330E79" },
];

interface RainbowBalanceProps {
  availableBalance: number;
  onPercentClick: (amount: string) => void;
}

export default function RainbowBalance({
  availableBalance,
  onPercentClick,
}: RainbowBalanceProps) {
  const handlePercentClick = (percent: string) => {
    // Extract percentage number (e.g., "10%" -> 10)
    const percentValue = parseInt(percent.replace("%", ""));
    // Calculate amount based on percentage
    const amount = (availableBalance * percentValue) / 100;
    // Pass the calculated amount as string
    onPercentClick(amount.toString());
  };

  return (
    <div className="w-7/8 md:maw-6/7 overflow-hidden rounded-b-xl mx-auto">
      <div
        className="flex h-full items-center justify-center md:justify-between gap-2 px-3 md:px-4 xl:px-2 2xl:px-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(109, 17, 179, 1) 10%, rgba(249, 44, 157, 1) 35%, rgba(255, 212, 42, 1) 89%)",
          height: "100%",
        }}
      >
        {percents.map((item) => (
          <span
            key={item.value}
            onClick={() => handlePercentClick(item.value)}
            className="font-khand cursor-pointer select-none text-[10px] md:text-xs font-bold transition-transform hover:scale-110 xl:text-sm"
            style={{
              color: item.color,
            }}
          >
            {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
