import { useConnection } from "@solana/wallet-adapter-react";
import { TokanoVesting, TokanoStaking } from "tokano-sdk";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokanoSdkContext {
  staking: TokanoStaking | undefined;
  vesting: TokanoVesting | undefined;
}

const TokanoSdkContext = createContext<TokanoSdkContext | null>(null);

export default function TokanoSdkProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [staking, setStaking] = useState<TokanoStaking>();
  const [vesting, setVesting] = useState<TokanoVesting>();

  const { connection } = useConnection();

  useEffect(() => {
    if (connection) {
      const stakingSdk = new TokanoStaking(connection);
      const vestingSdk = new TokanoVesting(connection);

      setStaking(stakingSdk);
      setVesting(vestingSdk);
    } else {
      console.error("Connection not set");
    }
  }, [connection]);

  return (
    <TokanoSdkContext.Provider value={{ staking, vesting }}>
      {children}
    </TokanoSdkContext.Provider>
  );
}

export const useTokano = () => useContext(TokanoSdkContext)!;
