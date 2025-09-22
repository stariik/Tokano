"use client";
import { WalletContextProvider } from '../../lib/web3';

export default function TestPageLayout({ children }) {
  return (
    <WalletContextProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </WalletContextProvider>
  );
}