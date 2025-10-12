"use client";
import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getMint,
} from "@solana/spl-token";
import { BN, Program } from "@coral-xyz/anchor";
import { TokanoStaking } from "../../hooks/programs/staking/tokano_staking";
import {
  getProgram,
  getUserStatePDA,
  getPoolTokensAccountPDA,
  getRewardsAccountPDA,
  generateRandomSeed,
  generateExtraSeed,
} from "../../lib/web3";

export interface StakingClientProps {
  onLog?: (message: string, type?: "info" | "success" | "error") => void;
}

export interface PoolParams {
  tokenMint: string;
  reward: string;
  rewardPeriodInSeconds: string;
  lockingPeriodForStakers: string;
  startTimeStamp: string;
}

export interface StakeParams {
  poolAddress: string;
  amount: string;
}

export default function useStakingClient({ onLog }: StakingClientProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const PLATFORM_WALLET = new PublicKey(
    "EvM5PDcJYoNqhpWubySbK3saRyELSieoM23Tf4B8CkSG",
  );

  const [loading, setLoading] = useState(false);

  const addLog = useCallback(
    (message: string, type: "info" | "success" | "error" = "info") => {
      if (onLog) {
        onLog(message, type);
      }
    },
    [onLog],
  );

  const initializePool = async (poolParams: PoolParams) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Initializing pool...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });

      const tokenMint = new PublicKey(poolParams.tokenMint);
      const rewardTokenMint = tokenMint; // Use same token for both staking and rewards
      const extraSeed = generateExtraSeed();

      const initializerRewardTokenAccount = await getAssociatedTokenAddress(
        rewardTokenMint,
        publicKey,
      );

      const platformSplAccount = await getAssociatedTokenAddress(
        tokenMint,
        PLATFORM_WALLET,
      );

      let accountInfo = await connection.getAccountInfo(platformSplAccount);
      if (!accountInfo) {
        addLog("Creating associated token account...", "info");
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            platformSplAccount,
            PLATFORM_WALLET,
            tokenMint,
          ),
        );
      }

      tx.add(
        await program.methods
          .initializePool(
            new BN(poolParams.reward),
            new BN(poolParams.rewardPeriodInSeconds),
            new BN(poolParams.lockingPeriodForStakers),
            new BN(poolParams.startTimeStamp),
            extraSeed,
          )
          .accounts({
            tokenMint: tokenMint,
            rewardTokenMint: rewardTokenMint,
            initializerRewardTokenAccount: initializerRewardTokenAccount,
            platformWallet: PLATFORM_WALLET,
            platformSplAccount: platformSplAccount,
            initializer: publicKey,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(`Pool initialized successfully! TX: ${txHash}`, "success");

      return txHash;
    } catch (error) {
      console.error("error:", error);
      addLog(`Error initializing pool: ${error}`, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const initStake = async (poolAddress: string) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Initializing stake...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(poolAddress);
      const randomSeed = generateRandomSeed();

      const [userState] = (await getUserStatePDA(
        poolState,
        publicKey,
        randomSeed,
      )) as [PublicKey, number];

      tx.add(
        await program.methods
          .initStake(randomSeed)
          .accounts({
            poolState,
            userState,
            stakerUser: publicKey,
            systemProgram: SystemProgram.programId,
            clock: SYSVAR_CLOCK_PUBKEY,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(`Stake initialized successfully! TX: ${txHash}`, "success");
      addLog(`User State: ${userState.toString()}`, "info");

      return { txHash, userState: userState.toString() };
    } catch (error: any) {
      addLog(`Error initializing stake: ${error.message}`, "error");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stake = async (stakeParams: StakeParams) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Staking tokens...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(stakeParams.poolAddress);

      const randomSeed = generateRandomSeed();
      const [userState] = (await getUserStatePDA(
        poolState,
        publicKey,
        randomSeed,
      )) as [PublicKey, number];

      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(poolState);
      const [poolTokensAccount] = (await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const tokensFromAccount = await getAssociatedTokenAddress(
        poolStateData.tokenMint,
        publicKey,
      );

      tx.add(
        await program.methods
          .stake(new BN(stakeParams.amount))
          .accounts({
            poolState,
            userState,
            poolTokensAccount,
            tokensFromAccount,
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            clock: SYSVAR_CLOCK_PUBKEY,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(`Tokens staked successfully! TX: ${txHash}`, "success");

      return txHash;
    } catch (error: any) {
      addLog(`Error staking: ${error.message}`, "error");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stakeWithInit = async (stakeParams: StakeParams) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Initializing and staking tokens...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(stakeParams.poolAddress);
      const randomSeed = generateRandomSeed();

      const [userState] = (await getUserStatePDA(
        poolState,
        publicKey,
        randomSeed,
      )) as [PublicKey, number];

      // First instruction: Initialize stake
      tx.add(
        await program.methods
          .initStake(randomSeed)
          .accountsPartial({
            poolState: poolState,
            userState: userState,
            stakerUser: publicKey,
          })
          .instruction(),
      );

      // Get pool state data for the stake instruction
      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(poolState);
      const [poolTokensAccount] = (await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const tokensFromAccount = await getAssociatedTokenAddress(
        poolStateData.tokenMint,
        publicKey,
      );

      // Second instruction: Stake tokens
      tx.add(
        await program.methods
          .stake(new BN(stakeParams.amount))
          .accounts({
            poolState,
            userState,
            poolTokensAccount,
            tokensFromAccount,
            signer: publicKey,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(
        `Stake initialized and tokens staked successfully! TX: ${txHash}`,
        "success",
      );
      addLog(`User State: ${userState.toString()}`, "info");

      return { txHash, userState: userState.toString() };
    } catch (error: any) {
      addLog(`Error initializing and staking: ${error.message}`, "error");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (withdrawParams: StakeParams) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Withdrawing tokens...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(withdrawParams.poolAddress);

      const randomSeed = generateRandomSeed();
      const [userState] = (await getUserStatePDA(
        poolState,
        publicKey,
        randomSeed,
      )) as [PublicKey, number];

      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(poolState);
      const [poolTokensAccount] = (await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const tokensToAccount = await getAssociatedTokenAddress(
        poolStateData.tokenMint,
        publicKey,
      );

      tx.add(
        await program.methods
          .withdraw(new BN(withdrawParams.amount))
          .accounts({
            poolState,
            userState,
            poolTokensAccount,
            tokensToAccount,
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            clock: SYSVAR_CLOCK_PUBKEY,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(`Tokens withdrawn successfully! TX: ${txHash}`, "success");

      return txHash;
    } catch (error: any) {
      addLog(`Error withdrawing: ${error.message}`, "error");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReward = async (poolAddress: string) => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      addLog("Claiming rewards...", "info");

      const tx = new Transaction();

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(poolAddress);

      const randomSeed = generateRandomSeed();
      const [userState] = (await getUserStatePDA(
        poolState,
        publicKey,
        randomSeed,
      )) as [PublicKey, number];

      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(poolState);
      const [rewardsAccount] = (await getRewardsAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const rewardsToAccount = await getAssociatedTokenAddress(
        poolStateData.rewardTokenMint,
        publicKey,
      );

      tx.add(
        await program.methods
          .getReward()
          .accounts({
            poolState,
            userState,
            rewardsAccount,
            rewardsToAccount,
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            clock: SYSVAR_CLOCK_PUBKEY,
          })
          .instruction(),
      );

      const txHash = await sendTransaction(tx, connection);
      addLog(`Rewards claimed successfully! TX: ${txHash}`, "success");

      return txHash;
    } catch (error: any) {
      addLog(`Error claiming rewards: ${error.message}`, "error");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Getter methods
  const getPoolState = async (poolAddress: string) => {
    try {
      addLog("Fetching pool state...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(poolAddress);

      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(poolState);
      addLog("Pool state fetched successfully", "success");

      return poolStateData;
    } catch (error: any) {
      addLog(`Error fetching pool state: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getUserState = async (
    poolAddress: string,
    userAddress: string,
    randomSeed: number[],
  ) => {
    try {
      addLog("Fetching user state...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(poolAddress);
      const user = new PublicKey(userAddress);

      const [userState] = (await getUserStatePDA(
        poolState,
        user,
        randomSeed,
      )) as [PublicKey, number];
      // @ts-ignore - IDL type compatibility
      const userStateData = await program.account.userState.fetch(userState);

      addLog("User state fetched successfully", "success");

      return {
        address: userState.toString(),
        data: userStateData,
      };
    } catch (error: any) {
      addLog(`Error fetching user state: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getAllPoolStates = async () => {
    try {
      addLog("Fetching all pool states...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      // @ts-ignore - IDL type compatibility
      const poolStates = await program.account.poolState.all();

      addLog(`Found ${poolStates.length} pool states`, "success");
      console.log("poolStates:", poolStates);
      return poolStates;
    } catch (error: any) {
      addLog(`Error fetching all pool states: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getAllUserStates = async () => {
    try {
      addLog("Fetching all user states...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      // @ts-ignore - IDL type compatibility
      const userStates = await program.account.userState.all();

      addLog(`Found ${userStates.length} user states`, "success");

      return userStates;
    } catch (error: any) {
      addLog(`Error fetching all user states: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getUserStatesForPool = async (poolAddress: string) => {
    try {
      addLog("Fetching user states for pool...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      const poolState = new PublicKey(poolAddress);

      // @ts-ignore - IDL type compatibility
      const userStates = await program.account.userState.all([
        {
          memcmp: {
            offset: 40, // pool_address field offset in UserState
            bytes: poolState.toBase58(),
          },
        },
      ]);

      addLog(`Found ${userStates.length} user states for pool`, "success");

      return userStates;
    } catch (error: any) {
      addLog(`Error fetching user states for pool: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getPoolTokenBalance = async (poolAddress: string) => {
    try {
      addLog("Fetching pool token balance...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(
        new PublicKey(poolAddress),
      );

      const [poolTokensAccount] = (await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const tokenAccountInfo =
        await connection.getAccountInfo(poolTokensAccount);
      if (!tokenAccountInfo) {
        throw new Error("Pool tokens account not found");
      }

      // Parse token account data to get balance
      const accountData =
        await connection.getTokenAccountBalance(poolTokensAccount);

      addLog(`Pool token balance: ${accountData.value.amount}`, "success");

      return {
        balance: accountData.value.amount,
        decimals: accountData.value.decimals,
        uiAmount: accountData.value.uiAmount,
      };
    } catch (error: any) {
      addLog(`Error fetching pool token balance: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getRewardsBalance = async (poolAddress: string) => {
    try {
      addLog("Fetching rewards balance...", "info");

      // @ts-ignore - IDL type compatibility
      const program = getProgram({
        publicKey,
        signTransaction: sendTransaction,
      });
      // @ts-ignore - IDL type compatibility
      const poolStateData = await program.account.poolState.fetch(
        new PublicKey(poolAddress),
      );

      const [rewardsAccount] = (await getRewardsAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed,
      )) as [PublicKey, number];

      const accountData =
        await connection.getTokenAccountBalance(rewardsAccount);

      addLog(`Rewards balance: ${accountData.value.amount}`, "success");

      return {
        balance: accountData.value.amount,
        decimals: accountData.value.decimals,
        uiAmount: accountData.value.uiAmount,
      };
    } catch (error: any) {
      addLog(`Error fetching rewards balance: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  const getUserTokenAccounts = async () => {
    if (!publicKey) {
      addLog("Please connect wallet first", "error");
      return [];
    }

    try {
      addLog("Fetching user token accounts...", "info");

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        },
      );

      const accounts = [];
      for (const tokenAccount of tokenAccounts.value) {
        const accountInfo = tokenAccount.account.data.parsed.info;
        const mint = accountInfo.mint;
        const balance = accountInfo.tokenAmount.uiAmount;

        // Only include accounts with balance > 0
        if (balance > 0) {
          try {
            // Try to get mint info for additional details
            const mintInfo = await getMint(connection, new PublicKey(mint));
            accounts.push({
              mint,
              balance,
              decimals: mintInfo.decimals,
              supply: mintInfo.supply.toString(),
              account: tokenAccount.pubkey.toString(),
            });
          } catch (mintError) {
            // If we can't get mint info, still include the account with basic info
            accounts.push({
              mint,
              balance,
              decimals: accountInfo.tokenAmount.decimals,
              supply: "Unknown",
              account: tokenAccount.pubkey.toString(),
            });
          }
        }
      }

      addLog(`Found ${accounts.length} token accounts with balance`, "success");
      return accounts;
    } catch (error: any) {
      addLog(`Error fetching token accounts: ${error.message}`, "error");
      console.error(error);
      throw error;
    }
  };

  return {
    loading,
    // Action methods
    initializePool,
    initStake,
    stake,
    stakeWithInit,
    withdraw,
    getReward,
    // Getter methods
    getPoolState,
    getUserState,
    getAllPoolStates,
    getAllUserStates,
    getUserStatesForPool,
    getPoolTokenBalance,
    getRewardsBalance,
    getUserTokenAccounts,
  };
}
