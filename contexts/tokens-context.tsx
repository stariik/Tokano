import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
} from "react";

export interface TokenInfo {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  mcap: number;
  icon: string;
  launchpad?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
}

interface TokensContextState {
  tokens: Record<string, TokenInfo>;
  fetchTokenInfo: (
    mints: string[],
    forceRefetch?: boolean,
  ) => Promise<Record<string, TokenInfo | undefined>>;
  loading: boolean;
}

const TokensContext = createContext<TokensContextState | undefined>(undefined);

export const TokensProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Record<string, TokenInfo>>({});
  const [loading, setLoading] = useState(false);
  const tokensRef = useRef(tokens);
  tokensRef.current = tokens;

  const fetchTokenInfo = useCallback(
    async (
      mints: string[],
      forceRefetch = false,
    ): Promise<Record<string, TokenInfo>> => {
      const mintsToFetch = forceRefetch
        ? mints
        : mints.filter((mint) => !tokensRef.current[mint]);

      const resultingTokens: Record<string, TokenInfo> = {};

      if (!forceRefetch) {
        mints.forEach((mint) => {
          if (tokensRef.current[mint]) {
            resultingTokens[mint] = tokensRef.current[mint];
          }
        });
      }

      if (mintsToFetch.length === 0) {
        return resultingTokens;
      }

      setLoading(true);
      const newlyFetchedTokens: Record<string, TokenInfo> = {};

      try {
        const chunkSize = 100;
        for (let i = 0; i < mintsToFetch.length; i += chunkSize) {
          const chunk = mintsToFetch.slice(i, i + chunkSize);
          const query = chunk.join(",");
          const response = await fetch(
            `https://lite-api.jup.ag/tokens/v2/search?query=${query}`,
          );
          const data: TokenInfo[] = await response.json();

          const newTokens: Record<string, TokenInfo> = {};
          if (Array.isArray(data)) {
            data.forEach((tokenData) => {
              if (tokenData.id) {
                const tokenInfo = {
                  id: tokenData.id,
                  name: tokenData.name,
                  symbol: tokenData.symbol,
                  decimals: tokenData.decimals,
                  mcap: tokenData.mcap,
                  icon: tokenData.icon,
                  launchpad: tokenData.launchpad,
                  twitter: tokenData.twitter,
                  telegram: tokenData.telegram,
                  website: tokenData.website,
                };
                newTokens[tokenData.id] = tokenInfo;
                newlyFetchedTokens[tokenData.id] = tokenInfo;
              }
            });
          }

          setTokens((prevTokens) => ({ ...prevTokens, ...newTokens }));
        }
      } catch (error) {
        console.error("Failed to fetch token info:", error);
      } finally {
        setLoading(false);
      }

      return { ...resultingTokens, ...newlyFetchedTokens };
    },
    [],
  );

  const value = { tokens, fetchTokenInfo, loading };

  return (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokensProvider");
  }
  return context;
};
