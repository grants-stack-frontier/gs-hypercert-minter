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
import { usePrivy } from "@privy-io/react-auth";
import { useNetwork } from "wagmi";

export const imageDataAtom = atom("");

function isValidURL(url: string) {
  const regex = /^https?:\/\/[^ "]+$/;
  return regex.test(url);
}
export function validateFormData(formData: formSchema, image: string) {
  if (!isValidURL(formData.externalUrl)) {
    console.error(
      "Invalid URL format. URL must start with http:// or https://"
    );
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
  const { authenticated, user } = usePrivy();

  const [authenticatedAndCorrectChain, setAuthenticatedAndCorrectChain] =
    useState<boolean>(false);

  useEffect(() => {
    const currentId = chain?.id;
    if (
      user &&
      authenticated &&
      chains.find((chain) => chain.id === currentId)
    ) {
      setAuthenticatedAndCorrectChain(true);
    } else {
      setAuthenticatedAndCorrectChain(false);
    }
  }, [user, authenticated, chains, chain]);

  return (
    <LandingLayout>
      {!authenticatedAndCorrectChain && (
        <Box
          px={5}
          fontSize="xl"
          flexDir={isLargerThan600 ? "row" : "column-reverse"}
        >
          Please connect above to either Optimism, Optimism-Goerli, or Goerli.
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
