"use client";

import React, { useMemo } from "react";
import { Adapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { RPC_ENDPOINT } from "@/lib/constants";
import { ThemeProvider } from "@/hooks/useTheme";
import TokanoSdkProvider from "@/contexts/tokano-sdk-context";
import BalancesProvider from "@/contexts/balances-context";
import { WalletConnectWalletAdapter } from "@walletconnect/solana-adapter";
import { TokensProvider } from "@/contexts/tokens-context";
import {
  PhantomWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export default function LayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallets = useMemo<Adapter[]>(
    () => [
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          // example WC app project ID
          projectId: "2d8e068fda3f4a1ec85a645ff29a4168",
          metadata: {
            name: "Tokano App",
            description: "Tokano App",
            url: "https://github.com/anza-xyz/wallet-adapter",
            icons: ["https://avatars.githubusercontent.com/u/35608259?s=200"],
          },
        },
      }),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider
        wallets={wallets}
        autoConnect={false}
      >
        <TokensProvider>
          <BalancesProvider>
            <TokanoSdkProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </TokanoSdkProvider>
          </BalancesProvider>
        </TokensProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
