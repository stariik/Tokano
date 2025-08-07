import React from "react";

function TokanoBalanceData() {
  return (
    <div className="flex items-stretch">
      <div className="flex flex-col items-center justify-center bg-[#2d0a5c] px-4 py-4 min-w-[80px] border-r-2 border-[#7B3FE4]">
        <img src="/logo.svg" alt="TOKANO" className="w-8 h-8 mb-2" />
        <span className="uppercase text-white text-lg tracking-widest">
          Tokano
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 py-2 bg-gradient-to-r from-[#391667] to-[#061a2e]">
        <div className="flex justify-between items-center border-b border-[#7B3FE4] py-1">
          <span className="text-white/80 text-base">Available:</span>
          <span className="text-white text-xl font-bold text-right">
            13,000,239.<span className="text-sm align-super">127</span>
          </span>
          <span className="text-[#12e6c8] text-sm ml-2">90%</span>
        </div>
        <div className="flex justify-between items-center border-b border-[#7B3FE4] py-1">
          <span className="text-white/80 text-base">Staked:</span>
          <span className="text-white text-xl font-bold">
            120,000.<span className="text-sm align-super">200</span>
          </span>
          <span className="text-[#12e6c8] text-sm ml-2">10%</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-white/80 text-base">Locked:</span>
          <span className="text-white text-xl font-bold">
            120,000.<span className="text-sm align-super">200</span>
          </span>
          <span className="text-[#12e6c8] text-sm ml-2">10%</span>
        </div>
      </div>
    </div>
  );
}

export default TokanoBalanceData;
