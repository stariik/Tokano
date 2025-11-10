"use client";
import React, { useState, useEffect } from "react";
import GlobalDataRow from "./comps/GlobalDataRow";
import TokanoBalance from "./ui/TokanoBalance";
import Details from "./ui/Details";
import GlobalData from "./ui/GlobalData";

const TokanoHeader = () => (
  <svg
    width="170"
    height="30"
    viewBox="0 0 179 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M158.273 18.0971C158.273 19.75 158.618 21.2308 159.306 22.5393C160.018 23.8249 160.994 24.835 162.233 25.5697C163.473 26.3043 164.885 26.6716 166.469 26.6716C168.076 26.6716 169.488 26.3043 170.705 25.5697C171.944 24.835 172.908 23.8249 173.597 22.5393C174.309 21.2308 174.665 19.75 174.665 18.0971C174.665 16.4442 174.32 14.9749 173.632 13.6893C172.943 12.3808 171.979 11.3592 170.739 10.6245C169.522 9.88991 168.099 9.52259 166.469 9.52259C164.885 9.52259 163.473 9.88991 162.233 10.6245C160.994 11.3592 160.018 12.3808 159.306 13.6893C158.618 14.9749 158.273 16.4442 158.273 18.0971ZM153.969 18.0971C153.969 16.2835 154.279 14.6191 154.899 13.1039C155.518 11.5887 156.391 10.2802 157.516 9.17823C158.664 8.05333 159.995 7.18096 161.51 6.56111C163.048 5.94127 164.701 5.63135 166.469 5.63135C168.283 5.63135 169.947 5.94127 171.462 6.56111C172.977 7.18096 174.297 8.05333 175.422 9.17823C176.57 10.2802 177.454 11.5887 178.074 13.1039C178.694 14.6191 179.004 16.2835 179.004 18.0971C179.004 19.8878 178.694 21.5522 178.074 23.0903C177.454 24.6284 176.582 25.9599 175.457 27.0848C174.332 28.2097 173 29.0936 171.462 29.7364C169.947 30.3562 168.283 30.6662 166.469 30.6662C164.678 30.6662 163.014 30.3562 161.476 29.7364C159.938 29.0936 158.606 28.2097 157.481 27.0848C156.379 25.9599 155.518 24.6284 154.899 23.0903C154.279 21.5522 153.969 19.8878 153.969 18.0971Z"
      fill="#464B7E"
    />
    <path
      d="M146.8 6.04436H150.794V31.3547L133.198 13.9646V30.1494H129.203V4.83911L146.8 22.2292V6.04436Z"
      fill="#464B7E"
    />
    <path
      d="M109.112 23.9508L109.87 20.5072H121.061L121.853 23.9508H109.112ZM115.414 12.8625L111.626 21.7124L111.557 22.6078L108.217 30.1492H103.637L115.414 4.70117L127.191 30.1492H122.611L119.339 22.8144L119.236 21.8158L115.414 12.8625Z"
      fill="#464B7E"
    />
    <path
      d="M85.6875 6.0437H89.8542V30.1488H85.6875V6.0437ZM98.8075 6.0437H103.697L93.5389 17.3386L104.214 30.1488H99.2208L88.6145 17.4419L98.8075 6.0437Z"
      fill="#464B7E"
    />
    <path
      d="M61.8006 18.0971C61.8006 19.75 62.1449 21.2308 62.8336 22.5393C63.5453 23.8249 64.521 24.835 65.7607 25.5697C67.0004 26.3043 68.4122 26.6716 69.9963 26.6716C71.6033 26.6716 73.0152 26.3043 74.2319 25.5697C75.4716 24.835 76.4358 23.8249 77.1245 22.5393C77.8362 21.2308 78.192 19.75 78.192 18.0971C78.192 16.4442 77.8476 14.9749 77.1589 13.6893C76.4702 12.3808 75.506 11.3592 74.2663 10.6245C73.0496 9.88991 71.6262 9.52259 69.9963 9.52259C68.4122 9.52259 67.0004 9.88991 65.7607 10.6245C64.521 11.3592 63.5453 12.3808 62.8336 13.6893C62.1449 14.9749 61.8006 16.4442 61.8006 18.0971ZM57.4961 18.0971C57.4961 16.2835 57.806 14.6191 58.4259 13.1039C59.0457 11.5887 59.9181 10.2802 61.043 9.17823C62.1908 8.05333 63.5224 7.18096 65.0375 6.56111C66.5757 5.94127 68.2286 5.63135 69.9963 5.63135C71.8099 5.63135 73.4743 5.94127 74.9895 6.56111C76.5046 7.18096 77.8247 8.05333 78.9496 9.17823C80.0974 10.2802 80.9813 11.5887 81.6011 13.1039C82.221 14.6191 82.5309 16.2835 82.5309 18.0971C82.5309 19.8878 82.221 21.5522 81.6011 23.0903C80.9813 24.6284 80.1089 25.9599 78.984 27.0848C77.8591 28.2097 76.5276 29.0936 74.9895 29.7364C73.4743 30.3562 71.8099 30.6662 69.9963 30.6662C68.2056 30.6662 66.5412 30.3562 65.0031 29.7364C63.465 29.0936 62.1334 28.2097 61.0085 27.0848C59.9066 25.9599 59.0457 24.6284 58.4259 23.0903C57.806 21.5522 57.4961 19.8878 57.4961 18.0971Z"
      fill="#464B7E"
    />
    <path
      d="M41.6172 9.7972V6.0437H58.4218V9.7972H52.0512V30.1488H47.9534V9.7972H41.6172Z"
      fill="#464B7E"
    />
    <circle
      cx="15.191"
      cy="15.191"
      r="15.191"
      transform="matrix(-1 0 0 1 32.3828 2)"
      stroke="#464B7E"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M25.2405 17.7766C25.2058 17.7464 25.1612 17.7297 25.1151 17.7297H9.48529C9.43913 17.7297 9.39456 17.7464 9.35991 17.7766L5.83705 20.8481C5.70568 20.9627 5.78744 21.1773 5.96242 21.1773H28.638C28.8129 21.1773 28.8947 20.9627 28.7633 20.8481L25.2405 17.7766Z"
      fill="#464B7E"
    />
    <path
      d="M25.2678 12.2974C25.2332 12.2672 25.1886 12.2505 25.1424 12.2505H9.51263C9.46648 12.2505 9.42191 12.2672 9.38725 12.2974L5.86439 15.3689C5.73302 15.4834 5.81478 15.6981 5.98976 15.6981H28.6653C28.8403 15.6981 28.922 15.4834 28.7907 15.3689L25.2678 12.2974Z"
      fill="#464B7E"
    />
    <path
      d="M22.418 9.44277C22.418 9.30664 22.3351 9.19629 22.2328 9.19629H18.7142C18.6119 9.19629 18.529 9.30664 18.529 9.44277V12.8388C18.529 12.9749 18.6119 13.0852 18.7142 13.0852H22.2328C22.3351 13.0852 22.418 12.9749 22.418 12.8388V9.44277Z"
      fill="#464B7E"
    />
    <path
      d="M16.1953 9.6598C16.1953 9.51006 16.1124 9.38867 16.0101 9.38867H12.4915C12.3893 9.38867 12.3064 9.51006 12.3064 9.6598V13.3954C12.3064 13.5451 12.3893 13.6665 12.4915 13.6665H16.0101C16.1124 13.6665 16.1953 13.5451 16.1953 13.3954V9.6598Z"
      fill="#464B7E"
    />
    <path
      d="M22.3633 19.9479C22.3633 19.7941 22.2415 19.6694 22.0913 19.6694H12.5079C12.3577 19.6694 12.2359 19.7941 12.2359 19.9479V22.9463C12.2359 23.1001 12.3577 23.2248 12.5079 23.2248H22.0913C22.2415 23.2248 22.3633 23.1001 22.3633 22.9463V19.9479Z"
      fill="#464B7E"
    />
  </svg>
);

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
          className="mx-2 mr-1"
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
          {/* <h1>TOKANO</h1> */}
          <TokanoHeader />
          <button
            onClick={() => setShow(false)}
            className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 md:hidden dark:text-white"
          >
            ✕
          </button>
        </div>
        <GlobalData />
        <div className="dark:border-secondary w-full border-y-2 border-[#CDCDE9] py-2 pl-4">
          <TokanoHeader />
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
