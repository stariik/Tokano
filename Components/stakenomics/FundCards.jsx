"use client";
import { useState, useCallback, useEffect } from "react";
import { FUND_TYPES } from "../../lib/constants";
import GenericForm from "@/Components/forms/GenericForm";

export default function FundCards({ selectedToken, selectedTokenData, onDataFilled }) {
  const [selectedFund, setSelectedFund] = useState(FUND_TYPES[0]); // Default to Staking Pool
  const [currentFormData, setCurrentFormData] = useState(null);

  // Update the result display when token changes
  useEffect(() => {
    if (currentFormData && selectedFund && selectedTokenData) {
      onDataFilled?.({
        fundType: selectedFund.title,
        token: selectedTokenData,
        formData: currentFormData,
        timestamp: new Date().toISOString(),
      });
    }
  }, [selectedToken, selectedTokenData, currentFormData, selectedFund, onDataFilled]);

  const handleCardClick = (fundType) => {
    if (fundType.disabled) return;
    // Only clear data if switching to a different fund type
    if (selectedFund?.id !== fundType.id) {
      setCurrentFormData(null);
      onDataFilled?.(null);
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
    if (selectedFund && selectedTokenData) {
      onDataFilled?.({
        fundType: selectedFund.title,
        token: selectedTokenData,
        formData: data,
        timestamp: new Date().toISOString(),
      });
    }
  }, [selectedFund, selectedTokenData, onDataFilled]);

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
    <div className="max-w-4xl mx-auto">
      {/* Fund Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {FUND_TYPES.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleCardClick(fund)}
            className={`relative w-full h-32 ${
              fund.bgColor
            } rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
              selectedFund?.id === fund.id
                ? "ring-4 ring-purple-500 ring-opacity-50"
                : ""
            } ${fund.disabled ? "cursor-not-allowed opacity-75" : ""}`}
            style={fund.gradientStyle}
          >
            <button
              onClick={(e) => handleCreateClick(e, fund)}
              disabled={fund.disabled}
              className={`absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold transition-colors duration-200 ${fund.buttonColor}`}
            >
              CREATE
            </button>

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
              <h3
                className={`text-xl md:text-base lg:text-lg font-bold ${fund.textColor} leading-tight`}
              >
                {fund.title.split(' ').map((word, index) => (
                  <span key={index} className="block">{word}</span>
                ))}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Fund Component */}
      {selectedFund && (
        <div className="px-6 pb-6">
          {renderFundComponent()}
        </div>
      )}
    </div>
  );
}