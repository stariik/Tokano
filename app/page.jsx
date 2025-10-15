"use client";

import React, { useState } from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";
import TokenGrid from "@/Components/Memes/TokenGrid";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="md:px-6 px-2 py-8 md:py-6 dark:bg-dark bg-white text-light relative">
      <div className="">
        <div className="xl:grid-cols-3 md:grid-cols-2 grid ">
          <div className="col-span-2 border-2 border-secondary rounded-tr-4xl grid gap-4 md:grid-cols-2">
            <LaunchingSoon />
            <Live />
          </div>
          <div className="col-span-2">
            <div className="border-x-2 border-b-2 border-secondary w-full">
              <div className="bg-[#eeeded] dark:bg-[#14121f] border-b border-secondary bg-[radial-gradient(circle,_rgba(238,237,237,1)_29%,_rgb(233_198_255)_100%)] dark:bg-[radial-gradient(circle,_rgba(20,18,31,1)_29%,_rgba(42,0,168,1)_100%)] w-full py-2 flex justify-center text-2xl">
                <p className="font-khand font-medium dark:text-white text-[#464B7E]">
                  PLATFORM STATS
                </p>
              </div>
              <PlatformStats />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <TokenGrid
          hideOnMobile={false}
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7"
        />
      </div>

      <style jsx global>{`
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
        className={`[writing-mode:vertical-rl] md:hidden fixed bottom-22 left-0 z-70 bg-white border-r-1 border-x-1 border-secondary text-[#190E79] flex flex-col items-center justify-center px-2 py-1 rounded-r-lg shadow-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        id="left-menu-button"
        style={{ boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)"}}
      >
        Soon
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="menu-overlay-active md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-screen w-[90vw] max-w-sm bg-dark transform transition-transform duration-300 ease-in-out rounded-tr-[2.5rem] rounded-br-[2.5rem] border-r-2 border-secondary flex flex-col overflow-hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              borderTopRightRadius: "2.5rem",
              borderBottomRightRadius: "2.5rem",
            }}
          >
            <div className="flex justify-between items-center p-4 border-b border-secondary bg-dark flex-shrink-0">
              <h2 className="text-xl font-khand font-semibold">
                LAUNCHING SOON
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#190E79] dark:text-white hover:text-purple-400 transition-colors text-3xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
              <LaunchingSoon isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
