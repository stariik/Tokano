import { useState, useEffect } from "react";
import { getFormConfig } from "../../lib/constants";
import StakingPoolResult from "@/Components/stakenomics/StakingPoolResult";
import LockFundsResult from "@/Components/stakenomics/LockFundsResult";
import VestFundsResult from "@/Components/stakenomics/VestFundsResult";

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
      </div>
    </div>
  );
}