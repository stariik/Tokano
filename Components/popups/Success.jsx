"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDone } from "react-icons/md";

function Success() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center bg-white rounded-full px-8 py shadow-lg border-4 border-gray-200 max-w-md">
      <h2 className="text-xl md:text-3xl font-bold font-khand text-black mr-4">SUCCESS!</h2>
      <div className="flex items-center justify-center bg-white rounded-full w-16 h-16">
        <MdOutlineDone size={60} color="green" />
      </div>
      <button
        onClick={() => router.push("/card/stake")}
        className="text-xs font-bold font-khand text-gray-700 hover:text-black flex justify-center items-center ml-4"
      >
        click here
        <br />
        to view
      </button>
    </div>
  );
}

export default Success;
