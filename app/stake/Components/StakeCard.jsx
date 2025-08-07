import React from "react";

function StakeCard() {
  return (
    <div
      className="relative border border-[#6c41be] rounded-4xl"
      style={{
        background:
          "linear-gradient(95.4deg, rgba(46, 5, 143, 0.58) 39.73%, rgba(97, 27, 230, 0.3248)",
      }}
    >
      <div className="m-10 flex">
        <img src="/image.png" alt="" className="rounded-4xl" />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">YOU'RE FIRED (FIRED)</h1>
          <div className="px-2 pt-2 text-lg">
            <ul>
              <li>ID: 0xfca9…bfed1d</li>
              <li>Created: 21.04.2025</li>
              <li>Market cap: $4.3K</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakeCard;
