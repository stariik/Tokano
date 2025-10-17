import React from "react";

function TokanoToken({ children, TableName }) {
  return (
    <div className="font-khand">
      <div
        className="-mt-0.5 flex justify-start border-2 border-[#CDCDE9] bg-[#d5d2ec] pl-12 md:text-2xl dark:bg-transparent"
        style={{
          background: "var(--gradient-tokano-top)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-top: linear-gradient(
              90deg,
              #beb3ff 0%,
              #ffffff 70%
            );
          }
          :global(.dark) div {
            --gradient-tokano-top: linear-gradient(
              90deg,
              rgba(41, 38, 133, 1) 0%,
              rgba(26, 0, 51, 1) 81%
            );
          }
        `}</style>
        <h1>{TableName}</h1>
      </div>
      {children}
      <div
        className="-my-0.5 flex justify-end border-2 border-[#CDCDE9] bg-[#d5d2ec] pr-12 md:text-xl dark:bg-transparent"
        style={{
          background: "var(--gradient-tokano-bottom)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-bottom: linear-gradient(
              90deg,
              rgba(213, 210, 236, 1) 0%,
              rgba(245, 243, 251, 1) 81%
            );
          }
          :global(.dark) div {
            --gradient-tokano-bottom: linear-gradient(
              90deg,
              rgba(41, 38, 133, 1) 0%,
              rgba(26, 0, 51, 1) 81%
            );
          }
        `}</style>
        <h1>Balance in SOL: 203.0123</h1>
      </div>
    </div>
  );
}

export default TokanoToken;
