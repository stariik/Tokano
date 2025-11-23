import { useState, useCallback, useEffect } from "react";
import StakingPoolResult from "@/Components/stakenomics/StakingPoolResult";
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
      d="M18.0087 33.7286C8.70208 34.0534 0.89867 26.8979 0.579276 17.7465C0.259882 8.59498 7.54545 0.912924 16.852 0.588116C26.1586 0.263309 33.962 7.41874 34.2814 16.5702C34.6008 25.7217 27.3153 33.4038 18.0087 33.7286Z"
      fill="white"
    />
    <path
      d="M17.8323 28.6816C11.3606 28.9075 5.93413 23.9317 5.71202 17.5678C5.48992 11.2039 10.5562 5.86189 17.028 5.63602C23.4997 5.41015 28.9261 10.386 29.1482 16.7499C29.3704 23.1137 24.304 28.4558 17.8323 28.6816Z"
      fill="#0E1C79"
    />
    <path
      d="M17.5515 29.413C10.6521 29.6538 4.86388 24.2559 4.62308 17.3566C4.38229 10.4572 9.78012 4.66898 16.6795 4.42818C23.5788 4.18739 29.3671 9.58522 29.6079 16.4846C29.8487 23.3839 24.4508 29.1722 17.5515 29.413Z"
      fill="#190E79"
    />
    <path
      d="M14.4962 23.2185L14.4962 23.1751C15.5372 22.033 16.0432 21.0209 16.0143 20.139C16.0143 19.8932 15.9781 19.6475 15.9058 19.4017C15.8336 19.1559 15.7179 18.8595 15.5589 18.5125C15.3998 18.1656 15.1757 17.7174 14.8866 17.168C14.6553 16.7053 14.489 16.2933 14.3878 15.9319C14.2866 15.5704 14.2215 15.1873 14.1926 14.7825C14.1782 14.1897 14.2938 13.5825 14.5396 12.9608C14.7998 12.3247 15.1685 11.7391 15.6456 11.2042L16.4697 11.2042L16.4697 8.99219L17.7709 8.99219L17.7709 11.2042L19.701 11.2042L19.701 11.2476C19.166 11.8403 18.7829 12.3753 18.5516 12.8524C18.3203 13.315 18.2046 13.7921 18.2046 14.2837C18.2046 14.6451 18.2697 14.9993 18.3998 15.3463C18.5299 15.6933 18.7395 16.1415 19.0287 16.6909C19.419 17.3993 19.6865 17.9776 19.8311 18.4258C19.9757 18.8595 20.0552 19.3077 20.0696 19.7704C20.0841 20.392 19.9829 20.9776 19.766 21.527C19.5636 22.0619 19.2311 22.6257 18.7685 23.2185L17.7709 23.2185L17.7709 25.3438L16.4697 25.3438L16.4697 23.2185L14.4962 23.2185Z"
      fill="white"
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

interface StakingPoolFormProps {
  token: Token;
  onDataChange?: (data: any) => void;
  onClose?: () => void;
}

