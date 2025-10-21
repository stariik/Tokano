"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useEffect, useState } from "react";
import { LockState } from "tokano-sdk";
import CreateLock from "@/Components/lock/create-lock";
import ClaimLock from "@/Components/lock/claim-lock";
import { TokenInfo, useTokens } from "@/contexts/tokens-context";

interface LockStateWithTokenInfo extends LockState {
  tokenInfo?: TokenInfo;
}

export default function LockTestPage() {
  const { publicKey } = useWallet();
  const { lock } = useTokano();
  const { fetchTokenInfo } = useTokens();

  const [lockedAccounts, setLockedAccounts] = useState<
    LockStateWithTokenInfo[]
  >([]);
  const [userCreatedLockAccounts, setUserCreatedLockAccounts] = useState<
    LockStateWithTokenInfo[]
  >([]);

  const fetchLockedAccounts = useCallback(async () => {
    if (!publicKey || !lock) return;
    const accounts = await lock.fetchUserLocks(publicKey);
    console.log("Locked Accounts", accounts);
    const mints = accounts.map((acc) => acc.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedAccounts = accounts.map((account) => ({
      ...account,
      tokenInfo: tokenInfos[account.tokenMint.toBase58()],
    }));
    setLockedAccounts(enrichedAccounts);
  }, [publicKey, lock, fetchTokenInfo]);

  const fetchUserCreatedLockAccounts = useCallback(async () => {
    if (!publicKey || !lock) return;
    const accounts = await lock.fetchUserCreatedLocks(publicKey);
    console.log("User Created Lock Accounts", accounts);
    const mints = accounts.map((acc) => acc.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedAccounts = accounts.map((account) => ({
      ...account,
      tokenInfo: tokenInfos[account.tokenMint.toBase58()],
    }));
    setUserCreatedLockAccounts(enrichedAccounts);
  }, [publicKey, lock, fetchTokenInfo]);

  useEffect(() => {
    if (publicKey && lock) {
      fetchLockedAccounts();
      fetchUserCreatedLockAccounts();
    }
  }, [publicKey, lock, fetchLockedAccounts, fetchUserCreatedLockAccounts]);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Lock Dashboard</h1>

      <CreateLock onLockCreated={fetchUserCreatedLockAccounts} />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Locked Accounts</h2>
            <button
              onClick={fetchLockedAccounts}
              className="btn btn-secondary btn-sm"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {lockedAccounts.length > 0 ? (
              lockedAccounts.map((account, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-gray-800 p-4 text-sm"
                >
                  {account.tokenInfo && (
                    <div className="mb-2 flex items-center gap-2">
                      <img
                        src={account.tokenInfo.icon}
                        alt={account.tokenInfo.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-bold">
                        {account.tokenInfo.name} ({account.tokenInfo.symbol})
                      </span>
                    </div>
                  )}
                  <p className="font-mono">
                    Address: {account.address.toBase58()}
                  </p>
                  <p className="font-mono">
                    Mint: {account.tokenMint.toBase58()}
                  </p>
                  <p>Lock Amount: {account.lockAmount.toString()}</p>
                  <p>Start: {account.startTime.toLocaleString()}</p>
                  <p>End: {account.endTime.toLocaleString()}</p>
                  {new Date() > account.endTime && (
                    <ClaimLock
                      lockAccountAddress={account.address}
                      onLockClaimed={fetchLockedAccounts}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No locked accounts found.</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Created Locks</h2>
            <button
              onClick={fetchUserCreatedLockAccounts}
              className="btn btn-secondary btn-sm"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {userCreatedLockAccounts.length > 0 ? (
              userCreatedLockAccounts.map((account, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-gray-800 p-4 text-sm"
                >
                  {account.tokenInfo && (
                    <div className="mb-2 flex items-center gap-2">
                      <img
                        src={account.tokenInfo.icon}
                        alt={account.tokenInfo.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-bold">
                        {account.tokenInfo.name} ({account.tokenInfo.symbol})
                      </span>
                    </div>
                  )}
                  <p className="font-mono">
                    Address: {account.address.toBase58()}
                  </p>
                  <p className="font-mono">
                    Receiver: {account.receiverUser.toBase58()}
                  </p>
                  <p className="font-mono">
                    Mint: {account.tokenMint.toBase58()}
                  </p>
                  <p>Lock Amount: {account.lockAmount.toString()}</p>
                  <p>Start: {account.startTime.toLocaleString()}</p>
                  <p>End: {account.endTime.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>You have not created any lock accounts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
