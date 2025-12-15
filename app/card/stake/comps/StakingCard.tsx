import React, { useCallback, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { LuCopy } from "react-icons/lu";
import { StarIcon } from "@/Components/icons";
import { useTheme } from "@/hooks/useTheme";
import { CiPill } from "react-icons/ci";
import { PoolState } from "tokano-sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { transactionListener } from "@/lib/balances";

interface StakingCardProps {
  pool: any;
  onPoolClosed?: () => void;
}

function StakingCard({ pool, onPoolClosed }: StakingCardProps) {
  const { resolvedTheme } = useTheme();
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Copy to clipboard function
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Check if the current user is the pool creator
  const isCreator = publicKey && pool.initializer?.equals(publicKey);

  // Handle close pool
  const handleClosePool = useCallback(async () => {
    if (!publicKey || !staking || !signTransaction) return;

    setIsClosing(true);
    try {
      const tx = await staking.closePool({
        walletPk: publicKey,
        poolAddress: pool.poolAddress,
      });
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      console.log("Transaction sent: ", txId);

      transactionListener(connection, txId, (completed) => {
        setIsClosing(false);
        if (completed) {
          console.log("Pool closed successfully");
          if (onPoolClosed) onPoolClosed();
        } else {
          console.log("Transaction failed");
          alert("Failed to close pool");
        }
      });
    } catch (error) {
      console.error("Error closing pool:", error);
      alert(`Error closing pool: ${error}`);
      setIsClosing(false);
    }
  }, [
    publicKey,
    staking,
    connection,
    signTransaction,
    pool.poolAddress,
    onPoolClosed,
  ]);

  // Format date from timestamp
  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}/${hours}:${minutes}`;
  };

  // Get stakers count
  const stakersCount = (pool as any).stakersCount || 0;

  // Get token metadata
  const tokenName = pool.tokenInfo?.name || "Unknown Token";
  const tokenSymbol = pool.tokenInfo?.symbol || "N/A";
  const tokenIcon = pool.tokenInfo?.icon || "/fired.png";
  const decimals = pool.tokenInfo?.decimals || 9;

  // Calculate reward percentage (APR/APY)
  // Formula: (rewardRate / totalStaked) * 100 if there's staking, otherwise show the rate
  const totalStaked = pool.totalTokenStaked.toNumber() / Math.pow(10, decimals);
  const totalRewardAmount = pool.rewardRate.toNumber() / Math.pow(10, decimals);

  const rewardPercentage =
    totalStaked > 0
      ? ((totalRewardAmount / totalStaked) * 100).toFixed(2)
      : "0.00";
  const rewardsDisplay = `${rewardPercentage}%`;

  // Format market cap with M for millions
  const formatMarketCap = (mcap: number) => {
    if (mcap >= 1000000) {
      return `$${(mcap / 1000000).toFixed(1)}M`;
    } else if (mcap >= 1000) {
      return `$${(mcap / 1000).toFixed(1)}K`;
    } else {
      return `$${mcap.toFixed(2)}`;
    }
  };

  const marketCap = pool.tokenInfo?.mcap
    ? formatMarketCap(pool.tokenInfo.mcap)
    : "N/A";

  // Pool creator/initializer (first 4 and last 4 chars)
  const creator = pool.initializer?.toBase58() || "";
  const creatorShort = creator
    ? creator.slice(0, 4) + "..." + creator.slice(-4)
    : "N/A";

  // Pool ID (first 6 and last 3 chars)
  const poolId = pool.poolAddress?.toBase58() || "";
  const poolIdShort = poolId
    ? poolId.slice(0, 6) + "..." + poolId.slice(-3)
    : "N/A";

  // Token mint (first 6 and last 3 chars)
  const tokenMint = pool.tokenMint?.toBase58() || "";
  const tokenMintShort = tokenMint
    ? tokenMint.slice(0, 6) + "..." + tokenMint.slice(-3)
    : "N/A";

  const StakeIcon = () => (
    <svg
      className="absolute top-1/2 -mr-1 w-[47px] -translate-y-1/2 lg:w-[70px]"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3456 47.1409C18.8444 47.5074 10.0393 39.4335 9.6789 29.1072C9.3185 18.781 17.5393 10.1129 28.0405 9.74637C38.5418 9.37987 47.3468 17.4538 47.7072 27.78C48.0676 38.1062 39.8469 46.7744 29.3456 47.1409Z"
        fill="white"
      />
      <path
        d="M24.5337 37.9517L24.5337 37.8813C26.2227 36.0281 27.0438 34.3859 26.9969 32.9549C26.9969 32.5561 26.9383 32.1573 26.821 31.7584C26.7037 31.3596 26.516 30.8787 26.2579 30.3157C25.9999 29.7527 25.6363 29.0254 25.1671 28.134C24.7917 27.3833 24.5219 26.7147 24.3577 26.1282C24.1935 25.5417 24.0879 24.92 24.041 24.2632C24.0176 23.3013 24.2052 22.316 24.604 21.3073C25.0263 20.2751 25.6245 19.325 26.3987 18.457L27.7359 18.457L27.7359 14.8677L29.8472 14.8677L29.8472 18.457L32.979 18.457L32.979 18.5273C32.111 19.4892 31.4894 20.3572 31.114 21.1313C30.7387 21.882 30.551 22.6562 30.551 23.4538C30.551 24.0403 30.6566 24.6151 30.8677 25.1781C31.0788 25.7411 31.419 26.4683 31.8882 27.3598C32.5216 28.5093 32.9556 29.4477 33.1902 30.1749C33.4248 30.8787 33.5538 31.606 33.5773 32.3567C33.6007 33.3654 33.4365 34.3155 33.0846 35.207C32.7562 36.075 32.2166 36.9899 31.4659 37.9517L29.8472 37.9517L29.8472 41.4003L27.7359 41.4003L27.7359 37.9517L24.5337 37.9517Z"
        fill="#0E1379"
      />
      <path
        d="M29.3657 55.1292C14.2646 55.6562 1.60252 44.0456 1.08426 29.1961C0.566001 14.3466 12.3878 1.88149 27.4889 1.35444C42.5901 0.827399 55.2522 12.438 55.7704 27.2875C56.2887 42.137 44.4669 54.6021 29.3657 55.1292Z"
        fill="white"
      />
      <path
        d="M29.08 46.9397C18.5788 47.3062 9.77367 39.2323 9.41327 28.9061C9.05288 18.5799 17.2737 9.9117 27.7749 9.5452C38.2761 9.1787 47.0812 17.2526 47.4416 27.5789C47.802 37.9051 39.5812 46.5732 29.08 46.9397Z"
        fill="#190E79"
      />
      <path
        d="M24.268 37.7506L24.268 37.6802C25.9571 35.8269 26.7782 34.1847 26.7313 32.7537C26.7313 32.3549 26.6726 31.9561 26.5553 31.5573C26.438 31.1585 26.2504 30.6775 25.9923 30.1145C25.7343 29.5515 25.3706 28.8243 24.9014 27.9328C24.5261 27.1821 24.2563 26.5135 24.0921 25.927C23.9279 25.3405 23.8223 24.7189 23.7754 24.062C23.7519 23.1002 23.9396 22.1149 24.3384 21.1061C24.7607 20.0739 25.3589 19.1238 26.1331 18.2558L27.4702 18.2558L27.4702 14.6665L29.5816 14.6665L29.5816 18.2558L32.7134 18.2558L32.7134 18.3262C31.8454 19.288 31.2238 20.156 30.8484 20.9302C30.473 21.6809 30.2854 22.455 30.2854 23.2526C30.2854 23.8391 30.3909 24.4139 30.6021 24.9769C30.8132 25.5399 31.1534 26.2672 31.6226 27.1586C32.256 28.3081 32.69 29.2465 32.9246 29.9738C33.1592 30.6775 33.2882 31.4048 33.3116 32.1555C33.3351 33.1642 33.1709 34.1143 32.819 35.0058C32.4906 35.8738 31.951 36.7887 31.2003 37.7506L29.5816 37.7506L29.5816 41.1991L27.4702 41.1991L27.4702 37.7506L24.268 37.7506Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div
      className="dark:border-secondary rounded-4xl border-1 border-[#CDCDE9] pb-2 text-[#190E79] xl:pb-2 dark:text-white"
      style={{
        background:
          resolvedTheme === "dark"
            ? "linear-gradient(90deg, #2f1f7b 10%, #622ea9 80%)"
            : "linear-gradient(90deg, rgb(255 255 255) 0%, rgb(206 193 255) 100%)",
      }}
    >
      <div
        className="relative rounded-4xl p-6 pb-0 md:p-8 lg:p-4 lg:pb-0 xl:p-8 xl:pb-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(45deg, #2f1f7b 0%, #622ea9 100%)"
              : "linear-gradient(45deg, rgb(255 255 255) 0%, rgb(232, 228, 248) 100%)",
        }}
      >
        <div className="absolute top-8 left-2 flex flex-col gap-2 md:left-4 lg:top-6 lg:left-2 lg:gap-2 xl:top-12 xl:left-4 xl:gap-4">
          {pool.tokenInfo?.telegram && (
            <a
              href={pool.tokenInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0088cc] p-1 text-base text-white transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <FaTelegramPlane />
            </a>
          )}
          {pool.tokenInfo?.twitter && (
            <a
              href={pool.tokenInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black p-1 text-base text-white transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <FaXTwitter />
            </a>
          )}
          {pool.tokenInfo?.website && (
            <a
              href={pool.tokenInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-opacity hover:opacity-80 lg:text-xs xl:text-base"
            >
              <TbWorld className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
            </a>
          )}
        </div>

        <div className="flex">
          <div
            className="ml-4 h-20 w-20 rounded-2xl bg-cover bg-center md:ml-6 md:h-24 md:w-24 lg:ml-10 lg:rounded-3xl xl:ml-8 xl:h-32 xl:w-32 2xl:h-38 2xl:w-38"
            style={{
              backgroundImage: `url('${tokenIcon || "/fired.png"}')`,
            }}
          ></div>
          <div className="font-khand ml-4 font-normal lg:ml-8">
            <h1 className="font-khand text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
              {tokenName} ({tokenSymbol})
            </h1>

            <div className="mt-1 pl-1 text-xs md:text-base lg:text-sm xl:text-lg 2xl:text-xl">
              <p className="flex items-center gap-2">
                Pool ID: {poolIdShort}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => copyToClipboard(poolId, "poolId")}
                  title="Copy Pool ID"
                />
                {copiedField === "poolId" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Creator: {creatorShort}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => copyToClipboard(creator, "creator")}
                  title="Copy Creator"
                />
                {copiedField === "creator" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                Token ID: {tokenMintShort}
                <LuCopy
                  className="scale-x-[-1] cursor-pointer transition-opacity hover:opacity-70"
                  onClick={() => copyToClipboard(tokenMint, "tokenMint")}
                  title="Copy Token ID"
                />
                {copiedField === "tokenMint" && (
                  <span className="text-xs text-green-500 md:text-base">
                    Copied!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-0 lg:top-4 xl:top-10">
          <div className="ml-4 xl:mr-6">
            <CiPill className="h-5 w-5 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
          </div>

          <div className="font-khand mt-6 rounded-l-2xl bg-[#2B923E] pr-0.5 pl-1 text-xs font-normal md:pl-2 md:text-sm lg:pr-1 dark:bg-[#2B923E]">
            {pool?.startTimestamp ? formatDate(pool.startTimestamp) : "N/A"}
          </div>
          <div className="mt-12 mr-4 flex -translate-y-1/2 transform justify-end">
            <StarIcon />
          </div>
        </div>

        <div className="relative bottom-0 left-0 z-5 mt-6 flex w-full">
          <div className="font-khand mr-2 flex max-w-20 items-center text-xl font-semibold md:mx-4 lg:mx-2 xl:mx-4 xl:text-3xl">
            STAKING POOL
          </div>
          <div className="font-khand my-auto flex w-full flex-col text-xs font-normal lg:text-sm">
            <StakeIcon />

            <div
              className="font-khand -z-1 ml-6 w-3/4 rounded-r-full py-0.5 pl-6 font-medium text-white sm:ml-8 sm:pl-10"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, #074BA3 10%, #04587C 20%, #0CE0CF 70%)"
                    : "linear-gradient(90deg, #074BA3 10%, #04587C 20%, #0CE0CF 70%)",
              }}
            >
              <div>
                ENDS:{" "}
                {pool?.endTimestamp ? formatDate(pool.endTimestamp) : "N/A"}
              </div>
            </div>
            <div
              className="font-khand -z-1 ml-9 w-2/3 rounded-r-full py-0.5 pl-4 font-medium text-black md:pl-10"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, #6D11B3 10%, #F92C9D 20%, #FFD42A 70%)"
                    : "linear-gradient(90deg, #6D11B3 10%, #F92C9D 20%, #FFD42A 70%)",
              }}
            >
              <div>REWARDS: {rewardsDisplay}</div>
            </div>
          </div>
        </div>

        <div className="font-khand mr-4 text-end text-4xl font-semibold text-[#FFB01C] xl:text-5xl 2xl:text-6xl">
          {stakersCount}
        </div>
      </div>
      <div className={`flex ${isCreator ? "justify-between" : "justify-end"}`}>
        {isCreator && (
          <button
            onClick={handleClosePool}
            disabled={
              isClosing ||
              pool.totalTokenStaked > 0 ||
              pool.endTimestamp.getTime() > Date.now()
            }
            className="font-khand ml-12 cursor-pointer rounded-2xl border-2 border-[#6D6FDF] px-4 text-xl font-bold transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 lg:ml-8 lg:text-2xl xl:ml-12"
            style={{
              background: "linear-gradient(90deg, #3F318E 0%, #644EEA 100%)",
            }}
          >
            {isClosing ? "closing..." : "close"}
          </button>
        )}

        <div className="font-khand mr-12 text-end text-xl font-bold lg:mr-8 lg:text-3xl xl:mr-12">
          stakes
        </div>
      </div>
    </div>
  );
}

export default StakingCard;
