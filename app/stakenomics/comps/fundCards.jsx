import { useState } from 'react';
import LockFundsComponent from './LockFundsComp';
import VestFundsComponent from './VestFundsComp';
import StakingPoolComponent from './StakingPoolComp';


export default function FundCards() {
  const [selectedFund, setSelectedFund] = useState(null);

  const fundTypes = [
    {
      id: 1,
      title: "STAKING POOL",
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-gray-600",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      iconBg: "bg-white bg-opacity-50"
    },
    {
      id: 2,
      title: "COMING SOON",
      bgColor: "bg-gradient-to-br from-purple-200 to-purple-300",
      textColor: "text-gray-600",
      buttonColor: "bg-gray-400 cursor-not-allowed",
      iconBg: "bg-white bg-opacity-50",
      disabled: true
    },
    {
      id: 3,
      title: "LOCK FUNDS",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-300",
      textColor: "text-gray-600",
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      iconBg: "bg-white bg-opacity-50"
    },
    {
      id: 4,
      title: "VEST FUNDS",
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-700",
      textColor: "text-white",
      buttonColor: "bg-purple-800 hover:bg-purple-900",
      iconBg: "bg-white bg-opacity-20"
    }
  ];

  const handleCardClick = (fundType) => {
    if (fundType.disabled) return;
    setSelectedFund(fundType);
  };

  const handleCreateClick = (e, fundType) => {
    e.stopPropagation(); // Prevent card click when clicking CREATE button
    if (fundType.disabled) return;
    console.log(`Creating ${fundType.title}`);
    // Add your create logic here
  };

  const getIcon = (title) => {
    switch (title) {
      case "STAKING POOL":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          </svg>
        );
      case "COMING SOON":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case "LOCK FUNDS":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        );
      case "VEST FUNDS":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19l-7-7h4l3 3 3-3h4l-7 7z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Placeholder components for each fund type
  const renderFundComponent = () => {
    if (!selectedFund) return null;

    switch (selectedFund.title) {
      case "STAKING POOL":
        return <StakingPoolComponent />;
      case "LOCK FUNDS":
        return <LockFundsComponent />;
      case "VEST FUNDS":
        return <VestFundsComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Fund Cards */}
      <div className="flex flex-wrap gap-4 p-6">
        {fundTypes.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleCardClick(fund)}
            className={`relative w-48 h-32 ${fund.bgColor} rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
              selectedFund?.id === fund.id ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
            } ${fund.disabled ? 'cursor-not-allowed opacity-75' : ''}`}
          >
            {/* CREATE Button */}
            <button
              onClick={(e) => handleCreateClick(e, fund)}
              disabled={fund.disabled}
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors duration-200 ${fund.buttonColor}`}
            >
              CREATE
            </button>

          {/* Icon */}
          <div className={`absolute top-3 right-3 w-8 h-8 ${fund.iconBg} rounded-full flex items-center justify-center`}>
            <div className={fund.textColor}>
              {getIcon(fund.title)}
            </div>
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={`text-lg font-bold ${fund.textColor} leading-tight`}>
              {fund.title}
            </h3>
          </div>

          {/* Decorative circles for VEST FUNDS */}
          {fund.title === "VEST FUNDS" && (
            <div className="absolute bottom-2 right-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
                <div className="w-2 h-2 bg-white bg-opacity-20 rounded-full"></div>
                <div className="w-2 h-2 bg-white bg-opacity-10 rounded-full"></div>
              </div>
            </div>
          )}
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderFundComponent()}
          </div>
        </div>
      )}
    </div>
  );
}

