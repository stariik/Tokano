"use client";
import { useState, useCallback } from "react";
import { FUND_TYPES } from "../../lib/constants";
import GenericForm from "@/Components/forms/GenericForm";

export default function FundCards({ selectedToken, selectedTokenData, onDataFilled }) {
  const [selectedFund, setSelectedFund] = useState(null);
  const [currentFormData, setCurrentFormData] = useState(null);

  const handleCardClick = (fundType) => {
    if (fundType.disabled) return;
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
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Fund Cards */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {FUND_TYPES.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleCardClick(fund)}
            className={`relative w-38 h-32 ${
              fund.bgColor
            } rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
              selectedFund?.id === fund.id
                ? "ring-4 ring-purple-500 ring-opacity-50"
                : ""
            } ${fund.disabled ? "cursor-not-allowed opacity-75" : ""}`}
          >
            <button
              onClick={(e) => handleCreateClick(e, fund)}
              disabled={fund.disabled}
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors duration-200 ${fund.buttonColor}`}
            >
              CREATE
            </button>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3
                className={`text-lg font-bold ${fund.textColor} leading-tight`}
              >
                {fund.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Fund Component */}
      {selectedFund && (
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedFund.title}
              </h2>
              <button
                onClick={() => setSelectedFund(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✖
              </button>
            </div>
            {renderFundComponent()}
          </div>
        </div>
      )}
    </div>
  );
}