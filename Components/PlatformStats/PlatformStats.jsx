import React from "react";
import TokenTable from "./ui/TokenTable";
import Banner from "@/Components/Banner";
import {
  ColumnNames1,
  ColumnNames2,
  tableTwoData,
  table3Data,
  tableOneData,
} from "@/data/data";
import ScrollingCards from "../Live/ui/ScrollingCards";
import { cardData } from "@/data/data";

const firstTables = [
  { header: "name 1", columns: ColumnNames1, tableData: tableOneData },
  { header: "name 2", columns: ColumnNames1, tableData: tableOneData },
  { header: "name 3", columns: ColumnNames2, tableData: tableTwoData },
  { header: "name 4", columns: ColumnNames2, tableData: tableTwoData },
  { header: "name 5", columns: ColumnNames2, tableData: tableTwoData },
];

const secondTables = [
  { header: "name 1", columns: ColumnNames1, tableData: table3Data },
  { header: "name 2", columns: ColumnNames1, tableData: table3Data },
  { header: "name3", columns: ColumnNames2, tableData: table3Data },
  { header: "name 4", columns: ColumnNames1, tableData: table3Data },
  { header: "name 5", columns: ColumnNames1, tableData: table3Data },
  { header: "name 6", columns: ColumnNames2, tableData: table3Data },
];

function PlatformStats() {
  return (
    <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
      {firstTables.map((table, idx) => (
        <TokenTable
          key={`first-${idx}`}
          header={table.header}
          columns={table.columns}
          rowNum={table.tableData.length} // you can also pass a fixed number
          tableData={table.tableData}
          className={idx >= 3 ? "lg:col-auto" : ""}
        />
      ))}
      <div className="col-span-1 lg:hidden"></div>
    </div>
  );
}

export default PlatformStats;
