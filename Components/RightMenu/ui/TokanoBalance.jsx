import React from "react";
import BalanceComp from "../comps/BalanceComp";
import TokanoToken from "./TokanoToken";
import RainbowBalance from "../comps/RainbowBalance";
import StakeButton from "../comps/StakeButton";
import TokanoBalanceData from "./TokanoBalanceData";

export default function TokanoBalance() {
  return (
    <div className="border-2 border-[#7B3FE4]  bg-[#f5f3fb] dark:bg-[#1a0033]">
      <TokanoToken TableName="YOUR TOKANO BALANCE">
        {/* Main Balance Row */}
        <TokanoBalanceData />
      </TokanoToken>

      {/* Balance in SOL */}
      <div className="flex items-center ml-4 mt-2">
        <span className="text-[#190E79] dark:text-white/80 text-sm pr-2">Available:</span>
        <span className="text-[#190E79] dark:text-white font-bold text-lg">13,000,239.12</span>
      </div>
      {/* Progress Bar & Stake Row */}
      <div className="py-2 flex bg-[#f5f3fb] dark:bg-[#1a0033] justify-between items-center pr-4">
        {/* Progress bar */}
        <div className="relative flex items-center gap-2">
          <RainbowBalance />
          <BalanceComp />
        </div>
        <div>
          <StakeButton />
        </div>
      </div>

      {/* Warning */}
      <div className="px-4 py-2 text-center text-red-600 text-sm">
        Attention! TOKANO staked can be unstaked after 10 days of unbonding
        period. This means that any moment you decide
      </div>
    </div>
  );
}
