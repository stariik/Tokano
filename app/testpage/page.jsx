"use client";
import { useState, useCallback, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, SystemProgram, Transaction, SYSVAR_CLOCK_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { BN } from '@coral-xyz/anchor';
import {
  getProgram,
  getPoolStatePDA,
  getUserStatePDA,
  getPoolTokensAccountPDA,
  getRewardsAccountPDA,
  generateRandomSeed,
  generateExtraSeed,
} from '../../lib/web3';

function TestPageContent() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const PLATFORM_WALLET = new PublicKey("EvM5PDcJYoNqhpWubySbK3saRyELSieoM23Tf4B8CkSG")

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  // Form states
  const [poolParams, setPoolParams] = useState({
    tokenMint: '',
    rewardTokenMint: '',
    reward: '',
    rewardPeriodInSeconds: '',
    lockingPeriodForStakers: '',
    startTimeStamp: '',
  });

  const [stakeParams, setStakeParams] = useState({
    poolAddress: '',
    amount: '',
  });

  const [withdrawParams, setWithdrawParams] = useState({
    poolAddress: '',
    amount: '',
  });

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
  }, []);

  const handleInitializePool = async () => {
    if (!publicKey) {
      addLog('Please connect wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      addLog('Initializing pool...', 'info');
      console.log('Initializing pool...');

      const program = getProgram({ publicKey, signTransaction: sendTransaction });

      const tokenMint = new PublicKey(poolParams.tokenMint);
      const rewardTokenMint = new PublicKey(poolParams.rewardTokenMint);
      const extraSeed = generateExtraSeed();

      // Get associated token accounts
      const initializerRewardTokenAccount = await getAssociatedTokenAddress(
        rewardTokenMint,
        publicKey
      );

      const tx = new Transaction();
      const platformSplAccount = await getAssociatedTokenAddress(
        tokenMint,
        PLATFORM_WALLET
      );
      let accountInfo = await connection.getAccountInfo(platformSplAccount);
      if (!accountInfo) {
        console.log('Associated Token Account does not exist, creating...');
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            platformSplAccount,
            PLATFORM_WALLET,
            tokenMint
          )
        );
      }

      tx.add(await program.methods
        .initializePool(
          new BN(poolParams.reward),
          new BN(poolParams.rewardPeriodInSeconds),
          new BN(poolParams.lockingPeriodForStakers),
          new BN(poolParams.startTimeStamp),
          extraSeed
        )
        .accounts({
          tokenMint: tokenMint,
          rewardTokenMint: rewardTokenMint,
          initializerRewardTokenAccount: initializerRewardTokenAccount,
          platformWallet: PLATFORM_WALLET,
          platformSplAccount: platformSplAccount,
          initializer: publicKey
        }).instruction());
      const txHash = await sendTransaction(tx, connection);
      console.log("txHash:", txHash);
    } catch (error) {
      console.error("error:", error);
      addLog(`Error initializing pool: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInitStake = async () => {
    if (!publicKey) {
      addLog('Please connect wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      addLog('Initializing stake...', 'info');

      const program = getProgram({ publicKey, signTransaction: sendTransaction });
      const poolState = new PublicKey(stakeParams.poolAddress);
      const randomSeed = generateRandomSeed();

      // Derive user state PDA
      const [userState] = await getUserStatePDA(poolState, publicKey, randomSeed);

      const tx = await program.methods
        .initStake(randomSeed)
        .accounts({
          poolState,
          userState,
          stakerUser: publicKey,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .rpc();

      addLog(`Stake initialized successfully! TX: ${tx}`, 'success');
      addLog(`User State: ${userState.toString()}`, 'info');

    } catch (error) {
      addLog(`Error initializing stake: ${error.message}`, 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (!publicKey) {
      addLog('Please connect wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      addLog('Staking tokens...', 'info');

      const program = getProgram({ publicKey, signTransaction: sendTransaction });
      const poolState = new PublicKey(stakeParams.poolAddress);

      // You'll need to get the user state address - this is simplified
      // In practice, you'd store this or derive it from known parameters
      const randomSeed = generateRandomSeed(); // This should be the same as used in initStake
      const [userState] = await getUserStatePDA(poolState, publicKey, randomSeed);

      // Get pool state data to derive other accounts
      const poolStateData = await program.account.poolState.fetch(poolState);
      const [poolTokensAccount] = await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed
      );

      // User's token account
      const tokensFromAccount = await getAssociatedTokenAddress(
        poolStateData.tokenMint,
        publicKey
      );

      const tx = await program.methods
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
        .rpc();

      addLog(`Tokens staked successfully! TX: ${tx}`, 'success');

    } catch (error) {
      addLog(`Error staking: ${error.message}`, 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!publicKey) {
      addLog('Please connect wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      addLog('Withdrawing tokens...', 'info');

      const program = getProgram({ publicKey, signTransaction: sendTransaction });
      const poolState = new PublicKey(withdrawParams.poolAddress);

      // Similar to stake, you'd need the correct user state
      const randomSeed = generateRandomSeed(); // This should be the correct one
      const [userState] = await getUserStatePDA(poolState, publicKey, randomSeed);

      const poolStateData = await program.account.poolState.fetch(poolState);
      const [poolTokensAccount] = await getPoolTokensAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed
      );

      const tokensToAccount = await getAssociatedTokenAddress(
        poolStateData.tokenMint,
        publicKey
      );

      const tx = await program.methods
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
        .rpc();

      addLog(`Tokens withdrawn successfully! TX: ${tx}`, 'success');

    } catch (error) {
      addLog(`Error withdrawing: ${error.message}`, 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetReward = async () => {
    if (!publicKey) {
      addLog('Please connect wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      addLog('Claiming rewards...', 'info');

      const program = getProgram({ publicKey, signTransaction: sendTransaction });
      const poolState = new PublicKey(stakeParams.poolAddress);

      const randomSeed = generateRandomSeed(); // This should be the correct one
      const [userState] = await getUserStatePDA(poolState, publicKey, randomSeed);

      const poolStateData = await program.account.poolState.fetch(poolState);
      const [rewardsAccount] = await getRewardsAccountPDA(
        poolStateData.initializer,
        poolStateData.tokenMint,
        poolStateData.extraSeed
      );

      const rewardsToAccount = await getAssociatedTokenAddress(
        poolStateData.rewardTokenMint,
        publicKey
      );

      const tx = await program.methods
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
        .rpc();

      addLog(`Rewards claimed successfully! TX: ${tx}`, 'success');

    } catch (error) {
      addLog(`Error claiming rewards: ${error.message}`, 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Tokano Staking Test Page</h1>

        {/* Wallet Connection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
          <WalletMultiButton />
          {publicKey && (
            <p className="mt-2 text-sm text-gray-600">
              Connected: {publicKey.toString()}
            </p>
          )}
        </div>

        {/* Initialize Pool */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Initialize Pool</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Token Mint Address"
              value={poolParams.tokenMint}
              onChange={(e) => setPoolParams(prev => ({ ...prev, tokenMint: e.target.value }))}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Reward Token Mint Address"
              value={poolParams.rewardTokenMint}
              onChange={(e) => setPoolParams(prev => ({ ...prev, rewardTokenMint: e.target.value }))}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Total Reward Amount"
              value={poolParams.reward}
              onChange={(e) => setPoolParams(prev => ({ ...prev, reward: e.target.value }))}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Reward Period (seconds)"
              value={poolParams.rewardPeriodInSeconds}
              onChange={(e) => setPoolParams(prev => ({ ...prev, rewardPeriodInSeconds: e.target.value }))}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Locking Period (seconds)"
              value={poolParams.lockingPeriodForStakers}
              onChange={(e) => setPoolParams(prev => ({ ...prev, lockingPeriodForStakers: e.target.value }))}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Start Timestamp"
              value={poolParams.startTimeStamp}
              onChange={(e) => setPoolParams(prev => ({ ...prev, startTimeStamp: e.target.value }))}
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            onClick={handleInitializePool}
            disabled={loading || !publicKey}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Initialize Pool
          </button>
        </div>

        {/* Staking Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stake */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Stake Tokens</h2>
            <input
              placeholder="Pool Address"
              value={stakeParams.poolAddress}
              onChange={(e) => setStakeParams(prev => ({ ...prev, poolAddress: e.target.value }))}
              className="border rounded px-3 py-2 w-full mb-3"
            />
            <input
              placeholder="Amount to Stake"
              value={stakeParams.amount}
              onChange={(e) => setStakeParams(prev => ({ ...prev, amount: e.target.value }))}
              className="border rounded px-3 py-2 w-full mb-3"
            />
            <div className="space-y-2">
              <button
                onClick={handleInitStake}
                disabled={loading || !publicKey}
                className="w-full bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                1. Initialize Stake
              </button>
              <button
                onClick={handleStake}
                disabled={loading || !publicKey}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                2. Stake Tokens
              </button>
            </div>
          </div>

          {/* Withdraw */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Withdraw/Claim</h2>
            <input
              placeholder="Pool Address"
              value={withdrawParams.poolAddress}
              onChange={(e) => setWithdrawParams(prev => ({ ...prev, poolAddress: e.target.value }))}
              className="border rounded px-3 py-2 w-full mb-3"
            />
            <input
              placeholder="Amount to Withdraw"
              value={withdrawParams.amount}
              onChange={(e) => setWithdrawParams(prev => ({ ...prev, amount: e.target.value }))}
              className="border rounded px-3 py-2 w-full mb-3"
            />
            <div className="space-y-2">
              <button
                onClick={handleWithdraw}
                disabled={loading || !publicKey}
                className="w-full bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Withdraw Tokens
              </button>
              <button
                onClick={handleGetReward}
                disabled={loading || !publicKey}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Logs</h2>
          <div className="h-64 overflow-y-auto border rounded p-3">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded text-sm ${
                  log.type === 'error'
                    ? 'bg-red-100 text-red-800'
                    : log.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                <span className="font-mono text-xs text-gray-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Loading...</h1>
        </div>
      </div>
    );
  }

  return <TestPageContent />;
}