import { WALLET_CONFIG } from "../../lib/constants";

// CryptoWallet Component
function CryptoWallet({ selectedToken, setSelectedToken, tokens }) {
  const { address: walletAddress, solanaBalance } = WALLET_CONFIG;

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  return (
    <div className="max-w-4xl mx-4 lg:mx-auto bg-[#C7C1F5] dark:bg-[#231570] rounded-3xl overflow-hidden font-sans shadow-2xl">
      {/* Header */}
      <div className="bg-[#C7C1F5] dark:bg-[#231570] px-6 py-3 flex justify-between items-center border-b dark:border-secondary border-white">
        <h1 className="text-base lg:text-2xl font-bold text-[#190E79] dark:text-white tracking-wide font-khand">
          YOUR WALLET
        </h1>
        <span className="text-[#190E79] dark:text-white font-semibold text-sm lg:text-lg font-khand">
          {walletAddress}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="px-1 md:px-2 lg:px-4">
        <div className="grid grid-cols-2 gap-1 md:gap-4">
          {/* Token List - Left Side */}
          <div className="px-0 md:px-2 pb-1 border-x border-white border-opacity-40 dark:border-secondary">
            <div className="space-y-1.5 max-h-[270px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#190E79] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-thumb]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-opacity-30">
              {tokens.map((token, index) => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className={`flex items-center px-1.5 py-1.5 cursor-pointer transition-all duration-200 border ${
                    selectedToken === token.id
                      ? "bg-[#ddd9f9] border-white border-opacity-60 dark:bg-secondary dark:bg-opacity-10 dark:border-secondary rounded-md md:mr-2 mr-1"
                      : "hover:bg-[#ddd9f9] hover:bg-opacity-50 border-transparent dark:hover:bg-secondary dark:hover:bg-opacity-10 rounded-md mr-1 md:mr-2"
                  }`}
                >
                  <span className="text-lg lg:text-xl mr-1.5 md:mr-2">
                    {token.icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs md:text-sm lg:text-base font-bold text-[#190E79] dark:text-white font-khand">
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
            <div className="p-3 border-x border-white border-opacity-40 dark:border-secondary flex items-center justify-end">
              <div className="text-right">
                <div className="text-base md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold text-[#190E79] dark:text-white font-khand">
                  {selectedTokenData?.balance} {selectedTokenData?.ticker}
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="p-2 md:p-4 h-full border-x border-t border-white border-opacity-40 dark:border-secondary flex-1">
              <div className="space-y-2">
                <div>
                  <span className="text-[#190E79] dark:text-white font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl font-khand">
                    token ID:{" "}
                  </span>
                  <span className="text-[#190E79] dark:text-white text-xs md:text-sm xl:text-base 2xl:text-lg font-khand">
                    {selectedTokenData?.tokenId}
                  </span>
                </div>
                <div>
                  <span className="text-[#190E79] dark:text-white font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl font-khand">
                    name:{" "}
                  </span>
                  <span className="text-[#190E79] dark:text-white text-xs md:text-sm xl:text-base 2xl:text-lg font-khand">
                    {selectedTokenData?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[#190E79] dark:text-white font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl font-khand">
                    ticker:{" "}
                  </span>
                  <span className="text-[#190E79] dark:text-white text-xs md:text-sm xl:text-base 2xl:text-lg font-khand">
                    {selectedTokenData?.ticker}
                  </span>
                </div>
                <div>
                  <span className="text-[#190E79] dark:text-white font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl font-khand">
                    platform:{" "}
                  </span>
                  <span className="text-[#190E79] dark:text-white text-xs md:text-sm xl:text-base 2xl:text-lg font-khand">
                    {selectedTokenData?.platform}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solana Balance - Bottom */}
      </div>
      <div className="px-6 py-2 border-t border-white border-opacity-40 dark:border-secondary bg-[#ddd9f9] dark:bg-[#231570] z-10 relative">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-[#190E79] dark:text-white font-khand">
              Solana balance:
            </span>
          </div>
          <div className="text-xl font-bold text-[#190E79] dark:text-white font-khand">
            {solanaBalance}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoWallet;
