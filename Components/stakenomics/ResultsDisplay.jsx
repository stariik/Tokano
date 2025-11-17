"use client";
import { useState } from "react";
import StakingPoolResult from "./StakingPoolResult";
import LockFundsResult from "./LockFundsResult";
import VestFundsResult from "./VestFundsResult";
import Success from "@/Components/popups/Success";
import Failed from "@/Components/popups/Failed";
import Attention from "@/Components/popups/Attention";

function ResultCard({ data }) {
  const { fundType, token, formData } = data;

  if (fundType === "STAKING POOL") {
    return (
      <StakingPoolResult
        token={token}
        formData={formData}
      />
    );
  }

  if (fundType === "LOCK FUNDS") {
    return (
      <LockFundsResult
        token={token}
        formData={formData}
        creatorWallet={formData?.creator}
      />
    );
  }

  if (fundType === "VEST FUNDS") {
    return (
      <VestFundsResult
        token={token}
        formData={formData}
        creatorWallet={formData?.creator}
      />
    );
  }

  return null;
}

export default function ResultsDisplay({ filledData, selectedToken }) {
  const [showPopup, setShowPopup] = useState(null); // Can be 'success', 'failed', 'attention', or null
  const [isClosing, setIsClosing] = useState(false);

  if (!filledData) {
    return (
      <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">
        <p>Select a token and fill in fund details to see results here.</p>
      </div>
    );
  }

  const handleCreatePool = () => {
    // Example: Show success popup when button is clicked
    // You can change this to 'failed' or 'attention' based on your logic
    setShowPopup("failed");
    setIsClosing(false);

    // Start closing animation after 1.7 seconds
    setTimeout(() => {
      setIsClosing(true);
    }, 1700);

    // Remove popup after animation completes (2 seconds total)
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 2000);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 300);
  };

  // Calculate creation fee (1% of token amount)
  const calculateCreationFee = () => {
    const { fundType, formData, token } = filledData;
    let amount = 0;

    if (fundType === "STAKING POOL" && formData.rewardAmount) {
      amount = parseFloat(formData.rewardAmount);
    } else if ((fundType === "LOCK FUNDS" || fundType === "VEST FUNDS") && formData.tokenAmount) {
      amount = parseFloat(formData.tokenAmount);
    }

    const fee = amount * 0.01;
    const tokenName = token?.name || 'tokens';
    return fee > 0 ? `${fee.toFixed(2)} ${tokenName}` : '0';
  };

  return (
    <div className="relative p-6">
      <h3 className="mb-4 text-2xl font-bold text-[#190E79] dark:text-white">
        PREVIEW YOUR POOL:
      </h3>
      <div className="">
        <ResultCard data={filledData} />
      </div>
      {/* button */}
      <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
        <div className="ml-4 flex items-center text-xs text-[#190E79] md:ml-6 md:text-base dark:text-white">
          creation fee: <span className="ml-2"> {calculateCreationFee()}</span>
        </div>
        <div className="flex items-center text-xs text-[#190E79] md:text-base dark:text-white">
          <button
            onClick={handleCreatePool}
            className="relative flex rounded-full bg-[#fafafa] px-2 py-1 md:px-4 md:py-2 dark:bg-[#0E1379]"
          >
            <div className="mr-2 rounded-full border-2 border-white px-3 py-1">
              <svg
                width="8"
                height="20"
                viewBox="0 0 8 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.780434 16.9388L0.780434 16.8883C1.9649 15.5593 2.54068 14.3817 2.50778 13.3555C2.50778 13.0696 2.46665 12.7836 2.3844 12.4976C2.30214 12.2116 2.17054 11.8667 1.98958 11.463C1.80862 11.0592 1.55363 10.5377 1.22461 9.89848C0.961394 9.36016 0.772208 8.88071 0.657052 8.46014C0.541896 8.03958 0.467866 7.59377 0.434965 7.12274C0.418514 6.43301 0.550121 5.72646 0.829786 5.00308C1.1259 4.26288 1.5454 3.58156 2.08828 2.95912L3.02598 2.95912L3.02598 0.385254L4.50656 0.385254L4.50656 2.95912L6.70276 2.95912L6.70276 3.00959C6.09408 3.69932 5.65813 4.32176 5.39491 4.87691C5.1317 5.41524 5.00009 5.97039 5.00009 6.54236C5.00009 6.96292 5.07412 7.37508 5.22218 7.77882C5.37024 8.18257 5.60878 8.70407 5.93779 9.34333C6.38197 10.1676 6.68631 10.8406 6.85082 11.3621C7.01533 11.8667 7.10581 12.3882 7.12226 12.9266C7.13871 13.6499 7.02355 14.3313 6.77679 14.9705C6.54648 15.593 6.16811 16.249 5.64168 16.9388L4.50656 16.9388L4.50656 19.4117L3.02598 19.4117L3.02598 16.9388L0.780434 16.9388Z"
                  fill="#EEEDED"
                />
              </svg>
            </div>

            <span className="relative inline-block text-sm md:text-base">
              CREATE POOL
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#E31F9B] to-[#FFD42A]"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#00031079] ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          onClick={closePopup}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={isClosing ? "animate-scaleOut" : "animate-scaleIn"}
          >
            {showPopup === "success" && <Success />}
            {showPopup === "failed" && <Failed />}
            {showPopup === "attention" && <Attention />}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.8);
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-scaleOut {
          animation: scaleOut 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
