import { useEffect, useState } from "react";
import EthereumProvider from "@walletconnect/ethereum-provider";

const WALLET_URLS = {
  phantom: "https://phantom.app/",
  metamask: "https://metamask.io/",
  brave: "https://brave.com/wallet/",
  trust: "https://trustwallet.com/",
  walletconnect: "https://walletconnect.com/",
};

// WalletConnect Project ID - You should replace this with your own from cloud.walletconnect.com
const WALLETCONNECT_PROJECT_ID = "a09f88f02055849bd4b4206dd86d2f36";

// Cache the WalletConnect provider to prevent multiple initializations
let cachedWCProvider = null;

export default function usePhantom() {
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletConnectProvider, setWalletConnectProvider] = useState(null);

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
      try {
        let wcProvider = cachedWCProvider;

        // Only initialize if not already cached
        if (!wcProvider) {
          wcProvider = await EthereumProvider.init({
            projectId: WALLETCONNECT_PROJECT_ID,
            chains: [1], // Ethereum mainnet
            optionalChains: [137, 56], // Polygon, BSC
            showQrModal: true,
            qrModalOptions: {
              themeMode: "dark",
              themeVariables: {
                "--wcm-z-index": "50",
                "--wcm-accent-color": "#949DFF",
                "--wcm-background-color": "#1a1154",
              },
            },
            metadata: {
              name: "Tokano",
              description: "Tokano Web3 Platform",
              url: typeof window !== "undefined" ? window.location.origin : "",
              icons: ["https://tokano.com/logo.png"],
            },
          });
          cachedWCProvider = wcProvider;
        }

        // Check if already connected
        if (wcProvider.session) {
          const accounts = wcProvider.accounts;
          if (accounts.length > 0) {
            setPublicKey(accounts[0]);
            setProvider(wcProvider);
            setWalletConnectProvider(wcProvider);
            return;
          }
        }

        // Enable session (triggers QR Code modal)
        const accounts = await wcProvider.enable();

        if (accounts && accounts.length > 0) {
          setPublicKey(accounts[0]);
          setProvider(wcProvider);
          setWalletConnectProvider(wcProvider);

          // Listen for events (only add listeners once)
          if (!wcProvider._eventsSet) {
            wcProvider.on("accountsChanged", (accounts) => {
              if (accounts.length > 0) {
                setPublicKey(accounts[0]);
              } else {
                setPublicKey(null);
              }
            });

            wcProvider.on("disconnect", () => {
              setPublicKey(null);
              setWalletConnectProvider(null);
              cachedWCProvider = null; // Clear cache on disconnect
            });

            wcProvider._eventsSet = true;
          }
        }
      } catch (err) {
        console.error("WalletConnect failed", err);

        // Clear cache on error
        cachedWCProvider = null;

        // Check for specific error types
        if (
          err.message?.includes("User rejected") ||
          err.message?.includes("Connection request reset")
        ) {
          // User closed the modal, silently return
          return;
        }

        // Check for authentication/API errors
        if (
          err.message?.includes("Unauthorized") ||
          err.message?.includes("403") ||
          err.message?.includes("invalid key")
        ) {
          console.error(
            "WalletConnect Project ID Error: The project ID is invalid or not properly configured.",
          );
          console.error(
            "Please visit https://cloud.walletconnect.com/ to create a valid project and update the WALLETCONNECT_PROJECT_ID in hooks/usePhantom.js",
          );
          alert(
            "WalletConnect configuration error. Please contact the site administrator.",
          );
          return;
        }

        // For other errors, show a user-friendly message
        alert(
          "Failed to connect with WalletConnect. Please ensure you have a compatible wallet app installed.",
        );
      }
      return;
    }
  };

  const disconnectWallet = async () => {
    try {
      if (selectedWallet === "phantom" && provider?.disconnect) {
        await provider.disconnect();
      } else if (selectedWallet === "walletconnect" && walletConnectProvider) {
        await walletConnectProvider.disconnect();
        setWalletConnectProvider(null);
        cachedWCProvider = null; // Clear the cached provider
      } else if (provider) {
        // For Ethereum wallets, we just clear the state
        setPublicKey(null);
      }
      setSelectedWallet(null);
    } catch (err) {
      console.error("Disconnect failed", err);
      // Even if disconnect fails, clear the state
      setPublicKey(null);
      setWalletConnectProvider(null);
      setSelectedWallet(null);
      if (selectedWallet === "walletconnect") {
        cachedWCProvider = null;
      }
    }
  };

  return {
    provider,
    publicKey,
    connectWallet,
    disconnectWallet,
    selectedWallet,
  };
}
