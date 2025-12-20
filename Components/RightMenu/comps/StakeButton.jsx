"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { TOKANO_POOL_ID } from "@/lib/constants";
import { toSmallestUnit, transactionListener } from "@/lib/balances";
import { PublicKey } from "@solana/web3.js";

function StakeButton({
  stakeAmount,
  availableBalance,
  decimals,
  onStakeComplete,
}) {
  const { resolvedTheme } = useTheme();
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { staking } = useTokano();
  const [isStaking, setIsStaking] = useState(false);
  const [tokanoPool, setTokanoPool] = useState(null);
  const [userStakeAccount, setUserStakeAccount] = useState(null);

  // Fetch TOKANO pool and user's stake account
  useEffect(() => {
    const fetchPoolAndStake = async () => {
      if (!staking || !publicKey) return;

      try {
        // Fetch the TOKANO pool
        const pool = await staking
          .fetchStakePool(TOKANO_POOL_ID)
          .catch((err) => {
            console.error("Error fetching stake pool:", err);
            return null;
          });
        setTokanoPool(pool);

        // Check if user has existing stake account
        const existingStake = await staking
          .fetchUserStakeAccountsForPool(publicKey, new PublicKey(TOKANO_POOL_ID))
          .catch((err) => {
            console.error("Error fetching user stake accounts:", err);
            return [];
          });
        setUserStakeAccount(existingStake || null);
      } catch (error) {
        console.error("Error fetching pool/stake:", error);
      }
    };

    fetchPoolAndStake();
  }, [staking, publicKey]);

  const handleStake = useCallback(async () => {
    if (!publicKey || !staking || !tokanoPool) {
      alert("Please connect your wallet");
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert("Please enter a valid amount to stake");
      return;
    }

    const amountNum = parseFloat(stakeAmount);
    const maxNum = parseFloat(availableBalance);

    if (amountNum > maxNum) {
      alert("Amount exceeds available balance");
      return;
    }

    if (!signTransaction) {
      alert("Wallet does not support signing");
      return;
    }

    setIsStaking(true);

    try {
      const amountInSmallestUnit = toSmallestUnit(stakeAmount, decimals);

      const tx = await staking.stake({
        walletPk: publicKey,
        poolAddress: tokanoPool.poolAddress,
        amount: amountInSmallestUnit,
        userStakeAccount: userStakeAccount,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
      });
      console.log("Stake transaction sent:", txId);

      transactionListener(connection, txId, (completed) => {
        setIsStaking(false);
        if (completed) {
          alert("Stake successful!");
          if (onStakeComplete) {
            onStakeComplete();
          }
        } else {
          alert("Stake transaction failed");
        }
      });
    } catch (error) {
      console.error("Error staking:", error);
      alert(`Error: ${error.message || "Failed to stake"}`);
      setIsStaking(false);
    }
  }, [
    publicKey,
    staking,
    tokanoPool,
    stakeAmount,
    availableBalance,
    decimals,
    userStakeAccount,
    connection,
    signTransaction,
    onStakeComplete,
  ]);

  return (
    <div className="flex items-center">
      <button
        onClick={handleStake}
        disabled={
          isStaking ||
          !publicKey ||
          !stakeAmount ||
          parseFloat(stakeAmount) <= 0
        }
        className="relative"
      >
        <svg
          className="h-[40px] w-[100px] transition-opacity lg:h-[30px] lg:w-[90px] xl:h-[40px] xl:w-[95px] 2xl:h-[43px] 2xl:w-[130px]"
          style={{
            opacity:
              isStaking ||
              !publicKey ||
              !stakeAmount ||
              parseFloat(stakeAmount) <= 0
                ? 0.5
                : 1,
          }}
          viewBox="0 0 123 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="-1.5"
            y="1.5"
            width="116.138"
            height="39.2657"
            rx="18.5"
            transform="matrix(-1 -3.18272e-07 -2.23025e-07 1 116.137 -4.77408e-07)"
            fill="url(#paint0_linear_910_14874)"
            stroke="white"
            strokeWidth="3"
          />
          <path
            d="M45.9298 15.9085C45.9298 14.5359 46.3744 13.4725 47.2638 12.7185C48.1724 11.9645 49.4581 11.5875 51.1208 11.5875C52.7834 11.5875 54.1368 11.7615 55.1808 12.1095V14.7195C54.1368 14.3135 52.8704 14.1105 51.3818 14.1105C49.5838 14.1105 48.6848 14.7775 48.6848 16.1115V17.2425C48.6848 17.8612 48.8008 18.3542 49.0328 18.7215C49.2841 19.0695 49.7191 19.4175 50.3378 19.7655L53.7018 21.6505C55.2678 22.5012 56.0508 23.7869 56.0508 25.5075V27.1315C56.0508 28.5429 55.5578 29.6352 54.5718 30.4085C53.5858 31.1625 52.1938 31.5395 50.3958 31.5395C48.6171 31.5395 47.1864 31.3365 46.1038 30.9305V28.3205C47.3798 28.7845 48.7234 29.0165 50.1348 29.0165C52.2421 29.0165 53.2958 28.3012 53.2958 26.8705V25.8845C53.2958 25.3045 53.1894 24.8599 52.9768 24.5505C52.7641 24.2219 52.3678 23.9029 51.7878 23.5935L48.5108 21.7955C46.7901 20.8675 45.9298 19.4852 45.9298 17.6485V15.9085ZM67.3411 11.7325V14.1395H63.6001V31.3945H60.8451V14.1395H57.1041V11.7325H67.3411ZM77.6118 31.3945L76.5388 26.1745H71.6668L70.5938 31.3945H67.9258L72.2178 11.7325H76.0458L80.2798 31.3945H77.6118ZM72.1308 23.8255H76.0458L74.0738 14.2845L72.1308 23.8255ZM82.4875 11.7325H85.2135V31.3945H82.4875V11.7325ZM90.1145 11.7325H93.0435L89.0705 21.4475L93.3045 31.3945H90.2595L86.1705 21.5055L90.1145 11.7325ZM95.4865 11.7325H104.447V14.1395H98.2125V20.2585H103.635V22.6655H98.2125V29.0165H104.447V31.3945H95.4865V11.7325Z"
            fill="white"
          />
          <path
            d="M37.1165 21.3288C37.1165 29.4845 30.6151 36.096 22.5953 36.096C14.5756 36.096 8.07422 29.4845 8.07422 21.3288C8.07422 13.173 14.5756 6.56152 22.5953 6.56152C30.6151 6.56152 37.1165 13.173 37.1165 21.3288Z"
            fill="white"
          />
          <path
            d="M19.3605 28.7087L19.3605 28.6541C20.6715 27.2156 21.3088 25.941 21.2724 24.8303C21.2724 24.5207 21.2268 24.2112 21.1358 23.9016C21.0447 23.5921 20.8991 23.2188 20.6988 22.7818C20.4985 22.3448 20.2163 21.7803 19.8521 21.0884C19.5608 20.5058 19.3514 19.9868 19.2239 19.5316C19.0964 19.0764 19.0145 18.5939 18.9781 18.084C18.9599 17.3375 19.1055 16.5727 19.4151 15.7897C19.7428 14.9886 20.2072 14.2511 20.808 13.5774L21.8459 13.5774L21.8459 10.7915L23.4847 10.7915L23.4847 13.5774L25.9155 13.5774L25.9155 13.632C25.2418 14.3786 24.7593 15.0523 24.4679 15.6532C24.1766 16.2359 24.0309 16.8367 24.0309 17.4558C24.0309 17.911 24.1129 18.3571 24.2768 18.7942C24.4406 19.2312 24.7047 19.7956 25.0688 20.4875C25.5605 21.3798 25.8973 22.1081 26.0794 22.6726C26.2615 23.2188 26.3616 23.7833 26.3798 24.366C26.3981 25.1489 26.2706 25.8864 25.9975 26.5783C25.7425 27.252 25.3238 27.9621 24.7411 28.7087L23.4847 28.7087L23.4847 31.3853L21.8459 31.3853L21.8459 28.7087L19.3605 28.7087Z"
            fill="#180F43"
          />
          <defs>
            <linearGradient
              id="paint0_linear_910_14874"
              x1="119.138"
              y1="21.1328"
              x2="0"
              y2="21.1328"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0.103121"
                stopColor="#071C00"
              />
              <stop
                offset="0.932692"
                stopColor="#009CAD"
              />
            </linearGradient>
          </defs>
        </svg>
        {isStaking && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs font-bold text-white">
            Staking...
          </span>
        )}
      </button>
    </div>
  );
}

export default StakeButton;
