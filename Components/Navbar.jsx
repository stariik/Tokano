"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import usePhantom from "@/hooks/usePhantom"; // import the hook
import { useTheme } from "@/hooks/useTheme";
import WalletSelectionPopup from "./WalletSelectionPopup";

function Navbar() {
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navigationItems = [
    { name: "HOME", href: "/" },
    { name: "STAKENOMICS", href: "/stakenomics" },
    { name: "PORTFOLIO", href: "/portfolio" },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  const getNavigationStyle = (href) => {
    return `transition cursor-pointer ${
      isActive(href) ? "text-[#ffb224]" : "hover:text-[#ffb224]"
    }`;
  };

  const { publicKey, connectWallet, disconnectWallet } = usePhantom();

  const cycleTheme = () => {
    const themes = ["system", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    console.log("Changing theme from", theme, "to", nextTheme);
    setTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
      default:
        return "💻";
    }
  };

  const shortKey = publicKey
    ? publicKey.slice(0, 4) + "..." + publicKey.slice(-4)
    : null;

  const handleWalletButtonClick = () => {
    if (publicKey) {
      disconnectWallet();
    } else {
      setShowWalletPopup(true);
    }
  };

  const handleSelectWallet = (walletId) => {
    // For now, all wallets will use the same connect function
    // You can customize this later for different wallet types
    connectWallet(walletId);
  };

  return (
    <>
      {/* Top Section - Mobile Header */}
      <div className="w-full z-50 fixed top-0 bg-white dark:bg-dark text-black dark:text-light py-4 md:hidden border-b border-gray-200 dark:border-transparent">
        <div className="flex items-center justify-between px-4 md:justify-center md:gap-40">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="TOKANO Logo" width={32} height={32} />
            <h1 className="md:text-2xl text-xl font-bold">TOKANO</h1>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={cycleTheme}
              className="flex items-center gap-1 hover:opacity-70 transition cursor-pointer text-xs border border-gray-400 dark:border-gray-500 rounded-lg px-2 py-1"
              title={`Current: ${theme} mode. Click to change`}
            >
              <span className="text-base">{getThemeIcon()}</span>
              <span className="capitalize">{theme}</span>
            </button>
            <button
              onClick={handleWalletButtonClick}
              className="hover:opacity-70 transition cursor-pointer text-sm"
            >
              {publicKey ? shortKey : "CONNECT"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Section - Desktop */}
      <div className="hidden md:grid grid-cols-3 items-center bg-white dark:bg-dark text-black dark:text-light py-10 border-b border-gray-200 dark:border-transparent">
        <div className="flex items-center gap-2 justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="TOKANO Logo" width={32} height={32} />
            <h1 className="md:text-2xl text-xl font-bold">TOKANO</h1>
          </Link>
        </div>

        <div className="flex md:gap-8 gap-4 justify-center md:text-xl text-md font-medium">
          {navigationItems
            .filter((item) => item.name !== "HOME")
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={getNavigationStyle(item.href)}
              >
                {item.name}
              </Link>
            ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleWalletButtonClick}
            className="hover:opacity-70 transition cursor-pointer"
          >
            {publicKey ? shortKey : "CONNECT WALLET"}
          </button>
          <button
            onClick={cycleTheme}
            className="flex items-center gap-2 hover:opacity-70 transition cursor-pointer text-sm border border-secondary rounded-lg ml-12 px-3 py-2"
            title={`Current: ${theme} mode. Click to change`}
          >
            <span className="text-xl">{getThemeIcon()}</span>
            <span className="capitalize">{theme}</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div
        className="md:hidden fixed bottom-0 w-full text-light py-3 z-50"
        style={{
          background:
            "linear-gradient(90deg, #292B8C 0%, #2A2B8D 99.99%, rgba(78, 52, 222, 0) 100%)",
        }}
      >
        <div className="flex justify-around items-center text-sm">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={getNavigationStyle(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Wallet Selection Popup */}
      <WalletSelectionPopup
        isOpen={showWalletPopup}
        onClose={() => setShowWalletPopup(false)}
        onSelectWallet={handleSelectWallet}
      />
    </>
  );
}

export default Navbar;
