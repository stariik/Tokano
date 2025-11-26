import { useState, useCallback } from "react";
import LockCard from "@/Components/Tokens/LockCard";
import Success from "@/Components/popups/Success";
import Failed from "@/Components/popups/Failed";
import Attention from "@/Components/popups/Attention";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
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
      d="M18.1217 34.5723C8.76614 34.8997 0.917297 27.5587 0.590782 18.1756C0.264267 8.79243 7.58372 0.920432 16.9392 0.592953C26.2948 0.265474 34.1436 7.60653 34.4701 16.9897C34.7966 26.3728 27.4772 34.2448 18.1217 34.5723Z"
      fill="white"
    />
    <path
      d="M18.3122 30.4208C11.4332 30.6616 5.66196 25.2637 5.42188 18.3644C5.18179 11.465 10.5637 5.67679 17.4428 5.43599C24.3219 5.1952 30.0931 10.593 30.3331 17.4924C30.5732 24.3918 25.1913 30.18 18.3122 30.4208Z"
      fill="#0E1C79"
    />
    <path
      d="M11.9102 14.2415H16.1801V17.9853H20.3256V21.6369H24.1996"
      stroke="white"
      strokeWidth="3.2"
      strokeLinecap="round"
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
  const [createdLockAddress, setCreatedLockAddress] = useState<string | null>(
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

  const handleCreateLock = useCallback(async () => {
    // Validate wallet connection
    if (!publicKey || !lock) {
      alert("Please connect your wallet first.");
      return;
    }

    // Validate required fields
    if (!formData.tokenAmount || !formData.releaseDate) {
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

      // Extract lock address from transaction
      let lockAddressFromTx: string | null = null;
      if (tx.instructions && tx.instructions.length > 0) {
        console.log(
          "Extracting lock address from transaction with",
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
            lockAddressFromTx = accountMeta.pubkey.toBase58();
            console.log("Found lock address:", lockAddressFromTx);
            break;
          }
        }
      }

      if (!lockAddressFromTx) {
        console.warn("Could not extract lock address from transaction");
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
          console.log("Lock created successfully!");
          if (lockAddressFromTx) {
            setCreatedLockAddress(lockAddressFromTx);
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
      console.error("Error creating lock:", error);

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
          error.logs.some((log: string) =>
            log.includes("insufficient lamports"),
          )
        ) {
          errorMessage =
            "Insufficient SOL balance to create the lock. You need approximately 0.002 SOL to cover the rent-exempt minimum and transaction fees. Please add more SOL to your wallet.";
        } else if (
          error.logs.some((log: string) => log.includes("insufficient funds"))
        ) {
          errorMessage =
            "Insufficient token balance to create the lock. Please ensure you have enough tokens in your wallet.";
        } else if (
          error.logs.some((log: string) => log.includes("custom program error"))
        ) {
          errorMessage =
            "Program execution failed. Please check your wallet balance and try again.";
        }
      }

      setShowPopup("failed");
      setIsClosing(false);
      alert(`Error creating lock: ${errorMessage}`);
    }
  }, [publicKey, lock, formData, token, signTransaction, connection]);

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
            Fill the form to create step vesting
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="mb-6 rounded-2xl bg-white p-2 md:p-4 dark:bg-[#1B105C]">
        {/* Token Amount */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                1.
              </span>
              Amount of tokens to lock:
            </label>
            <input
              type="number"
              value={formData.tokenAmount || ""}
              onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
              placeholder="0"
              className="font-khand w-20 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 lg:w-40 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] dark:text-white">
              tokens
            </span>
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            Enter the number of tokens you want to lock. These tokens will be
            inaccessible until the release date.
          </div>
        </div>

        {/* Release Date */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                2.
              </span>
              Unlock date and time (UTC):
            </label>
            <input
              type="datetime-local"
              value={formData.releaseDate || ""}
              onChange={(e) => handleInputChange("releaseDate", e.target.value)}
              className="font-khand max-w-[120px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] lg:max-w-[280px] lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
              required
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            Set the exact date and time when the locked tokens can be claimed by
            the recipient.
          </div>
        </div>

        {/* Recipient Wallet */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                3.
              </span>
              Recipient / Claim Authority Wallet
            </label>
            <input
              type="text"
              value={formData.recipientWallet || ""}
              onChange={(e) =>
                handleInputChange("recipientWallet", e.target.value)
              }
              placeholder="e.g. 5Yf8...K4Bc (optional, Solana address)"
              className="font-khand max-w-[280px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-2 py-1 text-right text-xs font-bold text-[#190E79] placeholder-gray-400 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-[#453DC8] dark:text-white"
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#190E79] opacity-80 lg:text-xs dark:text-white">
            In case left empty, tokens go back to wallet of origin when claimed
            after unlock date.
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
            {!publicKey ? "CONNECT WALLET" : "PREVIEW YOUR LOCK:"}
          </h3>
          <div className="pointer-events-none">
            <LockCard
              id={token.id || token.tokenId || token.mintAddress || ""}
              title={token.name}
              created={token.mintAddress || token.tokenId || token.id || ""}
              marketCap="0"
              wallet={publicKey?.toBase58() || ""}
              lockData={{
                lockAmount: formData.tokenAmount
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
        {/* CREATE LOCK Button */}
        <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
          <div className="font-khand ml-4 flex items-center text-xs text-[#190E79] lg:ml-6 lg:text-sm xl:text-base dark:text-white">
            creation fee:{" "}
            <span className="ml-2">
              {" "}
              {formData.tokenAmount
                ? (parseFloat(formData.tokenAmount) * 0.01).toFixed(2)
                : "0"}{" "}
              {token.name || "tokens"}
            </span>
          </div>
          <div className="flex items-center text-xs text-[#190E79] md:text-base">
            <button
              onClick={handleCreateLock}
              disabled={isCreating || !publicKey}
              className="relative flex cursor-pointer rounded-full bg-[#074BA3] px-2.5 py-1 transition-colors hover:bg-[#101488] disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4"
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
                    d="M25.0778 12.998C25.3004 19.5277 20.2184 24.9941 13.7461 25.2253C7.27358 25.4563 1.83144 20.3654 1.60834 13.8356C1.38547 7.30554 6.46736 1.83826 12.94 1.60725C19.4125 1.37646 24.8549 6.46806 25.0778 12.998Z"
                    stroke="#EEEDED"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M13.5371 5.91211C14.2317 5.91214 15.0731 6.00158 15.8203 6.37793C16.5741 6.7576 17.2234 7.42544 17.5303 8.56055C17.5642 8.68596 17.6449 9.1628 17.6777 9.68945C17.6942 9.9542 17.6992 10.2362 17.6787 10.4971C17.6642 10.6815 17.6349 10.8613 17.5869 11.0195C17.8496 11.0711 18.0069 11.1087 18.0303 11.1143C18.2911 11.1765 18.5047 11.3661 18.5957 11.6191H18.5947C18.6238 11.6995 19.2041 13.3333 19.2041 15.54C19.2041 17.7284 18.6258 19.3775 18.5967 19.458C18.5176 19.6807 18.3439 19.8548 18.126 19.9365L18.0303 19.9658C17.9407 19.9872 15.9229 20.4619 13.5371 20.4619C11.1507 20.4619 9.13071 19.987 9.04199 19.9658C8.81406 19.9113 8.62288 19.7591 8.51758 19.5527L8.47754 19.4609C8.44984 19.3844 7.86919 17.7501 7.86914 15.54C7.86914 13.3488 8.4488 11.6978 8.47656 11.6211C8.56698 11.3669 8.78085 11.1755 9.04297 11.1133C9.06706 11.1074 9.19996 11.079 9.41895 11.0352C9.37646 10.7328 9.35449 10.4088 9.35449 10.0586C9.35453 8.69226 9.69 7.64777 10.3975 6.94629C11.105 6.24501 12.1591 5.91211 13.5371 5.91211ZM13.5361 12.2129C11.9706 12.2129 10.5496 12.4412 9.85547 12.5742C9.70297 13.1439 9.46484 14.2405 9.46484 15.54C9.46488 16.8557 9.70225 17.9398 9.85449 18.5029C10.5484 18.6354 11.9707 18.8662 13.5361 18.8662C15.1013 18.8662 16.5216 18.6359 17.2158 18.5029C17.3683 17.9329 17.6074 16.8376 17.6074 15.5391C17.6074 14.2232 17.369 13.1381 17.2168 12.5752C16.5226 12.4427 15.1008 12.2129 13.5361 12.2129ZM13.5361 7.50781C12.6735 7.50781 12.0378 7.61983 11.6143 7.97559C11.1972 8.32608 10.9493 8.9462 10.9492 10.0586C10.9492 10.3208 10.9653 10.5628 10.9941 10.7822C11.7223 10.6922 12.6016 10.6172 13.5361 10.6172C14.4596 10.6172 15.3279 10.6889 16.0508 10.7773C16.0539 10.7474 16.0577 10.7168 16.0615 10.6875C16.084 10.5172 16.1172 10.2998 16.1016 10.0693C16.0778 9.72022 16.0622 9.46781 16.0459 9.27637C16.0295 9.08415 16.0129 8.96444 15.9893 8.87793V8.87695C15.8748 8.45293 15.6967 8.12118 15.3467 7.88965C14.9908 7.65421 14.4355 7.50782 13.5361 7.50781Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M15.1025 13.6562L15.8623 14.4033L15.9688 14.5078L15.8633 14.6152L13.3496 17.1738L13.2441 17.2812L13.1367 17.1758L12.8447 16.8887L12.8428 16.8926L12.7314 16.793L11.4463 15.6338L11.335 15.5332L11.4355 15.4219L12.1484 14.6309L12.249 14.5195L12.3604 14.6201L13.2002 15.3779L14.8906 13.6582L14.9951 13.5518L15.1025 13.6562Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>

              <span className="font-khand relative inline-block text-sm font-bold text-white md:text-base">
                {isCreating ? "CREATING..." : "CREATE LOCK"}
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
                type="lock"
                poolAddress={createdLockAddress || undefined}
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
