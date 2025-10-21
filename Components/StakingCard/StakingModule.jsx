import React from "react";

function StakingModule() {
  const stats = [
    { label: "Wallets Staking:", value: "21" },
    { label: "Tokens Staked:", value: "230,000,000.00" },
    { label: "Rwrds Earned:", value: "230,000.00" },
    { label: "Rwrds Left:", value: "530,000.00" },
  ];

  return (
    <div className="dark:border-secondary font-khand overflow-hidden rounded-4xl border-2 border-[#CDCDE9]">
      <div className="grid grid-cols-2 bg-gradient-to-r from-[#8D85FB] to-[#4B317C] text-white dark:from-[#574DDD] dark:to-[#330E79] dark:text-[#190E79]">
        {/* Left side */}
        <div className="font-khand dark:border-secondary flex items-center justify-between border-r-2 border-[#CDCDE9] p-4 text-xl font-semibold lg:p-2 lg:text-xs xl:p-4 xl:text-base 2xl:text-4xl dark:text-white">
          <div className="flex flex-col items-center justify-center leading-none">
            <span>Staking</span>
            <span>Module</span>
          </div>
          <div className="flex w-full items-center justify-center">
            <img
              src="/image.png"
              alt=""
              className="m-2 w-8 rounded-full md:m-4 md:w-12"
            />
          </div>
          <div className=" ">FIRED</div>
        </div>

        {/* Right side */}
        <div className="p-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="font-khand flex items-center justify-between text-sm font-medium last:mb-0 md:text-lg lg:text-xs xl:text-base dark:text-white"
            >
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#C9CDD7] to-[#EAE4FF] py-4 text-[#190E79] dark:from-[#130C71] dark:to-[#173991] dark:text-white">
        <div className="grid min-h-18 grid-cols-7">
          <div className="col-span-2 ml-4 flex items-center justify-center text-xs md:text-base">
            Available: 21,234,222.00
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
                <span className="font-khand mb-4 border-b-1 border-white/40 text-xs font-semibold md:text-lg 2xl:text-2xl">
                  1,234,222.00
                </span>
                {/* <div className="hidden md:block absolute bottom-5 right-0 h-[1px] bg-white/40 w-38" /> */}
              </div>
            </div>

            {/* Bottom Text */}
            <div className="font-khand absolute right-2 bottom-1 flex w-full justify-end text-[10px] font-medium sm:text-sm lg:text-xs xl:text-[10px]">
              this is what you will stake
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center text-xs md:text-base">
            Unlocking: <span className="">5days</span>
          </div>
        </div>
        <div className="font-khand mx-4 mt-6 text-center text-sm font-medium md:mx-20 lg:mx-16 lg:mt-4 lg:text-xs xl:mx-20 xl:mt-6 xl:text-sm">
          !!! Please keep in mind, either STAKEING or UNBONDING needs some
          amount of SOL on wallet available for network fees or the transaction
          will fail. !!!
        </div>
      </div>

      <div className="font-khand dark:border-secondary flex items-center justify-end gap-8 border-t-2 border-[#CDCDE9] bg-gradient-to-r from-[#341E6D] to-[#9B7ADE] px-6 py-4 pr-8 text-xs font-semibold text-white md:gap-16 md:text-base dark:from-[#330E79] dark:to-[#7837F4]">
        You are Staking: 123,456,789
        <button className="flex cursor-pointer items-center gap-4 rounded-xl border-1 border-white bg-[#32138b] px-2 py-1 text-lg md:text-2xl">
          STAKE
          <div className="rounded-full bg-white p-1 px-3">
            <svg
              width="10"
              height="25"
              viewBox="0 0 10 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M0.797434 21.4971L0.797434 21.4331C2.33343 19.7478 3.0801 18.2545 3.03743 16.9531C3.03743 16.5905 2.9841 16.2278 2.87743 15.8651C2.77077 15.5025 2.6001 15.0651 2.36543 14.5531C2.13077 14.0411 1.8001 13.3798 1.37343 12.5691C1.0321 11.8865 0.786767 11.2785 0.637434 10.7451C0.488101 10.2118 0.392101 9.64646 0.349434 9.04913C0.328101 8.17446 0.498767 7.27846 0.861434 6.36113C1.24543 5.42246 1.78943 4.55846 2.49343 3.76913L3.70943 3.76913L3.70943 0.505127L5.62943 0.505127L5.62943 3.76913L8.47743 3.76913L8.47743 3.83313C7.6881 4.70779 7.12277 5.49713 6.78143 6.20113C6.4401 6.88379 6.26943 7.58779 6.26943 8.31313C6.26943 8.84646 6.36543 9.36913 6.55743 9.88113C6.74943 10.3931 7.05877 11.0545 7.48543 11.8651C8.06143 12.9105 8.4561 13.7638 8.66943 14.4251C8.88277 15.0651 9.0001 15.7265 9.02143 16.4091C9.04277 17.3265 8.89343 18.1905 8.57343 19.0011C8.27477 19.7905 7.7841 20.6225 7.10143 21.4971L5.62943 21.4971L5.62943 24.6331L3.70943 24.6331L3.70943 21.4971L0.797434 21.4971Z"
                fill="#32138A"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default StakingModule;
