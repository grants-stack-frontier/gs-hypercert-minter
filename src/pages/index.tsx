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
import { useRef, useState } from "react";
import type { formSchema } from "utils/types";
import { LandingLayout } from "../layouts/Layout";

import { createClaim } from "utils/createClaim";



export function validateFormData(formData: formSchema, image: string){
  
  

  const metadata = createClaim(formData, image);

  if(!metadata){
    return false;
  }

  const validClaim =  validateClaimData(metadata.hypercert as HypercertClaimdata);
  const validMetadata = validateMetaData(metadata as HypercertMetadata);
  const isValid = validClaim.valid && validMetadata.valid;

  console.log("validClaim", validClaim);
  console.log("validMetadata", validMetadata);
  console.log("isValid", isValid);

  return isValid ? metadata : false;
}



const Home: NextPage =  () => {

  
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<formSchema>();
  const hypercertRef = useRef<HTMLDivElement>(null);
  
  
  

  

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
          <GreenPillForm setFormData={setFormData}  reference={hypercertRef}/>
          <Box  ref={hypercertRef} height={'max'}>
          {/* <HyperCertificate formData={formData as formSchema} /> */}
          <HypercertDisplay formData={formData as formSchema} />
          </Box>
        </Box>
      )}
    </LandingLayout>
  );
};

export default Home;
