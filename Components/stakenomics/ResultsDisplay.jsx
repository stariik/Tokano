"use client";
import { CiPill } from "react-icons/ci";
import { Khand } from "next/font/google";

const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });
const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function ResultCard({ data }) {
  const { fundType, token, formData } = data;

  const getCardStyle = () => {
    switch (fundType) {
      case "STAKING POOL":
        return {
          bg: "bg-[#5951ce]",
          leftGradient: "bg-gradient-to-b from-[#7269e3] to-[#4a42b5]",
          topGradient: "bg-gradient-to-b from-[#6b63d8] to-[#5951ce]",
          bottomGradient: "bg-gradient-to-r from-[#5951ce] to-[#7269e3]",
        };
      case "LOCK FUNDS":
        return {
          bg: "bg-gradient-to-r from-[#5d9beb] to-[#041d33]",
        };
      case "VEST FUNDS":
        return {
          bg: "bg-gradient-to-r from-[#88048A] to-[#1A1E5F]",
        };
      default:
        return { bg: "bg-gray-500" };
    }
  };

  const cardStyle = getCardStyle();

  const formatFormData = () => {
    const formatted = [];
    if (formData.activationDate && formData.activationTime) {
      formatted.push(`Activation: ${formData.activationDate} ${formData.activationTime}`);
    }
    if (formData.lockDate && formData.lockTime) {
      formatted.push(`Lock: ${formData.lockDate} ${formData.lockTime}`);
    }
    if (formData.rewardAmount) {
      formatted.push(`Rewards: ${formData.rewardAmount} tokens`);
    }
    if (formData.tokenAmount) {
      formatted.push(`Amount: ${formData.tokenAmount} tokens`);
    }
    if (formData.distributionLength) {
      formatted.push(`Distribution: ${formData.distributionLength} days`);
    }
    if (formData.unstakingPeriod) {
      formatted.push(`Unstaking: ${formData.unstakingPeriod} days`);
    }
    if (formData.releaseDate) {
      formatted.push(`Release: ${formData.releaseDate}`);
    }
    if (formData.cliffPeriod) {
      formatted.push(`Cliff: ${formData.cliffPeriod} days`);
    }
    if (formData.releaseModel) {
      formatted.push(`Release: ${formData.releaseModel}`);
    }
    if (formData.recipientWallet) {
      formatted.push(`Recipient: ${formData.recipientWallet.slice(0, 10)}...`);
    }
    return formatted;
  };

  if (fundType === "STAKING POOL") {
    return (
      <div className={`text-white shadow ${cardStyle.bg} rounded-4xl hover:opacity-90 transition cursor-pointer`}>
        <div className="grid grid-cols-3 grid-rows-5 h-[250px]">
          <div className={`row-span-5 rounded-l-4xl ${cardStyle.leftGradient} text-white justify-center flex items-center flex-col gap-12`}>
            <span className="text-6xl">{token.icon}</span>
            <div className="m-4">
              <p className={`text-2xl ${khandSemibold.className}`}>STAKE</p>
            </div>
          </div>
          <div className={`col-span-2 ${cardStyle.topGradient} row-span-4 rounded-tr-4xl rounded-br-2xl`}>
            <div className="flex justify-between items-center pr-5">
              <h1 className={`p-4 text-xl ${khandSemibold.className}`}>
                {token.name}
              </h1>
              <CiPill color="#5ecb89" size={30} />
            </div>
            <div className={`pl-4 text-xs leading-4 ${khandMedium.className}`}>
              {formatFormData().slice(0, 3).map((item, idx) => (
                <p key={idx} className="mb-1">{item}</p>
              ))}
            </div>
            <div className="flex justify-end mr-8 mt-4">
              <h1 className={`text-4xl text-[#FFB01C] ${khandSemibold.className}`}>
                POOL
              </h1>
            </div>
          </div>
          <div className={`flex justify-end items-center col-span-2 ${cardStyle.bottomGradient} rounded-br-4xl px-6`}>
            <h1 className={`font-semibold text-2xl ${khandSemibold.className}`}>
              {fundType.toLowerCase()}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${khandSemibold.className} rounded-4xl block hover:opacity-90 transition cursor-pointer`}
      style={{
        background: fundType === "LOCK FUNDS"
          ? "linear-gradient(90deg, #5d9beb 0%, #041d33 100%)"
          : "linear-gradient(90deg, #88048A 0%, #1A1E5F 100%)",
      }}
    >
      <div
        className="p-4 relative rounded-4xl flex"
        style={{
          background: fundType === "LOCK FUNDS"
            ? "linear-gradient(30deg, #5d9beb 0%, #041d33 100%)"
            : "linear-gradient(30deg, #88048A 0%, #1A1E5F 100%)",
        }}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between pr-4 items-center">
            <CiPill color="#5ecb89" size={30} />
            <h1 className="text-2xl ml-4">
              {token.name}
            </h1>
          </div>
          <div className={`pr-4 text-right mt-2 text-xs ${khandMedium.className}`}>
            {formatFormData().slice(0, 2).map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-end mr-12">
          <span className="text-6xl">{token.icon}</span>
        </div>
        <p className="absolute right-5 text-[#FFB01C] bottom-0 text-xl">
          {formData.tokenAmount || "0"}
        </p>
      </div>
      <div className="pb-2 pr-4 flex justify-end items-center gap-6">
        <p className="text-lg">{fundType.toLowerCase()}</p>
      </div>
    </div>
  );
}

export default function ResultsDisplay({ filledData, selectedToken }) {
  if (!filledData) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">
        <p>
          Select a token and fill in fund details to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Live Results Display
      </h3>
      <div className="">
        <ResultCard data={filledData} />
      </div>
    </div>
  );
}