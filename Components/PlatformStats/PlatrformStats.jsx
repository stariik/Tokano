import Banner from "@/Components/Banner";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import {
  ColumnNames1,
  ColumnNames2,
  tableTwoData,
  table3Data,
  tableOneData,
} from "@/data/data";
import { Khand } from "next/font/google";

const khandMedium = Khand({ subsets: ["latin"], weight: "400" });

const firstTables = [
  { header: "name 1", columns: ColumnNames1, tableData: tableOneData },
  { header: "name 2", columns: ColumnNames1, tableData: tableOneData },
  { header: "name3", columns: ColumnNames2, tableData: tableTwoData },
];

const secondTables = [
  { header: "name 1", columns: ColumnNames1, tableData: table3Data },
  { header: "name 2", columns: ColumnNames1, tableData: table3Data },
  { header: "name3", columns: ColumnNames2, tableData: table3Data },
  { header: "name 1", columns: ColumnNames1, tableData: table3Data },
  { header: "name 2", columns: ColumnNames1, tableData: table3Data },
  { header: "name3", columns: ColumnNames2, tableData: table3Data },
];

function PlatrformStats() {
  return (
    <div className="lg:border-1 border-secondary pb-4 hidden lg:block">
      <div
        className={`lg:border-1 border-secondary flex justify-center py-4 text-2xl ${khandMedium.className} custom-header-gradient col-span-3`}
      >
        <h1>| Launching Soon |</h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {firstTables.map((props, idx) => (
          <div key={idx}>
            <TokenTable {...props} />
          </div>
        ))}
      </div>

      <div className="my-2">
        <Banner src={"banner2.png"} />
      </div>

      <div className="grid grid-cols-3 gap-x-2 mb-4">
        {secondTables.map((props, idx) => (
          <div key={idx}>
            <TokenTable {...props} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatrformStats;
