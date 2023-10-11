// hooks/useAuthenticationAndChainCheck.js
import { useState, useEffect, useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";

export const useAuthenticationAndChainCheck = () => {
  const { authenticated, user } = usePrivy();
  const { chain, chains } = useNetwork();
  const [checkCount, setCheckCount] = useState(0);

  const authenticatedAndCorrectChain = useMemo(() => {
    console.log("fix", chain);
    if (!chain || !chain.id) {
      return "";
    }
    if (
      user &&
      authenticated &&
      !!chains.find((connectedChain) => connectedChain.id === chain.id)
    ) {
      return "settled";
    }
    return "";
  }, [user, authenticated, chains, chain]);

  useEffect(() => {
    if (checkCount < 20) {
      const timer = setTimeout(() => {
        setCheckCount((prevCount) => prevCount + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [checkCount, authenticatedAndCorrectChain]);

  return authenticatedAndCorrectChain;
};
