import { useState } from "react";

export default function StakingPoolComponent() {
  const [formData, setFormData] = useState({
    activationDate: "",
    activationTime: "",
    rewardAmount: "",
    distributionLength: 100,
    unstakingPeriod: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center mr-3">
          <span className="text-white text-lg font-bold">!</span>
        </div>
        <span className="text-purple-900 font-semibold mr-3">
          Fill the form to create staking pool for:
        </span>
        <div className="flex items-center">
          <span className="text-2xl mr-2">👨‍💼</span>
          <span className="text-purple-900 font-bold">LIMASIRA</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white bg-opacity-40 rounded-2xl p-6 mb-6">
        {/* Pool Activation */}
        <div className="mb-6 p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-purple-900 font-medium">
              pool activates for staking on
            </span>
            <span className="text-purple-700 font-medium">(UTC)</span>
            <span className="text-purple-700 font-medium">- M/D/YY</span>
            <input
              type="date"
              value={formData.activationDate}
              onChange={(e) =>
                handleInputChange("activationDate", e.target.value)
              }
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            />
            <span className="text-purple-700 font-medium">HH:MM</span>
            <input
              type="time"
              value={formData.activationTime}
              onChange={(e) =>
                handleInputChange("activationTime", e.target.value)
              }
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            />
            <span className="text-purple-700 font-medium">right away</span>
          </div>
          <p className="text-purple-700 text-sm">
            (when you press create your pool is listed as coming soon)
          </p>
        </div>

        {/* Reward Amount */}
        <div className="mb-6 p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-purple-900 font-medium">
              choose amount of total rewards in your pool
            </span>
            <input
              type="number"
              value={formData.rewardAmount}
              onChange={(e) =>
                handleInputChange("rewardAmount", e.target.value)
              }
              placeholder="0"
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-24"
            />
            <span className="text-purple-700 font-medium">tokens</span>
          </div>
        </div>

        {/* Distribution Length */}
        <div className="mb-6 p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-purple-900 font-medium">
              choose length of rewards distribution
            </span>
            <input
              type="number"
              value={formData.distributionLength}
              onChange={(e) =>
                handleInputChange("distributionLength", e.target.value)
              }
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-20"
            />
            <span className="text-purple-700 font-medium">days</span>
          </div>
        </div>

        {/* Unstaking Period */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="mb-2">
            <span className="text-purple-900 font-medium">
              choose period to allow unstaking of tokens for users
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={formData.unstakingPeriod}
              onChange={(e) =>
                handleInputChange("unstakingPeriod", e.target.value)
              }
              placeholder="0"
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-24"
            />
            <span className="text-purple-700 font-medium">days</span>
          </div>
          <p className="text-purple-700 text-sm mt-2">
            (users are not allowed to unstake their funds unless this time
            passed since their staking initiated)
          </p>
        </div>
      </div>

      {/* Attention Box */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-2">Attention:</h3>
        <p className="text-white font-medium">
          users can claim rewards every 24h
        </p>
      </div>
    </div>
  );
}
