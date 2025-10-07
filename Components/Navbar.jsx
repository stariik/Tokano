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
    {
      name: "HOME",
      href: "/",
      icon: (isActive) => (
        <svg width="28" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14.5316" cy="14.5316" r="14.5316" transform="matrix(-1 0 0 1 31.9805 2.29785)" stroke={isActive ? "white" : "#887FD4"} strokeWidth="4" strokeLinecap="round"/>
          <path d="M25.1423 17.3886C25.1092 17.3597 25.0665 17.3438 25.0224 17.3438H10.0711C10.0269 17.3438 9.98427 17.3597 9.95112 17.3886L6.58119 20.3268C6.45552 20.4363 6.53373 20.6417 6.70112 20.6417H28.3923C28.5597 20.6417 28.6379 20.4363 28.5122 20.3268L25.1423 17.3886Z" fill={isActive ? "white" : "#887FD4"}/>
          <path d="M25.1696 12.1488C25.1365 12.1199 25.0939 12.104 25.0497 12.104H10.0984C10.0543 12.104 10.0116 12.1199 9.97847 12.1488L6.60853 15.087C6.48286 15.1966 6.56107 15.402 6.72846 15.402H28.4196C28.587 15.402 28.6652 15.1966 28.5396 15.087L25.1696 12.1488Z" fill={isActive ? "white" : "#887FD4"}/>
          <path d="M22.3945 9.38602C22.3945 9.28501 22.3154 9.20312 22.2179 9.20312H18.861C18.7634 9.20312 18.6843 9.28501 18.6843 9.38602V11.9059C18.6843 12.0069 18.7634 12.0888 18.861 12.0888H22.2179C22.3154 12.0888 22.3945 12.0069 22.3945 11.9059V9.38602Z" fill={isActive ? "white" : "#887FD4"}/>
          <path d="M16.5195 9.50419C16.5195 9.40317 16.4382 9.32129 16.3379 9.32129H12.8879C12.7876 9.32129 12.7063 9.40317 12.7063 9.50419V12.0241C12.7063 12.1251 12.7876 12.207 12.8879 12.207H16.3379C16.4382 12.207 16.5195 12.1251 16.5195 12.0241V9.50419Z" fill={isActive ? "white" : "#887FD4"}/>
          <path d="M22.3945 19.4661C22.3945 19.319 22.278 19.1997 22.1343 19.1997H12.967C12.8233 19.1997 12.7068 19.319 12.7068 19.4661V22.3344C12.7068 22.4815 12.8233 22.6007 12.967 22.6007H22.1343C22.278 22.6007 22.3945 22.4815 22.3945 22.3344V19.4661Z" fill={isActive ? "white" : "#887FD4"}/>
        </svg>
      )
    },
    {
      name: "STAKENOMICS",
      href: "/stakenomics",
      icon: (isActive) => (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_stakenomics" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
            <circle cx="13.9937" cy="14.1064" r="13.3891" transform="rotate(90 13.9937 14.1064)" fill="#292B8C"/>
          </mask>
          <g mask="url(#mask0_stakenomics)">
            <circle cx="13.8648" cy="14.1064" r="13.3891" transform="rotate(90 13.8648 14.1064)" fill={isActive ? "white" : "#887FD4"}/>
            <g transform="translate(6, 5.5)">
              <path d="M2.41684 14.0123C1.45959 13.4612 0.684666 12.119 0.685988 11.0144L0.692534 5.54656L7.26468 9.33051L7.25574 16.7984L2.41684 14.0123Z" fill="#292B8C"/>
              <path d="M15.3585 11.0649C15.3611 12.1695 14.5878 13.5127 13.6312 14.0649L8.89593 16.7989L8.87778 9.21526L15.3451 5.48133L15.3585 11.0649Z" fill="#292B8C"/>
              <path d="M6.32233 1.34191C7.27693 0.78619 8.82678 0.78248 9.78403 1.33362L14.5226 4.06187L7.96864 7.87725L1.49683 4.15107L6.32233 1.34191Z" fill="#292B8C"/>
            </g>
          </g>
        </svg>
      )
    },
    {
      name: "PORTFOLIO",
      href: "/portfolio",
      icon: (isActive) => (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_portfolio" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
            <circle cx="14.0445" cy="14.1059" r="13.3891" transform="rotate(90 14.0445 14.1059)" fill="#292B8C"/>
          </mask>
          <g mask="url(#mask0_portfolio)">
            <circle cx="13.9156" cy="14.1059" r="13.3891" transform="rotate(90 13.9156 14.1059)" fill={isActive ? "white" : "#887FD4"}/>
            <path d="M9.00781 8.96216L19.8672 8.96216C20.6956 8.96216 21.3672 9.63373 21.3672 10.4622L21.3672 18.6301C21.3672 19.4586 20.6956 20.1301 19.8672 20.1301L9.00781 20.1301C8.17938 20.1301 7.50781 19.4586 7.50781 18.6301L7.50781 10.4622C7.50781 9.63373 8.17939 8.96216 9.00781 8.96216Z" fill="#292B8C" stroke={isActive ? "white" : "#887FD4"}/>
            <path d="M11.8984 7.32251L16.6953 7.32251C17.2475 7.32266 17.6953 7.77032 17.6953 8.32251L17.6953 11.5862C17.6953 12.1384 17.2475 12.586 16.6953 12.5862L11.8984 12.5862C11.3462 12.5862 10.8984 12.1385 10.8984 11.5862L10.8984 8.32251C10.8984 7.77023 11.3462 7.32251 11.8984 7.32251Z" stroke="#292B8C" strokeWidth="2"/>
            <path d="M6.81348 12.2578L17.2187 12.2578C17.8319 12.2578 18.3834 12.631 18.6113 13.2002L20.4336 17.7549C20.8278 18.7402 20.1022 19.8125 19.041 19.8125L8.63574 19.8125C8.02241 19.8125 7.47097 19.4386 7.24316 18.8691L5.4209 14.3154C5.02674 13.3302 5.75231 12.2579 6.81348 12.2578Z" fill="#292B8C" stroke={isActive ? "white" : "#887FD4"}/>
          </g>
        </svg>
      )
    },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  const getNavigationStyle = (href) => {
    return `transition cursor-pointer ${
      isActive(href) ? "text-[#ffb224]" : "hover:text-[#ffb224]"
    }`;
  };

  const getMobileNavigationStyle = (href) => {
    return `flex flex-col items-center gap-1 transition cursor-pointer ${
      isActive(href) ? "text-white" : "text-[#887FD4] hover:text-white"
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
              className={getMobileNavigationStyle(item.href)}
            >
              {item.icon(isActive(item.href))}
              <span className="text-xs">{item.name}</span>
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
