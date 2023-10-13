// hooks/useAuthenticationAndChainCheck.js
import { useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

export const useAuthenticationAndChainCheck = () => {
  const { ready, authenticated } = usePrivy();
  const { chains } = useNetwork();
  const { wallet: activeWallet, ready: privyWagmiReady } = usePrivyWagmi();

  const authenticatedAndCorrectChain = useMemo(() => {


    if (!activeWallet || !activeWallet.chainId) {
      return "";
    }
    let id: number | undefined;

    if (activeWallet && activeWallet.chainId) {
      id = parseInt(activeWallet.chainId.split(":")[1]!, 10);
    }
    if (
      ready &&
      privyWagmiReady &&
      authenticated &&
      id &&
      !!chains.find((connectedChain) => connectedChain.id === id)
    ) {
      return "settled";
    }
    return "";
  }, [ready, privyWagmiReady, authenticated, chains, activeWallet]);

  return authenticatedAndCorrectChain;
};
