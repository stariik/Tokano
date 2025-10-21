"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { useCallback, useEffect, useState } from "react";
import { VestingState } from "tokano-sdk";
import CreateVesting from "@/Components/vesting/create-vesting";
import ClaimVesting from "@/Components/vesting/claim-vesting";
import { TokenInfo, useTokens } from "@/contexts/tokens-context";

interface VestingStateWithTokenInfo extends VestingState {
  tokenInfo?: TokenInfo;
}

export default function VestingTestPage() {
  const { publicKey } = useWallet();
  const { vesting } = useTokano();
  const { fetchTokenInfo } = useTokens();

  const [vestedAccounts, setVestedAccounts] = useState<
    VestingStateWithTokenInfo[]
  >([]);
  const [userCreatedVestingAccounts, setUserCreatedVestingAccounts] = useState<
    VestingStateWithTokenInfo[]
  >([]);

  const fetchVestedAccounts = useCallback(async () => {
    if (!publicKey || !vesting) return;
    const accounts = await vesting.fetchUserVestings(publicKey);
    console.log("Vested Accounts", accounts);
    const mints = accounts.map((acc) => acc.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedAccounts = accounts.map((account) => ({
      ...account,
      tokenInfo: tokenInfos[account.tokenMint.toBase58()],
    }));
    setVestedAccounts(enrichedAccounts);
  }, [publicKey, vesting, fetchTokenInfo]);

  const fetchUserCreatedVestingAccounts = useCallback(async () => {
    if (!publicKey || !vesting) return;
    const accounts = await vesting.fetchUserCreatedVestings(publicKey);
    console.log("User Created Vested Accounts", accounts);
    const mints = accounts.map((acc) => acc.tokenMint.toBase58());
    const tokenInfos = await fetchTokenInfo(mints);
    const enrichedAccounts = accounts.map((account) => ({
      ...account,
      tokenInfo: tokenInfos[account.tokenMint.toBase58()],
    }));
    setUserCreatedVestingAccounts(enrichedAccounts);
  }, [publicKey, vesting, fetchTokenInfo]);

  useEffect(() => {
    if (publicKey && vesting) {
      fetchVestedAccounts();
      fetchUserCreatedVestingAccounts();
    }
  }, [
    publicKey,
    vesting,
    fetchVestedAccounts,
    fetchUserCreatedVestingAccounts,
  ]);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Vesting Dashboard</h1>
      <CreateVesting onVestingCreated={fetchUserCreatedVestingAccounts} />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Vested Accounts</h2>
            <button
              onClick={fetchVestedAccounts}
              className="btn btn-secondary btn-sm"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {vestedAccounts.length > 0 ? (
              vestedAccounts.map((account, index) => (
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
                  <p>Total Vested: {account.totalVestedAmount.toString()}</p>
                  <p>Withdrawn: {account.totalWithdrawnAmount.toString()}</p>
                  <p>
                    Claimable: {account.currentlyClaimableAmount.toString()}
                  </p>
                  <p>Start: {account.startTime.toLocaleString()}</p>
                  <p>End: {account.endTime.toLocaleString()}</p>
                  <ClaimVesting
                    vestingAccountAddress={account.address}
                    onVestingClaimed={fetchVestedAccounts}
                  />
                </div>
              ))
            ) : (
              <p>No vested accounts found.</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Created Vestings</h2>
            <button
              onClick={fetchUserCreatedVestingAccounts}
              className="btn btn-secondary btn-sm"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {userCreatedVestingAccounts.length > 0 ? (
              userCreatedVestingAccounts.map((account, index) => (
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
                  <p>Total Vested: {account.totalVestedAmount.toString()}</p>
                  <p>Withdrawn: {account.totalWithdrawnAmount.toString()}</p>
                  <p>
                    Claimable: {account.currentlyClaimableAmount.toString()}
                  </p>
                  <p>Start: {account.startTime.toLocaleString()}</p>
                  <p>End: {account.endTime.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>You have not created any vesting accounts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
