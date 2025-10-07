"use client";
import React from "react";

const wallets = [
  {
    name: "MetaMask",
    icon: "🦊",
    color: "#FF6B35",
    id: "metamask",
  },
  {
    name: "Brave Wallet",
    icon: "🦁",
    color: "#FB542B",
    id: "brave",
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    color: "#3375BB",
    id: "trust",
  },
  {
    name: "Phantom",
    icon: "👻",
    color: "#AB9FF2",
    id: "phantom",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    color: "#3B99FC",
    id: "walletconnect",
  },
];

function WalletSelectionPopup({ isOpen, onClose, onSelectWallet }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#000310a6] bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-[#2A1C78] to-[#1a1154] border-2 border-[#949DFF] rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full animate-scaleIn"
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl sm:text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => {
                onSelectWallet(wallet.id);
                onClose();
              }}
              className="w-full flex items-center gap-3 sm:gap-4 bg-[#0E1379] hover:bg-[#1a1f9e] active:bg-[#252ba0] transition-colors rounded-lg p-3 sm:p-4 border border-[#949DFF]"
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full text-xl sm:text-2xl md:text-3xl flex-shrink-0"
                style={{ backgroundColor: wallet.color + '20' }}
              >
                {wallet.icon}
              </div>
              <span className="text-white font-medium text-base sm:text-lg md:text-xl">
                {wallet.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default WalletSelectionPopup;
