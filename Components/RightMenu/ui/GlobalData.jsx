import React from "react";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";

function GlobalData() {
  return (
    <div className="md:px-6">
      <TokanoToken TableName={"Global Data"}>
        <div className="flex flex-col border-2 border-[#CDCDE9] dark:border-secondary">
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
