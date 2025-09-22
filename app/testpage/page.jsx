"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { StakingClient } from "./StakingClient";
import { BN } from "@coral-xyz/anchor";

export default function MyComponent() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const stakingClient = new StakingClient(connection, wallet);

  const handleStake = async () => {
    const poolState = new PublicKey("POOL_STATE_PUBKEY");
    const userState = new PublicKey("USER_STATE_PUBKEY");
    const tokenAccount = new PublicKey("YOUR_ASSOCIATED_TOKEN_ACCOUNT");

    const tx = await stakingClient.stake(
      poolState,
      userState,
      new BN(1000),
      tokenAccount
    );
    console.log("Staked!", tx);
  };

  return <button  className="text-white p-4 border-2 rounded-2xl cursor-pointer" onClick={handleStake}>Stake</button>;
}
