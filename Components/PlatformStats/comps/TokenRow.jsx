import React from "react";

function TokenRow({ data }) {
  return (
    <>
      <div
        key={data.id}
        className="grid w-full grid-cols-3 px-2 py-1 text-xs sm:py-2 sm:text-sm md:text-base lg:text-sm xl:text-base"
      >
        <div className="truncate">Logo</div>
        <div className="truncate">{data.token}</div>
        <div className="truncate">{data.price}</div>
      </div>
    </>
  );
}

export default TokenRow;
