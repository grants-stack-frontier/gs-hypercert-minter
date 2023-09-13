"use client";

import {
  Box,
  useMediaQuery
} from "@chakra-ui/react";
import type { schema } from "components/GreenPillForm";
import GreenPillForm from "components/GreenPillForm";
import HyperCertificate from "components/HyperCert";
import type { NextPage } from "next";
import { useState } from "react";
import type * as z from "zod";
import { LandingLayout } from "../layouts/Layout";

import type { HypercertClaimdata, HypercertMetadata } from "@hypercerts-org/sdk";
import { validateClaimData, validateMetaData } from "@hypercerts-org/sdk";


import type { PrivyInterface} from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import { createClaim } from "utils/createClaim";
import useMint from "hooks/useMint";


// const zodHypercertClaimData = 
function validateFormData(formData: z.infer<typeof schema>) {
  
  const metadata = createClaim(formData);

  const validClaim = validateClaimData(metadata.hypercert as HypercertClaimdata);
  const validMetadata = validateMetaData(metadata as HypercertMetadata);

  console.log("validated claim data", validClaim)
  console.log("validated metadata", validMetadata)

  if (validClaim && validMetadata) {
    return metadata;
  }
  return false;
}



const Home: NextPage = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<z.infer<typeof schema>>();
  const [metadata, setMetadata] = useState<HypercertMetadata>();

  const privy: PrivyInterface = usePrivy()

  const memoisedPrivy = React.useMemo(() => privy, [privy]);


  const handleForm = () => {
     const readyToMint = validateFormData(formData as z.infer<typeof schema>);  
    console.log("ready to mint", readyToMint)
    setMetadata(readyToMint as HypercertMetadata);
    
  };
  
  const minting = useMint(metadata as HypercertMetadata);
  minting ? console.log("minting", minting) : console.log("not minting", minting)
  

  

  return (
    <LandingLayout>
      {memoisedPrivy.ready && <Box
        my={10}
        p={20}
        w="full"
        justifyContent={"center"}
        gap={20}
        display={"flex"}
        flexDir={isLargerThan600 ? "row" : "column-reverse"}
      >
         <GreenPillForm  setFormData={setFormData} handleForm={handleForm}/>
        <HyperCertificate formData={formData as z.infer<typeof schema>} />
      </Box>}
    </LandingLayout>
  );
};

export default Home;



