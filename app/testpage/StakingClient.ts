import { PublicKey } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { TokanoStaking } from "../../hooks/programs/staking/tokano_staking";

export class StakingClient {
  program: Program<TokanoStaking>;

  constructor(program: Program<TokanoStaking>) {
    this.program = program;
  }

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
