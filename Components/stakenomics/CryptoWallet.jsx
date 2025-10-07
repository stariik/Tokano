import { WALLET_CONFIG } from "../../lib/constants";

// CryptoWallet Component
function CryptoWallet({ selectedToken, setSelectedToken, tokens }) {
  const { address: walletAddress, solanaBalance } = WALLET_CONFIG;

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  return (
    <div className="max-w-4xl mx-4 lg:mx-auto bg-[#C7C1F5] dark:bg-[#231570] rounded-3xl overflow-hidden font-sans shadow-2xl">
      {/* Header */}
      <div className="bg-[#C7C1F5] dark:bg-[#231570] px-6 py-3 flex justify-between items-center border-b border-secondary">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
          YOUR WALLET
        </h1>
        <span className="text-gray-700 dark:text-white font-semibold text-lg">
          {walletAddress}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Token List - Left Side */}
          <div className="px-2 pb-1 border-x border-white border-opacity-40 dark:border-secondary">
            <div className="space-y-1 max-h-[270px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-thumb]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-opacity-30">
              {tokens.map((token, index) => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className={`flex items-center px-1 cursor-pointer transition-all duration-200 border ${
                    selectedToken === token.id
                      ? "bg-[#d5d2ec] bg-opacity-50 border-white border-opacity-60 dark:bg-secondary dark:bg-opacity-10 dark:border-secondary rounded-md mr-2"
                      : "hover:bg-white hover:bg-opacity-30 border-transparent dark:hover:bg-secondary dark:hover:bg-opacity-10 rounded-md mr-2"
                  }`}
                >
                  <span className="text-2xl mr-2">{token.icon}</span>
                  <div className="flex-1">
                    <span className="md::text-xs font-bold text-gray-800 dark:text-white">
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
                <div className="text-base md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold text-gray-800 dark:text-white">
                  {selectedTokenData?.balance} {selectedTokenData?.ticker}
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="p-4 h-full border-x border-t border-white border-opacity-40 dark:border-secondary flex-1">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-700 dark:text-white font-semibold text-base md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                    token ID:{" "}
                  </span>
                  <span className="text-gray-800 dark:text-white text-base xl:text-base 2xl:text-lg">
                    {selectedTokenData?.tokenId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-white font-semibold text-base  xl:text-xl 2xl:text-2xl">
                    name:{" "}
                  </span>
                  <span className="text-gray-800 dark:text-white text-base xl:text-base 2xl:text-lg">
                    {selectedTokenData?.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-white font-semibold text-base  xl:text-xl 2xl:text-2xl">
                    ticker:{" "}
                  </span>
                  <span className="text-gray-800 dark:text-white text-base xl:text-base 2xl:text-lg">
                    {selectedTokenData?.ticker}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-white font-semibold text-base  xl:text-xl 2xl:text-2xl">
                    platform:{" "}
                  </span>
                  <span className="text-gray-800 dark:text-white text-base xl:text-base 2xl:text-lg">
                    {selectedTokenData?.platform}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solana Balance - Bottom */}
      </div>
      <div className="px-6 py-2 border-t border-white border-opacity-40 dark:border-secondary bg-[#231570] z-10 relative">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Solana balance:
            </span>
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            {solanaBalance}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoWallet;
