import { useEffect, useState } from "react";

const WALLET_URLS = {
  phantom: "https://phantom.app/",
  metamask: "https://metamask.io/",
  brave: "https://brave.com/wallet/",
  trust: "https://trustwallet.com/",
  walletconnect: "https://walletconnect.com/",
};

export default function usePhantom() {
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for different wallet providers
    const phantom = window?.phantom?.solana;
    const ethereum = window?.ethereum;

    if (phantom?.isPhantom) {
      setProvider(phantom);
      setSelectedWallet("phantom");

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
    } else if (ethereum) {
      setProvider(ethereum);
    }
  }, []);

  const connectWallet = async (walletId = "phantom") => {
    setSelectedWallet(walletId);

    // Handle Phantom wallet (Solana)
    if (walletId === "phantom") {
      const phantom = window?.phantom?.solana;
      if (!phantom?.isPhantom) {
        window.open(WALLET_URLS.phantom, "_blank");
        return;
      }
      try {
        const resp = await phantom.connect();
        setPublicKey(resp.publicKey.toString());
        setProvider(phantom);
      } catch (err) {
        console.error("Phantom connect failed", err);
      }
      return;
    }

    // Handle Ethereum-based wallets (MetaMask, Brave, Trust)
    if (["metamask", "brave", "trust"].includes(walletId)) {
      const ethereum = window?.ethereum;

      if (!ethereum) {
        window.open(WALLET_URLS[walletId], "_blank");
        return;
      }

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setPublicKey(accounts[0]);
          setProvider(ethereum);
        }

        // Listen for account changes
        ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setPublicKey(accounts[0]);
          } else {
            setPublicKey(null);
          }
        });
      } catch (err) {
        console.error(`${walletId} connect failed`, err);
      }
      return;
    }

    // Handle WalletConnect
    if (walletId === "walletconnect") {
      window.open(WALLET_URLS.walletconnect, "_blank");
      console.log("WalletConnect integration coming soon");
      return;
    }
  };

  const disconnectWallet = async () => {
    try {
      if (selectedWallet === "phantom" && provider?.disconnect) {
        await provider.disconnect();
      } else if (provider) {
        // For Ethereum wallets, we just clear the state
        setPublicKey(null);
      }
    } catch (err) {
      console.error("Disconnect failed", err);
    }
  };

  return { provider, publicKey, connectWallet, disconnectWallet, selectedWallet };
}
