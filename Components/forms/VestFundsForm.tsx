import { useState, useCallback } from "react";
import VestCard from "@/Components/Tokens/VestCard";
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

const FormIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.0087 33.7286C8.70208 34.0534 0.898671 26.8979 0.579277 17.7465C0.259883 8.59498 7.54545 0.912924 16.852 0.588116C26.1586 0.263309 33.962 7.41874 34.2814 16.5702C34.6008 25.7217 27.3153 33.4038 18.0087 33.7286Z"
      fill="white"
    />
    <path
      d="M17.5241 29.7377C10.6248 29.9785 4.83653 24.5806 4.59574 17.6813C4.35495 10.7819 9.75278 4.99368 16.6521 4.75289C23.5515 4.5121 29.3397 9.90993 29.5805 16.8093C29.8213 23.7086 24.4235 29.4969 17.5241 29.7377Z"
      fill="#0E1C79"
    />
    <path
      d="M17.1348 9.71045C17.8294 9.71048 18.6707 9.79992 19.418 10.1763C20.1718 10.5559 20.821 11.2238 21.1279 12.3589C21.1618 12.4843 21.2425 12.9611 21.2754 13.4878C21.2919 13.7525 21.2968 14.0346 21.2764 14.2954C21.2619 14.4798 21.2326 14.6597 21.1846 14.8179C21.4473 14.8695 21.6046 14.907 21.6279 14.9126C21.8888 14.9748 22.1023 15.1644 22.1934 15.4175H22.1924C22.2214 15.4978 22.8018 17.1316 22.8018 19.3384C22.8017 21.5267 22.2234 23.1758 22.1943 23.2563C22.1152 23.479 21.9415 23.6531 21.7236 23.7349L21.6279 23.7642C21.5384 23.7855 19.5205 24.2602 17.1348 24.2603C14.7483 24.2603 12.7284 23.7853 12.6396 23.7642C12.4117 23.7097 12.2205 23.5575 12.1152 23.3511L12.0752 23.2593C12.0475 23.1827 11.4668 21.5484 11.4668 19.3384C11.4668 17.1471 12.0465 15.4961 12.0742 15.4194C12.1646 15.1652 12.3785 14.9738 12.6406 14.9116C12.6647 14.9058 12.7976 14.8774 13.0166 14.8335C12.9741 14.5312 12.9521 14.2071 12.9521 13.8569C12.9522 12.4906 13.2877 11.4461 13.9951 10.7446C14.7026 10.0433 15.7567 9.71045 17.1348 9.71045ZM17.1338 16.0112C15.5682 16.0112 14.1472 16.2396 13.4531 16.3726C13.3006 16.9422 13.0625 18.0388 13.0625 19.3384C13.0625 20.654 13.2999 21.7382 13.4521 22.3013C14.146 22.4338 15.5684 22.6646 17.1338 22.6646C18.699 22.6645 20.1192 22.4343 20.8135 22.3013C20.966 21.7312 21.2051 20.6359 21.2051 19.3374C21.2051 18.0215 20.9667 16.9365 20.8145 16.3735C20.1203 16.241 18.6985 16.0112 17.1338 16.0112ZM17.1338 11.3062C16.2712 11.3062 15.6354 11.4182 15.2119 11.7739C14.7948 12.1244 14.5469 12.7445 14.5469 13.8569C14.5469 14.1191 14.563 14.3611 14.5918 14.5806C15.32 14.4905 16.1993 14.4155 17.1338 14.4155C18.0572 14.4155 18.9256 14.4872 19.6484 14.5757C19.6516 14.5457 19.6553 14.5151 19.6592 14.4858C19.6817 14.3156 19.7148 14.0982 19.6992 13.8677C19.6755 13.5186 19.6599 13.2662 19.6436 13.0747C19.6272 12.8825 19.6105 12.7628 19.5869 12.6763V12.6753C19.4725 12.2513 19.2943 11.9195 18.9443 11.688C18.5884 11.4526 18.0332 11.3062 17.1338 11.3062Z"
      fill="white"
      stroke="white"
      strokeWidth="0.3"
    />
    <path
      d="M18.7002 17.4546L19.46 18.2017L19.5664 18.3062L19.4609 18.4136L16.9473 20.9722L16.8418 21.0796L16.7344 20.9741L16.4424 20.687L16.4404 20.6909L16.3291 20.5913L15.0439 19.4321L14.9326 19.3315L15.0332 19.2202L15.7461 18.4292L15.8467 18.3179L15.958 18.4185L16.7979 19.1763L18.4883 17.4565L18.5928 17.3501L18.7002 17.4546Z"
      fill="white"
      stroke="white"
      strokeWidth="0.3"
    />
  </svg>
);

