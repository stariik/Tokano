"use client";

import { useTokano } from "@/contexts/tokano-sdk-context";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { PoolState, UserState } from "tokano-sdk";
import { useBalances } from "@/contexts/balances-context";
import { toSmallestUnit, transactionListener } from "@/lib/balances";
import { NumericFormat, type NumberFormatValues } from "react-number-format";

interface CreateStakeProps {
  stakePools: PoolState[] | undefined;
  userStakedAccounts: UserState[] | undefined;
  onStakeCreated: () => void;
}

export default function CreateStake({
  stakePools,
  userStakedAccounts,
  onStakeCreated,
}: CreateStakeProps) {
  const { publicKey, signTransaction } = useWallet();
  const { staking } = useTokano();
  const { tokens } = useBalances();
  const { connection } = useConnection();

  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");
  const [amount, setAmount] = useState("");

  const selectedPool = stakePools?.find(
    (p) => p.poolAddress.toBase58() === selectedPoolAddress,
  );
  const userHasStakeInPool = userStakedAccounts?.find(
    (u) => u.poolAddress.toBase58() === selectedPoolAddress,
  );
  const availableToken = tokens.find(
    (t) => t.mintAddress === selectedPool?.tokenMint.toBase58(),
  );

  useEffect(() => {
    if (stakePools && stakePools.length > 0 && !selectedPoolAddress) {
      setSelectedPoolAddress(stakePools[0].poolAddress.toBase58());
    }
  }, [stakePools, selectedPoolAddress]);

  const handleStake = useCallback(async () => {
    if (!publicKey || !staking || !selectedPoolAddress || !selectedPool) {
      alert("Please connect your wallet and select a pool.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0 || !availableToken) {
      alert("Please enter a valid amount to stake.");
      return;
    }

    try {
      const amountInSmallestUnit = toSmallestUnit(
        amount,
        availableToken.decimals,
      );

      const tx = await staking.stake({
        walletPk: publicKey,
        poolAddress: selectedPool.poolAddress,
        amount: amountInSmallestUnit,
        userStakeAccount: userHasStakeInPool,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      console.log("Transaction sent: ", txId);

      // todo: transaction sent, we're waiting for the tx confirmation
      transactionListener(connection, txId, (completed) => {
        if (completed) {
          // todo: show transaction completed notification
          console.log("Transaction completed");
        } else {
          // todo: show transaction could not be completed notification
          console.log("Transaction failed");
        }
        onStakeCreated();
      });
    } catch (error) {
      // todo: show tx generation error
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    staking,
    selectedPoolAddress,
    amount,
    selectedPool,
    userHasStakeInPool,
    connection,
    signTransaction,
    onStakeCreated,
    availableToken,
  ]);

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Stake in a Pool</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <select
          value={selectedPoolAddress}
          onChange={(e) => setSelectedPoolAddress(e.target.value)}
          className="rounded border p-2 disabled:bg-gray-700 disabled:text-white"
          disabled={!stakePools}
        >
          {!stakePools ? (
            <option>Loading pools...</option>
          ) : stakePools.length === 0 ? (
            <option>No pools found</option>
          ) : (
            stakePools.map((pool) => (
              <option
                key={pool.poolAddress.toBase58()}
                value={pool.poolAddress.toBase58()}
              >
                {pool.poolAddress.toBase58().slice(0, 16)}...
              </option>
            ))
          )}
        </select>
        <div className="flex items-center">
          <NumericFormat
            placeholder="Amount to Stake"
            value={amount}
            onValueChange={(values: NumberFormatValues) =>
              setAmount(values.value)
            }
            valueIsNumericString={true}
            allowNegative={false}
            thousandSeparator=","
            decimalScale={availableToken?.decimals}
            className="w-full rounded border p-2"
            disabled={!selectedPool}
          />
          {availableToken && (
            <span className="ml-2 text-sm whitespace-nowrap text-gray-500">
              Max: {availableToken.amount}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleStake}
        disabled={!publicKey || !selectedPool || !amount}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {userHasStakeInPool ? "Add Stake" : "Stake"}
      </button>
    </div>
  );
}
