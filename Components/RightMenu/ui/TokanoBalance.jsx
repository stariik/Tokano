import React from "react";
import BalanceComp from "../comps/BalanceComp";
import TokanoToken from "./TokanoToken";
import RainbowBalance from "../comps/RainbowBalance";
import StakeButton from "../comps/StakeButton";
import TokanoBalanceData from "./TokanoBalanceData";

export default function TokanoBalance() {
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
            13,000,239.12
          </span>
        </div>
        {/* Progress Bar & Stake Row */}
        <div className="flex items-center justify-between bg-[#f5f3fb] py-2 lg:py-1 2xl:py-2 pr-2 2xl:pr-6 dark:bg-[#1a0033]">
          {/* Progress bar */}
          <div className="relative flex items-center gap-2">
            <RainbowBalance />
            <BalanceComp />
          </div>
          <div className="-mt-1 lg:-mt-2 xl:-mt-1">
            <StakeButton />
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
