import React from "react";

function TokanoToken({ children, TableName }) {
  return (
    <div className="font-khand">
      <div
        className="pl-12 flex justify-start border-1 border-secondary md:text-2xl bg-[#d5d2ec] dark:bg-transparent"
        style={{
          background: "var(--gradient-tokano-top)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-top: linear-gradient(90deg, rgba(213, 210, 236, 1) 0%, rgba(245, 243, 251, 1) 81%);
          }
          :global(.dark) div {
            --gradient-tokano-top: linear-gradient(90deg, rgba(41, 38, 133, 1) 0%, rgba(26, 0, 51, 1) 81%);
          }
        `}</style>
        <h1>{TableName}</h1>
      </div>
      {children}
      <div
        className="pr-12 flex justify-end border-1 border-secondary md:text-xl bg-[#d5d2ec] dark:bg-transparent"
        style={{
          background: "var(--gradient-tokano-bottom)",
        }}
      >
        <style jsx>{`
          div {
            --gradient-tokano-bottom: linear-gradient(90deg, rgba(213, 210, 236, 1) 0%, rgba(245, 243, 251, 1) 81%);
          }
          :global(.dark) div {
            --gradient-tokano-bottom: linear-gradient(90deg, rgba(41, 38, 133, 1) 0%, rgba(26, 0, 51, 1) 81%);
          }
        `}</style>
        <h1>Balance in SOL: 203.0123</h1>
      </div>
    </div>
  );
}

export default TokanoToken;
