"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import type {
  HypercertClaimdata,
  HypercertMetadata,
} from "@hypercerts-org/sdk";
import { validateClaimData, validateMetaData } from "@hypercerts-org/sdk";
import GreenPillForm from "components/GreenPillForm";
import HyperCertificate from "components/HyperCert";
import { atom, useAtom } from 'jotai';
import type { NextPage } from "next";
import type { RefObject} from "react";
import { useRef, useState } from "react";
import type { formSchema } from "utils/types";
import { LandingLayout } from "../layouts/Layout";

import useMint from "hooks/useMint";
import { createClaim } from "utils/createClaim";


export async function validateFormData(formData: formSchema, ref: RefObject<HTMLDivElement>) {

  const metadata = await createClaim(formData, ref);

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

const Home: NextPage =  () => {

  
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<formSchema>();
  const [metadata, setMetadata] = useState<HypercertMetadata>();
  const [wantToMint, setWantToMint] = useAtom(intentAtom);
  const hypercertRef = useRef<HTMLDivElement>(null);

  
  
  

  const handleForm = async () => {
    if (!formData) {
      return false;
    }
    const readyToMint = await validateFormData(formData, hypercertRef);  
    console.log("ready to mint", readyToMint);
    setMetadata(readyToMint as HypercertMetadata);
    setWantToMint(true);
    console.log(wantToMint,readyToMint)
    return Boolean(readyToMint) && wantToMint;
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
          <GreenPillForm setFormData={setFormData} handleForm={handleForm} reference={hypercertRef}/>
          <Box  ref={hypercertRef} height={'max'}>
          <HyperCertificate formData={formData as formSchema} />
          </Box>
        </Box>
      )}
    </LandingLayout>
  );
};

export default Home;
