import { useConnection } from "@solana/wallet-adapter-react";
import { TokanoVesting, TokanoStaking, TokanoLock } from "tokano-sdk";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PLATFORM_WALLET } from "@/lib/constants";

interface TokanoSdkContext {
  staking: TokanoStaking | undefined;
  vesting: TokanoVesting | undefined;
  lock: TokanoLock | undefined;
}

const TokanoSdkContext = createContext<TokanoSdkContext | null>(null);

export default function TokanoSdkProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [staking, setStaking] = useState<TokanoStaking | undefined>();
  const [vesting, setVesting] = useState<TokanoVesting | undefined>();
  const [lock, setLock] = useState<TokanoLock | undefined>();

  const { connection } = useConnection();

  useEffect(() => {
    if (connection) {
      const stakingSdk = new TokanoStaking(connection);
      const vestingSdk = new TokanoVesting(connection);
      const lockSdk = new TokanoLock(connection);

      setStaking(stakingSdk);
      setVesting(vestingSdk);
      setLock(lockSdk);
    } else {
      console.error("Connection not set");
    }
  }, [connection]);

  return (
    <TokanoSdkContext.Provider value={{ staking, vesting, lock }}>
      {children}
    </TokanoSdkContext.Provider>
  );
}

export const useTokano = () => useContext(TokanoSdkContext)!;
