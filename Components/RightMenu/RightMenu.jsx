"use client";
import React, { useState, useEffect } from "react";
import GlobalDataRow from "./comps/GlobalDataRow";
import TokanoBalance from "./ui/TokanoBalance";
import Details from "./ui/Details";
import GlobalData from "./ui/GlobalData";

function RightMenu() {
  const [show, setShow] = useState(false);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div className="font-khand font-normal">
      <style jsx>{`
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
      `}</style>

      {/* Toggle button - mobile only */}
      <button
        onClick={() => setShow(true)}
        className={`xl:hidden fixed bottom-18 right-0 z-70 bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-2 rounded-l-full shadow-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 ease-in-out ${
          show ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        id="right-menu-button"
        style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)' }}
      >
        ☰ Menu
      </button>

      {/* Overlay - mobile only */}
      {show && (
        <div
          className="menu-overlay-active xl:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setShow(false)}
        />
      )}

      {/* Right-side menu */}
      <div
        className={`
          bg-[#f5f3fb] dark:bg-[#12002a] border-l-2 border-secondary
          fixed top-0 right-0 z-50 w-[90vw] h-screen
          overflow-y-auto custom-scrollbar
          transition-transform duration-300 ease-in-out
          shadow-[ -60px_0_120px_40px_rgba(10,0,40,0.85) ]
          rounded-tl-[2.5rem] rounded-bl-[2.5rem]
          pb-6
          ${show ? "translate-x-0" : "translate-x-full"}
          xl:static xl:z-0 xl:w-auto xl:shadow-none xl:translate-x-0 xl:h-auto xl:pb-0 xl:border-2 xl:top-2 xl:h-[calc(100vh-1rem)]
        `}
        style={{
          borderTopLeftRadius: "2.5rem",
          borderBottomLeftRadius: "2.5rem",
        }}
      >
        <div
          className={`flex justify-between items-center py-3 px-6 text-4xl rounded-tr-4xl border-b-2 border-secondary`}
        >
          <h1>TOKANO</h1>
          <button
            onClick={() => setShow(false)}
            className="xl:hidden text-[#190E79] dark:text-white hover:text-purple-400 transition-colors text-3xl"
          >
            ✕
          </button>
        </div>
        <GlobalData />
        <div className="w-full pl-4 text-3xl border-y-2 border-secondary py-2">
          TOKANO
        </div>
        <div className="md:px-6">
          <TokanoBalance />
        </div>
        <div>
          {/* <div className="p-4 border-2 border-secondary mx-6">Details</div>
          <DataStat /> */}
        </div>
        <Details />
        {/* Staking Positions List */}
        <div className="border-t-1 border-secondary py-2 pl-14 text-2xl">
          TOKANO
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
