import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, BN, Idl, utils } from "@coral-xyz/anchor";
import idl from "./tokano_staking.json";
import { WalletContextState } from "@solana/wallet-adapter-react";

const PROGRAM_ID = new PublicKey("Hpx8uRMgs8PAcANE223eMf4okXRCrCm5UT2W4Nv3PXAH");

export class StakingClient {
  connection: Connection;
  wallet: WalletContextState;
  provider: AnchorProvider;
  program: Program;

  constructor(connection: Connection, wallet: WalletContextState) {
    this.connection = connection;
    this.wallet = wallet;
    this.provider = new AnchorProvider(connection, wallet as any, {
      preflightCommitment: "processed",
    });
    this.program = new Program(idl as Idl, this.provider);
  }

  // ----------------------
  // Transaction Methods
  // ----------------------

  async poolCreate(args: {
    reward: BN;
    rewardPeriod: BN;
    lockingPeriod: BN;
    startTime: BN;
    extraSeed: number[];
    tokenMint: PublicKey;
    rewardTokenMint: PublicKey;
    initializerRewardTokenAccount: PublicKey;
    platformWallet: PublicKey;
    platformSplAccount: PublicKey;
  }) {
    const tx = await this.program.methods
      .initializePool(
        args.reward,
        args.rewardPeriod,
        args.lockingPeriod,
        args.startTime,
        Buffer.from(args.extraSeed)
      )
      .accounts({
        tokenMint: args.tokenMint,
        rewardTokenMint: args.rewardTokenMint,
        initializerRewardTokenAccount: args.initializerRewardTokenAccount,
        platformWallet: args.platformWallet,
        platformSplAccount: args.platformSplAccount,
        initializer: this.wallet.publicKey,
      })
      .rpc();
    return tx;
  }

  async stake(poolState: PublicKey, userState: PublicKey, amount: BN, tokensFromAccount: PublicKey) {
    return this.program.methods
      .stake(amount)
      .accounts({
        poolState,
        userState,
        tokensFromAccount,
        signer: this.wallet.publicKey,
      })
      .rpc();
  }

  async unStake(poolState: PublicKey, userState: PublicKey, amount: BN, tokensToAccount: PublicKey) {
    return this.program.methods
      .withdraw(amount)
      .accounts({
        poolState,
        userState,
        tokensToAccount,
        signer: this.wallet.publicKey,
      })
      .rpc();
  }

  async getReward(poolState: PublicKey, userState: PublicKey, rewardsToAccount: PublicKey) {
    return this.program.methods
      .getReward()
      .accounts({
        poolState,
        userState,
        rewardsToAccount,
        signer: this.wallet.publicKey,
      })
      .rpc();
  }

  // ----------------------
  // Read Helpers
  // ----------------------

  async loadPools() {
    return this.program.account.poolState.all();
  }

  async loadUserAccounts(walletPubkey: PublicKey) {
    return this.program.account.userState.all([
      {
        memcmp: {
          offset: 8, // skip discriminator
          bytes: walletPubkey.toBase58(),
        },
      },
    ]);
  }
}
