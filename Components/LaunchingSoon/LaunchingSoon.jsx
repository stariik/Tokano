import Banner from "@/Components/Banner";
import {
  ColumnNames1,
  ColumnNames2,
  tableTwoData,
  table3Data,
  tableOneData,
} from "@/data/data";
import { Khand } from "next/font/google";
import ScrollingSoonCards from "../Live/ui/ScrollingSoonCards";
import SoonCard from "@/Components/Tokens/SoonCard";
import { cardData } from "@/data/data";


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

function LaunchingSoon({ isMobile = false }) {
  if (isMobile) {
    return (
      <div className="border-secondary">
        <div className="space-y-2 px-2">
          {cardData.map((item) => (
            <div key={item.id}>
              <SoonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block border-r-2 border-secondary">
      <div
        className={`lg:border-b-2 border-secondary flex justify-center py-4 text-2xl ${khandMedium.className} custom-header-gradient `}
      >
        <h1>| Launching Soon |</h1>
      </div>
      <ScrollingSoonCards cards={cardData} />
    </div>
  );
}

export default LaunchingSoon;
