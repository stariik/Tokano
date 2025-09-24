"use client";
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import useStakingClient from '../../Components/StakingCard/StakingClient';
import TokenSelector from '../../Components/StakingCard/TokenSelector';

function TestPageContent() {
  const { publicKey } = useWallet();

  const [logs, setLogs] = useState([]);
  const [tokenAccounts, setTokenAccounts] = useState([]);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loadingUserAccounts, setLoadingUserAccounts] = useState(false);

  // Form states
  const [poolParams, setPoolParams] = useState({
    tokenMint: '',
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

  const stakingClient = useStakingClient({ onLog: addLog });

  const fetchTokenAccounts = useCallback(async () => {
    if (!publicKey || !stakingClient.getUserTokenAccounts) return;

    setLoadingTokens(true);
    try {
      const accounts = await stakingClient.getUserTokenAccounts();
      setTokenAccounts(accounts);
    } catch (error) {
      console.error('Error fetching token accounts:', error);
    } finally {
      setLoadingTokens(false);
    }
  }, [publicKey, stakingClient]);

  const fetchUserAccounts = useCallback(async () => {
    if (!publicKey || !stakingClient.getAllUserStates) return;

    setLoadingUserAccounts(true);
    try {
      const allUserStates = await stakingClient.getAllUserStates();
      // Filter to show only accounts for the connected wallet
      const myUserStates = allUserStates.filter(
        userState => userState.account.stakerUser.toString() === publicKey.toString()
      );
      setUserAccounts(myUserStates);
    } catch (error) {
      console.error('Error fetching user accounts:', error);
    } finally {
      setLoadingUserAccounts(false);
    }
  }, [publicKey, stakingClient]);

  // Fetch accounts when wallet connects - only depend on publicKey
  useEffect(() => {
    if (!publicKey) return;

    const fetchData = async () => {
      // Fetch token accounts
      setLoadingTokens(true);
      try {
        const accounts = await stakingClient.getUserTokenAccounts();
        setTokenAccounts(accounts);
      } catch (error) {
        console.error('Error fetching token accounts:', error);
      } finally {
        setLoadingTokens(false);
      }

      // Fetch user accounts
      setLoadingUserAccounts(true);
      try {
        const allUserStates = await stakingClient.getAllUserStates();
        const myUserStates = allUserStates.filter(
          userState => userState.account.stakerUser.toString() === publicKey.toString()
        );
        setUserAccounts(myUserStates);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
      } finally {
        setLoadingUserAccounts(false);
      }
    };

    fetchData();
  }, [publicKey]); // Only depend on publicKey

  const handleInitializePool = async () => {
    try {
      await stakingClient.initializePool(poolParams);
    } catch (error) {
      console.error("Pool initialization error:", error);
    }
  };

  const handleInitStake = async () => {
    try {
      await stakingClient.initStake(stakeParams.poolAddress);
      // Refresh user accounts after successful init
      fetchUserAccounts();
    } catch (error) {
      console.error("Stake initialization error:", error);
    }
  };

  const handleStake = async () => {
    try {
      await stakingClient.stake(stakeParams);
      // Refresh user accounts after successful stake
      fetchUserAccounts();
    } catch (error) {
      console.error("Staking error:", error);
    }
  };

  const handleStakeWithInit = async () => {
    try {
      await stakingClient.stakeWithInit(stakeParams);
      // Refresh user accounts after successful combined stake
      fetchUserAccounts();
    } catch (error) {
      console.error("Stake with init error:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await stakingClient.withdraw(withdrawParams);
    } catch (error) {
      console.error("Withdrawal error:", error);
    }
  };

  const handleGetReward = async () => {
    try {
      await stakingClient.getReward(stakeParams.poolAddress);
    } catch (error) {
      console.error("Reward claiming error:", error);
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
            <TokenSelector
              label="Token (for staking and rewards)"
              tokenAccounts={tokenAccounts}
              selectedToken={poolParams.tokenMint}
              onTokenChange={(tokenMint) => setPoolParams(prev => ({ ...prev, tokenMint }))}
              loading={loadingTokens}
              onRefresh={fetchTokenAccounts}
            />
            <div></div>
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
            disabled={stakingClient.loading || !publicKey}
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
                disabled={stakingClient.loading || !publicKey}
                className="w-full bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                1. Initialize Stake
              </button>
              <button
                onClick={handleStake}
                disabled={stakingClient.loading || !publicKey}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                2. Stake Tokens
              </button>
              <button
                onClick={handleStakeWithInit}
                disabled={stakingClient.loading || !publicKey}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                🚀 Init + Stake (Combined)
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
                disabled={stakingClient.loading || !publicKey}
                className="w-full bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Withdraw Tokens
              </button>
              <button
                onClick={handleGetReward}
                disabled={stakingClient.loading || !publicKey}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        </div>

        {/* User Accounts */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Staking Accounts</h2>
            <button
              onClick={fetchUserAccounts}
              disabled={loadingUserAccounts}
              className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              {loadingUserAccounts ? 'Loading...' : '↻ Refresh'}
            </button>
          </div>

          {loadingUserAccounts ? (
            <div className="text-center py-4">Loading user accounts...</div>
          ) : userAccounts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No staking accounts found. Start staking to see your accounts here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pool</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Staked Balance</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rewards</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Release Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userAccounts.map((userAccount, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-xs font-mono text-gray-900">
                        {userAccount.publicKey.toString().slice(0, 8)}...
                        {userAccount.publicKey.toString().slice(-8)}
                      </td>
                      <td className="px-3 py-2 text-xs font-mono text-gray-900">
                        {userAccount.account.poolAddress.toString().slice(0, 8)}...
                        {userAccount.account.poolAddress.toString().slice(-8)}
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-900">
                        {(userAccount.account.stakedTokenBalance / Math.pow(10, 9)).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-900">
                        {userAccount.account.rewards.toString()}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900">
                        {new Date(userAccount.account.releaseTime * 1000).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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