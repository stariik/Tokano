import { useState, useEffect } from "react";
import { getFormConfig } from "../../lib/constants";

export default function GenericForm({ fundType, token, onDataChange }) {
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
      data[field.name] = field.defaultValue || "";
    });
    return data;
  };

  const [formData, setFormData] = useState(initializeFormData);

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
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="ml-3 px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case "datetime-local":
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="px-3 py-2 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            required={required}
          />
        );

      case "text":
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900"
            required={required}
          />
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="px-3 py-1 bg-white bg-opacity-60 rounded-lg border border-purple-300 text-purple-900 w-24"
            required={required}
          />
        );
    }
  };

  const getIcon = () => {
    switch (fundType) {
      case "STAKING POOL":
        return <span className="text-white text-lg font-bold">!</span>;
      case "LOCK FUNDS":
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        );
      case "VEST FUNDS":
        return <span className="text-white text-lg font-bold">⏰</span>;
      default:
        return <span className="text-white text-lg font-bold">?</span>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center mr-3">
          {getIcon()}
        </div>
        <span className="text-purple-900 font-semibold mr-3">
          Fill the form to {config.description.includes('activates') ? 'create' : config.description}:
        </span>
        {token && (
          <div className="flex items-center">
            <span className="text-2xl mr-2">{token.icon}</span>
            <span className="text-purple-900 font-bold">{token.name}</span>
          </div>
        )}
      </div>

      {/* Form Container */}
      <div className="bg-white bg-opacity-40 rounded-2xl p-6 mb-6 space-y-6">
        {config.fields.map((field) => (
          <div key={field.name} className="p-4 bg-white bg-opacity-30 rounded-xl">
            {field.type === "datetime-local" || field.type === "text" ? (
              <div>
                <div className="mb-2">
                  <span className="text-purple-900 font-medium">
                    {field.label.toLowerCase()}
                  </span>
                </div>
                {renderField(field)}
                {field.name === "releaseDate" && (
                  <p className="text-purple-700 text-sm mt-2">
                    (periods between releases)
                  </p>
                )}
                {field.name === "recipientWallet" && (
                  <p className="text-purple-700 text-sm mt-2">
                    {fundType === "LOCK FUNDS"
                      ? "(in case left empty, tokens go back to wallet of origin when claimed after unlock date)"
                      : "(recipient wallet for released tokens)"
                    }
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-purple-900 font-medium">
                  {field.label.toLowerCase()}
                </span>
                {field.type === "date" && <span className="text-purple-700 font-medium">(UTC) - M/D/YY</span>}
                {renderField(field)}
                {field.type === "time" && <span className="text-purple-700 font-medium">HH:MM</span>}
                {field.suffix && <span className="text-purple-700 font-medium">{field.suffix}</span>}
                {field.type === "date" && <span className="text-purple-700 font-medium">right away</span>}
              </div>
            )}

            {/* Special descriptions */}
            {field.name === "activationDate" && (
              <p className="text-purple-700 text-sm mt-2">
                (when you press create your pool is listed as coming soon)
              </p>
            )}
            {field.name === "unstakingPeriod" && (
              <p className="text-purple-700 text-sm mt-2">
                (users are not allowed to unstake their funds unless this time passed since their staking initiated)
              </p>
            )}
            {field.name === "cliffPeriod" && (
              <p className="text-purple-700 text-sm mt-2">
                (days until first unlock happens. Choose zero in case you do not want this to happen.)
              </p>
            )}
            {field.name === "releaseModel" && (
              <p className="text-purple-700 text-sm mt-2">(periods between releases)</p>
            )}
          </div>
        ))}

        {/* Card Pic Section - only for LOCK FUNDS */}
        {fundType === "LOCK FUNDS" && (
          <div className="p-4 bg-white bg-opacity-30 rounded-xl">
            <span className="text-purple-900 font-medium">card pic:</span>
            <div className="mt-2 h-32 bg-white bg-opacity-40 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center">
              <span className="text-purple-600 text-sm">
                Upload or drag image here
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Attention Box */}
      <div className={`rounded-2xl p-6 ${fundType === "STAKING POOL" ? "bg-gradient-to-r from-pink-500 to-pink-600" : "bg-purple-800"}`}>
        <h3 className="text-white font-bold text-lg mb-2">Attention:</h3>
        <div className="space-y-2">
          {fundType === "LOCK FUNDS" ? (
            <>
              <p className="text-white font-medium">
                tokens will not be transferred automatically and need to be claimed by owner.
              </p>
              <p className="text-white font-medium">
                users can claim rewards every 24h
              </p>
            </>
          ) : fundType === "VEST FUNDS" ? (
            <p className="text-white font-medium">
              users can claim rewards every 24h
            </p>
          ) : (
            <p className="text-white font-medium">
              {config.attentionMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}