"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

function Success() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center bg-white rounded-full px-8 py shadow-lg border-4 border-gray-200 max-w-md">
      <h2 className="text-3xl font-bold text-black mr-4">SUCCESS!</h2>
      <div className="relative">
        <IoCheckmarkDoneCircleSharp size={80} color="green"/>
      </div>
      <button
        onClick={() => router.push("/card/stake")}
        className="text-xs text-gray-700 hover:text-black flex justify-center items-center"
      >
        click here
        <br />
        to view
      </button>
    </div>
  );
}

export default Success;
