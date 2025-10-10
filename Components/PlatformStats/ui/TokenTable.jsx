import React from "react";
import TokenRow from "../comps/TokenRow.jsx";

function TokenTable({ header, columns, rowNum, tableData = [] }) {
  return (
    <div>
      <div className="font-khand border-x border-secondary">
        <div className="dark:text-white text-[#464B7E] flex items-center justify-start p-2 border-secondary border-b md:text-lg font-semibold bg-[#f5f3fb] dark:bg-[#2A1C78]">
          <h1>Largest M-caps</h1>
        </div>
        {tableData.map((row) => (
          <div
            key={row.id}
            className="col-span-3 bg-[#eeeded] dark:bg-[#120e21] dark:text-white text-[#464B7E]"
            // style={{
            //   background:
            //     "linear-gradient(90deg, rgba(26, 27, 107, 1) 0%, rgba(0, 0, 0, 1) 81%)",
            // }}
          >
            <TokenRow data={row} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenTable;
