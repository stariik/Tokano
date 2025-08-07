import React from "react";
import { stakedData } from "@/data/data";

function DataStatsRow() {
  return <div className="flex justify-between items-center p-4">
    {stakedData.map((data) => (
        data.map((item) => (
      <div key={item.id} className="flex justify-between items-center p-2">
        {item.staked}
      </div>
        ))
    ))}
  </div>;
}

export default DataStatsRow;