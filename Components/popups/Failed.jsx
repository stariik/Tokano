import React from "react";
import { FaExclamation } from "react-icons/fa6";

function Failed() {
  return (
    <div className="flex max-w-sm items-center justify-center rounded-full border-4 border-gray-200 bg-white px-4 py-2 pl-8 shadow-lg">
      <h2 className="font-khand mr-4 text-xl font-bold text-black md:text-3xl">
        FAILED!
      </h2>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
        <FaExclamation
          size={40}
          color="red"
        />
      </div>
    </div>
  );
}

export default Failed;
