"use client";
import React, { useState } from "react";
import { Khand } from "next/font/google";
import GlobalDataRow from "./comps/GlobalDataRow";
import TokanoBalance from "./ui/TokanoBalance";
import TokanoToken from "./ui/TokanoToken";
import DataStat from "./ui/DataStat";

const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function RightMenu() {
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', positionId: null });

  return (
    <div className={`${khandMedium.className}`}>
      {/* Toggle button - mobile only */}
      <button
        onClick={() => setShow(!show)}
        className="xl:hidden fixed bottom-18 right-0 z-70 bg-white text-purple-600 px-4 py-2 rounded shadow-lg"
      >
        {show ? "Close" : "Menu"}
      </button>

      {/* Overlay - mobile only */}
      {show && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShow(false)}
        />
      )}

      {/* Right-side menu */}
      <div
        className={`
          overflow-y-auto
          bg-[#12002a] border-2 border-secondary
          fixed top-2 right-0 z-50 w-[85vw] 
          transition-transform duration-300 ease-in-out
          shadow-[ -60px_0_120px_40px_rgba(10,0,40,0.85) ]
          rounded-tl-[2.5rem] rounded-bl-[2.5rem]
          ${show ? "translate-x-0" : "translate-x-full"}
          xl:static xl:z-0 xl:w-auto xl:shadow-none xl:translate-x-0
        `}
        style={{
          borderTopLeftRadius: "2.5rem",
          borderBottomLeftRadius: "2.5rem",
        }}
      >
        <div
          className={`flex justify-start py-3 px-6 text-4xl rounded-tr-4xl border-b-2 border-secondary`}
        >
          <h1>TOKANO</h1>
        </div>
        <div className="md:px-6">
          <TokanoToken TableName={"Global Data"}>
            <GlobalDataRow />
            <GlobalDataRow />
            <GlobalDataRow />
            <GlobalDataRow />
            <GlobalDataRow />
          </TokanoToken>
        </div>
        <div className="w-full pl-4 text-3xl border-y-2 border-secondary py-2">
          TOKANO
        </div>
        <div className="md:px-6">
          <TokanoBalance />
        </div>
        <div>
          <div className="p-4 border-2 border-secondary mx-6">Details</div>
          <DataStat />
        </div>

        {/* Staking Positions List */}
        <div className="mx-6 mt-4 border-2 border-secondary rounded">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 px-4 py-3 text-center">
            <h2 className="text-lg font-medium">Staking Positions</h2>
          </div>

          {/* Header Row */}
          <div className="grid grid-cols-3 bg-purple-700 text-white px-2 py-2 text-sm font-semibold">
            <div className="text-center">/-Un/Staked (Period)</div>
            <div className="text-center">select position to unstake<br/>or claim reward</div>
            <div className="text-center">Rewards (Last)</div>
          </div>

          {/* Data Rows */}
          {[
            { id: 1, staked: "700,484,120.00", period: "32d 04h", rewards: "4,120.00", rewardsSub: "521" },
            { id: 2, staked: "700,484,120.00", period: "32d 04h", rewards: "4,120.00", rewardsSub: "3200", highlight: true },
            { id: 3, staked: "70,484,120.00", period: "02d 04h", rewards: "84,120.00", rewardsSub: "430" },
            { id: 4, staked: "22,484,120.00", period: "32d 04h", rewards: "22,4,120.00", rewardsSub: "2342" },
            { id: 5, staked: "0.00", period: "0", rewards: "10,120.00", rewardsSub: "120" },
            { id: 6, staked: "700,484,120.00", period: "2d 04h", rewards: "700,484,120.00", rewardsSub: "450" },
            { id: 7, staked: "700,484,120.00", period: "2d 04h", rewards: "700,120.00", rewardsSub: "120,000" }
          ].map((position) => (
            <div key={position.id} className={`grid grid-cols-3 px-2 py-3 text-sm border-b border-purple-300 ${position.highlight ? 'bg-purple-600' : ''}`}>
              <div
                className="text-center cursor-pointer hover:bg-purple-500 p-2 rounded"
                onClick={() => setPopup({ show: true, type: 'unstake', positionId: position.id })}
              >
                <div className="font-semibold">{position.staked}</div>
                <div className="text-purple-300 text-xs">({position.period})</div>
              </div>
              <div className="text-center relative">
                {/* Empty middle column with popup positioning */}
                {popup.show && popup.positionId === position.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70">
                    <div className="bg-purple-900 border-2 border-purple-600 rounded-lg p-4 min-w-[160px] text-center shadow-xl">
                      <div className="mb-3">
                        <div className="text-white text-sm font-semibold">
                          {popup.type === 'unstake' ? 'UNSTAKE?' : 'CLAIM?'}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          className={`px-6 py-2 rounded-full text-white font-bold text-sm ${
                            popup.type === 'unstake'
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                          onClick={() => {
                            console.log(`${popup.type} YES for position ${popup.positionId}`);
                            setPopup({ show: false, type: '', positionId: null });
                          }}
                        >
                          YES
                        </button>

                        <button
                          className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm"
                          onClick={() => setPopup({ show: false, type: '', positionId: null })}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="text-center cursor-pointer hover:bg-purple-500 p-2 rounded"
                onClick={() => setPopup({ show: true, type: 'claim', positionId: position.id })}
              >
                <div className="font-semibold">{position.rewards}</div>
                <div className="text-purple-300 text-xs">({position.rewardsSub})</div>
              </div>
            </div>
          ))}

          {/* History Button */}
          <div className="bg-purple-700 px-4 py-2 text-center">
            <button className="text-white font-semibold">▼ History</button>
          </div>
        </div>

        {/* Background Overlay for Popup */}
        {popup.show && (
          <div
            className="fixed inset-0 bg-black/30 z-60"
            onClick={() => setPopup({ show: false, type: '', positionId: null })}
          />
        )}
      </div>
    </div>
  );
}

export default RightMenu;
