import { WALLET_CONFIG } from "../../lib/constants";

// CryptoWallet Component
function CryptoWallet({ selectedToken, setSelectedToken, tokens }) {
  const { address: walletAddress, solanaBalance } = WALLET_CONFIG;

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  return (
    <div className="max-w-4xl lg:mx-auto bg-[#C7C1F5] dark:bg-[#231570] rounded-3xl overflow-hidden font-sans shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#CDCDE9] dark:border-secondary bg-[#C7C1F5] px-6 py-3 dark:bg-[#231570]">
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
          <div className="border-opacity-40 border-x border-[#CDCDE9] dark:border-secondary px-0 pb-1 md:px-2">
            <div className="dark:[&::-webkit-scrollbar-thumb]:bg-opacity-30 max-h-[270px] space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#190E79] dark:[&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-transparent">
              {tokens.map((token, index) => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token.id)}
                  className={`flex cursor-pointer items-center border px-1.5 py-1.5 transition-all duration-200 ${
                    selectedToken === token.id
                      ? "border-opacity-60 dark:bg-secondary dark:bg-opacity-10 mr-1 rounded-md border-[#CDCDE9] dark:border-secondary bg-[#ddd9f9] md:mr-2"
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
            <div className="border-opacity-40 flex items-center justify-end border-x border-[#CDCDE9] dark:border-secondary p-3">
              <div className="text-right">
                <div className="font-khand text-base font-bold text-[#190E79] md:text-sm lg:text-base xl:text-lg 2xl:text-xl dark:text-white">
                  {selectedTokenData?.balance} {selectedTokenData?.ticker}
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="border-opacity-40 h-full flex-1 border-x border-t border-[#CDCDE9] dark:border-secondary p-2 md:p-4">
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
      <div className="border-opacity-40 relative z-10 border-t border-[#CDCDE9] dark:border-secondary bg-[#ddd9f9] px-6 py-2 dark:bg-[#231570]">
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600"></div>
            </div>
          </div>
          <div className="flex-1">
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
