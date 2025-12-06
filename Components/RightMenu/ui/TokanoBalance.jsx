"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useBalances } from "@/contexts/balances-context";
import { TOKANO_MINT_ADDRESS } from "@/lib/constants";
import BalanceComp from "../comps/BalanceComp";
import TokanoToken from "./TokanoToken";
import RainbowBalance from "../comps/RainbowBalance";
import StakeButton from "../comps/StakeButton";
import TokanoBalanceData from "./TokanoBalanceData";

export default function TokanoBalance() {
  const { publicKey } = useWallet();
  const { tokens } = useBalances();
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState(null);

  // Get available TOKANO balance from wallet
  const tokanoToken = tokens.find((t) => t.mintAddress === TOKANO_MINT_ADDRESS);
  const availableBalance = tokanoToken?.amount || "0";
  const decimals = tokanoToken?.decimals || 9;

  const formatBalance = (balance) => {
    if (!balance) return "0.000";
    const num = typeof balance === "string" ? parseFloat(balance) : balance;
    if (isNaN(num)) return "0.000";
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePercentageClick = (percentage) => {
    const percentValue = parseInt(percentage);
    const availableNum = parseFloat(availableBalance);
    const calculatedAmount = Math.floor((availableNum * percentValue) / 100);
    setStakeAmount(calculatedAmount.toString());
    setSelectedPercentage(percentage);
  };

  const handleAmountChange = (value) => {
    setStakeAmount(value);
    setSelectedPercentage(null); // Clear percentage highlight when manually typing
  };

  return (
    <div className="dark:border-secondary border-x-2 border-[#CDCDE9] bg-[#f5f3fb] dark:bg-[#1a0033]">
      <TokanoToken
        TableName="YOUR TOKANO BALANCE"
        className="-mx-0.5"
      >
        {/* Main Balance Row */}
        <TokanoBalanceData />
      </TokanoToken>

      {/* Balance in SOL */}
      <div className="w-full">
        <div className="mt-2 ml-4 flex items-center px-4 py-2 lg:mt-1 lg:ml-2 lg:px-1 xl:px-2 2xl:mt-2 2xl:ml-4">
          <span className="pr-2 text-sm text-[#190E79] lg:text-xs xl:text-sm dark:text-white/80">
            Available:
          </span>
          <span className="text-lg font-bold text-[#190E79] lg:text-base xl:text-lg dark:text-white">
            {publicKey ? formatBalance(availableBalance) : "Not Connected"}
          </span>
        </div>
        {/* Progress Bar & Stake Row */}
        <div className="flex items-center justify-between w-full bg-[#f5f3fb] py-2 pr-2 lg:py-1 2xl:py-2 dark:bg-[#1a0033]">
          {/* Progress bar */}
          <div className="flex w-full items-center justify-between gap-2">
            <RainbowBalance
              onPercentageClick={handlePercentageClick}
              selectedPercentage={selectedPercentage}
            />
            <BalanceComp
              value={stakeAmount}
              onChange={handleAmountChange}
              maxAmount={availableBalance}
            />
          </div>
          <div className="">
            <StakeButton
              stakeAmount={stakeAmount}
              availableBalance={availableBalance}
              decimals={decimals}
              onStakeComplete={() => setStakeAmount("")}
            />
          </div>
        </div>

        {/* Warning */}
        <div className="px-4 py-2 text-center text-sm text-red-600 lg:text-xs xl:text-sm">
          Attention! TOKANO staked can be unstaked after 10 days of unbonding
          period. This means that any moment you decide
        </div>
      </div>
    </div>
  );
}
