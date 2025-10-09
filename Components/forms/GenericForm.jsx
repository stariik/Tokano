import { useState, useEffect } from "react";
import { getFormConfig } from "../../lib/constants";
import StakingPoolResult from "@/Components/stakenomics/StakingPoolResult";
import LockFundsResult from "@/Components/stakenomics/LockFundsResult";
import VestFundsResult from "@/Components/stakenomics/VestFundsResult";
import Success from "@/Components/popups/Success";
import Failed from "@/Components/popups/Failed";
import Attention from "@/Components/popups/Attention";

export default function GenericForm({ fundType, token, onDataChange, onClose }) {
  const config = getFormConfig(fundType);

  if (!config || !token) {
    return (
      <div className="p-6 text-center text-gray-600">
        {!token ? "No token selected" : "Invalid fund type"}
      </div>
    );
  }

  // Initialize form data with default values
  const initializeFormData = () => {
    const data = {};
    config.fields.forEach(field => {
      if (field.type === "dual-number" && field.fields) {
        field.fields.forEach(subField => {
          data[subField.name] = "";
        });
      } else if (field.defaultValue !== undefined) {
        data[field.name] = field.defaultValue;
      } else if (field.type === "number") {
        data[field.name] = "";
      } else if (field.type === "select" && field.options) {
        data[field.name] = field.options[0];
      } else {
        data[field.name] = "";
      }
    });
    return data;
  };

  const [formData, setFormData] = useState(initializeFormData);
  const [showPopup, setShowPopup] = useState(null); // Can be 'success', 'failed', 'attention', or null
  const [isClosing, setIsClosing] = useState(false);

  // Add custom styles for gradients
  const gradientStyles = {
    bgGradientMain: {
      background: 'linear-gradient(135deg, #6b7fd7 0%, #8b6db8 100%)'
    },
    bgGradientContainer: {
      background: 'linear-gradient(180deg, #9b8fd4 0%, #b5a8e3 100%)'
    }
  };

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const renderField = (field) => {
    const { name, type, label, placeholder, suffix, options, required } = field;
    const value = formData[name];

    switch (type) {
      case "dual-number":
        return (
          <div className="flex gap-2 items-center">
            {field.fields.map((subField, index) => (
              <div key={subField.name} className="flex gap-2 items-center">
                <input
                  type="number"
                  value={formData[subField.name] || ""}
                  onChange={(e) => handleInputChange(subField.name, e.target.value)}
                  placeholder={subField.placeholder}
                  className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold w-20 text-center placeholder-gray-400"
                />
                <span className="text-white font-bold text-[13px]">{subField.suffix}</span>
              </div>
            ))}
          </div>
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold w-40"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case "datetime-local":
        return (
          <div className="flex gap-2 items-center">
            <input
              type={type}
              value={value || ""}
              onChange={(e) => handleInputChange(name, e.target.value)}
              className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold flex-1 max-w-[280px]"
              required={required}
            />
            {name === "activationDateTime" && (
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16);
                  handleInputChange(name, localDateTime);
                }}
                className="bg-[#2B923E] hover:bg-[#238033] text-white font-bold text-xs md:text-base p-1 md:p-2 rounded-lg transition-colors"
                title="Set to current time"
              >
                now
              </button>
            )}
          </div>
        );

      case "text":
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold flex-1 max-w-[280px] placeholder-gray-400"
            required={required}
          />
        );

      case "date":
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold flex-1 max-w-[280px]"
            required={required}
          />
        );

      case "time":
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold w-[100px]"
            required={required}
          />
        );

      case "number":
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold w-40 text-center placeholder-gray-400"
            required={required}
          />
        );

      default:
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="bg-[#453DC8] border-none rounded-lg px-3 py-2.5 text-[13px] text-white font-bold w-24 placeholder-gray-400"
            required={required}
          />
        );
    }
  };

  const renderFieldWithLayout = (field) => {
    const { type, suffix } = field;

    if (type === "datetime-local" || type === "text" || type === "dual-number") {
      return (
        <div className="flex gap-2 items-center mb-1.5">
          {renderField(field)}
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 items-center mb-1.5">
          {renderField(field)}
          {suffix && <span className="text-white font-bold text-[13px]">{suffix}</span>}
        </div>
      );
    }
  };

  const getFieldLabel = (field, fundType) => {
    const labelMap = {
      "STAKING POOL": {
        activationDateTime: "Pool activation date and time (UTC)",
        rewardAmount: "Total reward token amount",
        distributionLength: "Duration of total reward distribution",
        unstakingPeriod: "Unstaking becomes available in"
      },
      "LOCK FUNDS": {
        lockDateTime: "Lock date and time (UTC)",
        tokenAmount: "Token amount to lock",
        releaseDate: "Release date and time (UTC)",
        recipientWallet: "Recipient wallet address"
      },
      "VEST FUNDS": {
        activationDateTime: "Vesting activation date and time (UTC)",
        tokenAmount: "Total token amount to vest",
        cliffPeriod: "Cliff period",
        releaseModel: "Release model",
        recipientWallet: "Recipient wallet address"
      }
    };

    return labelMap[fundType]?.[field.name] || field.label;
  };

  const getFieldDescription = (field, fundType) => {
    const descriptionMap = {
      "STAKING POOL": {
        activationDateTime: "Set the exact date and time when the staking pool becomes active. Before this time, the pool will show \"Launching Soon\".",
        rewardAmount: "Enter the total number of tokens you wish to allocate as rewards. These will be distributed to stakers while the pool is active.",
        distributionLength: "Define the time period over which rewards will be fully distributed to stakers.",
        unstakingPeriod: "Once users stake their tokens in this pool, they will only be able to unstake them after this lock period has elapsed."
      },
      "LOCK FUNDS": {
        lockDateTime: "Set the exact date and time when tokens will be locked and become inaccessible until the release date.",
        tokenAmount: "Enter the number of tokens you want to lock. These tokens will be inaccessible until the release date.",
        releaseDate: "Set the exact date and time when the locked tokens can be claimed by the recipient.",
        recipientWallet: "In case left empty, tokens go back to wallet of origin when claimed after unlock date."
      },
      "VEST FUNDS": {
        activationDateTime: "Set the exact date and time when the vesting schedule begins.",
        tokenAmount: "Enter the total number of tokens to be vested over the specified period.",
        cliffPeriod: "Days until first unlock happens. Choose zero in case you do not want this to happen.",
        releaseModel: "Choose how frequently tokens are released: monthly, weekly, or daily.",
        recipientWallet: "The wallet address that will receive the vested tokens as they are released."
      }
    };

    return descriptionMap[fundType]?.[field.name] || "";
  };

  const getAttentionItems = (fundType) => {
    const attentionMap = {
      "STAKING POOL": [
        {
          title: "Reward Claim Frequency",
          description: "Stakers can claim their rewards once every 24 hours."
        },
        {
          title: "Unclaimed Rewards",
          description: "Rewards not claimed within 365 days will be converted to Takana native tokens. After conversion, users must contact support to retrieve them."
        },
        {
          title: "Undistributed Tokens",
          description: "Any undistributed tokens remaining in the pool will be available for extraction to the creator's wallet for 365 days after the pool's distribution period ends. After this period, tokens will be converted to Takana native tokens, and the creator must contact support to retrieve them."
        }
      ],
      "LOCK FUNDS": [
        {
          title: "Manual Claiming Required",
          description: "Tokens will not be transferred automatically and need to be claimed by owner after the unlock date."
        },
        {
          title: "Lock Period",
          description: "Once locked, tokens cannot be accessed until the specified release date and time."
        },
        {
          title: "Recipient Wallet",
          description: "If no recipient wallet is specified, tokens will return to the original wallet when claimed."
        }
      ],
      "VEST FUNDS": [
        {
          title: "Reward Claim Frequency",
          description: "Users can claim their vested tokens once every 24 hours as they become available."
        },
        {
          title: "Cliff Period",
          description: "No tokens will be released until the cliff period expires, after which vesting begins according to the release model."
        },
        {
          title: "Release Schedule",
          description: "Tokens are released according to the chosen model (daily, weekly, or monthly) after the cliff period."
        }
      ]
    };

    return attentionMap[fundType] || [];
  };

  const getIcon = () => {
    switch (fundType) {
      case "STAKING POOL":
        return "i";
      case "LOCK FUNDS":
        return "🔒";
      case "VEST FUNDS":
        return "⏰";
      default:
        return "?";
    }
  };

  const handleCreatePool = () => {
    setShowPopup('attention');
    setIsClosing(false);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 300);
  };

  const renderResultPreview = () => {
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
  };

  return (
    <div className="w-full mx-auto rounded-3xl p-4 shadow-2xl border-[3px] border-[#453DC8] bg-[#1B105C]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="bg-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#6b4d9f] text-base flex-shrink-0">
            {getIcon()}
          </div>
          <div className="text-white text-sm font-semibold">
            Fill the form to {fundType === "STAKING POOL" ? "create staking pool for" : fundType === "LOCK FUNDS" ? "lock funds for" : "create linear vesting for"}: {token.name}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors font-bold text-lg"
          >
            ✖
          </button>
        )}
      </div>

      {/* Form Container */}
      <div className="rounded-2xl p-6 mb-6">
        {config.fields.map((field, index) => (
          <div key={field.name} className="mb-5">
            <label className="block text-white font-bold text-[13px] mb-2">
              <span className="text-white font-bold mr-1">{index + 1}.</span>
              {getFieldLabel(field, fundType)}:
            </label>
            {renderFieldWithLayout(field)}
            <div className="text-white text-[10px] leading-tight mt-1.5 font-medium opacity-80">
              {getFieldDescription(field, fundType)}
            </div>
          </div>
        ))}

      </div>

      {/* Warning Box */}
      <div className="bg-[#453DC8] border-2 border-[#6b4d9f] rounded-xl p-4 mt-2">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-xs mb-3">
          <span className="text-sm">⚠️</span>
          <span>ATTENTION</span>
          <span className="text-sm">⚠️</span>
        </div>
        <ul className="list-none">
          {getAttentionItems(fundType).map((item, index) => (
            <li key={index} className="text-white text-[10px] leading-relaxed mb-2.5 pl-3 relative font-medium">
              <span className="absolute left-0 font-bold">{index + 1}.</span>
              <span className="font-bold">{item.title}:</span> {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-white mb-4">PREVIEW YOUR POOL:</h3>
        {renderResultPreview()}

        {/* CREATE POOL Button */}
        <div className="flex justify-between rounded-full border-2 border-[#949DFF] bg-[#453DC8] mt-6">
          <div className="md:ml-6 ml-4 text-xs md:text-base items-center flex text-white">
            creation fee: <span className="ml-2"> 12345678 Limas</span>
          </div>
          <div className="flex items-center text-white text-xs md:text-base">
            <button
              onClick={handleCreatePool}
              className="rounded-full py-1 md:py-2 px-2 md:px-4 bg-[#0E1379] relative flex cursor-pointer hover:bg-[#1a1f9e] transition-colors"
            >
              <div className="px-3 py-1 mr-2 rounded-full border-2 border-white">
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
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E31F9B] to-[#FFD42A]"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-[#000310a6] bg-opacity-80 flex items-center justify-center z-50 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
          onClick={closePopup}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}
          >
            {showPopup === 'success' && <Success />}
            {showPopup === 'failed' && <Failed />}
            {showPopup === 'attention' && <Attention />}
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