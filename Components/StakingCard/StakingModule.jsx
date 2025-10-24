import React from "react";

function StakingModule() {
  const stats = [
    { label: "Wallets Staking:", value: "21" },
    { label: "Tokens Staked:", value: "230,000,000.00" },
    { label: "Rwrds Earned:", value: "230,000.00" },
    { label: "Rwrds Left:", value: "530,000.00" },
  ];

  return (
    <div className="dark:border-secondary font-khand overflow-hidden rounded-4xl border-2 border-[#CDCDE9] mt-4">
      <div className="grid grid-cols-2 bg-gradient-to-r from-[#8D85FB] to-[#4B317C] text-white dark:from-[#574DDD] dark:to-[#330E79] dark:text-[#190E79]">
        {/* Left side */}
        <div className="font-khand dark:border-secondary flex items-center justify-between border-r-2 border-[#CDCDE9] px-4 py-2 text-xl font-semibold lg:p-2 lg:text-xs xl:p-4 xl:text-base 2xl:text-4xl dark:text-white">
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
        <div className="px-4 py-2 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="font-khand flex items-center justify-between text-sm font-medium last:mb-0 md:text-sm lg:text-xs xl:text-base dark:text-white"
            >
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#C9CDD7] to-[#EAE4FF] py-4 pb-1 text-[#190E79] dark:from-[#130C71] dark:to-[#173991] dark:text-white">
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
        <div className="font-khand mx-auto mt-4 max-w-full px-2 lg:mt-4 xl:mt-6 2xl:mx-8">
          <p className="line-clamp-2 text-center text-sm font-medium lg:text-xs xl:text-sm px-4">
            !!! Please keep in mind, either STAKEING or UNBONDING needs some
            amount of SOL on wallet available for network fees or the transaction
            will fail. !!!
          </p>
        </div>
      </div>

      <div className="font-khand dark:border-secondary flex items-center justify-end gap-8 border-t-2 border-[#CDCDE9] bg-gradient-to-r from-[#341E6D] to-[#9B7ADE] px-6 py-4 pr-8 text-xs font-semibold text-white md:gap-16 md:text-base dark:from-[#330E79] dark:to-[#7837F4]">
        You are Staking: 123,456,789
        {/* <button className="flex cursor-pointer items-center gap-4 rounded-xl border-1 border-white bg-[#32138b] px-2 py-1 text-lg md:text-2xl">
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
         */}
        <svg
          width="162"
          height="45"
          viewBox="0 0 162 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 1.10229H146C154.284 1.10229 161 7.81802 161 16.1023V28.1023C161 36.3866 154.284 43.1023 146 43.1023H16C7.71573 43.1023 1 36.3866 1 28.1023V16.1023C1 7.81802 7.71573 1.10229 16 1.10229Z"
            fill="#120560"
            fillOpacity="0.56"
            stroke="white"
            strokeWidth="2"
          />
          <ellipse
            cx="124.672"
            cy="22.0961"
            rx="16.6896"
            ry="16.9724"
            transform="rotate(113.649 124.672 22.0961)"
            fill="#F2EEFF"
          />
          <path
            d="M120.797 30.5997L120.797 30.5357C122.333 28.8503 123.08 27.357 123.037 26.0557C123.037 25.693 122.984 25.3303 122.877 24.9677C122.771 24.605 122.6 24.1677 122.365 23.6557C122.131 23.1437 121.8 22.4823 121.373 21.6717C121.032 20.989 120.787 20.381 120.637 19.8477C120.488 19.3143 120.392 18.749 120.349 18.1517C120.328 17.277 120.499 16.381 120.861 15.4637C121.245 14.525 121.789 13.661 122.493 12.8717L123.709 12.8717L123.709 9.60767L125.629 9.60767L125.629 12.8717L128.477 12.8717L128.477 12.9357C127.688 13.8103 127.123 14.5997 126.781 15.3037C126.44 15.9863 126.269 16.6903 126.269 17.4157C126.269 17.949 126.365 18.4717 126.557 18.9837C126.749 19.4957 127.059 20.157 127.485 20.9677C128.061 22.013 128.456 22.8663 128.669 23.5277C128.883 24.1677 129 24.829 129.021 25.5117C129.043 26.429 128.893 27.293 128.573 28.1037C128.275 28.893 127.784 29.725 127.101 30.5997L125.629 30.5997L125.629 33.7357L123.709 33.7357L123.709 30.5997L120.797 30.5997Z"
            fill="#32138A"
          />
          <path
            d="M20.1093 15.9143C20.1093 14.1143 20.7093 12.7223 21.9093 11.7383C23.1093 10.7543 24.8253 10.2623 27.0573 10.2623C29.3133 10.2623 31.0653 10.4903 32.3133 10.9463V15.0863C30.9213 14.5343 29.2773 14.2583 27.3813 14.2583C25.4853 14.2583 24.5373 14.9783 24.5373 16.4183V17.3903C24.5373 18.1103 24.6693 18.6743 24.9333 19.0823C25.1973 19.4663 25.7133 19.8623 26.4813 20.2703L30.6213 22.6103C32.5653 23.6663 33.5373 25.2743 33.5373 27.4343V29.5583C33.5373 31.3823 32.8773 32.7983 31.5573 33.8063C30.2373 34.7903 28.3533 35.2823 25.9053 35.2823C23.4573 35.2823 21.6213 35.0183 20.3973 34.4903V30.3143C21.9333 30.9623 23.6733 31.2863 25.6173 31.2863C27.9933 31.2863 29.1813 30.5423 29.1813 29.0543V28.1183C29.1813 27.4943 29.0493 27.0143 28.7852 26.6783C28.5453 26.3183 28.0893 25.9583 27.4173 25.5983L23.4573 23.4383C21.2253 22.2143 20.1093 20.4503 20.1093 18.1463V15.9143ZM48.1504 10.4423V14.2223H43.5784V35.1023H39.2224V14.2223H34.6504V10.4423H48.1504ZM60.7746 35.1023L59.5866 28.9463H54.0426L52.8906 35.1023H48.7506L53.8626 10.4423H59.8746L64.9506 35.1023H60.7746ZM54.7266 25.2743H58.8666L56.7786 14.3303L54.7266 25.2743ZM67.2448 10.4423H71.5648V35.1023H67.2448V10.4423ZM76.7128 10.4423H81.3568L76.6048 22.5023L81.7168 35.1023H76.9288L72.0688 22.5743L76.7128 10.4423ZM84.0143 10.4423H95.8583V14.2223H88.3343V20.7383H94.8503V24.5183H88.3343V31.3223H95.8583V35.1023H84.0143V10.4423Z"
            fill="#F6F3FF"
          />
        </svg>
      </div>
    </div>
  );
}

export default StakingModule;
