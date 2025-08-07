import React from "react";
import { Khand } from "next/font/google";

const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function TokanoToken({ children, TableName}) {
  return (
    <div className={`${khandMedium.className}`}>
      <div
        className="pl-12 flex justify-start border-1 border-secondary md:text-2xl"
        style={{
          background:
            "linear-gradient(90deg,rgba(41, 38, 133, 1) 0%, rgba(26, 0, 51, 1) 81%)",
        }}
      >
        <h1>{TableName}</h1>
      </div>
      {children}
      <div
        className="pr-12 flex justify-end border-1 border-secondary md:text-xl"
        style={{
          background:
            "linear-gradient(90deg,rgba(41, 38, 133, 1) 0%, rgba(26, 0, 51, 1) 81%)",
        }}
      >
        <h1>Balance in SOL: 203.0123</h1>
      </div>
    </div>
  );
}

export default TokanoToken;
