import React from "react";

function StakingModule() {
  const stats = [
    { label: "Wallets Staking:", value: "21" },
    { label: "Tokens Staked:", value: "230,000,000.00" },
    { label: "Rwrds Earned:", value: "230,000.00" },
    { label: "Rwrds Left:", value: "530,000.00" },
  ];

  return (
    <div className="w-full rounded-4xl border-2 border-secondary overflow-hidden">
      <div className="grid grid-cols-2 bg-gradient-to-r from-[#574DDD] to-[#330E79]">
        {/* Left side */}
        <div
          className="flex justify-between items-center p-4 text-xl 2xl:text-4xl text-[#190E79] dark:text-white font-khand font-semibold border-r-2 border-secondary"
        >
          <div className="flex flex-col items-center justify-center leading-none w-full">
            <span>Staking</span>
            <span>Module</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <img src="/image.png" alt="" className="w-8 md:w-12 rounded-full m-2 md:m-4" />
            FIRED
          </div>
        </div>

        {/* Right side */}
        <div className="p-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm md:text-lg text-[#190E79] dark:text-white last:mb-0 font-khand font-medium"
            >
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#130C71] to-[#173991] text-[#190E79] dark:text-white py-4">
        <div className="grid grid-cols-3">
          <div className="flex justify-center items-center text-xs md:text-base ml-4">
            Available: 21,234,222.00
          </div>
          {/* <div className="flex justify-center">You Will Stake:</div> */}

          <div className="bg-gradient-to-t from-[#0A0C50] to-[#24068E] px-1 md:px-4 py-2 md:pb-2 pb-6 text-[#190E79] dark:text-white flex flex-col items-center rounded-xl border-2 border-secondary relative">
            {/* Top Row */}
            <div className="flex justify-between items-center w-full">
              <div className="h-full flex items-center">
                <span className="text-sm md:text-lg mt-1 font-khand font-medium">
                  You will <br /> Stake:
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-2xl font-khand font-semibold">
                  1,234,222.00
                </span>
                <div className="absolute bottom-5 right-0 h-[1px] bg-white/40 w-38" />
              </div>
            </div>

            {/* Bottom Text */}
            <div
              className="absolute right-2 bottom-0 text-xs md:text-sm flex justify-end w-full font-khand font-medium"
            >
              this is what you will stake
            </div>
          </div>

          <div className="flex justify-center items-center text-xs md:text-base">
            Unlocking: <span className="">5days</span>
          </div>
        </div>
        <div
          className="mt-6 mx-4 md:mx-20 text-center text-sm font-khand font-medium"
        >
          !!! Please keep in mind, either STAKEING or UNBONDING needs some
          amount of SOL on wallet available for network fees or the transaction
          will fail. !!!
        </div>
      </div>

      <div>
        {/* bottom */}
      </div>
    </div>
  );
}

export default StakingModule;
