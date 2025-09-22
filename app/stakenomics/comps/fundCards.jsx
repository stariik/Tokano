"use client";
import { useState } from "react";
import LockFundsComponent from "./LockFundsComp";
import VestFundsComponent from "./VestFundsComp";
import StakingPoolComponent from "./StakingPoolComp";

export default function FundCards({ selectedToken, onDataFilled }) {
  const [selectedFund, setSelectedFund] = useState(null);

  const tokens = [
    { id: 1, name: "FIRED", icon: "🍔", ticker: "FIRED" },
    { id: 2, name: "RAMSA", icon: "🐻", ticker: "RAMSA" },
    { id: 3, name: "LIMASIRA", icon: "👨‍💼", ticker: "LIMAS" },
    { id: 4, name: "SYRIA", icon: "🌍", ticker: "SYRIA" },
    { id: 5, name: "NOGA", icon: "🦊", ticker: "NOGA" },
    { id: 6, name: "GAMNABULIN", icon: "🎮", ticker: "GAMNA" },
  ];

  const selectedTokenData = tokens.find((t) => t.id === selectedToken);

  const fundTypes = [
    {
      id: 1,
      title: "STAKING POOL",
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-gray-600",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      iconBg: "bg-white bg-opacity-50",
    },
    {
      id: 2,
      title: "COMING SOON",
      bgColor: "bg-gradient-to-br from-purple-200 to-purple-300",
      textColor: "text-gray-600",
      buttonColor: "bg-gray-400 cursor-not-allowed",
      iconBg: "bg-white bg-opacity-50",
      disabled: true,
    },
    {
      id: 3,
      title: "LOCK FUNDS",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-300",
      textColor: "text-gray-600",
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      iconBg: "bg-white bg-opacity-50",
    },
    {
      id: 4,
      title: "VEST FUNDS",
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-700",
      textColor: "text-white",
      buttonColor: "bg-purple-800 hover:bg-purple-900",
      iconBg: "bg-white bg-opacity-20",
    },
  ];

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
    onDataFilled?.({ fundType: fundType.title, tokenId: selectedToken });
  };

  const renderFundComponent = () => {
    if (!selectedFund) return null;

    switch (selectedFund.title) {
      case "STAKING POOL":
        return <StakingPoolComponent token={selectedTokenData} />;
      case "LOCK FUNDS":
        return <LockFundsComponent tokenId={selectedToken} />;
      case "VEST FUNDS":
        return <VestFundsComponent tokenId={selectedToken} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Fund Cards */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {fundTypes.map((fund) => (
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
