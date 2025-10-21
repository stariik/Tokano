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
import {
  fetchWalletBalances,
  subscribeToWalletBalances,
  TokenBalanceT,
} from "@/lib/balances";
import { TokenInfo, useTokens } from "./tokens-context";

export enum BalanceLoadState {
  NOT_INITIALIZED,
  LOADING,
  LOADED,
}

export type TokenBalanceWithInfo = TokenBalanceT & { info?: TokenInfo };

interface BalancesContextT {
  tokens: TokenBalanceWithInfo[];
  loadState: BalanceLoadState;
}

const BalancesContext = createContext<BalancesContextT | null>(null);

export default function BalancesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { fetchTokenInfo } = useTokens();
  const lastSubscriptionId = useRef<number>(-1);
  const [tokens, setTokens] = useState<TokenBalanceWithInfo[]>([]);
  const [loadState, setLoadState] = useState<BalanceLoadState>(
    BalanceLoadState.NOT_INITIALIZED,
  );

  const findAndReplace = useCallback(
    async (token: TokenBalanceT) => {
      const tokenInfos = await fetchTokenInfo([token.mintAddress], true);
      const tokenInfo = tokenInfos[token.mintAddress];

      setTokens((previous) => {
        const newArray = previous?.filter(
          (item) => item.mintAddress !== token.mintAddress,
        );
        newArray?.push({ ...token, info: tokenInfo });
        return newArray;
      });
    },
    [fetchTokenInfo],
  );

  useEffect(() => {
    setLoadState(BalanceLoadState.NOT_INITIALIZED);
    if (!connection || !publicKey) return;

    setLoadState(BalanceLoadState.LOADING);
    const fetchBalances = async () => {
      const balances = await fetchWalletBalances(connection, publicKey);
      const mints = balances.map((balance) => balance.mintAddress);
      const tokenInfos = await fetchTokenInfo(mints);

      const tokensWithInfo = balances.map((balance) => ({
        ...balance,
        info: tokenInfos[balance.mintAddress],
      }));

      setTokens(tokensWithInfo);
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
  }, [connection, publicKey, fetchTokenInfo, findAndReplace]);

  return (
    <BalancesContext.Provider
      value={{
        tokens,
        loadState,
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
}

export const useBalances = () => useContext(BalancesContext)!;
