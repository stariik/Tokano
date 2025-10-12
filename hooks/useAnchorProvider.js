import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "./programs/staking/tokano_staking.json";
import usePhantom from "./usePhantom";

export default function useAnchorProvider() {
  const { provider: phantomProvider, publicKey: walletPublicKey } =
    usePhantom();
  const [provider, setProvider] = useState(null);
  const [stakingProgram, setStakingProgram] = useState(null);

  useEffect(() => {
    if (!phantomProvider || !walletPublicKey) {
      setProvider(null);
      setStakingProgram(null);
      return;
    }

    const connection = new Connection(
      phantomProvider.rpcEndpoint || "https://api.devnet.solana.com",
      "confirmed",
    );

    // Wallet-like object for AnchorProvider
    const wallet = {
      publicKey: new PublicKey(walletPublicKey),
      signTransaction: phantomProvider.signTransaction?.bind(phantomProvider),
      signAllTransactions:
        phantomProvider.signAllTransactions?.bind(phantomProvider),
    };

    // Create AnchorProvider
    const anchorProvider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    setProvider(anchorProvider);

    const newStakingProgram = new Program(idl, anchorProvider);
    setStakingProgram(newStakingProgram);
  }, [phantomProvider, walletPublicKey]);

  return {
    provider,
    stakingProgram,
  };
}
