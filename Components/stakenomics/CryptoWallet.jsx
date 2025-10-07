import { WALLET_CONFIG } from "../../lib/constants";

// CryptoWallet Component
function CryptoWallet({ selectedToken, setSelectedToken, tokens }) {
  const { address: walletAddress, solanaBalance } = WALLET_CONFIG;

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  return (
    <div className="max-w-4xl mx-4 lg:mx-auto bg-[#C7C1F5]  rounded-3xl overflow-hidden font-sans shadow-2xl">
      {/* Header */}
      <div className="bg-[#C7C1F5] px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">YOUR WALLET</h1>
        <span className="text-gray-700 font-semibold text-lg">{walletAddress}</span>
      </div>

      {/* Main Content Area */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Token List - Left Side */}
          <div className="p-2 border border-white border-opacity-40">
            <div className="space-y-1 max-h-[360px] overflow-y-auto">
              {tokens.map((token, index) => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className={`flex items-center p-1 cursor-pointer transition-all duration-200 border ${
                    selectedToken === token.id
                      ? "bg-[#d5d2ec] bg-opacity-50 border-white border-opacity-60"
                      : "hover:bg-white hover:bg-opacity-30 border-transparent"
                  }`}
                >
                  <span className="text-2xl mr-2">{token.icon}</span>
                  <div className="flex-1">
                    <span className="lg:text-lg font-bold text-gray-800">
                      {index + 1}. {token.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Token Details - Right Side */}
          <div className="space-y-4">
            {/* Balance Display */}
            <div className="p-3 border border-white border-opacity-40 flex items-center justify-end">
              <div className="text-right">
                <div className="lg:text-xl font-bold text-gray-800">
                  {selectedTokenData?.balance} {selectedTokenData?.ticker}
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="p-4 border border-white border-opacity-40 flex-1">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-700 font-semibold text-base lg:text-lg">token ID: </span>
                  <span className="text-gray-800 font-bold text-base lg:text-lg">
                    {selectedTokenData?.tokenId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-base lg:text-lg">name: </span>
                  <span className="text-gray-800 font-bold text-base lg:text-lg">
                    YOU'RE {selectedTokenData?.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-base lg:text-lg">ticker: </span>
                  <span className="text-gray-800 font-bold text-base lg:text-lg">
                    {selectedTokenData?.ticker}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-base lg:text-lg">platform: </span>
                  <span className="text-gray-800 font-bold text-base lg:text-lg">
                    {selectedTokenData?.platform}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solana Balance - Bottom */}
        <div className="mt-2  px-6 py-2 border border-white border-opacity-40">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-xl font-bold text-gray-800">
                Solana balance:
              </span>
            </div>
            <div className="text-xl font-bold text-gray-800">{solanaBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoWallet;