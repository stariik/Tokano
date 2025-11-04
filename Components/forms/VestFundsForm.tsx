import { useState, useCallback } from "react";
import VestFundsResult from "@/Components/stakenomics/VestFundsResult";
import Success from "@/Components/popups/Success";
import Failed from "@/Components/popups/Failed";
import Attention from "@/Components/popups/Attention";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { VestingSchedule } from "tokano-sdk";
import { toSmallestUnit, transactionListener } from "@/lib/balances";

const Warning = () => (
  <svg
    width="12"
    height="70"
    viewBox="0 0 12 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="[&_path]:fill-red-500 dark:[&_path]:fill-[url(#paint0_linear_1683_1078)]"
  >
    <path
      d="M5.99219 57.0003C9.30101 57.0003 11.9834 59.6906 11.9834 63.0092V63.5099C11.9832 66.8283 9.30088 69.5188 5.99219 69.5188C2.68349 69.5188 0.00119192 66.8283 0.000984837 63.5099V63.0092C0.000984837 59.6906 2.68337 57.0003 5.99219 57.0003ZM5.99219 -4.18304e-05C9.30101 -4.18304e-05 11.9834 2.69025 11.9834 6.00884V45.5088C11.9831 48.8272 9.30083 51.5177 5.99219 51.5177C2.68355 51.5177 0.00128107 48.8272 0.000984837 45.5088V6.00884C0.000984837 2.69025 2.68337 -4.18304e-05 5.99219 -4.18304e-05Z"
      fill="url(#paint0_linear_1683_1078)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1683_1078"
        x1="10.9323"
        y1="16.8038"
        x2="47.0507"
        y2="59.1154"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.129021"
          stopColor="white"
        />
        <stop
          offset="0.840552"
          stopColor="#DBD4EA"
        />
      </linearGradient>
    </defs>
  </svg>
);

interface Token {
  id?: string;
  tokenId?: string;
  mintAddress?: string;
  name: string;
  decimals?: number;
}

interface VestFundsFormProps {
  token: Token;
  onDataChange?: (data: any) => void;
  onClose?: () => void;
}

export default function VestFundsForm({
  token,
  onDataChange,
  onClose,
}: VestFundsFormProps) {
  const { vesting } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const [formData, setFormData] = useState({
    activationDateTime: "",
    tokenAmount: "",
    cliffPeriod: "",
    releaseModel: "monthly",
    recipientWallet: "",
  });
  const [showPopup, setShowPopup] = useState<
    "success" | "failed" | "attention" | null
  >(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createdVestAddress, setCreatedVestAddress] = useState<string | null>(
    null,
  );

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

  const handleCreateVest = useCallback(async () => {
    // Validate wallet connection
    if (!publicKey || !vesting) {
      alert("Please connect your wallet first.");
      return;
    }

    // Validate required fields
    if (
      !formData.activationDateTime ||
      !formData.tokenAmount ||
      !formData.cliffPeriod ||
      !formData.releaseModel ||
      !formData.recipientWallet
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

      // Convert activation datetime to Unix timestamp (in seconds)
      const startTimestamp = Math.floor(
        new Date(formData.activationDateTime).getTime() / 1000,
      );

      // Map release model to VestingSchedule enum
      let scheduleType: VestingSchedule;
      switch (formData.releaseModel.toLowerCase()) {
        case "daily":
          scheduleType = VestingSchedule.Daily;
          break;
        case "weekly":
          scheduleType = VestingSchedule.Weekly;
          break;
        case "monthly":
          scheduleType = VestingSchedule.Monthly;
          break;
        default:
          scheduleType = VestingSchedule.Monthly;
      }

      // Convert cliff period from days to seconds
      const cliffPeriodInSeconds =
        parseInt(formData.cliffPeriod) * 24 * 60 * 60;

      // Recipient wallet public key - validate it's a valid base58 address
      let receiverPk: PublicKey;
      try {
        receiverPk = new PublicKey(formData.recipientWallet);
      } catch (e) {
        throw new Error(
          `Invalid recipient wallet address. Please enter a valid Solana address.`,
        );
      }

      // Initialize vesting on blockchain
      const tx = await vesting.initializeVesting({
        walletPk: publicKey,
        receiverPk: receiverPk,
        tokenMint: tokenMint,
        totalVestingAmount: amountInSmallestUnit,
        startTimestamp: startTimestamp + cliffPeriodInSeconds, // Start after cliff
        vestingDuration: 365 * 24 * 60 * 60, // 1 year duration (you can make this configurable)
        scheduleType: scheduleType,
      });

      // Extract vest address from transaction
      let vestAddressFromTx: string | null = null;
      if (tx.instructions && tx.instructions.length > 0) {
        console.log(
          "Extracting vest address from transaction with",
          tx.instructions.length,
          "instructions",
        );
        const instruction = tx.instructions[0];
        console.log(
          "First instruction has",
          instruction.keys.length,
          "account keys",
        );

        for (const accountMeta of instruction.keys) {
          console.log(
            "Account:",
            accountMeta.pubkey.toBase58(),
            "isWritable:",
            accountMeta.isWritable,
            "isSigner:",
            accountMeta.isSigner,
            "isUserWallet:",
            accountMeta.pubkey.equals(publicKey),
          );

          if (
            accountMeta.isWritable &&
            !accountMeta.isSigner &&
            !accountMeta.pubkey.equals(publicKey)
          ) {
            vestAddressFromTx = accountMeta.pubkey.toBase58();
            console.log("Found vest address:", vestAddressFromTx);
            break;
          }
        }
      }

      if (!vestAddressFromTx) {
        console.warn("Could not extract vest address from transaction");
      }

      // Get latest blockhash and set fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction
      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: "confirmed",
        maxRetries: 3,
      });

      console.log("Transaction sent: ", txId);

      // Listen for transaction confirmation
      transactionListener(connection, txId, (completed) => {
        setIsCreating(false);
        if (completed) {
          console.log("Vesting created successfully!");
          if (vestAddressFromTx) {
            setCreatedVestAddress(vestAddressFromTx);
          }
          setShowPopup("success");
          setIsClosing(false);
        } else {
          console.log("Transaction failed");
          setShowPopup("failed");
          setIsClosing(false);
        }
      });
    } catch (error: any) {
      setIsCreating(false);
      console.error("Error creating vesting:", error);

      // Check if it's a "transaction already processed" error - this means it actually succeeded
      if (error?.message?.includes("already been processed")) {
        console.log("Transaction was already processed - treating as success");
        setShowPopup("success");
        setIsClosing(false);
        return;
      }

      // Check if it's a SendTransactionError with logs
      let errorMessage = error?.message || "Unknown error occurred";

      if (error?.logs) {
        console.error("Transaction logs:", error.logs);

        // Check for common errors in logs
        if (
          error.logs.some((log: string) => log.includes("insufficient funds"))
        ) {
          errorMessage =
            "Insufficient token balance to create the vesting. Please ensure you have enough tokens in your wallet.";
        } else if (
          error.logs.some((log: string) => log.includes("custom program error"))
        ) {
          errorMessage =
            "Program execution failed. Please check your wallet balance and try again.";
        }
      }

      setShowPopup("failed");
      setIsClosing(false);
      alert(`Error creating vesting: ${errorMessage}`);
    }
  }, [publicKey, vesting, formData, token, signTransaction, connection]);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="mx-auto w-full rounded-3xl border-2 border-[#CDCDE9] bg-[#EEEDFF] p-4 shadow-2xl lg:p-4 xl:p-8 dark:border-[#453DC8] dark:bg-[#1B105C]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="font-khand flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-[#6b4d9f]">
            ⏰
          </div>
          <div className="font-khand text-sm font-semibold text-[#190E79] dark:text-white">
            Fill the form to create linear vesting for: {token.name}
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="mb-6 rounded-2xl bg-white dark:bg-[#1B105C]">
        {/* Activation Date and Time */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                1.
              </span>
              Vesting activation date and time (UTC):
            </label>
            <input
              type="datetime-local"
              value={formData.activationDateTime || ""}
              onChange={(e) =>
                handleInputChange("activationDateTime", e.target.value)
              }
              className="font-khand max-w-[120px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[10px] font-bold text-[#190E79] md:max-w-[280px] md:text-[13px] dark:bg-[#453DC8] dark:text-white"
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
                handleInputChange("activationDateTime", localDateTime);
              }}
              className="font-khand rounded-lg bg-[#29a13f] p-1 text-xs font-bold text-white transition-colors hover:bg-[#238033] md:text-base"
              title="Set to current time"
            >
              now
            </button>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Set the exact date and time when the vesting schedule begins.
          </div>
        </div>

        {/* Token Amount */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                2.
              </span>
              Total token amount to vest:
            </label>
            <input
              type="number"
              value={formData.tokenAmount || ""}
              onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
              placeholder="0"
              className="font-khand w-24 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-center text-[13px] font-bold text-[#190E79] placeholder-gray-400 md:w-40 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              tokens
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Enter the total number of tokens to be vested over the specified
            period.
          </div>
        </div>

        {/* Cliff Period */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                3.
              </span>
              Cliff period:
            </label>
            <input
              type="number"
              value={formData.cliffPeriod || ""}
              onChange={(e) => handleInputChange("cliffPeriod", e.target.value)}
              placeholder="0"
              className="font-khand w-24 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-center text-[13px] font-bold text-[#190E79] placeholder-gray-400 md:w-40 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              days
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Days until first unlock happens. Choose zero in case you do not want
            this to happen.
          </div>
        </div>

        {/* Release Model */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                4.
              </span>
              Release model:
            </label>
            <select
              value={formData.releaseModel || "monthly"}
              onChange={(e) =>
                handleInputChange("releaseModel", e.target.value)
              }
              className="font-khand w-24 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[13px] font-bold text-[#190E79] md:w-40 dark:bg-[#453DC8] dark:text-white"
            >
              <option value="monthly">monthly</option>
              <option value="weekly">weekly</option>
              <option value="daily">daily</option>
            </select>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Choose how frequently tokens are released: monthly, weekly, or
            daily.
          </div>
        </div>

        {/* Recipient Wallet */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-3">
            <label className="font-khand text-[10px] font-bold text-[#190E79] md:text-[13px] dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                5.
              </span>
              Recipient wallet address:
            </label>
            <input
              type="text"
              value={formData.recipientWallet || ""}
              onChange={(e) =>
                handleInputChange("recipientWallet", e.target.value)
              }
              placeholder="e.g. 5Yf8M2Z3...7FqK4Bc (Solana address)"
              className="font-khand max-w-[280px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1.5 text-[13px] font-bold text-[#190E79] placeholder-gray-400 dark:bg-[#453DC8] dark:text-white"
              required
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            The wallet address that will receive the vested tokens as they are
            released.
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-2 overflow-hidden rounded-xl border-2 border-red-400 bg-white p-4 pt-0 dark:bg-white/0">
          <div className="font-khand -mt-5 mb-3 flex w-full items-center justify-between gap-2 text-xs font-bold text-red-500 dark:text-white">
            <div className="flex items-center gap-4">
              <Warning />
              <p>ATTENTION</p>
            </div>
            <div className="flex items-center gap-4">
              <p>ATTENTION</p>
              <Warning />
            </div>
          </div>
          <ul className="list-none">
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">1.</span>
              <span className="font-bold">Reward Claim Frequency:</span> Stakers
              can claim their rewards once every 24 hours.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">2.</span>
              <span className="font-bold">Unclaimed Rewards:</span> Rewards not
              claimed within 365 days will be converted to Tokano native tokens.
              After conversion, users must contact support to retrieve them.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500">
              <span className="absolute left-0 font-bold">3.</span>
              <span className="font-bold">Undistributed Tokens:</span> Any
              undistributed tokens remaining in the pool will be available for
              retraction to the creator's wallet for 365 days after the pool's
              distribution period ends. After this period, tokens will be
              converted to Tokano native tokens, and the creator must contact
              support to recover them.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-khand mb-4 text-xl font-bold text-[#190E79] md:text-2xl dark:text-white">
            PREVIEW YOUR VESTING:
          </h3>
          <VestFundsResult
            token={token}
            formData={formData}
            creatorWallet={publicKey?.toBase58()}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        {/* CREATE VESTING Button */}
        <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
          <div className="font-khand ml-4 flex items-center text-xs text-[#190E79] md:ml-6 md:text-base dark:text-white">
            creation fee: <span className="ml-2"> {formData.tokenAmount ? (parseFloat(formData.tokenAmount) * 0.01).toFixed(2) : '0'} {token.name || 'tokens'}</span>
          </div>
          <div className="flex items-center text-xs text-[#190E79] md:text-base">
            <button
              onClick={handleCreateVest}
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
                {isCreating ? "CREATING..." : "CREATE VESTING"}
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
            {showPopup === "success" && (
              <Success
                type="vest"
                poolAddress={createdVestAddress || undefined}
              />
            )}
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
