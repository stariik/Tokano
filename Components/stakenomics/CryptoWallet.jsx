import { WALLET_CONFIG } from "../../lib/constants";

// CryptoWallet Component
function CryptoWallet({ selectedToken, setSelectedToken, tokens }) {
  const { address: walletAddress, solanaBalance } = WALLET_CONFIG;

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  const SolanaIcon = () => (
    <svg
      width="35"
      height="35"
      viewBox="0 0 71 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
    >
      <path
        d="M35.0703 69.4863C54.4389 69.4863 70.1406 53.9313 70.1406 34.7432C70.1406 15.555 54.4389 0 35.0703 0C15.7015 0 0 15.555 0 34.7432C0 53.9313 15.7015 69.4863 35.0703 69.4863Z"
        fill="#2B2C47"
      />
      <path
        d="M54.929 44.7645L48.5193 51.6409C48.381 51.7904 48.2129 51.9095 48.0263 51.9909C47.8396 52.0726 47.638 52.1148 47.4342 52.1148H17.0494C16.9045 52.1148 16.7627 52.0726 16.6415 51.9932C16.5203 51.9137 16.4248 51.8006 16.3669 51.6676C16.3089 51.5348 16.2909 51.3879 16.3152 51.2449C16.3394 51.102 16.4047 50.969 16.5032 50.8626L22.9058 43.9865C23.0444 43.837 23.2122 43.7179 23.399 43.6362C23.5857 43.5548 23.7872 43.5125 23.9908 43.5123H54.3756C54.5219 43.5094 54.6659 43.5497 54.789 43.6283C54.9124 43.7068 55.0103 43.8203 55.0693 43.9542C55.1283 44.088 55.1466 44.2364 55.1217 44.3807C55.0965 44.5248 55.0298 44.6584 54.929 44.7645ZM48.5193 30.9144C48.3801 30.7658 48.2124 30.6472 48.0257 30.5656C47.839 30.4842 47.6378 30.4416 47.4342 30.4405H17.0494C16.9045 30.4405 16.7627 30.4827 16.6415 30.5622C16.5203 30.6416 16.4248 30.7547 16.3669 30.8878C16.3089 31.0205 16.2909 31.1674 16.3152 31.3104C16.3394 31.4533 16.4047 31.5863 16.5032 31.6927L22.9058 38.5725C23.0448 38.7211 23.2129 38.8397 23.3994 38.9214C23.586 39.0028 23.7874 39.0453 23.9908 39.0465H54.3756C54.5205 39.0456 54.6616 39.0028 54.7821 38.9231C54.903 38.8434 54.998 38.7302 55.0553 38.5975C55.1128 38.4647 55.1306 38.3181 55.1059 38.1754C55.0816 38.0328 55.0166 37.9003 54.9184 37.7942L48.5193 30.9144ZM17.0494 25.9744H47.4342C47.638 25.9741 47.8396 25.9321 48.0263 25.8504C48.2129 25.769 48.381 25.6496 48.5193 25.5004L54.929 18.6241C55.0298 18.5179 55.0965 18.3843 55.1217 18.2401C55.1466 18.0959 55.1283 17.9475 55.0693 17.8137C55.0103 17.6798 54.9124 17.5664 54.789 17.4878C54.6659 17.4092 54.5219 17.3689 54.3756 17.3719H23.9908C23.7872 17.3721 23.5857 17.4144 23.399 17.4959C23.2122 17.5775 23.0444 17.6967 22.9058 17.846L16.5032 24.7224C16.4047 24.8285 16.3394 24.9614 16.3152 25.1043C16.2909 25.2474 16.3089 25.3942 16.3669 25.5271C16.4248 25.6598 16.5203 25.773 16.6415 25.8527C16.7627 25.9321 16.9045 25.9744 17.0494 25.9744Z"
        fill="url(#paint0_linear_446_22076)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_446_22076"
          x1="19.5815"
          y1="52.9439"
          x2="51.4601"
          y2="17.0224"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.08"
            stopColor="#9945FF"
          />
          <stop
            offset="0.3"
            stopColor="#8752F3"
          />
          <stop
            offset="0.5"
            stopColor="#5497D5"
          />
          <stop
            offset="0.6"
            stopColor="#43B4CA"
          />
          <stop
            offset="0.72"
            stopColor="#28E0B9"
          />
          <stop
            offset="0.97"
            stopColor="#19FB9B"
          />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="max-w-4xl overflow-hidden rounded-3xl bg-[#C7C1F5] font-sans shadow-2xl lg:mx-auto dark:bg-[#231570]">
      {/* Header */}
      <div className="dark:border-secondary flex items-center justify-between border-b border-[#CDCDE9] bg-[#C7C1F5] px-6 py-2 md:py-3 dark:bg-[#231570]">
        <h1 className="font-khand text-base font-bold tracking-wide text-[#190E79] lg:text-2xl dark:text-white">
          YOUR WALLET
        </h1>
        <span className="font-khand text-sm font-semibold text-[#190E79] lg:text-lg dark:text-white">
          {walletAddress}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="px-1 md:px-2 lg:px-4">
        <div className="grid grid-cols-2 gap-1 md:gap-4">
          {/* Token List - Left Side */}
          <div className="border-opacity-40 dark:border-secondary border-x border-[#CDCDE9] px-0 pb-1 md:px-2">
            <div className="dark:[&::-webkit-scrollbar-thumb]:bg-opacity-30 max-h-[140px] space-y-1 overflow-y-auto sm:max-h-[160px] sm:space-y-1.5 md:max-h-[180px] lg:max-h-[200px] xl:max-h-[270px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#190E79] dark:[&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-transparent">
              {tokens.map((token, index) => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className={`flex cursor-pointer items-center border px-1.5 py-0.5 transition-all duration-200 xl:py-1.5 ${
                    selectedToken === token.id
                      ? "border-opacity-60 dark:bg-secondary dark:bg-opacity-10 dark:border-secondary mr-1 rounded-md border-[#CDCDE9] bg-[#ddd9f9] md:mr-2"
                      : "hover:bg-opacity-50 dark:hover:bg-secondary dark:hover:bg-opacity-10 mr-1 rounded-md border-transparent hover:bg-[#ddd9f9] md:mr-2"
                  }`}
                >
                  <span className="mr-1.5 text-lg md:mr-2 lg:text-xl">
                    {token.icon}
                  </span>
                  <div className="flex-1">
                    <span className="font-khand text-xs font-bold text-[#190E79] md:text-sm lg:text-base dark:text-white">
                      {index + 1}. {token.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Token Details - Right Side */}
          <div className="">
            {/* Balance Display */}
            <div className="border-opacity-40 dark:border-secondary flex items-center justify-end border-x border-[#CDCDE9] p-2 md:p-3">
              <div className="text-right">
                <div className="font-khand text-base font-bold text-[#190E79] md:text-sm lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                  {selectedTokenData?.balance} {selectedTokenData?.ticker}
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="border-opacity-40 dark:border-secondary h-full flex-1 border-x border-t border-[#CDCDE9] p-2 md:p-4">
              <div className="space-y-2">
                <div>
                  <span className="font-khand text-sm font-semibold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                    token ID:{" "}
                  </span>
                  <span className="font-khand text-xs text-[#190E79] md:text-sm xl:text-base 2xl:text-lg dark:text-white">
                    {selectedTokenData?.tokenId}
                  </span>
                </div>
                <div>
                  <span className="font-khand text-sm font-semibold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                    name:{" "}
                  </span>
                  <span className="font-khand text-xs text-[#190E79] md:text-sm xl:text-base 2xl:text-lg dark:text-white">
                    {selectedTokenData?.name}
                  </span>
                </div>
                <div>
                  <span className="font-khand text-sm font-semibold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                    ticker:{" "}
                  </span>
                  <span className="font-khand text-xs text-[#190E79] md:text-sm xl:text-base 2xl:text-lg dark:text-white">
                    {selectedTokenData?.ticker}
                  </span>
                </div>
                <div>
                  <span className="font-khand text-sm font-semibold text-[#190E79] lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                    platform:{" "}
                  </span>
                  <span className="font-khand text-xs text-[#190E79] md:text-sm xl:text-base 2xl:text-lg dark:text-white">
                    {selectedTokenData?.platform}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solana Balance - Bottom */}
      </div>
      <div className="border-opacity-40 dark:border-secondary relative z-10 border-t border-[#CDCDE9] bg-[#ddd9f9] px-6 py-1 xl:py-2 dark:bg-[#231570]">
        <div className="flex items-center">
          <SolanaIcon />
          <div className="flex-1 ml-4">
            <span className="font-khand text-xl font-bold text-[#190E79] dark:text-white">
              Solana balance:
            </span>
          </div>
          <div className="font-khand text-xl font-bold text-[#190E79] dark:text-white">
            {solanaBalance}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoWallet;
