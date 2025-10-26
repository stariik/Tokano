"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDone } from "react-icons/md";

interface SuccessProps {
  poolAddress?: string;
}

function Success({ poolAddress }: SuccessProps) {
  const router = useRouter();

  const handleViewClick = () => {
    if (poolAddress) {
      router.push(`/card/stake?pool=${poolAddress}`);
    } else {
      router.push("/card/stake");
    }
  };

  return (
    <div className="py relative flex max-w-md items-center justify-center rounded-full border-4 border-gray-200 bg-white px-8 shadow-lg">
      <h2 className="font-khand mr-4 text-xl font-bold text-black md:text-3xl">
        SUCCESS!
      </h2>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
        <MdOutlineDone
          size={60}
          color="green"
        />
      </div>
      <button
        onClick={handleViewClick}
        className="font-khand ml-4 flex items-center justify-center text-xs font-bold text-gray-700 hover:text-black"
      >
        click here
        <br />
        to view
      </button>
    </div>
  );
}

export default Success;
