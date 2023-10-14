// hooks/useAuthenticationAndChainCheck.js
// import { useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useState, useEffect } from "react";

export const useAuthenticationAndChainCheck = () => {
  const { ready, authenticated } = usePrivy();
  const { wallet: activeWallet, ready: privyWagmiReady } = usePrivyWagmi();
  const { chains } = useNetwork();
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [authenticatedAndCorrectChain, setAuthenticatedAndCorrectChain] =
    useState("");

  useEffect(() => {
    if (chains.length === 0 || !activeWallet || !activeWallet.chainId) {
      setAuthenticatedAndCorrectChain("");
      if (!privyWagmiReady || chains.length === 0) {
        setTimeout(() => setTriggerEffect((prev) => !prev), 1000);
      }
      return;
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
      chains.find((connectedChain) => connectedChain.id === id)
    ) {
      setAuthenticatedAndCorrectChain("settled");
    } else {
      setAuthenticatedAndCorrectChain("");
    }
  }, [
    ready,
    privyWagmiReady,
    authenticated,
    chains,
    activeWallet,
    triggerEffect,
  ]);

  return authenticatedAndCorrectChain;
};
