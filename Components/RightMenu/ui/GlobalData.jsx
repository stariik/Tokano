import React from "react";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";

function GlobalData() {
  return (
    <div className="px-2 xl:px-4 2xl:px-6">
      <TokanoToken
        TableName={"Global Data"}
        showIcon={true}
      >
        <div className="font-khand dark:bg[#231570] dark:border-secondary grid grid-cols-4 border-x-2 border-[#CDCDE9] bg-[#BEB3FF] py-0.5 pr-6 pl-4 text-xs xl:text-sm 2xl:text-base dark:bg-[#231570]">
          <div className="my-1 ml-4"></div>
        </div>
        <div className="dark:border-secondary flex flex-col border-2 border-[#CDCDE9] bg-[#beb3ffae] dark:bg-[#231570]">
          {/* TOKENS - 3 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label=""
              data={[
                { supply: "1.073B", holders: "3111" },
                { unsold: "500M", unlocked: "200M" },
                { "m-cap": "$12m/1 SOL", price: "$0.003 / 0 SOL" },
              ]}
            />
          </div>

          {/* STAKED - 2 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label="STAKED"
              data={[
                { total: "500M", stakes: "1234" },
                { "active rewards": "10K", "earned rewards": "50K" },
              ]}
            />
          </div>

          {/* LOCKED - 2 sections */}
          <div className="mb-4">
            <GlobalDataRow
              label="LOCKED"
              data={[{ locked: "300M" }, { "unlocks in": "30 days" }]}
            />
          </div>

          {/* VESTING - 3 sections */}
          <div>
            <GlobalDataRow
              label="VESTING"
              data={[
                { locked: "200M" },
                { steps: "12" },
                { "next unlock": "2m/2h" },
              ]}
            />
          </div>
        </div>
      </TokanoToken>
    </div>
  );
}

export default GlobalData;
