"use client";
import StakingPoolResult from "./StakingPoolResult";
import LockFundsResult from "./LockFundsResult";
import VestFundsResult from "./VestFundsResult";

function ResultCard({ data }) {
  const { fundType, token, formData } = data;

  if (fundType === "STAKING POOL") {
    return <StakingPoolResult token={token} formData={formData} />;
  }

  if (fundType === "LOCK FUNDS") {
    return <LockFundsResult token={token} formData={formData} />;
  }

  if (fundType === "VEST FUNDS") {
    return <VestFundsResult token={token} formData={formData} />;
  }

  return null;
}

export default function ResultsDisplay({ filledData, selectedToken }) {
  if (!filledData) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">
        <p>
          Select a token and fill in fund details to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Live Results Display
      </h3>
      <div className="">
        <ResultCard data={filledData} />
      </div>
    </div>
  );
}