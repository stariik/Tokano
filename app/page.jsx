import React from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import { Khand } from "next/font/google";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";
import TokenGrid from "@/Components/Memes/TokenGrid";

const khandMedium = Khand({ subsets: ["latin"], weight: "500" });
const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light">
      <div className="">
        <div className="xl:grid-cols-3 md:grid-cols-2 grid ">
          <div className="col-span-2 border-2 border-secondary rounded-tr-4xl grid gap-4 md:grid-cols-2">
            <LaunchingSoon />
            <Live />
          </div>
          <div className="col-span-2">
            <div className="border-x-2 border-b-2 border-secondary w-full">
              <div className="bg-[#14121f] border-b border-secondary bg-[radial-gradient(circle,_rgba(20,18,31,1)_29%,_rgba(42,0,168,1)_100%)] w-full py-2 flex justify-center text-2xl">
                <p className={`${khandMedium.className}`}>PLATFORM STATS</p>
              </div>
              <PlatformStats />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <TokenGrid hideOnMobile={false} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" />
      </div>
    </main>
  );
}
