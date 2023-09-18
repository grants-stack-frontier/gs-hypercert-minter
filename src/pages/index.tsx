"use client";
import { atom, useAtom } from 'jotai';
import { Box, useMediaQuery } from "@chakra-ui/react";
import GreenPillForm from "components/GreenPillForm";
import HyperCertificate from "components/HyperCert";
import type { NextPage } from "next";
import { useState } from "react";
import type { formSchema } from "utils/types";
import { LandingLayout } from "../layouts/Layout";

import type {
  HypercertClaimdata,
  HypercertMetadata,
} from "@hypercerts-org/sdk";
import { validateClaimData, validateMetaData } from "@hypercerts-org/sdk";

import useMint from "hooks/useMint";
import { createClaim } from "utils/createClaim";

export function validateFormData(formData: formSchema) {
  const metadata = createClaim(formData);

  const validClaim = validateClaimData(
    metadata.hypercert as HypercertClaimdata,
  );
  const validMetadata = validateMetaData(metadata as HypercertMetadata);

  console.log("validated claim data", validClaim);
  console.log("validated metadata", validMetadata);

  if (validClaim && validMetadata) {
    return metadata;
  }
  return validClaim && validMetadata;
}
export const intentAtom = atom(false);

const Home: NextPage = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<formSchema>();
  const [metadata, setMetadata] = useState<HypercertMetadata>();
  const [wantToMint, setWantToMint] = useAtom(intentAtom);


  const handleForm = () => {
    const readyToMint = validateFormData(formData as formSchema);
    console.log("ready to mint", readyToMint);
    setMetadata(readyToMint as HypercertMetadata);
    setWantToMint(true);
    return Boolean(readyToMint);
  };

  useMint(metadata as HypercertMetadata, wantToMint);

  return (
    <LandingLayout>
      {(
        <Box
          my={10}
          p={20}
          w="full"
          justifyContent={"center"}
          gap={20}
          display={"flex"}
          flexDir={isLargerThan600 ? "row" : "column-reverse"}
        >
          <GreenPillForm setFormData={setFormData} handleForm={handleForm} />
          <HyperCertificate formData={formData as formSchema} />
        </Box>
      )}
    </LandingLayout>
  );
};

export default Home;
