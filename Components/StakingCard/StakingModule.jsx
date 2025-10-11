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
      <div className="grid grid-cols-2 bg-gradient-to-r dark:from-[#574DDD] dark:to-[#330E79] from-[#8D85FB] to-[#4B317C] dark:text-[#190E79] text-white">
        {/* Left side */}
        <div className="flex justify-between items-center p-4 text-xl 2xl:text-4xl  dark:text-white font-khand font-semibold border-r-2 border-secondary">
          <div className="flex flex-col items-center justify-center leading-none w-full">
            <span>Staking</span>
            <span>Module</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <img
              src="/image.png"
              alt=""
              className="w-8 md:w-12 rounded-full m-2 md:m-4"
            />
            FIRED
          </div>
        </div>

        {/* Right side */}
        <div className="p-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm md:text-lg  dark:text-white last:mb-0 font-khand font-medium"
            >
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r dark:from-[#130C71] dark:to-[#173991] from-[#C9CDD7] to-[#EAE4FF] text-[#190E79] dark:text-white py-4">
        <div className="grid grid-cols-3">
          <div className="flex justify-center items-center text-xs md:text-base ml-4">
            Available: 21,234,222.00
          </div>
          {/* <div className="flex justify-center">You Will Stake:</div> */}

          <div className="bg-gradient-to-t dark:from-[#0A0C50] dark:to-[#24068E] from-[#DEDEDE] to-[#EAE4FF] px-1 md:px-4 py-2 md:pb-2 pb-6 text-[#190E79] dark:text-white flex flex-col items-center rounded-xl border-2 border-secondary relative">
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
            <div className="absolute right-2 bottom-0 text-xs md:text-sm flex justify-end w-full font-khand font-medium">
              this is what you will stake
            </div>
          </div>

          <div className="flex justify-center items-center text-xs md:text-base">
            Unlocking: <span className="">5days</span>
          </div>
        </div>
        <div className="mt-6 mx-4 md:mx-20 text-center text-sm font-khand font-medium">
          !!! Please keep in mind, either STAKEING or UNBONDING needs some
          amount of SOL on wallet available for network fees or the transaction
          will fail. !!!
        </div>
      </div>

      <div className="flex justify-end items-center px-6 py-4 border-t-2 border-secondary bg-gradient-to-r dark:from-[#330E79] dark:to-[#7837F4] from-[#341E6D] to-[#9B7ADE] text-white gap-16 pr-8 font-khand font-semibold ">
        You are Staking: 123,456,789
        <button className="rounded-xl border-1 border-white bg-[#32138b] py-1 px-2 lg:text-2xl text-xl flex gap-4 items-center cursor-pointer">
          STAKE
          <div className="bg-white p-1 rounded-full px-3">
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
