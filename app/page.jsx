"use client";

import React, { useEffect, useState } from "react";
import Live from "@/Components/Live/Live";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";
import TokenTable from "@/Components/PlatformStats/ui/TokenTable";
import RightMenu from "@/Components/RightMenu/RightMenu";
import PlatformStats from "@/Components/PlatformStats/PlatformStats";
import TokenGrid from "@/Components/Memes/TokenGrid";
import { useBalances } from "@/contexts/balances-context";
import Banner from "@/Components/Banner";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { tokens } = useBalances();

  useEffect(() => {
    console.log("tokens", tokens);
  }, [tokens]);

  return (
    <main className="dark:bg-dark relative bg-white px-2 py-8 lg:px-2 lg:py-6">
      <div className="lg:mb-4">
        <div className="grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2 xl:gap-4">
          <div className="gap-2 md:col-span-1 lg:col-span-2 lg:grid lg:grid-cols-2 xl:gap-4">
            <div className="">
              <LaunchingSoon />
            </div>
            <div className="flex justify-center md:block 2xl:flex ">
              <Live />
            </div>
          </div>
          <RightMenu />
        </div>
      </div>
      <Banner src={"banner1.png"} />

      <div className="mt-4 w-full">
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
        className={`dark:border-secondary fixed bottom-22 left-0 z-70 flex flex-col items-center justify-center rounded-r-lg border-x-1 border-r-1 border-[#CDCDE9] bg-white px-2 py-1 text-sm font-bold text-[#190E79] shadow-2xl transition-all duration-300 ease-in-out [writing-mode:vertical-rl] hover:shadow-xl lg:hidden ${
          isMobileMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        id="left-menu-button"
        style={{ boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)" }}
      >
        Soon
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="menu-overlay-active fixed z-30 bg-black/60 lg:hidden"
          style={{ top: "3rem", bottom: 0, left: 0, right: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`bg-dark dark:border-secondary fixed top-13 left-0 flex w-[90vw] max-w-sm transform flex-col overflow-hidden rounded-tr-[2.5rem] border-r-2 border-[#CDCDE9] transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              borderTopRightRadius: "2.5rem",
              bottom: 0,
              height: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dark:border-secondary bg-dark flex flex-shrink-0 items-center justify-between border-b border-[#CDCDE9] p-4">
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