interface Token {
  id?: string;
  tokenId?: string;
  mintAddress?: string;
  name: string;
  decimals?: number;
  image?: string;
  info?: {
    icon?: string;
    name?: string;
    symbol?: string;
  };
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
    tokenAmount: "",
    cliffPeriod: "",
    duration: "",
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
      !formData.tokenAmount ||
      !formData.cliffPeriod ||
      !formData.duration ||
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

      // Validate that tokenMintString is a valid base58 string
      if (
        typeof tokenMintString !== "string" ||
        tokenMintString.trim() === ""
      ) {
        throw new Error("Invalid token mint address format");
      }

      let tokenMint: PublicKey;
      try {
        tokenMint = new PublicKey(tokenMintString);
      } catch (e) {
        throw new Error(
          `Invalid token mint address: ${tokenMintString}. Please ensure the token has a valid Solana address.`,
        );
      }

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

      // Calculate vesting duration based on duration and release model
      const duration = parseInt(formData.duration);
      let vestingDurationInSeconds: number;
      switch (formData.releaseModel.toLowerCase()) {
        case "daily":
          vestingDurationInSeconds = duration * 24 * 60 * 60; // days to seconds
          break;
        case "weekly":
          vestingDurationInSeconds = duration * 7 * 24 * 60 * 60; // weeks to seconds
          break;
        case "monthly":
          vestingDurationInSeconds = duration * 30 * 24 * 60 * 60; // months to seconds (approximation)
          break;
        default:
          vestingDurationInSeconds = duration * 30 * 24 * 60 * 60;
      }

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
      const { tx, vestingAccountAddress } = await vesting.initializeVesting({
        walletPk: publicKey,
        receiverPk: receiverPk,
        tokenMint: tokenMint,
        totalVestingAmount: amountInSmallestUnit,
        startTimestamp: cliffPeriodInSeconds, // Start after cliff
        vestingDuration: vestingDurationInSeconds,
        scheduleType: scheduleType,
      });

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
          if (vestingAccountAddress) {
            setCreatedVestAddress(vestingAccountAddress.toBase58());
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

  if (!token) {
    return (
      <div className="p-6 text-center text-gray-600">No token selected</div>
    );
  }

  return (
    <div className="mx-auto w-full rounded-3xl border-2 border-[#CDCDE9] bg-[#EEEDFF] p-3 shadow-2xl sm:p-4 xl:p-6 dark:border-[#453DC8] dark:bg-[#1B105C]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FormIcon />
          <div className="font-khand text-xs font-semibold text-[#190E79] lg:text-sm dark:text-white">
            Fill the form to lock funds
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="mb-6 rounded-2xl bg-white p-2 md:p-4 dark:bg-[#1B105C]">
        {/* Activation Date and Time */}
        {/* Token Amount */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                1.
              </span>
              Total tokens to vest:
            </label>
            <input
              type="number"
              value={formData.tokenAmount || ""}
              onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
              placeholder="0"
              className="font-khand w-20 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 lg:w-40 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] lg:text-sm dark:text-white">
              tokens
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            Enter the total number of tokens to be vested over the specified
            period.
          </div>
        </div>

        {/* Cliff Period */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                2.
              </span>
              Cliff period:
            </label>
            <input
              type="number"
              value={formData.cliffPeriod || ""}
              onChange={(e) => handleInputChange("cliffPeriod", e.target.value)}
              placeholder="0"
              className="font-khand w-20 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 lg:w-40 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] lg:text-sm dark:text-white">
              days
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            Days until first unlock happens. Choose zero in case you do not want
            this to happen.
          </div>
        </div>

        {/* Vesting Steps Model */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-1 sm:gap-1.5 lg:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                3.
              </span>
              Vesting steps model:
            </label>
            <select
              value={formData.releaseModel || "monthly"}
              onChange={(e) =>
                handleInputChange("releaseModel", e.target.value)
              }
              className="font-khand w-18 appearance-none rounded-3xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] sm:w-20 sm:w-24 sm:text-sm lg:w-30 lg:px-3 lg:py-1 lg:text-base 2xl:w-30 dark:bg-[#453DC8] dark:text-white"
            >
              <option
                value="daily"
                className="text-xs sm:text-sm lg:text-base"
              >
                daily
              </option>
              <option
                value="weekly"
                className="text-xs sm:text-sm lg:text-base"
              >
                weekly
              </option>
              <option
                value="monthly"
                className="text-xs sm:text-sm lg:text-base"
              >
                monthly
              </option>
            </select>
            <span className="font-khand text-xs font-bold text-[#190E79] lg:text-sm dark:text-white">
              duration:
            </span>
            <input
              type="number"
              value={formData.duration || ""}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="0"
              className="font-khand w-8 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 sm:w-16 md:w-10 lg:w-14 lg:px-3 lg:py-1.5 lg:text-sm 2xl:w-18 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] lg:text-sm dark:text-white">
              {formData.releaseModel === "monthly"
                ? "months"
                : formData.releaseModel === "weekly"
                  ? "weeks"
                  : "days"}
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            Defines the interval between each token release.
          </div>
        </div>

        {/* Recipient Wallet */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] lg:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                4.
              </span>
              Recipient wallet for released tokens:
            </label>
            <input
              type="text"
              value={formData.recipientWallet || ""}
              onChange={(e) =>
                handleInputChange("recipientWallet", e.target.value)
              }
              placeholder="e.g. 5Yf8...K4Bc (Solana address)"
              className="font-khand max-w-[220px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
              required
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            The wallet address that will receive the vested tokens as they are
            released.
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-2 overflow-hidden rounded-xl border-2 border-red-400 bg-white p-4 pt-0 dark:bg-white/0">
          <div className="font-khand -mt-5 mb-3 flex w-full items-center justify-between gap-2 text-xs font-bold text-red-500 lg:text-sm dark:text-white">
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Warning />
              <p>ATTENTION</p>
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <p>ATTENTION</p>
              <Warning />
            </div>
          </div>
          <ul className="list-none">
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500 lg:text-sm dark:text-white">
              <span className="absolute left-0 font-bold">1.</span>
              <span className="font-bold">Reward Claim Frequency:</span> Stakers
              can claim their rewards once every 24 hours.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500 lg:text-sm dark:text-white">
              <span className="absolute left-0 font-bold">2.</span>
              <span className="font-bold">Unclaimed Rewards:</span> Rewards not
              claimed within 365 days will be converted to Tokano native tokens.
              After conversion, users must contact support to retrieve them.
            </li>
            <li className="font-khand relative mb-2.5 pl-3 text-xs leading-relaxed font-medium text-red-500 lg:text-sm dark:text-white">
              <span className="absolute left-0 font-bold">3.</span>
              <span className="font-bold">Undistributed Tokens:</span> Any
              undistributed tokens remaining in the pool will be available for
              retraction to the creator&#39;s wallet for 365 days after the
              pool&#39;s distribution period ends. After this period, tokens
              will be converted to Tokano native tokens, and the creator must
              contact support to recover them.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-khand mb-4 text-lg font-bold text-[#190E79] lg:text-2xl dark:text-white">
            {!publicKey ? "CONNECT WALLET" : "PREVIEW YOUR VESTING:"}
          </h3>
          <div className="pointer-events-none">
            <VestCard
              id={token.id || token.tokenId || token.mintAddress || ""}
              title={token.name}
              created={token.mintAddress || token.tokenId || token.id || ""}
              marketCap="0"
              wallet={publicKey?.toBase58() || ""}
              vestData={{
                totalVestedAmount: formData.tokenAmount
                  ? parseFloat(formData.tokenAmount) *
                    Math.pow(10, token.decimals || 9)
                  : 0,
              }}
              tokenDecimals={token.decimals || 9}
              isPreview={true}
              previewData={formData}
              tokenImage={token.info?.icon || token.image}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        {/* CREATE VESTING Button */}
        <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
          <div className="font-khand ml-4 flex items-center text-xs text-[#190E79] lg:ml-6 lg:text-base dark:text-white">
            creation fee:{" "}
            <span className="ml-2">
              {" "}
              {formData.tokenAmount
                ? (parseFloat(formData.tokenAmount) * 0.01).toFixed(2)
                : "0"}{" "}
              {token.name || "tokens"}
            </span>
          </div>
          <div className="flex items-center text-xs text-[#190E79] lg:text-base">
            <button
              onClick={handleCreateVest}
              disabled={isCreating || !publicKey}
              className="relative flex cursor-pointer rounded-full bg-[#6D11B3] px-2.5 py-1 transition-colors hover:bg-[#580e90] disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4"
            >
              <div className="mr-2">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.9983 12.9982C25.2204 19.5324 20.1508 24.9946 13.7045 25.2254C7.25811 25.4562 1.82965 20.3697 1.60704 13.8355C1.38468 7.30098 6.45424 1.83802 12.9008 1.60726C19.3473 1.37664 24.776 6.46378 24.9983 12.9982Z"
                    stroke="#EEEDED"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M7.47266 9.76025H11.7426V13.5041H15.8881V17.1557H19.7621"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span className="font-khand relative inline-block text-sm font-bold text-white md:text-base">
                {isCreating ? "CREATING..." : "CREATE VESTING"}
                <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#E31F9B] to-[#FFD42A]"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#00031079] ${
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
        input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper {
          direction: rtl;
        }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          margin-left: 0;
          margin-right: auto;
        }

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
