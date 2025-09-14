import React from "react";

function TokenRow({ data }) {
  return (
    <>
    
        <div key={data.id} className="grid grid-cols-3 px-2 w-full py-2 md:text-lg text-sm">
          <div>Logo</div>
          <div>{data.token}</div>
          <div>{data.price}</div>
        </div>
    </>
  );
}

export default TokenRow;
