"use client";
import React, { useState, useEffect } from 'react';

interface TokenAccount {
  mint: string;
  balance: number;
  decimals: number;
  supply: string;
  account: string;
}

interface TokenSelectorProps {
  label: string;
  tokenAccounts: TokenAccount[];
  selectedToken: string;
  onTokenChange: (tokenMint: string) => void;
  loading?: boolean;
  onRefresh?: () => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  label,
  tokenAccounts,
  selectedToken,
  onTokenChange,
  loading = false,
  onRefresh
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTokenData = tokenAccounts.find(token => token.mint === selectedToken);

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: number) => {
    if (balance < 0.001) return balance.toExponential(2);
    return balance.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="ml-2 text-xs text-blue-500 hover:text-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </button>
        )}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border rounded px-3 py-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={loading}
        >
          {selectedTokenData ? (
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{formatAddress(selectedTokenData.mint)}</div>
                <div className="text-sm text-gray-500">
                  Balance: {formatBalance(selectedTokenData.balance)}
                </div>
              </div>
              <div className="text-gray-400">▼</div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Select a token...</span>
              <div className="text-gray-400">▼</div>
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {tokenAccounts.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No tokens found. Make sure you have tokens in your wallet.
              </div>
            ) : (
              tokenAccounts.map((token) => (
                <button
                  key={token.mint}
                  type="button"
                  onClick={() => {
                    onTokenChange(token.mint);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{formatAddress(token.mint)}</div>
                      <div className="text-xs text-gray-500">
                        Balance: {formatBalance(token.balance)} • Decimals: {token.decimals}
                      </div>
                    </div>
                    {selectedToken === token.mint && (
                      <div className="text-blue-500">✓</div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TokenSelector;