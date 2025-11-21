"use client";

import { useCallback, useEffect, useState } from "react";
import { useTokens } from "@/contexts/tokens-context";
import { TOKANO_MINT_ADDRESS } from "@/lib/constants";

export default function DataTest() {
  const { fetchTokenInfo } = useTokens();
  const [tokenInfo, setTokenInfo] = useState<any>();

  const fetches = useCallback(async () => {
    const res = await fetchTokenInfo([TOKANO_MINT_ADDRESS]);
    console.log("res", res);
    return res;
  }, [fetchTokenInfo]);

  useEffect(() => {
    fetches().then((res) => setTokenInfo(res));
  }, []);

  return <div></div>;
}
