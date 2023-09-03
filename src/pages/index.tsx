'use client'
import { Box, useMediaQuery } from "@chakra-ui/react";
import type { schema } from "components/GreenPillForm";
import GreenPillForm from "components/GreenPillForm";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as z from "zod";
import { LandingLayout } from "../layouts/Layout";
import * as GreenGem from "/public/collection_logos/green-gem.png";
// import { formatTime } from "utils/formatting";

// import { formatHypercertData } from "@hypercerts-org/sdk";

import { HypercertClaimdata, validateClaimData } from "@hypercerts-org/sdk";
import { createClaim } from "utils/createClaim";

const zodHypercertClaimData = z.ZodType<HypercertClaimdata>

const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<z.infer<typeof schema>>();


  useEffect(() => {
    
    setIsClient(true);
  }, []);

  
 const y = createClaim(formData)

  console.log(y.hypercert)

  // console.log(validateClaimData(y.hypercert))  <--- POINT OF FAILURE
  // Status: Ready to mint
  // TODO: Generate Image for NFT

  return (
    <LandingLayout>
      <Box
        my={10}
        p={10}
        w="full"
        justifyContent={"center"}
        gap={20}
        display={"flex"}
        flexDir={isLargerThan600 ? "row" : "column-reverse"}
      >
        <GreenPillForm isClient={isClient} formData={setFormData}/>
        <Box
          w="320px"
          h="400px"
          flexShrink={0}
          borderRadius="8px"
          border="2px solid #4FB477"
          bg="#C2E812"
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Image
            src={GreenGem}
            alt="Green pill logo"
            width={"320"}
            height={"400"}
          />
        </Box>
      </Box>
    </LandingLayout>
  );
};

export default Home;



