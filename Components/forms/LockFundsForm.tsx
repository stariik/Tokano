import { useState, useCallback } from "react";
import LockFundsResult from "@/Components/stakenomics/LockFundsResult";
import Success from "@/Components/popups/Success";
import Failed from "@/Components/popups/Failed";
import Attention from "@/Components/popups/Attention";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { toSmallestUnit, transactionListener } from "@/lib/balances";

interface Token {
  id?: string;
  tokenId?: string;
  mintAddress?: string;
  name: string;
  decimals?: number;
}

interface LockFundsFormProps {
  token: Token;
  onDataChange?: (data: any) => void;
  onClose?: () => void;
}

export default function LockFundsForm({
  token,
  onDataChange,
  onClose,
}: LockFundsFormProps) {
  const { lock } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const [formData, setFormData] = useState({
    lockDateTime: "",
    tokenAmount: "",
    releaseDate: "",
    recipientWallet: "",
  });
  const [showPopup, setShowPopup] = useState<
    "success" | "failed" | "attention" | null
  >(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  if (!token) {
    return (
      <div className="p-6 text-center text-gray-600">No token selected</div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const handleCreateLock = useCallback(async () => {
    // Validate wallet connection
    if (!publicKey || !lock) {
      alert("Please connect your wallet first.");
      return;
    }

    // Validate required fields
    if (
      !formData.lockDateTime ||
      !formData.tokenAmount ||
      !formData.releaseDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsCreating(true);

      // Get token mint address
      const tokenMintString = token.mintAddress || token.tokenId || token.id;
      if (!tokenMintString) {
        throw new Error("Token mint address is missing");
      }

      const tokenMint = new PublicKey(tokenMintString);

      // Fetch token decimals from blockchain if not provided
      let decimals = token.decimals;
      if (!decimals) {
        const mintInfo = await connection.getParsedAccountInfo(tokenMint);
        if (mintInfo?.value?.data && "parsed" in mintInfo.value.data) {
          decimals = mintInfo.value.data.parsed.info.decimals;
        } else {
          throw new Error("Could not fetch token decimals from blockchain");
        }
      }

      // Convert token amount to smallest unit
      const amountInSmallestUnit = toSmallestUnit(
        formData.tokenAmount,
        decimals,
      );

      // Convert release date to Unix timestamp (in seconds)
      const unlockTimestamp = Math.floor(
        new Date(formData.releaseDate).getTime() / 1000,
      );

      // Determine receiver public key (use sender if no recipient specified)
      let receiverPk: PublicKey;
      if (formData.recipientWallet) {
        try {
          receiverPk = new PublicKey(formData.recipientWallet);
        } catch (e) {
          throw new Error(
            `Invalid recipient wallet address. Please enter a valid Solana address.`,
          );
        }
      } else {
        receiverPk = publicKey;
      }

      // Initialize lock on blockchain
      const tx = await lock.initializeLock({
        walletPk: publicKey,
        receiverPk: receiverPk,
        tokenMint: tokenMint,
        lockAmount: amountInSmallestUnit,
        unlockTimestamp: unlockTimestamp,
      });

      // Get latest blockhash and set fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction
      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());

      console.log("Transaction sent: ", txId);

      // Listen for transaction confirmation
      transactionListener(connection, txId, (completed) => {
        setIsCreating(false);
        if (completed) {
          console.log("Lock created successfully!");
          setShowPopup("success");
          setIsClosing(false);
        } else {
          console.log("Transaction failed");
          setShowPopup("failed");
          setIsClosing(false);
        }
      });
    } catch (error) {
      setIsCreating(false);
      console.error("Error creating lock:", error);
      setShowPopup("failed");
      setIsClosing(false);
      alert(`Error creating lock: ${error.message}`);
    }
  }, [publicKey, lock, formData, token, signTransaction, connection]);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="mx-auto w-full rounded-3xl border-[3px] border-[#CDCDE9] bg-[#EEEDFF] p-8 pt-4 pb-4 shadow-2xl dark:border-[#453DC8] dark:bg-[#1B105C]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="font-khand flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-[#6b4d9f]">
            🔒
          </div>
          <div className="font-khand text-sm font-semibold text-[#190E79] dark:text-white">
            Fill the form to lock funds for: {token.name}
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="mb-6 rounded-2xl bg-white p-6 dark:bg-[#1B105C]">
        {/* Lock Date and Time */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[13px] font-bold text-[#190E79] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                1.
              </span>
              Lock date and time (UTC):
            </label>
            <input
              type="datetime-local"
              value={formData.lockDateTime || ""}
              onChange={(e) =>
                handleInputChange("lockDateTime", e.target.value)
              }
              className="font-khand max-w-[280px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[13px] font-bold text-[#190E79] dark:bg-[#453DC8] dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const localDateTime = new Date(
                  now.getTime() - now.getTimezoneOffset() * 60000,
                )
                  .toISOString()
                  .slice(0, 16);
                handleInputChange("lockDateTime", localDateTime);
              }}
              className="font-khand rounded-lg bg-[#29a13f] p-1 text-xs font-bold text-white transition-colors hover:bg-[#238033] md:text-base"
              title="Set to current time"
            >
              now
            </button>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Set the exact date and time when tokens will be locked and become
            inaccessible until the release date.
          </div>
        </div>

        {/* Token Amount */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[13px] font-bold text-[#190E79] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                2.
              </span>
              Token amount to lock:
            </label>
            <input
              type="number"
              value={formData.tokenAmount || ""}
              onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
              placeholder="0"
              className="font-khand w-40 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-center text-[13px] font-bold text-[#190E79] placeholder-gray-400 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-[13px] font-bold text-[#190E79] dark:text-white">
              tokens
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Enter the number of tokens you want to lock. These tokens will be
            inaccessible until the release date.
          </div>
        </div>

        {/* Release Date */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[13px] font-bold text-[#190E79] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                3.
              </span>
              Release date and time (UTC):
            </label>
            <input
              type="datetime-local"
              value={formData.releaseDate || ""}
              onChange={(e) => handleInputChange("releaseDate", e.target.value)}
              className="font-khand max-w-[280px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[13px] font-bold text-[#190E79] dark:bg-[#453DC8] dark:text-white"
              required
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Set the exact date and time when the locked tokens can be claimed by
            the recipient.
          </div>
        </div>

        {/* Recipient Wallet */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[13px] font-bold text-[#190E79] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                4.
              </span>
              Recipient wallet address:
            </label>
            <input
              type="text"
              value={formData.recipientWallet || ""}
              onChange={(e) =>
                handleInputChange("recipientWallet", e.target.value)
              }
              placeholder="e.g. 5Yf8M2Z3...7FqK4Bc (optional, Solana address)"
              className="font-khand max-w-[280px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[13px] font-bold text-[#190E79] placeholder-gray-400 dark:bg-[#453DC8] dark:text-white"
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            In case left empty, tokens go back to wallet of origin when claimed
            after unlock date.
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-2 rounded-xl border-2 border-red-400 bg-[#e8e4f8] p-4 dark:border-[#6b4d9f] dark:bg-[#453DC8]">
          <div className="font-khand mb-3 flex items-center justify-center gap-2 text-xs font-bold text-red-500">
            <span className="text-sm">⚠️</span>
            <span>ATTENTION</span>
            <span className="text-sm">⚠️</span>
          </div>
          <ul className="list-none">
            <li className="font-khand relative mb-2.5 pl-3 text-[10px] leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">1.</span>
              <span className="font-bold">Manual Claiming Required:</span>{" "}
              Tokens will not be transferred automatically and need to be
              claimed by owner after the unlock date.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-[10px] leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">2.</span>
              <span className="font-bold">Lock Period:</span> Once locked,
              tokens cannot be accessed until the specified release date and
              time.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-[10px] leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">3.</span>
              <span className="font-bold">Recipient Wallet:</span> If no
              recipient wallet is specified, tokens will return to the original
              wallet when claimed.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-khand mb-4 text-2xl font-bold text-[#190E79] dark:text-white">
            PREVIEW YOUR LOCK:
          </h3>
          <LockFundsResult
            token={token}
            formData={formData}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        {/* CREATE LOCK Button */}
        <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
          <div className="font-khand ml-4 flex items-center text-xs text-[#190E79] md:ml-6 md:text-base dark:text-white">
            creation fee: <span className="ml-2"> 12345678 Limas</span>
          </div>
          <div className="flex items-center text-xs text-[#190E79] md:text-base">
            <button
              onClick={handleCreateLock}
              disabled={isCreating || !publicKey}
              className="relative flex cursor-pointer rounded-full bg-[#0E1379] px-2 py-1 transition-colors hover:bg-[#1a1f9e] disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4 md:py-2"
            >
              <div className="mr-2 rounded-full border-2 border-white px-3 py-1">
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

              <span className="font-khand relative inline-block text-sm text-white md:text-base">
                {isCreating ? "CREATING..." : "CREATE LOCK"}
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#E31F9B] to-[#FFD42A]"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div
          className={`bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-[#eeeded] dark:bg-[#000310a6] ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          onClick={closePopup}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={isClosing ? "animate-scaleOut" : "animate-scaleIn"}
          >
            {showPopup === "success" && <Success />}
            {showPopup === "failed" && <Failed />}
            {showPopup === "attention" && <Attention />}
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
