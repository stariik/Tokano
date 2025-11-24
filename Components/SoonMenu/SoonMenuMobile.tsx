"use client";
import React, { useState, useEffect } from "react";
import LaunchingSoon from "@/Components/LaunchingSoon/LaunchingSoon";

function SoonMenuMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Swipe handlers for Soon menu (left side - swipe left to close)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    // Calculate drag offset (only allow dragging left, not right)
    const offset = currentTouch - touchStart;
    if (offset < 0) {
      setDragOffset(offset);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) {
      setDragOffset(0);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    if (isLeftSwipe) {
      setIsMobileMenuOpen(false);
    }
    setDragOffset(0);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
        className={`dark:border-secondary fixed bottom-22 left-0 z-70 flex flex-col items-center justify-center rounded-r-lg border-x-1 border-r-1 border-[#CDCDE9] bg-white px-2 py-1 text-sm font-bold text-[#190E79] shadow-2xl transition-all duration-300 ease-in-out [writing-mode:vertical-rl] hover:shadow-xl xl:hidden ${
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
          className="menu-overlay-active fixed z-50 bg-black/60 xl:hidden"
          style={{ top: 0, bottom: 0, left: 0, right: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`dark:bg-dark dark:border-secondary fixed top-0 left-0 z-50 flex w-[95vw] max-w-sm transform flex-col overflow-hidden rounded-tr-[2.5rem] border-r-2 border-[#CDCDE9] bg-[#f0f0f0] xl:hidden ${
          isDragging ? "" : "transition-transform duration-300 ease-in-out"
        } ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none -translate-x-full"
        }`}
        style={{
          borderTopRightRadius: "2.5rem",
          bottom: 0,
          height: "auto",
          transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="dark:border-secondary dark:bg-dark flex flex-shrink-0 items-center justify-between border-b border-[#CDCDE9] bg-[#f0f0f0] p-4">
          <h2 className="font-khand text-xl font-semibold">LAUNCHING SOON</h2>
          {/* <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl text-[#190E79] transition-colors hover:text-purple-400 dark:text-white"
              >
                ×
              </button> */}
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto pb-6">
          <LaunchingSoon isMobile={true} />
        </div>
      </div>
    </>
  );
}

export default SoonMenuMobile;
