"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { useTokano } from "@/contexts/tokano-sdk-context";
import { VestingSchedule } from "tokano-sdk";
import { toSmallestUnit, transactionListener } from "@/lib/balances";
import { BalanceLoadState, useBalances } from "@/contexts/balances-context";
import { NumericFormat, type NumberFormatValues } from "react-number-format";

interface CreateVestingProps {
  onVestingCreated: () => void;
}

export const CreateVesting = ({ onVestingCreated }: CreateVestingProps) => {
  const { vesting } = useTokano();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const { tokens, loadState } = useBalances();

  const [receiverPk, setReceiverPk] = useState("");
  const [tokenMint, setTokenMint] = useState("");
  const [totalVestingAmount, setTotalVestingAmount] = useState("");
  const [startTimestamp, setStartTimestamp] = useState("");
  const [vestingDuration, setVestingDuration] = useState("");
  const [scheduleType, setScheduleType] = useState<VestingSchedule>(
    VestingSchedule.Secondly,
  );

  const selectedToken = tokens.find((t) => t.mintAddress === tokenMint);

  useEffect(() => {
    if (tokens.length > 0 && !tokenMint) {
      setTokenMint(tokens[0].mintAddress);
    }
  }, [tokens, tokenMint]);

  const handleCreateVesting = useCallback(async () => {
    if (
      !publicKey ||
      !receiverPk ||
      !tokenMint ||
      !totalVestingAmount ||
      !startTimestamp ||
      !vestingDuration ||
      !selectedToken
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!vesting) {
      alert("Vesting program not initialized.");
      return;
    }

    try {
      const amountInSmallestUnit = toSmallestUnit(
        totalVestingAmount,
        selectedToken.decimals,
      );

      const { tx } = await vesting.initializeVesting({
        walletPk: publicKey,
        receiverPk: new PublicKey(receiverPk),
        tokenMint: new PublicKey(tokenMint),
        totalVestingAmount: amountInSmallestUnit,
        startTimestamp: Math.floor(new Date(startTimestamp).getTime() / 1000),
        vestingDuration: parseInt(vestingDuration, 10),
        scheduleType,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signedTx = await signTransaction!(tx);
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
        onVestingCreated();
      });
    } catch (error) {
      console.error("Error generating transaction:", error);
    }
  }, [
    publicKey,
    receiverPk,
    tokenMint,
    totalVestingAmount,
    startTimestamp,
    vestingDuration,
    vesting,
    scheduleType,
    connection,
    signTransaction,
    onVestingCreated,
    selectedToken,
  ]);

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">
        Create New Vesting Schedule
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Receiver Public Key"
          value={receiverPk}
          onChange={(e) => setReceiverPk(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <select
          value={tokenMint}
          onChange={(e) => setTokenMint(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
          disabled={loadState !== BalanceLoadState.LOADED}
        >
          {loadState !== BalanceLoadState.LOADED ? (
            <option>Loading tokens...</option>
          ) : tokens.length === 0 ? (
            <option>No eligible tokens found</option>
          ) : (
            tokens.map((token) => (
              <option
                key={token.mintAddress}
                value={token.mintAddress}
              >
                {token.mintAddress.slice(0, 16)}...
              </option>
            ))
          )}
        </select>
        <div className="flex items-center">
          <NumericFormat
            placeholder="Total Vesting Amount"
            value={totalVestingAmount}
            onValueChange={(values: NumberFormatValues) =>
              setTotalVestingAmount(values.value)
            }
            valueIsNumericString={true}
            allowNegative={false}
            thousandSeparator=","
            decimalScale={selectedToken?.decimals}
            className="w-full rounded border-gray-600 bg-gray-800 p-2 text-white"
          />
          {selectedToken && (
            <span className="ml-2 text-sm whitespace-nowrap text-gray-500">
              Max: {selectedToken.amount}
            </span>
          )}
        </div>
        <input
          type="datetime-local"
          value={startTimestamp}
          onChange={(e) => setStartTimestamp(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <input
          type="number"
          placeholder="Vesting Duration (in seconds)"
          value={vestingDuration}
          onChange={(e) => setVestingDuration(e.target.value)}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        />
        <select
          value={scheduleType}
          onChange={(e) => setScheduleType(Number(e.target.value))}
          className="rounded border-gray-600 bg-gray-800 p-2 text-white"
        >
          <option value={VestingSchedule.Secondly}>Secondly</option>
          <option value={VestingSchedule.Minutely}>Minutely</option>
          <option value={VestingSchedule.Hourly}>Hourly</option>
          <option value={VestingSchedule.Daily}>Daily</option>
          <option value={VestingSchedule.Weekly}>Weekly</option>
          <option value={VestingSchedule.Monthly}>Monthly</option>
          <option value={VestingSchedule.Quarterly}>Quarterly</option>
          <option value={VestingSchedule.Yearly}>Yearly</option>
        </select>
      </div>

      <button
        onClick={handleCreateVesting}
        disabled={!publicKey || tokens.length === 0}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        Create Vesting
      </button>
    </div>
  );
};

export default CreateVesting;
