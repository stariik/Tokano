"use client";
import { useState, useCallback, useEffect } from "react";
import { FUND_TYPES } from "../../lib/constants";
import GenericForm from "@/Components/forms/GenericForm";

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

    return (
      <GenericForm
        fundType={selectedFund.title}
        token={selectedTokenData}
        onDataChange={handleFormDataChange}
        onClose={() => setSelectedFund(null)}
      />
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Fund Cards */}
      <div className="grid grid-cols-2 gap-4 px-2 py-4 md:grid-cols-4">
        {FUND_TYPES.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleCardClick(fund)}
            className={`relative h-32 w-full ${
              fund.bgColor
            } cursor-pointer rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              selectedFund?.id === fund.id
                ? "ring-opacity-50 ring-4 ring-purple-500"
                : ""
            } ${fund.disabled ? "cursor-not-allowed opacity-75" : ""}`}
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
              className={`font-khand absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-200 md:top-3 md:left-3 md:px-3 md:py-1 md:text-xs ${fund.buttonColor}`}
            >
              CREATE
            </button>

            {/* Title */}
            <div className="absolute right-3 bottom-3 left-3 md:right-4 md:bottom-4 md:left-4">
              <h3
                className={`text-xl font-bold md:text-base lg:text-lg ${fund.textColor} font-khand leading-tight`}
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
