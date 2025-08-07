import React from "react";

function BalanceComp() {
  return (
    <div>
      <div className="flex items-center bg-[#1a0033] p-2 rounded-full z-10 -ml-4 relative">
        <img src="/logo.svg" alt="TOKANO" className="w-5 md:w-8" />
        <span className="text-white font-bold text-xs sm:text-sm md:text-lg ml-1 sm:ml-2">
          13,000
        </span>
      </div>
    </div>
  );
}

export default BalanceComp;
