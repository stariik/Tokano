"use client";

import React, { useState } from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import { Khand } from "next/font/google";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";
import TokenGrid from "@/Components/Memes/TokenGrid";

const khandMedium = Khand({ subsets: ["latin"], weight: "500" });
const khandSemibold = Khand({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="md:px-6 px-2 py-18 md:py-6 bg-dark text-light relative">
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
        <TokenGrid hideOnMobile={false} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7" />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed bottom-4 left-4 bg-secondary text-light px-3 py-2 rounded-lg text-sm font-medium z-40 hover:opacity-90 transition-opacity"
      >
        Menu
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-full max-w-sm bg-dark transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-secondary">
            <h2 className={`text-xl ${khandSemibold.className}`}>Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl hover:opacity-70 transition-opacity"
            >
              ×
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <LaunchingSoon isMobile={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
