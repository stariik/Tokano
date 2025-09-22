"use client";
import { StakingClient } from "./StakingClient";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import useAnchorProvider from "../../hooks/useAnchorProvider";

export default function MyComponent() {
  const { provider, stakingProgram } = useAnchorProvider();
  const stakingClient = stakingProgram ? new StakingClient(stakingProgram) : null;

  const handleStake = async () => {
    console.log("handleStake!");
  };

  const handleListPools = async () => {
    if (!stakingClient || !provider?.publicKey) {
      console.error("Wallet not connected. Please connect your wallet first.");
      return;
    }

    console.log("handleListPools!");
    const pools = await stakingClient.loadPools();
    console.log(pools);
  };

  const handleListUserAccounts = async () => {
    if (!stakingClient || !provider?.publicKey) {
      console.error("Wallet not connected. Please connect your wallet first.");
      return;
    }
    
    console.log("handleListUserAccounts!");
    console.log("Wallet public key:", provider.publicKey.toString());
    const userAccounts = await stakingClient.loadUserAccounts(provider.publicKey);
    console.log(userAccounts);
  };

  return (
    <div className="flex gap-4">
      <button className="text-white p-4 border-2 rounded-2xl cursor-pointer" onClick={handleStake}>
        Stake
      </button>
      <button className="text-white p-4 border-2 rounded-2xl cursor-pointer" onClick={handleListPools}>
        List Pools
      </button>
      <button className="text-white p-4 border-2 rounded-2xl cursor-pointer" onClick={handleListUserAccounts}>
        List User Accounts
      </button>
    </div>
  );
}
