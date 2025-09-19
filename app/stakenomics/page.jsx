"use client";
import { React, useState } from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";
import CryptoWallet from "./comps/test";
import FundCards from "./comps/fundCards";

function page() {
  const [selectedToken, setSelectedToken] = useState(2); // LIMASIRA is selected by default

  const walletAddress = "0xHbahb....35Uenu";
  const solanaBalance = "0.002 SOL";

  const tokens = [
    {
      id: 1,
      name: "FIRED",
      icon: "🍔",
      balance: "45,230,000.123",
      ticker: "FIRED",
      tokenId: "0xabc1...def2",
      platform: "pump.fun",
    },
    {
      id: 2,
      name: "RAMSA",
      icon: "🐻",
      balance: "87,450,000.567",
      ticker: "RAMSA",
      tokenId: "0xdef3...abc4",
      platform: "pump.fun",
    },
    {
      id: 3,
      name: "LIMASIRA",
      icon: "👨‍💼",
      balance: "123,000,000.234",
      ticker: "LIMAS",
      tokenId: "0xfca9...ed1d",
      platform: "pump.fun",
    },
    {
      id: 4,
      name: "SYRIA",
      icon: "🌍",
      balance: "56,780,000.891",
      ticker: "SYRIA",
      tokenId: "0x1234...5678",
      platform: "pump.fun",
    },
    {
      id: 5,
      name: "NOGA",
      icon: "🦊",
      balance: "34,560,000.445",
      ticker: "NOGA",
      tokenId: "0x9876...4321",
      platform: "pump.fun",
    },
    {
      id: 6,
      name: "GAMNABULIN",
      icon: "🎮",
      balance: "78,920,000.667",
      ticker: "GAMNA",
      tokenId: "0xabcd...efgh",
      platform: "pump.fun",
    },
  ];

  const selectedTokenData = tokens.find((token) => token.id === selectedToken);

  return (
    <div className="xl:grid-cols-3 md:grid-cols-2 grid py-18 md:py-6 md:px-6 2xl:px-2">
      <div className="col-span-2  rounded-tr-4xl grid gap-2 2xl:gap-8 lg:grid-cols-7">
        <div className="col-span-3">
          <TokenGrid gridCols="grid-cols-2" />
        </div>

        <div className="col-span-4">
          <div className="mt-8">
            <CryptoWallet />
          </div>
          <div>
            <FundCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

// {/* <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-300 to-purple-400 rounded-3xl p-6 font-sans">
//               {/* Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   Your WALLET
//                 </h1>
//                 <span className="text-gray-700 font-medium">
//                   {walletAddress}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Token List */}
//                 <div className="bg-white bg-opacity-40 rounded-2xl p-4">
//                   <div className="space-y-2">
//                     {tokens.map((token, index) => (
//                       <div
//                         key={token.id}
//                         onClick={() => setSelectedToken(token.id)}
//                         className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//                           selectedToken === token.id
//                             ? "bg-white bg-opacity-60 shadow-md"
//                             : "hover:bg-white hover:bg-opacity-30"
//                         }`}
//                       >
//                         <span className="text-2xl mr-3">{token.icon}</span>
//                         <div className="flex-1">
//                           <span className="text-lg font-semibold text-gray-800">
//                             {index + 1}. {token.name}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Token Details */}
//                 <div className="space-y-4">
//                   {/* Balance Display */}
//                   <div className="bg-white bg-opacity-40 rounded-2xl p-6">
//                     <div className="text-right">
//                       <div className="text-3xl font-bold text-gray-800 mb-2">
//                         {selectedTokenData?.balance} {selectedTokenData?.ticker}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Token Information */}
//                   <div className="bg-white bg-opacity-40 rounded-2xl p-6">
//                     <div className="space-y-3">
//                       <div>
//                         <span className="text-gray-700 font-medium">
//                           token ID:{" "}
//                         </span>
//                         <span className="text-gray-800 font-semibold">
//                           {selectedTokenData?.tokenId}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-700 font-medium">
//                           name:{" "}
//                         </span>
//                         <span className="text-gray-800 font-semibold">
//                           {selectedTokenData?.name}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-700 font-medium">
//                           ticker:{" "}
//                         </span>
//                         <span className="text-gray-800 font-semibold">
//                           {selectedTokenData?.ticker}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-700 font-medium">
//                           platform:{" "}
//                         </span>
//                         <span className="text-gray-800 font-semibold">
//                           {selectedTokenData?.platform}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Solana Balance */}
//               <div className="mt-6 bg-white bg-opacity-40 rounded-2xl p-4">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
//                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                       <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <span className="text-xl font-bold text-gray-800">
//                       Solana balance:
//                     </span>
//                   </div>
//                   <div className="text-xl font-bold text-gray-800">
//                     {solanaBalance}
//                   </div>
//                 </div>
//               </div>
//             </div> */}
