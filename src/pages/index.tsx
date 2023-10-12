"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import type {
  HypercertClaimdata,
  HypercertMetadata,
} from "@hypercerts-org/sdk";
import { validateClaimData, validateMetaData } from "@hypercerts-org/sdk";
import GreenPillForm from "components/GreenPillForm";
import { HypercertDisplay } from "components/HypercertDisplay";
import type { NextPage } from "next";
import { useRef, useState, useEffect } from "react";
import type { formSchema } from "utils/types";
import { LandingLayout } from "../layouts/Layout";

import { createClaim } from "utils/createClaim";
import { atom } from "jotai";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useAuthenticationAndChainCheck } from "hooks/useAuthenticationAndCorrectChain";

export const imageDataAtom = atom("");

function isValidURL(url: string) {
  const regex = /^https?:\/\/[^ "]+$/;
  return regex.test(url);
}
export function validateFormData(formData: formSchema, image: string) {
  if (!isValidURL(formData.externalUrl)) {
    return false;
  }
  const metadata = createClaim(formData, image);

  if (!metadata) {
    return false;
  }

  const validClaim = validateClaimData(
    metadata.hypercert as HypercertClaimdata
  );
  const validMetadata = validateMetaData(metadata as HypercertMetadata);
  const isValid = validClaim.valid && validMetadata.valid;

  return isValid ? metadata : false;
}

const Home: NextPage = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<formSchema>();
  const hypercertRef = useRef<HTMLDivElement>(null);

  const { chain, chains } = useNetwork();
  const { user } = usePrivy();

  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();
  const { wallets } = useWallets();
  const authenticatedAndCorrectChain = useAuthenticationAndChainCheck();

  useEffect(() => {
    const currentId = chain?.id;
    const setWallet = async () => {
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

    setWallet().catch((error) => {
      console.error("Error in setWallet:", error);
    });
  }, [
    wallets,
    user?.wallet?.address,
    activeWallet,
    chain?.id,
    chains,
    setActiveWallet,
  ]);

  return (
    <LandingLayout>
      {authenticatedAndCorrectChain === "settled" ? null : (
        <Box
          px={5}
          fontSize="xl"
          flexDir={isLargerThan600 ? "row" : "column-reverse"}
        >
          Please connect above to either Optimism or Goerli.
        </Box>
      )}
      <Box
        my={10}
        p={20}
        w="full"
        justifyContent={"center"}
        gap={20}
        display={"flex"}
        flexDir={isLargerThan600 ? "row" : "column-reverse"}
      >
        <GreenPillForm
          setFormData={setFormData}
          authenticatedAndCorrectChain={authenticatedAndCorrectChain}
          chain={chain}
        />
        <Box ref={hypercertRef} height={"max"}>
          <HypercertDisplay formData={formData as formSchema} />
        </Box>
      </Box>
    </LandingLayout>
  );
};

export default Home;
