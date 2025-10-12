"use client";
import { useMemo, useEffect, useState, createContext, useContext } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { TokanoStaking } from "../hooks/programs/staking/tokano_staking";
import idl from "../hooks/programs/staking/tokano_staking.json";

// Import default styles
require("@solana/wallet-adapter-react-ui/styles.css");

// Program ID from the IDL
const PROGRAM_ID = new PublicKey(idl.address);

// Connection to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Wallet Context Provider Component
export const WalletContextProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={[]}
        autoConnect={false}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Anchor/Web3 Utilities
export const getProgram = (wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  return new Program(idl, provider);
};

// Helper function to generate random seed
export const generateRandomSeed = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)));
};

// Helper function to generate extra seed
export const generateExtraSeed = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)));
};

// Derive pool state PDA
export const getPoolStatePDA = async (initializer, tokenMint, extraSeed) => {
  const [poolState, bump] = await PublicKey.findProgramAddress(
    [
      initializer.toBuffer(),
      tokenMint.toBuffer(),
      Buffer.from("pool"),
      Buffer.from(extraSeed),
    ],
    PROGRAM_ID,
  );
  return [poolState, bump];
};

// Derive user state PDA
export const getUserStatePDA = async (poolState, user, randomSeed) => {
  const [userState, bump] = await PublicKey.findProgramAddress(
    [poolState.toBuffer(), user.toBuffer(), Buffer.from(randomSeed)],
    PROGRAM_ID,
  );
  return [userState, bump];
};

// Derive pool tokens account PDA
export const getPoolTokensAccountPDA = async (
  initializer,
  tokenMint,
  extraSeed,
) => {
  const [poolTokensAccount, bump] = await PublicKey.findProgramAddress(
    [
      initializer.toBuffer(),
      tokenMint.toBuffer(),
      Buffer.from("pool_tokens"),
      Buffer.from(extraSeed),
    ],
    PROGRAM_ID,
  );
  return [poolTokensAccount, bump];
};

// Derive rewards account PDA
export const getRewardsAccountPDA = async (
  initializer,
  tokenMint,
  extraSeed,
) => {
  const [rewardsAccount, bump] = await PublicKey.findProgramAddress(
    [
      initializer.toBuffer(),
      tokenMint.toBuffer(),
      Buffer.from("reward_account"),
      Buffer.from(extraSeed),
    ],
    PROGRAM_ID,
  );
  return [rewardsAccount, bump];
};

export { PROGRAM_ID, connection };
