import type { ConnectedWallet, User } from "@privy-io/react-auth";
import { useEffect } from "react";
import eventBus from "utils/eventBus";
import type { Chain } from "wagmi";

export const useWalletUpdateListener = (
  chainId: number | undefined,
  activeWallet: ConnectedWallet | undefined,
  wallets: ConnectedWallet[],
  user: User | null,
  chains: Chain[],
  setActiveWallet: (wallet: ConnectedWallet) => Promise<void>
) => {
  useEffect(() => {
    const handleWalletsUpdated = async () => {
      const currentId = chainId;
      if (!activeWallet) {
        const foundWallet = wallets.find(
          (w) => w.address === user?.wallet?.address
        );

        const connectedToSupportedChain = chains.find(
          (chain) => chain.id === currentId
        );
        if (foundWallet && connectedToSupportedChain) {
          try {
            await setActiveWallet(foundWallet);
          } catch (error) {
            console.error("Error setting active wallet:", error);
          }
        }
      }
    };

    eventBus.on("walletsUpdated", handleWalletsUpdated);

    return () => {
      eventBus.off("walletsUpdated", handleWalletsUpdated);
    };
  }, [
    wallets,
    user?.wallet?.address,
    activeWallet,
    chainId,
    chains,
    setActiveWallet,
  ]);
};
