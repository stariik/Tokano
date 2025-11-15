"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDone } from "react-icons/md";

interface SuccessProps {
  poolAddress?: string;
  type?: "stake" | "vest" | "lock";
}

function Success({ poolAddress, type = "stake" }: SuccessProps) {
  const router = useRouter();

  const handleViewClick = () => {
    // Determine the route and query parameter based on type
    const baseRoute = type === "vest" ? "/card/vest" : type === "lock" ? "/card/lock" : "/card/stake";
    const queryParam = type === "vest" ? "vest" : type === "lock" ? "lock" : "pool";

    if (poolAddress) {
      router.push(`${baseRoute}?${queryParam}=${poolAddress}`);
    } else {
      router.push(baseRoute);
    }
  };

  return (
    <div className="py relative flex max-w-md items-center justify-center rounded-full border-4 border-gray-200 bg-white/80 backdrop-blur-sm px-8 shadow-lg">
      <h2 className="font-khand mr-4 text-xl font-bold text-black md:text-3xl">
        SUCCESS!
      </h2>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80">
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
