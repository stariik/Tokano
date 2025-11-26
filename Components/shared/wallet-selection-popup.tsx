"use client";
import React, { useCallback } from "react";
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

const Tokano = () => (
  <svg
    width="165"
    height="32"
    viewBox="0 0 127 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="11"
      cy="11"
      r="11"
      transform="matrix(-1 0 0 1 23.5 1.5)"
      stroke="#949DFF"
      strokeOpacity="0.62"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8093 13.3555C17.8409 13.3555 17.8715 13.367 17.8953 13.3877L20.3191 15.501C20.4094 15.5798 20.3535 15.7274 20.2331 15.7275H15.9167V16.9453C15.9167 17.0511 15.8326 17.1367 15.7292 17.1367H9.13549C9.03212 17.1367 8.94799 17.0511 8.94799 16.9453V15.7275H4.63061C4.51021 15.7275 4.45428 15.5798 4.54467 15.501L6.9685 13.3877C6.99229 13.3671 7.02283 13.3555 7.05444 13.3555H17.8093ZM11.5583 7.58496C11.6303 7.585 11.689 7.64336 11.6892 7.71582V9.52832C11.6892 9.54949 11.6824 9.56919 11.6736 9.58691H17.8249C17.8566 9.58691 17.8871 9.59847 17.9109 9.61914L20.3357 11.7324C20.4258 11.8113 20.3691 11.959 20.2488 11.959H4.64624C4.52606 11.9587 4.46999 11.8112 4.5603 11.7324L6.98413 9.61914C7.00797 9.59835 7.03928 9.58691 7.07104 9.58691H8.96069C8.95194 9.56925 8.94604 9.5494 8.94604 9.52832V7.71582C8.94624 7.64333 9.00489 7.58496 9.0769 7.58496H11.5583ZM15.7898 7.5C15.8599 7.50012 15.9167 7.55925 15.9167 7.63184V9.44434C15.9166 9.51683 15.8598 9.57606 15.7898 9.57617H13.3748C13.3047 9.57603 13.2479 9.51682 13.2478 9.44434V7.63184C13.2478 7.55927 13.3047 7.50014 13.3748 7.5H15.7898Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M112.418 13.178C112.418 14.3195 112.656 15.3422 113.132 16.2459C113.623 17.1337 114.297 17.8314 115.153 18.3387C116.009 18.8461 116.984 19.0997 118.078 19.0997C119.188 19.0997 120.163 18.8461 121.003 18.3387C121.86 17.8314 122.525 17.1337 123.001 16.2459C123.493 15.3422 123.738 14.3195 123.738 13.178C123.738 12.0364 123.501 11.0217 123.025 10.1339C122.549 9.23015 121.883 8.52461 121.027 8.01726C120.187 7.5099 119.204 7.25623 118.078 7.25623C116.984 7.25623 116.009 7.5099 115.153 8.01726C114.297 8.52461 113.623 9.23015 113.132 10.1339C112.656 11.0217 112.418 12.0364 112.418 13.178ZM109.445 13.178C109.445 11.9255 109.659 10.776 110.087 9.72957C110.516 8.68316 111.118 7.77944 111.895 7.01841C112.688 6.24152 113.607 5.63904 114.654 5.21096C115.716 4.78289 116.857 4.56885 118.078 4.56885C119.331 4.56885 120.48 4.78289 121.527 5.21096C122.573 5.63904 123.485 6.24152 124.262 7.01841C125.054 7.77944 125.665 8.68316 126.093 9.72957C126.521 10.776 126.735 11.9255 126.735 13.178C126.735 14.4147 126.521 15.5641 126.093 16.6264C125.665 17.6887 125.062 18.6082 124.285 19.3851C123.508 20.162 122.589 20.7724 121.527 21.2163C120.48 21.6444 119.331 21.8585 118.078 21.8585C116.842 21.8585 115.692 21.6444 114.63 21.2163C113.568 20.7724 112.648 20.162 111.871 19.3851C111.11 18.6082 110.516 17.6887 110.087 16.6264C109.659 15.5641 109.445 14.4147 109.445 13.178Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M104.496 4.85435H107.255V22.3342L95.1025 10.3242V21.5018H92.3438V4.02197L104.496 16.032V4.85435Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M78.4689 17.2205L78.9921 14.8423H86.7213L87.2682 17.2205H78.4689ZM82.821 9.56264L80.205 15.6746L80.1574 16.293L77.8505 21.5013H74.6875L82.821 3.92627L90.9545 21.5013H87.7915L85.5322 16.4357L85.4608 15.746L82.821 9.56264Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M62.2891 4.85449H65.1667V21.502H62.2891V4.85449ZM71.3501 4.85449H74.7271L67.7114 12.655L75.0839 21.502H71.6354L64.3105 12.7264L71.3501 4.85449Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M45.7931 13.178C45.7931 14.3195 46.0309 15.3422 46.5065 16.2459C46.998 17.1337 47.6719 17.8314 48.528 18.3387C49.3842 18.8461 50.3593 19.0997 51.4532 19.0997C52.5631 19.0997 53.5381 18.8461 54.3784 18.3387C55.2346 17.8314 55.9005 17.1337 56.3761 16.2459C56.8676 15.3422 57.1134 14.3195 57.1134 13.178C57.1134 12.0364 56.8756 11.0217 56.3999 10.1339C55.9243 9.23015 55.2584 8.52461 54.4022 8.01726C53.5619 7.5099 52.5789 7.25623 51.4532 7.25623C50.3593 7.25623 49.3842 7.5099 48.528 8.01726C47.6719 8.52461 46.998 9.23015 46.5065 10.1339C46.0309 11.0217 45.7931 12.0364 45.7931 13.178ZM42.8203 13.178C42.8203 11.9255 43.0344 10.776 43.4624 9.72957C43.8905 8.68316 44.493 7.77944 45.2699 7.01841C46.0626 6.24152 46.9822 5.63904 48.0286 5.21096C49.0909 4.78289 50.2324 4.56885 51.4532 4.56885C52.7058 4.56885 53.8552 4.78289 54.9016 5.21096C55.9481 5.63904 56.8597 6.24152 57.6366 7.01841C58.4293 7.77944 59.0397 8.68316 59.4678 9.72957C59.8959 10.776 60.1099 11.9255 60.1099 13.178C60.1099 14.4147 59.8959 15.5641 59.4678 16.6264C59.0397 17.6887 58.4373 18.6082 57.6604 19.3851C56.8835 20.162 55.9639 20.7724 54.9016 21.2163C53.8552 21.6444 52.7058 21.8585 51.4532 21.8585C50.2166 21.8585 49.0671 21.6444 48.0048 21.2163C46.9426 20.7724 46.023 20.162 45.2461 19.3851C44.4851 18.6082 43.8905 17.6887 43.4624 16.6264C43.0344 15.5641 42.8203 14.4147 42.8203 13.178Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
    <path
      d="M31.8516 7.44675V4.85449H43.4572V7.44675H39.0575V21.502H36.2275V7.44675H31.8516Z"
      fill="#949DFF"
      fillOpacity="0.62"
    />
  </svg>
);

function WalletSelectionPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { wallets, select, connect } = useWallet();
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  const handleWalletClick = useCallback(
    async (wallet: Wallet) => {
      if (!agreedToTerms) {
        return;
      }

      try {
        console.log(
          "Wallet click:",
          wallet.adapter.name,
          "State:",
          wallet.readyState,
        );

        if (
          wallet.readyState === WalletReadyState.Installed ||
          wallet.readyState === WalletReadyState.Loadable
        ) {
          select(wallet.adapter.name);
          console.log("Attempting to connect...");
          await connect();
          console.log("Connected successfully!");
          onClose();
        } else if (wallet.readyState === WalletReadyState.NotDetected) {
          console.warn(`${wallet.adapter.name} is not installed`);
          // Attempt to open wallet install page
          if (wallet.adapter.url) {
            window.open(wallet.adapter.url, "_blank");
          }
        } else {
          console.log(
            "Wallet state:",
            wallet.readyState,
            "- Attempting connection anyway",
          );
          select(wallet.adapter.name);
          await connect();
          onClose();
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    },
    [onClose, select, connect, agreedToTerms],
  );

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-90 animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-[#0003102f]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scaleIn w-full max-w-[280px] rounded-2xl border-2 border-[#949DFF] bg-gradient-to-b from-[#f5f3fb] to-[#ede8f5] sm:max-w-[320px] md:max-w-[360px]"
      >
        <div className="my-4 flex w-full justify-center">
          <Tokano />
        </div>

        <div className="mb-4 flex items-center justify-center bg-[#8F97FE] sm:mb-6">
          <h2
            className="font-khand mt-2 -mb-2.5 text-xl font-bold text-white sm:text-2xl md:text-3xl"
            style={{ textShadow: "2px 0 4px rgba(0, 0, 0, 0.3)" }}
          >
            Connect Wallet
          </h2>
        </div>

        <div className="space-y-2 px-12 sm:space-y-3">
          {wallets.length > 0 && (
            <>
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletClick(wallet)}
                  disabled={!agreedToTerms}
                  className={`flex w-full items-center justify-end gap-3 rounded-lg p-2 pr-4 transition-colors sm:gap-4 sm:p-2.5 sm:pr-6 ${
                    agreedToTerms
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <span className="text-base font-medium text-[#190E79] sm:text-lg md:text-xl">
                    {wallet.adapter.name}
                  </span>
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl sm:h-10 sm:w-10 sm:text-2xl md:h-10 md:w-10 md:text-3xl"
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

        <div className="mt-4 mb-6 flex items-center justify-center gap-3 px-6">
          <label
            htmlFor="terms-checkbox"
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="peer sr-only"
            />
            <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-[3.5px] border-[#8F97FE] bg-white transition-all peer-checked:border-[#8F97FE] sm:h-6 sm:w-6">
              <div
                className={`h-2 w-2 rounded-full transition-all sm:h-2.5 sm:w-2.5 ${agreedToTerms ? "scale-100 bg-[#FF1F7D]" : "scale-0 bg-transparent"}`}
              ></div>
            </div>
            <span className="text-sm text-[#190E79] select-none sm:text-base">
              I agree to the Terms and Conditions
            </span>
          </label>
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
