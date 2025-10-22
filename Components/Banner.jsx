import React from "react";

function Banner({ src }) {
  return (
    <div className="mb-2 hidden justify-center lg:flex">
      <img
        src={src}
        alt=""
      />
    </div>
  );
}

export default Banner;
