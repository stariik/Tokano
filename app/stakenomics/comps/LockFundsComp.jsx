import { useState } from "react";

export default function LockFundsComponent() {
  const [formData, setFormData] = useState({
    lockDate: "",
    lockTime: "",
    tokenAmount: "",
    releaseDate: "",
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
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>
        <span className="text-purple-900 font-semibold mr-3">
          Fill the form to lock funds:
        </span>
        <div className="flex items-center">
          <span className="text-2xl mr-2">👨‍💼</span>
          <span className="text-purple-900 font-bold">LIMASIRA</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white bg-opacity-40 rounded-2xl p-6 mb-6 space-y-6">
        {/* Tokens Lock Date */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-purple-900 font-medium">
              tokens get locked on
            </span>
            <span className="text-purple-700 font-medium">(UTC)</span>
            <span className="text-purple-700 font-medium">- M/D/YY</span>
            <input
              type="date"
              value={formData.lockDate}
              onChange={(e) => handleInputChange("lockDate", e.target.value)}
              className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            />
            <span className="text-purple-700 font-medium">HH:MM</span>
            <input
              type="time"
              value={formData.lockTime}
              onChange={(e) => handleInputChange("lockTime", e.target.value)}
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
              choose amount of total tokens locked
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

        {/* Release Date */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="mb-2">
            <span className="text-purple-900 font-medium">
              choose release date for tokens
            </span>
          </div>
          <input
            type="datetime-local"
            value={formData.releaseDate}
            onChange={(e) => handleInputChange("releaseDate", e.target.value)}
            className="px-3 py-2 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
          />
          <p className="text-purple-700 text-sm mt-2">
            (periods between releases)
          </p>
        </div>

        {/* Recipient Wallet */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <div className="mb-2">
            <span className="text-purple-900 font-medium">
              choose recipient/claim authority wallet for the released tokens
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
          <p className="text-purple-700 text-sm mt-2">
            (in case left empty, tokens go back to wallet of origin when claimed
            after unlock date)
          </p>
        </div>

        {/* Card Pic Section */}
        <div className="p-4 bg-white bg-opacity-30 rounded-xl">
          <span className="text-purple-900 font-medium">card pic:</span>
          <div className="mt-2 h-32 bg-white bg-opacity-40 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center">
            <span className="text-purple-600 text-sm">
              Upload or drag image here
            </span>
          </div>
        </div>
      </div>

      {/* Attention Section */}
      <div className="bg-purple-800 rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-3">Attention:</h3>
        <div className="space-y-2">
          <p className="text-white font-medium">
            tokens will not be transferred automatically and need to be claimed
            by owner.
          </p>
          <p className="text-white font-medium">
            users can claim rewards every 24h
          </p>
        </div>
      </div>
    </div>
  );
}
