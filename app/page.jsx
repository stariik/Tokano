"use client";

import React, { useEffect, useState } from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";
import TokenGrid from "@/Components/Memes/TokenGrid";
import { useBalances } from "@/contexts/balances-context";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { tokens } = useBalances();

  useEffect(() => {
    console.log("tokens", tokens);
  }, [tokens]);

  return (
    <main className="lg:px-6 px-2 py-8 lg:py-6 dark:bg-dark bg-white text-light relative">
      <div className="">
        <div className="lg:grid-cols-3 grid ">
          <div className="col-span-2 rounded-tr-4xl grid gap-4 lg:grid-cols-2">
            <LaunchingSoon />
            <Live />
          </div>
          <div className="col-span-2">
            <div className="border-[#CDCDE9] dark:border-secondary w-full border-x-2 border-b-2">
              <div className="border-[#CDCDE9] dark:border-secondary flex w-full justify-center border-b bg-[#eeeded] bg-[radial-gradient(circle,_rgba(238,237,237,1)_29%,_rgb(233_198_255)_100%)] py-2 text-2xl dark:bg-[#14121f] dark:bg-[radial-gradient(circle,_rgba(20,18,31,1)_29%,_rgba(42,0,168,1)_100%)]">
                <p className="font-khand font-medium text-[#464B7E] dark:text-white">
                  PLATFORM STATS
                </p>
              </div>
              <PlatformStats />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <TokenGrid
          hideOnMobile={false}
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7"
        />
      </div>

      <style
        jsx
        global
      >{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }

        /* Hide all menu buttons when any menu is open */
        body:has(.menu-overlay-active) #left-menu-button,
        body:has(.menu-overlay-active) #right-menu-button,
        body:has(.menu-overlay-active) #tokengrid-menu-button {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`[writing-mode:vertical-rl] lg:hidden fixed bottom-22 left-0 z-70 bg-white border-r-1 border-x-1 border-[#CDCDE9] dark:border-secondary text-[#190E79] flex flex-col items-center justify-center px-2 py-1 rounded-r-lg shadow-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        id="left-menu-button"
        style={{ boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)" }}
      >
        Soon
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="menu-overlay-active lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`bg-dark border-[#CDCDE9] dark:border-secondary fixed top-0 left-0 flex h-screen w-[90vw] max-w-sm transform flex-col overflow-hidden rounded-tr-[2.5rem] rounded-br-[2.5rem] border-r-2 transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              borderTopRightRadius: "2.5rem",
              borderBottomRightRadius: "2.5rem",
            }}
          >
            <div className="border-[#CDCDE9] dark:border-secondary bg-dark flex flex-shrink-0 items-center justify-between border-b p-4">
              <h2 className="font-khand text-xl font-semibold">
                LAUNCHING SOON
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 dark:text-white"
              >
                ×
              </button>
            </div>
            <div className="custom-scrollbar flex-1 overflow-y-auto pb-6">
              <LaunchingSoon isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
