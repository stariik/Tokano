import React from "react";

function Banner({ src }) {
  return (
    <div className="mb-2 lg:flex justify-center hidden">
      <img
        src={src}
        alt=""
      />
    </div>
  );
}

export default Banner;
