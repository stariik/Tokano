import React from "react";

function TokenRow({ data }) {
  return (
    <>
      <div
        key={data.id}
        className="grid w-full grid-cols-3 px-2 py-2 text-sm md:text-lg"
      >
        <div>Logo</div>
        <div>{data.token}</div>
        <div>{data.price}</div>
      </div>
    </>
  );
}

export default TokenRow;