export default function StakingPoolForm({
  token,
  onDataChange,
  onClose,
}: StakingPoolFormProps) {
  const { staking } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const [formData, setFormData] = useState({
    activationDateTime: "",
    rewardAmount: "",
    distributionLength: "",
    unstakingPeriodDays: "",
    unstakingPeriodHours: "",
    creator: publicKey?.toBase58() || "",
  });
  const [showPopup, setShowPopup] = useState<
    "success" | "failed" | "attention" | null
  >(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createdPoolAddress, setCreatedPoolAddress] = useState<string | null>(
    null,
  );

  // Update creator address when wallet connects/changes
  useEffect(() => {
    if (publicKey) {
      const updatedData = {
        ...formData,
        creator: publicKey.toBase58(),
      };
      setFormData(updatedData);
      onDataChange?.(updatedData);
    }
  }, [publicKey]);

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

  const handleCreatePool = useCallback(async () => {
    // Validate wallet connection
    if (!publicKey || !staking) {
      alert("Please connect your wallet first.");
      return;
    }

    // Validate all required fields
    if (
      !formData.activationDateTime ||
      !formData.rewardAmount ||
      !formData.distributionLength ||
      (!formData.unstakingPeriodDays && !formData.unstakingPeriodHours)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsCreating(true);

      // Get token mint address (prioritize mintAddress, then tokenId, then id)
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

      // Convert reward amount to smallest unit based on token decimals
      const amountInSmallestUnit = toSmallestUnit(
        formData.rewardAmount,
        decimals,
      );

      // Check wallet balance before proceeding
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: tokenMint },
      );

      console.log("Token mint:", tokenMint.toBase58());
      console.log("Token accounts found:", tokenAccounts.value.length);
      console.log("Token data:", token);

      let userBalance = "0";
      if (tokenAccounts.value.length > 0) {
        userBalance =
          tokenAccounts.value[0].account.data.parsed.info.tokenAmount.amount;
        console.log("User balance (raw):", userBalance);
      } else {
        console.warn("No token account found for this mint address");
      }

      if (BigInt(userBalance) < BigInt(amountInSmallestUnit.toString())) {
        const balanceInTokens = Number(userBalance) / Math.pow(10, decimals);
        const requiredAmount = formData.rewardAmount;

        throw new Error(
          `Insufficient balance. You have ${balanceInTokens.toFixed(Math.min(decimals, 6))} ${token.name || "tokens"} but need ${requiredAmount} ${token.name || "tokens"} for the reward pool. ${tokenAccounts.value.length === 0 ? "Note: No token account found for this token. You may need to receive some tokens first to create the account." : ""}`,
        );
      }

      console.log("Balance check passed!");

      // Convert activation datetime to Unix timestamp (in seconds)
      const startTimeStamp = Math.floor(
        new Date(formData.activationDateTime).getTime() / 1000,
      );

      // Convert distribution length from days to seconds
      const rewardPeriodInSeconds =
        parseInt(formData.distributionLength) * 24 * 60 * 60;

      // Convert unstaking period to seconds (days + hours)
      const unstakingDays = parseInt(formData.unstakingPeriodDays || "0");
      const unstakingHours = parseInt(formData.unstakingPeriodHours || "0");
      const lockingPeriodForStakers =
        unstakingDays * 24 * 60 * 60 + unstakingHours * 60 * 60;

      // Initialize pool on blockchain
      const tx = await staking.initializePool({
        walletPk: publicKey,
        tokenMint: tokenMint,
        rewardAmount: amountInSmallestUnit,
        rewardPeriodInSeconds: rewardPeriodInSeconds.toString(),
        lockingPeriodForStakers: lockingPeriodForStakers.toString(),
        startTimeStamp,
      });

      // Extract pool address from transaction (it's typically in the first instruction's accounts)
      // The pool state PDA is usually one of the writable accounts
      let poolAddressFromTx: string | null = null;
      if (tx.instructions && tx.instructions.length > 0) {
        console.log(
          "Extracting pool address from transaction with",
          tx.instructions.length,
          "instructions",
        );
        const instruction = tx.instructions[0];
        console.log(
          "First instruction has",
          instruction.keys.length,
          "account keys",
        );

        // The pool address is typically the first or second account in the instruction
        // We need to find the pool state account (usually a writable non-signer account)
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

          // Pool state is writable but not a signer, and it's not the user's wallet
          if (
            accountMeta.isWritable &&
            !accountMeta.isSigner &&
            !accountMeta.pubkey.equals(publicKey)
          ) {
            poolAddressFromTx = accountMeta.pubkey.toBase58();
            console.log("Found pool address:", poolAddressFromTx);
            break;
          }
        }
      }

      if (!poolAddressFromTx) {
        console.warn("Could not extract pool address from transaction");
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
          console.log("Pool created successfully!");
          if (poolAddressFromTx) {
            setCreatedPoolAddress(poolAddressFromTx);
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
      console.error("Error creating pool:", error);

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
            "Insufficient token balance to create the staking pool. Please ensure you have enough tokens in your wallet.";
        } else if (
          error.logs.some((log: string) => log.includes("custom program error"))
        ) {
          errorMessage =
            "Program execution failed. Please check your wallet balance and try again.";
        }
      }

      setShowPopup("failed");
      setIsClosing(false);
      alert(`Error creating pool: ${errorMessage}`);
    }
  }, [publicKey, staking, formData, token, signTransaction, connection]);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="mx-auto w-full rounded-3xl border-2 border-[#CDCDE9] bg-[#EEEDFF] p-3 sm:p-4 shadow-2xl xl:p-6 dark:border-[#453DC8] dark:bg-[#1B105C]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FormIcon />
          <div className="font-khand text-sm font-semibold text-[#190E79] dark:text-white">
            Fill the form to create staking pool
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="mb-6 rounded-2xl bg-white p-2 md:p-4 dark:bg-[#1B105C]">
        {/* Pool Activation Date and Time */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-1 lg:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                1.
              </span>
              Pool activation date (UTC):
            </label>
            <input
              type="datetime-local"
              value={formData.activationDateTime || ""}
              onChange={(e) =>
                handleInputChange("activationDateTime", e.target.value)
              }
              className="font-khand max-w-[120px] flex-1 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1 text-right text-xs font-bold text-[#190E79] md:max-w-[280px] md:text-sm dark:bg-[#453DC8] dark:text-white"
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
              className="font-khand rounded-2xl bg-[#29a13f] p-1 text-xs font-bold text-white transition-colors hover:bg-[#238033] lg:text-sm"
              title="Set to current time"
            >
              now
            </button>
          </div>
          <div className="font-khand mt-1.5 text-xs leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Set the exact date and time when the staking pool becomes active.
            Before this time, the pool will show "Launching Soon".
          </div>
        </div>

        {/* Total Reward Token Amount */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                2.
              </span>
              Total amount of rewards:
            </label>
            <input
              type="number"
              value={formData.rewardAmount || ""}
              onChange={(e) =>
                handleInputChange("rewardAmount", e.target.value)
              }
              placeholder="0"
              className="font-khand w-24 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1 text-right text-sm font-bold text-[#190E79] placeholder-gray-400 md:w-40 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] md:text-sm dark:text-white">
              tokens
            </span>
          </div>
          <div className="font-khand mt-1.5 text-xs leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Enter the total number of tokens you wish to allocate as rewards.
            These will be distributed to stakers while the pool is active.
          </div>
        </div>

        {/* Distribution Length */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-2 md:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                3.
              </span>
              Duration of reward pool:
            </label>
            <input
              type="number"
              value={formData.distributionLength || ""}
              onChange={(e) =>
                handleInputChange("distributionLength", e.target.value)
              }
              placeholder="0"
              className="font-khand w-24 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1 text-right text-sm font-bold text-[#190E79] placeholder-gray-400 md:w-40 dark:bg-[#453DC8] dark:text-white"
              required
            />
            <span className="font-khand text-xs font-bold text-[#190E79] md:text-sm dark:text-white">
              days
            </span>
          </div>
          <div className="font-khand mt-1.5 text-xs leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Define the time period over which rewards will be fully distributed
            to stakers.
          </div>
        </div>

        {/* Unstaking Period */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center gap-1 lg:gap-3">
            <label className="font-khand text-sm font-bold text-[#190E79] xl:text-base dark:text-white">
              <span className="mr-1 font-bold text-[#190E79] dark:text-white">
                4.
              </span>
              Tokens lock period:
            </label>
            <input
              type="number"
              value={formData.unstakingPeriodDays || ""}
              onChange={(e) =>
                handleInputChange("unstakingPeriodDays", e.target.value)
              }
              placeholder="0"
              className="font-khand w-16 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1 text-right text-sm font-bold text-[#190E79] placeholder-gray-400 md:w-20 dark:bg-[#453DC8] dark:text-white"
            />
            <span className="font-khand text-xs font-bold text-[#190E79] md:text-sm dark:text-white">
              days
            </span>
            <input
              type="number"
              value={formData.unstakingPeriodHours || ""}
              onChange={(e) =>
                handleInputChange("unstakingPeriodHours", e.target.value)
              }
              placeholder="0"
              className="font-khand w-16 rounded-2xl border-none bg-[#e8e4f8] px-3 py-1 text-right text-sm font-bold text-[#190E79] placeholder-gray-400 md:w-20 dark:bg-[#453DC8] dark:text-white"
            />
            <span className="font-khand text-xs font-bold text-[#190E79] md:text-sm dark:text-white">
              hours
            </span>
          </div>
          <div className="font-khand mt-1.5 text-xs leading-tight font-medium text-[#190E79] opacity-80 dark:text-white">
            Once users stake their tokens in this pool, they will only be able
            to unstake them after this lock period has elapsed.
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
              retraction to the creator's wallet for 365 days after the pool's
              distribution period ends. After this period, tokens will be
              converted to Tokano native tokens, and the creator must contact
              support to recover them.
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-khand mb-4 text-xl font-bold text-[#190E79] md:text-2xl dark:text-white">
            PREVIEW YOUR POOL:
          </h3>
          <StakingPoolResult
            token={token}
            formData={formData}
            tokenImage={token.info?.icon || token.image}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        {/* CREATE POOL Button */}
        <div className="mt-6 flex justify-between rounded-full border-2 border-[#949DFF] bg-[#e8e4f8] dark:bg-[#453DC8]">
          <div className="font-khand ml-4 flex items-center text-xs text-[#190E79] md:ml-6 md:text-base dark:text-white">
            creation fee:{" "}
            <span className="ml-2">
              {" "}
              {formData.rewardAmount
                ? (parseFloat(formData.rewardAmount) * 0.01).toFixed(2)
                : "0"}{" "}
              {token.name || "tokens"}
            </span>
          </div>
          <div className="flex items-center text-xs text-[#190E79] md:text-base">
            <button
              onClick={handleCreatePool}
              disabled={isCreating || !publicKey}
              className="relative flex cursor-pointer rounded-full bg-[#0E1379] px-2.5 py-1 transition-colors hover:bg-[#1a1f9e] disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4"
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
                    d="M25.1773 12.9944C25.4018 19.5788 20.2775 25.0917 13.7495 25.3249C7.22127 25.5579 1.73278 20.4237 1.50782 13.8392C1.28309 7.25445 6.40826 1.7407 12.9366 1.5077C19.4648 1.27492 24.9526 6.40982 25.1773 12.9944Z"
                    stroke="#EEEDED"
                    strokeWidth="3"
                  />
                  <path
                    d="M10.339 20.4573L10.339 20.4069C11.5235 19.0779 12.0993 17.9003 12.0664 16.8741C12.0664 16.5881 12.0252 16.3021 11.943 16.0161C11.8607 15.7302 11.7291 15.3853 11.5482 14.9815C11.3672 14.5778 11.1122 14.0563 10.7832 13.417C10.52 12.8787 10.3308 12.3993 10.2156 11.9787C10.1005 11.5581 10.0265 11.1123 9.99356 10.6413C9.97711 9.95156 10.1087 9.24501 10.3884 8.52164C10.6845 7.78144 11.104 7.10012 11.6469 6.47768L12.5846 6.47768L12.5846 3.90381L14.0652 3.90381L14.0652 6.47768L16.2614 6.47768L16.2614 6.52815C15.6527 7.21788 15.2167 7.84032 14.9535 8.39547C14.6903 8.93379 14.5587 9.48894 14.5587 10.0609C14.5587 10.4815 14.6327 10.8936 14.7808 11.2974C14.9288 11.7011 15.1674 12.2226 15.4964 12.8619C15.9406 13.6862 16.2449 14.3591 16.4094 14.8806C16.5739 15.3853 16.6644 15.9068 16.6809 16.4451C16.6973 17.1685 16.5821 17.8498 16.3354 18.4891C16.1051 19.1115 15.7267 19.7676 15.2003 20.4573L14.0652 20.4573L14.0652 22.9303L12.5846 22.9303L12.5846 20.4573L10.339 20.4573Z"
                    fill="#EEEDED"
                  />
                </svg>
              </div>

              <span className="font-khand relative inline-block text-sm font-bold text-white md:text-base">
                {isCreating ? "CREATING..." : "CREATE POOL"}
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
                type="stake"
                poolAddress={createdPoolAddress || undefined}
                activationDateTime={formData.activationDateTime}
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
