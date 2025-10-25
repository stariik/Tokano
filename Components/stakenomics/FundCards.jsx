"use client";
import { useState, useCallback, useEffect } from "react";
import { FUND_TYPES } from "../../lib/constants";
import StakingPoolForm from "@/Components/forms/StakingPoolForm";
import LockFundsForm from "@/Components/forms/LockFundsForm";
import VestFundsForm from "@/Components/forms/VestFundsForm";

export default function FundCards({ selectedToken, selectedTokenData }) {
  const [selectedFund, setSelectedFund] = useState(FUND_TYPES[0]); // Default to Staking Pool
  const [currentFormData, setCurrentFormData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (fundType) => {
    if (fundType.disabled) return;
    // Only clear data if switching to a different fund type
    if (selectedFund?.id !== fundType.id) {
      setCurrentFormData(null);
    }
    setSelectedFund(fundType);
  };

  const handleCreateClick = (e, fundType) => {
    e.stopPropagation();
    if (fundType.disabled) return;

    if (!selectedToken) {
      alert("Please select a token in your wallet first.");
      return;
    }

    console.log(`Creating ${fundType.title} for token ID ${selectedToken}`);
  };

  const handleFormDataChange = useCallback((data) => {
    setCurrentFormData(data);
  }, []);

  const renderFundComponent = () => {
    if (!selectedFund) return null;

    // Render specific form component based on fund type
    switch (selectedFund.title) {
      case "STAKING POOL":
        return (
          <StakingPoolForm
            token={selectedTokenData}
            onDataChange={handleFormDataChange}
            onClose={() => setSelectedFund(null)}
          />
        );
      case "LOCK FUNDS":
        return (
          <LockFundsForm
            token={selectedTokenData}
            onDataChange={handleFormDataChange}
            onClose={() => setSelectedFund(null)}
          />
        );
      case "VEST FUNDS":
        return (
          <VestFundsForm
            token={selectedTokenData}
            onDataChange={handleFormDataChange}
            onClose={() => setSelectedFund(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Fund Cards */}
      <div className="grid gap-2 md:gap-4 xl:gap-6 px-2 py-4 grid-cols-4">
        {FUND_TYPES.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleCardClick(fund)}
            className={`relative h-22 md:h-20 lg:h-24 xl:h-28 w-full ${
              fund.bgColor
            } rounded-2xl p-4 pb-2 shadow-lg transition-all duration-300 ${
              fund.disabled
                ? "cursor-not-allowed opacity-75"
                : "cursor-pointer hover:scale-105 hover:shadow-xl"
            } ${
              selectedFund?.id === fund.id
                ? "ring-opacity-50 ring-4 ring-purple-500 opacity-100"
                : ""
            } ${!fund.active && selectedFund?.id !== fund.id ? "opacity-50" : ""}`}
            style={{
              background:
                typeof fund.gradientStyle === "object" &&
                "light" in fund.gradientStyle
                  ? isDarkMode
                    ? fund.gradientStyle.dark
                    : fund.gradientStyle.light
                  : fund.gradientStyle.background || fund.gradientStyle,
            }}
          >
            <button
              onClick={(e) => handleCreateClick(e, fund)}
              disabled={fund.disabled}
              className={`font-khand absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-200  xl:top-3 xl:left-3 md:px-3 md:py-0.5 lg:py-0.5 xl:py-1md:text-xs ${fund.buttonColor}`}
            >
              CREATE
            </button>

            {/* Title */}
            <div className="absolute right-3 bottom-3 left-4 md:right-4 md:bottom-2 md:left-4 lg:left-2 xl:left-4">
              <h3
                className={`text-base font-bold md:text-base lg:text-xl xl:text-2xl ${fund.textColor} font-khand leading-tight`}
              >
                {fund.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="block"
                  >
                    {word}
                  </span>
                ))}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Fund Component */}
      {selectedFund && (
        <div className="px-2 pb-6 md:px-0">{renderFundComponent()}</div>
      )}
    </div>
  );
}
