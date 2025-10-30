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
    <div className="font-khand font-normal 2xl:flex 2xl:justify-end">
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
        className={`border-secondary fixed right-0 bottom-22 z-70 flex flex-col items-center justify-center rounded-l-lg border-x-1 border-l-1 bg-white px-1 pl-1 text-sm font-bold text-[#190E79] shadow-2xl transition-all duration-300 ease-in-out [writing-mode:vertical-rl] hover:shadow-xl md:hidden dark:text-white ${
          show ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        id="right-menu-button"
        style={{
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
        }}
      >
        <svg
          width="32"
          height="28"
          viewBox="0 0 26 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 mx-2"
        >
          <circle
            cx="10.4288"
            cy="10.4288"
            r="10.4288"
            transform="matrix(-1 0 0 1 25.5234 0.422119)"
            fill="#292B8C"
          />
          <path
            d="M20.5332 11.22C20.5648 11.22 20.5954 11.2315 20.6191 11.2522L23.0371 13.3606C23.1273 13.4392 23.0713 13.5862 22.9512 13.5862H18.6436V14.802C18.6435 14.9074 18.56 14.9933 18.457 14.9934H11.8779C11.7749 14.9934 11.6915 14.9075 11.6914 14.802V13.5862H7.38477C7.26464 13.5862 7.20864 13.4392 7.29883 13.3606L9.7168 11.2522C9.74052 11.2315 9.77114 11.22 9.80273 11.22H20.5332ZM18.5557 5.36157C18.6258 5.36157 18.6825 5.43722 18.6826 5.53052V7.45923H20.5479C20.5795 7.45923 20.61 7.47074 20.6338 7.49146L23.0527 9.59985C23.1427 9.67847 23.0868 9.82532 22.9668 9.82544H7.39941C7.27951 9.82525 7.22357 9.67847 7.31348 9.59985L9.73242 7.49146C9.75621 7.47072 9.78667 7.45923 9.81836 7.45923H11.7383V5.67993C11.7385 5.57751 11.7953 5.49464 11.8652 5.49438H14.2812C14.3513 5.4945 14.408 5.57743 14.4082 5.67993V7.45923H16.0127V5.53052C16.0128 5.43722 16.0705 5.36157 16.1406 5.36157H18.5557Z"
            fill="white"
          />
          <path
            d="M2.48613 0L2.48613 4.83081L0.53932 10.6846L2.48613 16.5953L2.48613 21.4261L0 13.3558L0 8.12713L2.48613 0Z"
            fill="#292B8C"
          />
        </svg>
      </button>

      {/* Overlay - mobile only */}
      {show && (
        <div
          className="menu-overlay-active fixed z-40 bg-black/60 md:hidden"
          style={{ top: "3.5rem", bottom: 0, left: 0, right: 0 }}
          onClick={() => setShow(false)}
        />
      )}

      {/* Right-side menu */}
      <div
        className={`custom-scrollbar dark:border-secondary shadow-[ -60px_0_120px_40px_rgba(10,0,40,0.85) ] fixed right-0 z-40 w-[90vw] max-w-sm overflow-y-auto rounded-tl-[2.5rem] border-l-2 border-[#CDCDE9] bg-[#f5f3fb] pb-6 transition-transform duration-300 ease-in-out md:overflow-visible lg:max-h-[83rem] lg:min-h-[83rem] xl:max-h-full dark:bg-[#12002a] ${show ? "translate-x-0" : "translate-x-full"} md:static md:top-2 md:z-0 md:h-auto md:w-auto md:max-w-none md:translate-x-0 md:border-2 md:pb-0 md:shadow-none 2xl:max-w-[620px]`}
        style={{ top: "3.5rem", bottom: 0, height: "auto" }}
      >
        <div
          className={`dark:border-secondary flex items-center justify-between rounded-tr-4xl border-b-2 border-[#CDCDE9] px-6 py-3 text-4xl`}
        >
          <h1>TOKANO</h1>
          <button
            onClick={() => setShow(false)}
            className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 md:hidden dark:text-white"
          >
            ✕
          </button>
        </div>
        <GlobalData />
        <div className="dark:border-secondary w-full border-y-2 border-[#CDCDE9] py-2 pl-4 text-3xl">
          TOKANO
        </div>
        <div className="px-2 xl:px-4 2xl:px-6">
          <TokanoBalance />
        </div>
        {/* <div className="mx-2"> */}
        {/* <div className="p-4 border-2 border-secondary mx-6">Details</div>
          <DataStat /> */}
        {/* </div> */}
        <div className="px-2 xl:px-4 2xl:px-6">
          <Details />
        </div>
        {/* Staking Positions List */}
        <div className="dark:border-secondary border-t-1 border-[#CDCDE9] py-2 pl-14 text-2xl lg:text-xl xl:text-2xl">
          TOKANO
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
