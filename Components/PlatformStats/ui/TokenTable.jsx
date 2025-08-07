import React from "react";
import TokenRow from "../comps/TokenRow.jsx";
import { Khand } from "next/font/google";

const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

function TokenTable({ header, columns, rowNum, tableData = [] }) {
  return (
    <div>
      <div className={`${khandMedium.className} border border-secondary`}>
        <div className="flex items-center justify-start p-2 border-secondary border-b md:text-lg font-semibold bg-[#2A1C78]">
          <h1>Largets M-caps</h1>
        </div>
        {tableData.map((row) => (
          <div
            key={row.id}
            className="col-span-3"
            style={{
              background:
                "linear-gradient(90deg, rgba(26, 27, 107, 1) 0%, rgba(0, 0, 0, 1) 81%)",
            }}
          >
            <TokenRow data={row} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenTable;
