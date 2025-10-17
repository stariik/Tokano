import {
  ColumnNames1,
  ColumnNames2,
  tableTwoData,
  table3Data,
  tableOneData,
} from "@/data/data";
import ScrollingSoonCards from "../Live/ui/ScrollingSoonCards";
import SoonCard from "@/Components/Tokens/SoonCard";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";

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
  const { resolvedTheme } = useTheme();

  if (isMobile) {
    return (
      <div className="border-[#CDCDE9] dark:border-secondary">
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
    <div className="hidden lg:block border-2 border-[#CDCDE9] dark:border-secondary">
      <div
        className={`border-b-2 border-[#CDCDE9] dark:border-secondary flex justify-center py-4 text-2xl font-khand font-semibold ${
          resolvedTheme === "dark"
            ? "dark-custom-header-gradient"
            : "custom-header-gradient text-primary"
        }`}
      >
        <h1>| Launching Soon |</h1>
      </div>
      <ScrollingSoonCards cards={cardData} />
    </div>
  );
}

export default LaunchingSoon;
