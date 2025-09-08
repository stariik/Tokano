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
      </div>
    </div>
  );
}

export default RightMenu;
