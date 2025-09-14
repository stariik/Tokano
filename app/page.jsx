import React from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import { Khand } from "next/font/google";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";

const khandMedium = Khand({ subsets: ["latin"], weight: "500" });
const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light">
      {/* rounded-tr-4xl lg:rounded-r-4xl */}
      <div className="lg:grid-cols-2 grid gap-4 border-2 border-secondary rounded-tr-4xl">
        <LaunchingSoon />
        <Live />
      </div>
      <div className="border-x-2 border-b-2 border-secondary w-full">
        <div className="bg-[#14121f] border-b border-secondary bg-[radial-gradient(circle,_rgba(20,18,31,1)_29%,_rgba(42,0,168,1)_100%)] w-full py-2 flex justify-center text-2xl">
          <p className={`${khandMedium.className}`}>PLATFORM STATS</p>
        </div>
        <PlatformStats />
      </div>
    </main>
  );
}
