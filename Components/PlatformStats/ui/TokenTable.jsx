import React from "react";
import TokenRow from "../comps/TokenRow.jsx";

function TokenTable({ header, columns, rowNum, tableData = [] }) {
  return (
    <div>
      <div className="font-khand border-secondary border-x">
        <div className="border-secondary flex items-center justify-start border-b bg-[#f5f3fb] p-2 font-semibold text-[#464B7E] md:text-lg dark:bg-[#2A1C78] dark:text-white">
          <h1>Largest M-caps</h1>
        </div>
        {tableData.map((row) => (
          <div
            key={row.id}
            className="col-span-3 bg-[#eeeded] text-[#464B7E] dark:bg-[#120e21] dark:text-white"
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
