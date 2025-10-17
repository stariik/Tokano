import React from "react";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";

function GlobalData() {
  return (
    <div className="md:px-6">
      <TokanoToken TableName={"Global Data"}>
        <div className="font-khand dark:bg[#231570] dark:border-secondary grid grid-cols-4 border-x-2 border-[#CDCDE9] bg-[#BEB3FF] py-0.5 pr-6 pl-4">
          <div className="">TOKANO</div>
          <div className="">M-cap: $230k</div>
          <div className="">24h Vol: 3M</div>
          <div className="">Reserve: 2M</div>
        </div>
        <div className="dark:border-secondary flex flex-col border-2 border-[#CDCDE9]">
          <div className="mb-4">
            <GlobalDataRow />
          </div>
          <div className="mb-4">
            <GlobalDataRow />
          </div>
          <div className="mb-4">
            <GlobalDataRow />
          </div>
          <div>
            <GlobalDataRow />
          </div>
        </div>
      </TokanoToken>
    </div>
  );
}

export default GlobalData;
