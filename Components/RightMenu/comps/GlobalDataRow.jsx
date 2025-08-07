import React from "react";

function GlobalDataRow() {
  return (
    <div
      className="grid grid-cols-10 border-2 border-[#7B3FE4] text-white text-base"
      style={{
        background:
          "linear-gradient(90deg, rgba(49, 6, 128, 1) 0%, rgba(10, 0, 0, 1) 58%)",
        fontFamily: "Khand, sans-serif",
      }}
    >
      {/* Left label */}
      <div className="col-span-2 flex flex-col justify-center items-center border-r-2 border-[#7B3FE4] py-1 text-lg">
        VESTED
      </div>
      {/* Supply and holders */}
      <div className="col-span-3 flex flex-col justify-center px-2 py-1 border-r-2 border-[#7B3FE4] text-xs md:text-lg">
        <div>
          supply: <span className="ml-2">1.00073B</span>
        </div>
        <div>
          holders: <span className="ml-2">3111</span>
        </div>
      </div>
      {/* m-cap and price */}
      <div className="col-span-5 flex flex-col justify-center px-2 py-1 md:text-lg text-xs">
        <div>
          m-cap: <span className="ml-2">$12m / 1244 SOL</span>
        </div>
        <div>
          price: <span className="ml-2">$0.003 / 0.e7_233 SOL</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalDataRow;
