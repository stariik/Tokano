import { useState } from "react";

export default function VestFundsComponent() {
  const [formData, setFormData] = useState({
    activationDate: "",
    activationTime: "",
    tokenAmount: "",
    cliffPeriod: 100,
    releaseModel: "monthly",
    recipientWallet: "",
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
          <span className="text-white text-lg font-bold">⏰</span>
        </div>
        <span className="text-purple-900 font-semibold mr-3">
          Fill the form to create linear vesting for:
        </span>
        <div className="flex items-center">
          <span className="text-2xl mr-2">👨‍💼</span>
          <span className="text-purple-900 font-bold">LIMASIRA</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white bg-opacity-40 rounded-2xl p-6 mb-6 space-y-6">
        {/* Vesting Activation */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-purple-900 font-medium">
              vesting activates on
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

        {/* Token Amount */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-purple-900 font-medium">
              choose amount of total tokens vested
            </span>
            <input
              type="number"
              value={formData.tokenAmount}
              onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
              placeholder="0"
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-24"
            />
            <span className="text-purple-700 font-medium">tokens</span>
          </div>
        </div>

        {/* Cliff Period */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-purple-900 font-medium">
              choose period before cliff
            </span>
            <input
              type="number"
              value={formData.cliffPeriod}
              onChange={(e) => handleInputChange("cliffPeriod", e.target.value)}
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-20"
            />
            <span className="text-purple-700 font-medium">days</span>
          </div>
          <p className="text-purple-700 text-sm">
            (days until first unlock happens. Choose zero in case you do not
            want this to happen.)
          </p>
        </div>

        {/* Release Steps Model */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="mb-2">
            <span className="text-purple-900 font-medium">
              choose release steps model
            </span>
            <select
              value={formData.releaseModel}
              onChange={(e) =>
                handleInputChange("releaseModel", e.target.value)
              }
              className="ml-3 px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            >
              <option value="monthly">monthly</option>
              <option value="weekly">weekly</option>
              <option value="daily">daily</option>
            </select>
          </div>
          <p className="text-purple-700 text-sm">(periods between releases)</p>
        </div>

        {/* Recipient Wallet */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="mb-2">
            <span className="text-purple-900 font-medium">
              choose recipient wallet for released tokens
            </span>
          </div>
          <input
            type="text"
            value={formData.recipientWallet}
            onChange={(e) =>
              handleInputChange("recipientWallet", e.target.value)
            }
            placeholder="Enter wallet address"
            className="w-full px-3 py-2 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
          />
        </div>
      </div>

      {/* Attention Sections */}
      <div className="space-y-4">
        <div className="bg-purple-800 rounded-2xl p-4">
          <h3 className="text-white font-bold text-lg mb-2">Attention:</h3>
        </div>

        <div className="bg-purple-800 rounded-2xl p-4">
          <p className="text-white font-medium">
            users can claim rewards every 24h
          </p>
        </div>
      </div>
    </div>
  );
}
