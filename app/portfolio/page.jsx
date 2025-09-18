import React from "react";
import TokenGrid from "@/Components/Memes/TokenGrid";

function page() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2">
        <TokenGrid />
      </div>
    </div>
  );
}

export default page;
