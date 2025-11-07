import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { BN } from "bn.js";

interface StakingModuleProps {
  pool?: any;
  onStakeSuccess?: () => void;
}

function StakingModule({ pool, onStakeSuccess }: StakingModuleProps) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();
  const [userBalance, setUserBalance] = useState(0);
  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey && pool) {
      fetchUserBalance();
      fetchUserStakedAmount();
    }
  }, [publicKey, pool]);

  const fetchUserBalance = async () => {
    try {
      if (!publicKey || !pool?.tokenMint) return;

      // Ensure tokenMint is a PublicKey
      const tokenMint = pool.tokenMint instanceof PublicKey
        ? pool.tokenMint
        : new PublicKey(pool.tokenMint);
      const userTokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);

      try {
        const accountInfo = await getAccount(connection, userTokenAccount);
        const decimals = pool.tokenInfo?.decimals || 9;
        setUserBalance(Number(accountInfo.amount) / Math.pow(10, decimals));
      } catch {
        setUserBalance(0);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
      setUserBalance(0);
    }
  };

  const fetchUserStakedAmount = async () => {
    try {
      if (!publicKey || !pool?.poolAddress || !staking) return;

      // Ensure pool.poolAddress is a PublicKey
      const poolAddress = pool.poolAddress instanceof PublicKey
        ? pool.poolAddress
        : new PublicKey(pool.poolAddress);

      // Fetch user stake accounts for this specific pool using SDK method
      const poolStakes = await staking.fetchUserStakeAccountsForPool(publicKey, poolAddress);

      const decimals = pool.tokenInfo?.decimals || 9;
      const totalStaked = poolStakes.reduce((sum: number, stake: any) => {
        const amount = stake.stakedTokenBalance ? stake.stakedTokenBalance.toNumber() : 0;
        return sum + amount;
      }, 0);

      setUserStakedAmount(totalStaked / Math.pow(10, decimals));
    } catch (error) {
      console.error("Error fetching user staked amount:", error);
      setUserStakedAmount(0);
    }
  };

  const handleStake = async () => {
    if (!publicKey || !stakeAmount || isStaking || !staking || !pool) return;

    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount > userBalance) {
      setError("Insufficient balance");
      return;
    }

    setIsStaking(true);
    setError(null);
    setSuccess(null);

    try {
      const decimals = pool.tokenInfo?.decimals || 9;
      const amountInLamports = new BN(amount * Math.pow(10, decimals));

      // Ensure poolAddress is a PublicKey
      const poolAddress = pool.poolAddress instanceof PublicKey
        ? pool.poolAddress
        : new PublicKey(pool.poolAddress);

      // Check if user already has a stake account for this pool
      // TODO: Implement checking for existing user stake account
      const userStakeAccount = undefined; // Will be undefined for first-time stakers

      // Create stake transaction using Tokano SDK
      const tx = await staking.stake({
        walletPk: publicKey,
        poolAddress: poolAddress,
        amount: amountInLamports,
        userStakeAccount: userStakeAccount,
      });

      // Set recent blockhash and fee payer (required by SDK)
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign and send transaction
      const signature = await sendTransaction(tx, connection);

      // Confirm transaction with longer timeout and better error handling
      let transactionConfirmed = false;
      try {
        await connection.confirmTransaction(signature, "confirmed");
        console.log("Stake successful! Transaction:", signature);
        transactionConfirmed = true;
        setSuccess(
          `Successfully staked ${amount} ${pool?.tokenInfo?.symbol || "tokens"}!`,
        );
      } catch (confirmError: any) {
        // If confirmation times out, the transaction might still succeed
        // Check if it's just a timeout error
        if (confirmError?.message?.includes("30.00 seconds")) {
          console.log(
            "Transaction sent but confirmation timed out. Signature:",
            signature,
          );
          setSuccess(
            "Transaction sent! It may take a moment to process. Your balance will update shortly.",
          );
        } else {
          throw confirmError;
        }
      }

      // After successful stake, refresh balance and pool data
      await fetchUserBalance();
      await fetchUserStakedAmount();
      setStakeAmount("");

      // Notify parent component to refresh pool data
      if (onStakeSuccess) {
        onStakeSuccess();
      }

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error: any) {
      console.error("Error staking:", error);
      setError(error?.message || "Failed to stake tokens");
    } finally {
      setIsStaking(false);
    }
  };

  // Format numbers with K and M
  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else if (num < 1 && num > 0) {
      // For small decimal numbers, use toFixed to avoid scientific notation
      return num.toFixed(6).replace(/\.?0+$/, '');
    } else {
      return num.toString();
    }
  };

  // Calculate stats from pool data
  const decimals = pool?.tokenInfo?.decimals || 9;
  const totalStaked = pool?.totalTokenStaked
    ? pool.totalTokenStaked.toNumber() / Math.pow(10, decimals)
    : 0;
  const rewardsDistributed = pool?.rewardDistributed
    ? pool.rewardDistributed.toNumber() / Math.pow(10, decimals)
    : 0;
  const totalRewardAmount = pool?.rewardAmount
    ? pool.rewardAmount.toNumber() / Math.pow(10, decimals)
    : 0;
  const rewardsLeft = Math.max(0, totalRewardAmount - rewardsDistributed);

  const stakersCount = (pool as any)?.stakersCount || 0;

  const stats = [
    { label: "Wallets Staking:", value: stakersCount.toString() },
    {
      label: "Tokens Staked:",
      value: formatNumber(totalStaked),
    },
    {
      label: "Rwrds Earned:",
      value: formatNumber(rewardsDistributed),
    },
    {
      label: "Rwrds Left:",
      value: formatNumber(rewardsLeft),
    },
  ];

  // Calculate unlock time
  const calculateUnlockTime = () => {
    if (!pool?.poolLockPeriod) return "0";
    try {
      const lockPeriodSeconds = typeof pool.poolLockPeriod.toNumber === 'function'
        ? pool.poolLockPeriod.toNumber()
        : Number(pool.poolLockPeriod);

      // Calculate time units
      const months = Math.floor(lockPeriodSeconds / (86400 * 30));
      const days = Math.floor((lockPeriodSeconds % (86400 * 30)) / 86400);
      const hours = Math.floor((lockPeriodSeconds % 86400) / 3600);
      const minutes = Math.floor((lockPeriodSeconds % 3600) / 60);

      // Build time string based on available units
      const parts = [];
      if (months > 0) parts.push(`${months}mo`);
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0 && months === 0) parts.push(`${minutes}m`);

      return parts.length > 0 ? parts.slice(0, 2).join(' ') : "0";
    } catch (error) {
      console.error("Error calculating unlock time:", error);
      return "N/A";
    }
  };

  return (
    <div className="dark:border-secondary font-khand overflow-hidden rounded-4xl border-2 border-[#CDCDE9] mt-4">
      <div className="grid grid-cols-2 bg-gradient-to-r from-[#8D85FB] to-[#4B317C] text-white dark:from-[#574DDD] dark:to-[#330E79] dark:text-[#190E79]">
        {/* Left side */}
        <div className="font-khand dark:border-secondary flex items-center justify-between border-r-2 border-[#CDCDE9] px-4 py-2 text-base md:text-xl font-semibold lg:p-2 lg:text-xs xl:p-4 xl:text-base 2xl:text-4xl dark:text-white">
          <div className="flex flex-col items-center justify-center leading-none">
            <span>Staking</span>
            <span>Module</span>
          </div>
          <div className="flex w-full items-center justify-center">
            <img
              src={pool?.tokenInfo?.icon || "/image.png"}
              alt={pool?.tokenInfo?.symbol || "Token"}
              className="m-2 w-8 rounded-full md:m-4 md:w-12"
            />
          </div>
          <div className=" ">ACTIVE</div>
        </div>

        {/* Right side */}
        <div className="px-4 py-2 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="font-khand flex items-center justify-between text-sm font-medium last:mb-0 md:text-sm lg:text-xs xl:text-base dark:text-white"
            >
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#C9CDD7] to-[#EAE4FF] py-4 pb-1 text-[#190E79] dark:from-[#130C71] dark:to-[#173991] dark:text-white">
        <div className="grid min-h-18 grid-cols-7">
          <div className="col-span-2 ml-4 flex items-center justify-center text-xs md:text-base">
            Available: {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          {/* <div className="flex justify-center">You Will Stake:</div> */}

          <div className="dark:border-secondary relative col-span-3 flex flex-col items-center rounded-xl border-2 border-[#CDCDE9] bg-gradient-to-t from-[#DEDEDE] to-[#EAE4FF] px-1 pb-6 text-[#190E79] md:px-4 md:pb-2 xl:px-[5px] 2xl:px-4 2xl:py-2 dark:from-[#0A0C50] dark:to-[#24068E] dark:text-white">
            {/* Top Row */}
            <div className="flex w-full items-center justify-between">
              <div className="flex h-full items-center">
                <span className="font-khand text-xs font-medium md:text-sm 2xl:mt-1 2xl:text-base">
                  You will <br /> Stake:
                </span>
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="0.00"
                  className="font-khand mb-4 border-b-1 border-white/40 text-xs font-semibold md:text-lg 2xl:text-2xl bg-transparent text-center w-16 sm:w-32 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={isStaking || !publicKey}
                />
                {/* <div className="hidden md:block absolute bottom-5 right-0 h-[1px] bg-white/40 w-38" /> */}
              </div>
            </div>

            {/* Bottom Text */}
            <div className="font-khand absolute right-2 bottom-1 flex w-full justify-end text-[10px] font-medium sm:text-sm lg:text-xs xl:text-[10px]">
              this is what you will stake
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center text-xs md:text-base">
            Unlocking: <span className="">{calculateUnlockTime()}</span>
          </div>
        </div>
        <div className="font-khand mx-auto mt-4 max-w-full px-2 lg:mt-4 xl:mt-6 2xl:mx-8">
          {success && (
            <p className="mb-2 text-center text-sm font-semibold text-green-600 dark:text-green-400">
              ✓ {success}
            </p>
          )}
          {error && (
            <p className="mb-2 text-center text-sm font-semibold text-red-600 dark:text-red-400">
              ✗ {error}
            </p>
          )}
          <p className="line-clamp-2 text-center text-sm font-medium lg:text-xs xl:text-sm px-4">
            !!! Please keep in mind, either STAKEING or UNBONDING needs some
            amount of SOL on wallet available for network fees or the transaction
            will fail. !!!
          </p>
        </div>
      </div>

      <div className="font-khand dark:border-secondary flex items-center justify-end gap-8 border-t-2 border-[#CDCDE9] bg-gradient-to-r from-[#341E6D] to-[#9B7ADE] px-6 py-4 pr-8 text-xs font-semibold text-white md:gap-16 md:text-base dark:from-[#330E79] dark:to-[#7837F4]">
        You are Staking: {formatNumber(userStakedAmount)}

        <button
          onClick={handleStake}
          disabled={isStaking || !publicKey || !stakeAmount || parseFloat(stakeAmount) <= 0}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            width="162"
            height="45"
            viewBox="0 0 162 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 1.10229H146C154.284 1.10229 161 7.81802 161 16.1023V28.1023C161 36.3866 154.284 43.1023 146 43.1023H16C7.71573 43.1023 1 36.3866 1 28.1023V16.1023C1 7.81802 7.71573 1.10229 16 1.10229Z"
              fill="#120560"
              fillOpacity="0.56"
              stroke="white"
              strokeWidth="2"
            />
            <ellipse
              cx="124.672"
              cy="22.0961"
              rx="16.6896"
              ry="16.9724"
              transform="rotate(113.649 124.672 22.0961)"
              fill="#F2EEFF"
            />
            <path
              d="M120.797 30.5997L120.797 30.5357C122.333 28.8503 123.08 27.357 123.037 26.0557C123.037 25.693 122.984 25.3303 122.877 24.9677C122.771 24.605 122.6 24.1677 122.365 23.6557C122.131 23.1437 121.8 22.4823 121.373 21.6717C121.032 20.989 120.787 20.381 120.637 19.8477C120.488 19.3143 120.392 18.749 120.349 18.1517C120.328 17.277 120.499 16.381 120.861 15.4637C121.245 14.525 121.789 13.661 122.493 12.8717L123.709 12.8717L123.709 9.60767L125.629 9.60767L125.629 12.8717L128.477 12.8717L128.477 12.9357C127.688 13.8103 127.123 14.5997 126.781 15.3037C126.44 15.9863 126.269 16.6903 126.269 17.4157C126.269 17.949 126.365 18.4717 126.557 18.9837C126.749 19.4957 127.059 20.157 127.485 20.9677C128.061 22.013 128.456 22.8663 128.669 23.5277C128.883 24.1677 129 24.829 129.021 25.5117C129.043 26.429 128.893 27.293 128.573 28.1037C128.275 28.893 127.784 29.725 127.101 30.5997L125.629 30.5997L125.629 33.7357L123.709 33.7357L123.709 30.5997L120.797 30.5997Z"
              fill="#32138A"
            />
            <path
              d="M20.1093 15.9143C20.1093 14.1143 20.7093 12.7223 21.9093 11.7383C23.1093 10.7543 24.8253 10.2623 27.0573 10.2623C29.3133 10.2623 31.0653 10.4903 32.3133 10.9463V15.0863C30.9213 14.5343 29.2773 14.2583 27.3813 14.2583C25.4853 14.2583 24.5373 14.9783 24.5373 16.4183V17.3903C24.5373 18.1103 24.6693 18.6743 24.9333 19.0823C25.1973 19.4663 25.7133 19.8623 26.4813 20.2703L30.6213 22.6103C32.5653 23.6663 33.5373 25.2743 33.5373 27.4343V29.5583C33.5373 31.3823 32.8773 32.7983 31.5573 33.8063C30.2373 34.7903 28.3533 35.2823 25.9053 35.2823C23.4573 35.2823 21.6213 35.0183 20.3973 34.4903V30.3143C21.9333 30.9623 23.6733 31.2863 25.6173 31.2863C27.9933 31.2863 29.1813 30.5423 29.1813 29.0543V28.1183C29.1813 27.4943 29.0493 27.0143 28.7852 26.6783C28.5453 26.3183 28.0893 25.9583 27.4173 25.5983L23.4573 23.4383C21.2253 22.2143 20.1093 20.4503 20.1093 18.1463V15.9143ZM48.1504 10.4423V14.2223H43.5784V35.1023H39.2224V14.2223H34.6504V10.4423H48.1504ZM60.7746 35.1023L59.5866 28.9463H54.0426L52.8906 35.1023H48.7506L53.8626 10.4423H59.8746L64.9506 35.1023H60.7746ZM54.7266 25.2743H58.8666L56.7786 14.3303L54.7266 25.2743ZM67.2448 10.4423H71.5648V35.1023H67.2448V10.4423ZM76.7128 10.4423H81.3568L76.6048 22.5023L81.7168 35.1023H76.9288L72.0688 22.5743L76.7128 10.4423ZM84.0143 10.4423H95.8583V14.2223H88.3343V20.7383H94.8503V24.5183H88.3343V31.3223H95.8583V35.1023H84.0143V10.4423Z"
              fill="#F6F3FF"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default StakingModule;
