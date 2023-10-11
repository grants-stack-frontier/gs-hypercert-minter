// hooks/useAuthenticationAndChainCheck.js
import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";
import { useChainId } from "wagmi";

export const useAuthenticationAndChainCheck = () => {
  const { authenticated, user } = usePrivy();
  const { chains } = useNetwork();
  const chainId = useChainId();
  const [authenticatedAndCorrectChain, setAuthenticatedAndCorrectChain] =
    useState<string>("");

  useEffect(() => {
    // console.log("user", user);
    // console.log("authenticated", authenticated);
    // console.log("chains", chains);
    if (
      user &&
      authenticated &&
      !!chains.find((chain) => chain.id === chainId)
    ) {
      setAuthenticatedAndCorrectChain("settled");
    } else {
      setAuthenticatedAndCorrectChain("");
    }
  }, [user, authenticated, chains, chainId]);

  return authenticatedAndCorrectChain;
};
