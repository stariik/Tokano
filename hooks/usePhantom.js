import { useEffect, useState } from "react";

export default function usePhantom() {
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const phantom = window?.phantom?.solana;
    if (phantom?.isPhantom) {
      setProvider(phantom);

      phantom.on("connect", (pk) => {
        setPublicKey(pk.toString());
      });

      phantom.on("disconnect", () => {
        setPublicKey(null);
      });

      // Auto reconnect if already connected
      if (phantom.isConnected && phantom.publicKey) {
        setPublicKey(phantom.publicKey.toString());
      }
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
    } catch (err) {
      console.error("Connect failed", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      await provider.disconnect();
    } catch (err) {
      console.error("Disconnect failed", err);
    }
  };

  return { provider, publicKey, connectWallet, disconnectWallet };
}
