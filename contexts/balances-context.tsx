import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { fetchWalletBalances, subscribeToWalletBalances } from "@/lib/balances";

export interface TokenBalanceT {
  amount: string;
  amountRaw: number;
  decimals: number;
  mintAddress: string;
}

export enum BalanceLoadState {
  NOT_INITIALIZED,
  LOADING,
  LOADED,
}

interface BalancesContextT {
  tokens: TokenBalanceT[];
  loadState: BalanceLoadState;
  findAndReplace: (token: TokenBalanceT) => void;
}

const BalancesContext = createContext<BalancesContextT | null>(null);

export default function BalancesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const lastSubscriptionId = useRef<number>(-1);
  const [tokens, setTokens] = useState<TokenBalanceT[]>([]);
  const [loadState, setLoadState] = useState<BalanceLoadState>(
    BalanceLoadState.NOT_INITIALIZED,
  );

  const findAndReplace = useCallback((token: TokenBalanceT) => {
    setTokens((previous) => {
      const newArray = previous?.filter(
        (item) => item.mintAddress !== token.mintAddress,
      );
      newArray?.push(token);
      return newArray;
    });
  }, []);

  useEffect(() => {
    setLoadState(BalanceLoadState.NOT_INITIALIZED);
    if (!connection || !publicKey) return;

    setLoadState(BalanceLoadState.LOADING);
    const fetchBalances = async () => {
      const balances = await fetchWalletBalances(connection, publicKey);
      setTokens(balances);
      lastSubscriptionId.current = subscribeToWalletBalances(
        connection,
        publicKey,
        findAndReplace,
      );
      setLoadState(BalanceLoadState.LOADED);
    };

    fetchBalances();

    return () => {
      if (lastSubscriptionId.current >= 0) {
        connection.removeProgramAccountChangeListener(
          lastSubscriptionId.current,
        );
      }
    };
  }, [connection, findAndReplace, publicKey]);

  return (
    <BalancesContext.Provider
      value={{
        tokens,
        loadState,
        findAndReplace,
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
}

export const useBalances = () => useContext(BalancesContext)!;
