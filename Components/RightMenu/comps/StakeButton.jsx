import React from "react";

function StakeButton() {
  return (
    <div className="flex items-center">
      <button
        className="
          flex items-center gap-1 sm:gap-2
          pr-2 pl-1 py-1
          sm:pr-4 sm:pl-2 sm:py-2
          rounded-full
          border-2 sm:border-4 border-white
          cursor-pointer justify-end
          transition-all duration-200
          text-xs sm:text-base md:text-xl
          min-w-[80px] sm:min-w-[120px] md:min-w-[160px]
        "
        style={{
          background: "linear-gradient(90deg, #003c2f 0%, #00c6c6 100%)",
          boxShadow: "0 2px 8px 0 #0002",
        }}
      >
        <span
          className="
          flex items-center justify-center
          w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9
          bg-white rounded-full
          transition-all duration-200
        "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          >
            <path
              d="M15.3485 29.6212C7.1977 29.9057 0.363438 23.6389 0.0837107 15.624C-0.196016 7.60907 6.18472 0.881087 14.3355 0.596618C22.4862 0.31215 29.3205 6.57892 29.6002 14.5938C29.88 22.6088 23.4992 29.3367 15.3485 29.6212Z"
              fill="white"
            />
            <text
              x="8"
              y="20"
              fontSize="18"
              fontWeight="bold"
              fill="#2d0a5c"
              fontFamily="monospace"
            >
              $
            </text>
          </svg>
        </span>
        <span
          className="
            text-white font-bold
            text-xs sm:text-base md:text-2xl
          "
          style={{ fontFamily: "inherit" }}
        >
          STAKE
        </span>
      </button>
    </div>
  );
}

export default StakeButton;
