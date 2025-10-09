"use client";
import React, { useState, useEffect } from "react";
// import TokenCard from "./TokenCard";
import Lock from "./TokenCards/Lock";
import GridFilter from "./GridFilter";
import { tokens } from "@/data/data";
import Vest from "./TokenCards/Vest";
import Soon from "./TokenCards/Soon";
import Stake from "./TokenCards/Stake";

function TokenGrid({ gridCols = "grid-cols-2", hideOnMobile = true, filterVariant = "default" }) {
  const [show, setShow] = useState(false);
  const visibilityClass = hideOnMobile ? "hidden lg:block" : "block";

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (show && hideOnMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show, hideOnMobile]);

  const tokenContentDesktop = (
    <>
      <GridFilter variant={filterVariant} />
      <div
        className="overflow-y-auto text-[#190E79] dark:text-white custom-scrollbar m-4"
        style={{ maxHeight: "100vh", minHeight: "400px" }}
      >
        <div className={`grid gap-3 ${gridCols}`}>
          {tokens.map((token, idx) => (
            <React.Fragment key={idx}>
              <Stake
                token={{
                  image: token.image,
                  name: token.name,
                  mcap: token.mcap,
                  staked: token.staked,
                  stakedPercent: token.stakedPercent,
                  frozen: token.frozen,
                  frozenPercent: token.frozenPercent,
                  stakers: token.stakers,
                  timeLeft: token.timeLeft,
                  percent: token.percent,
                }}
              />
              <Soon
                token={{
                  image: token.image,
                  name: token.name,
                  mcap: token.mcap,
                  staked: token.staked,
                  stakedPercent: token.stakedPercent,
                  frozen: token.frozen,
                  frozenPercent: token.frozenPercent,
                  stakers: token.stakers,
                  timeLeft: token.timeLeft,
                  percent: token.percent,
                }}
              />
              <Lock
                token={{
                  image: token.image,
                  name: token.name,
                  mcap: token.mcap,
                  staked: token.staked,
                  stakedPercent: token.stakedPercent,
                  frozen: token.frozen,
                  frozenPercent: token.frozenPercent,
                  stakers: token.stakers,
                  timeLeft: token.timeLeft,
                  percent: token.percent,
                }}
              />
              <Vest
                token={{
                  image: token.image,
                  name: token.name,
                  mcap: token.mcap,
                  staked: token.staked,
                  stakedPercent: token.stakedPercent,
                  frozen: token.frozen,
                  frozenPercent: token.frozenPercent,
                  stakers: token.stakers,
                  timeLeft: token.timeLeft,
                  percent: token.percent,
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );

  const tokenContentMobile = (
    <div className={`grid gap-3 ${gridCols} p-2`}>
      {tokens.map((token, idx) => (
        <React.Fragment key={idx}>
          <Stake
            token={{
              image: token.image,
              name: token.name,
              mcap: token.mcap,
              staked: token.staked,
              stakedPercent: token.stakedPercent,
              frozen: token.frozen,
              frozenPercent: token.frozenPercent,
              stakers: token.stakers,
              timeLeft: token.timeLeft,
              percent: token.percent,
            }}
          />
          <Soon
            token={{
              image: token.image,
              name: token.name,
              mcap: token.mcap,
              staked: token.staked,
              stakedPercent: token.stakedPercent,
              frozen: token.frozen,
              frozenPercent: token.frozenPercent,
              stakers: token.stakers,
              timeLeft: token.timeLeft,
              percent: token.percent,
            }}
          />
          <Lock
            token={{
              image: token.image,
              name: token.name,
              mcap: token.mcap,
              staked: token.staked,
              stakedPercent: token.stakedPercent,
              frozen: token.frozen,
              frozenPercent: token.frozenPercent,
              stakers: token.stakers,
              timeLeft: token.timeLeft,
              percent: token.percent,
            }}
          />
          <Vest
            token={{
              image: token.image,
              name: token.name,
              mcap: token.mcap,
              staked: token.staked,
              stakedPercent: token.stakedPercent,
              frozen: token.frozen,
              frozenPercent: token.frozenPercent,
              stakers: token.stakers,
              timeLeft: token.timeLeft,
              percent: token.percent,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6 !important;
          border-radius: 2px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed !important;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none !important;
        }
        .custom-scrollbar {
          scrollbar-width: thin !important;
          scrollbar-color: #8b5cf6 transparent !important;
        }
      `}</style>

      {/* Mobile Menu Button - only show when hideOnMobile is true */}
      {hideOnMobile && (
        <button
          onClick={() => setShow(true)}
          className={`lg:hidden fixed bottom-10 left-0 z-70 bg-gradient-to-br from-purple-600 to-blue-600 text-[#190E79] dark:text-white px-4 py-2 rounded-r-full shadow-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 ease-in-out ${
            show ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          id="tokengrid-menu-button"
          style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)' }}
        >
          ☰ Tokens
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {hideOnMobile && show && (
        <div
          className="menu-overlay-active lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setShow(false)}
        >
          <div
            className="fixed top-0 left-0 h-screen w-[95vw] max-w-md bg-[#fafafa] dark:bg-[#13153A] transform transition-transform duration-300 ease-in-out rounded-tr-[2.5rem] rounded-br-[2.5rem] border-r-2 border-[#292B8C] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              borderTopRightRadius: "2.5rem",
              borderBottomRightRadius: "2.5rem",
            }}
          >
            <div className="flex justify-between items-center px-3 py-2 border-b border-[#292B8C] bg-[#fafafa] dark:bg-[#13153A] flex-shrink-0">
              <h2 className="text-xl font-semibold">TOKENS</h2>
              <button
                onClick={() => setShow(false)}
                className="text-[#190E79] dark:text-white hover:text-purple-400 transition-colors text-3xl"
              >
                ×
              </button>
            </div>
            <GridFilter variant={filterVariant} />
            <div className="flex-1 overflow-y-auto custom-scrollbar text-[#190E79] dark:text-white">
              {tokenContentMobile}
            </div>
          </div>
        </div>
      )}

      {/* Desktop view - always visible based on visibilityClass */}
      <div
        className={`bg-[#fafafa] dark:bg-[#13153A] rounded-2xl border border-[#292B8C] ${visibilityClass}`}
      >
        {tokenContentDesktop}
      </div>
    </>
  );
}

export default TokenGrid;
