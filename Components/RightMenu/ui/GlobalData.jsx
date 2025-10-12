import React from "react";
import TokanoToken from "./TokanoToken";
import GlobalDataRow from "../comps/GlobalDataRow";

function GlobalData() {
  return (
    <div className="md:px-6">
      <TokanoToken TableName={"Global Data"}>
        <GlobalDataRow />
        <GlobalDataRow />
        <GlobalDataRow />
        <GlobalDataRow />
        <GlobalDataRow />
      </TokanoToken>
    </div>
  );
}

export default GlobalData;
