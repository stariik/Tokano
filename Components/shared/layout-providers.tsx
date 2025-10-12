"use client";

import React, { useMemo } from "react";
import { Adapter } from "@solana/wallet-adapter-base";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { RPC_ENDPOINT } from "@/lib/constants";
import { ThemeProvider } from "@/hooks/useTheme";

export default function LayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallets = useMemo<Adapter[]>(() => [new LedgerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider
        wallets={wallets}
        autoConnect={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
