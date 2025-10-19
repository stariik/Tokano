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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
        className={`border-secondary fixed right-0 bottom-22 z-70 flex flex-col items-center justify-center rounded-l-lg border-x-1 border-l-1 bg-white px-1 pl-1 text-sm font-bold text-[#190E79] shadow-2xl transition-all duration-300 ease-in-out [writing-mode:vertical-rl] hover:shadow-xl lg:hidden dark:text-white ${
          show ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        id="right-menu-button"
        style={{
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
        }}
      >
        <svg
          width="22"
          height="38"
          viewBox="0 0 20 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
        >
          <path
            d="M12.9785 7.96873C13.059 7.96902 13.1248 8.09882 13.125 8.25877L13.125 10.2051L14.8799 10.2051L14.8799 8.24998C14.88 8.09478 14.9441 7.9689 15.0225 7.96873L17.7246 7.96872C17.803 7.96884 17.8671 8.09474 17.8672 8.24997L17.8672 10.2051L19.9941 10.205C20.0295 10.2051 20.0643 10.2182 20.0908 10.2412L22.8037 12.6064C22.904 12.6947 22.8414 12.8601 22.707 12.8603L5.24415 12.8604C5.10963 12.8602 5.04676 12.6947 5.14747 12.6064L7.86036 10.2412C7.88697 10.2181 7.92164 10.2051 7.95704 10.2051L10.0547 10.2051L10.0547 8.25878C10.0549 8.09876 10.1207 7.96891 10.2012 7.96874L12.9785 7.96873Z"
            fill="#292B8C"
          />
          <path
            d="M19.9951 14.5249C20.0306 14.5249 20.0652 14.5378 20.0918 14.561L22.8047 16.9262C22.9059 17.0144 22.8428 17.1801 22.708 17.1801L17.876 17.1802L17.876 18.5464C17.8758 18.6646 17.7825 18.7602 17.667 18.7602L10.2861 18.7602C10.1706 18.7602 10.0774 18.6646 10.0772 18.5464L10.0772 17.1802L5.24415 17.1802C5.10964 17.1799 5.04651 17.0144 5.14747 16.9263L7.86133 14.561C7.88799 14.5379 7.92254 14.5249 7.95801 14.5249L19.9951 14.5249Z"
            fill="#292B8C"
          />
        </svg>

        <svg
          width="3"
          height="22"
          viewBox="0 0 3 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-mr-0.5"
        >
          <path
            d="M2.66582 0.518555L2.66582 5.34937L0.719007 11.2032L2.66582 17.1138L2.66582 21.9446L0.179688 13.8743L0.179688 8.64569L2.66582 0.518555Z"
            fill="#292B8C"
          />
        </svg>
      </button>

      {/* Overlay - mobile only */}
      {show && (
        <div
          className="menu-overlay-active fixed z-40 bg-black/60 lg:hidden"
          style={{ top: "3.5rem", bottom: 0, left: 0, right: 0 }}
          onClick={() => setShow(false)}
        />
      )}

      {/* Right-side menu */}
      <div
        className={`dark:border-secondary custom-scrollbar shadow-[ -60px_0_120px_40px_rgba(10,0,40,0.85) ] fixed right-0 z-40 w-[90vw] overflow-y-auto rounded-tl-[2.5rem] border-l-2 border-[#CDCDE9] bg-[#f5f3fb] pb-6 transition-transform duration-300 ease-in-out dark:bg-[#12002a] ${show ? "translate-x-0" : "translate-x-full"} lg:static lg:top-2 lg:z-0 lg:h-auto lg:w-auto lg:translate-x-0 lg:border-2 lg:pb-0 lg:shadow-none`}
        style={{ top: "3.5rem", bottom: 0, height: "auto" }}
      >
        <div
          className={`dark:border-secondary flex items-center justify-between rounded-tr-4xl border-b-2 border-[#CDCDE9] px-6 py-3 text-4xl`}
        >
          <h1>TOKANO</h1>
          <button
            onClick={() => setShow(false)}
            className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 lg:hidden dark:text-white"
          >
            ✕
          </button>
        </div>
        <GlobalData />
        <div className="dark:border-secondary w-full border-y-2 border-[#CDCDE9] py-2 pl-4 text-3xl">
          TOKANO
        </div>
        <div className="lg:px-2 xl:px-4 2xl:px-6">
          <TokanoBalance />
        </div>
        <div className="mx-2">
          {/* <div className="p-4 border-2 border-secondary mx-6">Details</div>
          <DataStat /> */}
        </div>
        <div className="mx-6">
          <Details />
        </div>
        {/* Staking Positions List */}
        <div className="dark:border-secondary border-t-1 border-[#CDCDE9] py-2 pl-14 text-2xl">
          TOKANO
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
