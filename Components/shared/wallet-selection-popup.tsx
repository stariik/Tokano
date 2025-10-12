"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";

// const wallets = [
//   {
//     name: "MetaMask",
//     icon: "🦊",
//     color: "#FF6B35",
//     id: "metamask",
//   },
//   {
//     name: "Brave Wallet",
//     icon: "🦁",
//     color: "#FB542B",
//     id: "brave",
//   },
//   {
//     name: "Trust Wallet",
//     icon: "🛡️",
//     color: "#3375BB",
//     id: "trust",
//   },
//   {
//     name: "Phantom",
//     icon: "👻",
//     color: "#AB9FF2",
//     id: "phantom",
//   },
//   {
//     name: "WalletConnect",
//     icon: "🔗",
//     color: "#3B99FC",
//     id: "walletconnect",
//   },
// ];

function WalletSelectionPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { wallets, select } = useWallet();

  const handleWalletClick = useCallback(
    (wallet: Wallet) => {
      if (
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable
      ) {
        select(wallet.adapter.name);
        onClose();
      } else {
        // todo: add wallet not installed notification.
        // notification.error("Wallet Not Installed", {
        //   description: `${wallet.adapter.name} is not installed on your browser`,
        // });
      }
    },
    [onClose, select],
  );

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-90 animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-[#000310] px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scaleIn w-full max-w-sm rounded-2xl border-2 border-[#949DFF] bg-gradient-to-b from-[#f5f3fb] to-[#ede8f5] p-4 sm:max-w-md sm:p-6 md:max-w-lg md:p-8 dark:from-[#2A1C78] dark:to-[#1a1154]"
      >
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 className="text-xl font-bold text-[#190E79] sm:text-2xl md:text-3xl dark:text-white">
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-[#190E79] hover:text-gray-300 sm:text-3xl dark:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {wallets.length > 0 && (
            <>
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletClick(wallet)}
                  className="flex w-full items-center gap-3 rounded-lg border border-[#949DFF] bg-[#fafafa] p-3 transition-colors hover:bg-[#f0f0ff] active:bg-[#f0f0ff] sm:gap-4 sm:p-4 dark:bg-[#0E1379] dark:hover:bg-[#1a1f9e] dark:active:bg-[#252ba0]"
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl sm:h-12 sm:w-12 sm:text-2xl md:h-14 md:w-14 md:text-3xl"
                    // style={{ backgroundColor: wallet.adapter.color + "20" }} // note: remove this because we don't have wallet color.
                  >
                    <Image
                      src={wallet.adapter.icon}
                      alt="Wallet Icon"
                      className="h-6 w-6"
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="text-base font-medium text-[#190E79] sm:text-lg md:text-xl dark:text-white">
                    {wallet.adapter.name}
                  </span>
                </button>
              ))}
            </>
          )}
          {wallets.length === 0 && (
            <div className="text-center text-xl text-white">
              No wallet providers found
            </div>
          )}
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
