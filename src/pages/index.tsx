"use client";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Tag,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import type { schema } from "components/GreenPillForm";
import GreenPillForm from "components/GreenPillForm";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as z from "zod";
import { LandingLayout } from "../layouts/Layout";
import * as GreenPill from "/public/collection_logos/green-pill.png";

import { HypercertClaimdata } from "@hypercerts-org/sdk";

import { validateClaimData } from "@hypercerts-org/sdk";
import { createClaim } from "utils/createClaim";

// const zodHypercertClaimData = z.ZodType<HypercertClaimdata>

const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [formData, setFormData] = useState<z.infer<typeof schema>>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const y = createClaim(formData as unknown as never);

  console.log(y.hypercert);

  //TODO fix undefined so that typecast is not needed
  console.log(validateClaimData(y.hypercert as HypercertClaimdata));
  // Status: Ready to mint
  // TODO: Generate Image for NFT

  return (
    <LandingLayout>
      <Box
        my={10}
        p={20}
        w="full"
        justifyContent={"center"}
        gap={20}
        display={"flex"}
        flexDir={isLargerThan600 ? "row" : "column-reverse"}
      >
        <GreenPillForm isClient={isClient} formData={setFormData} />
        <VStack
          w="320px"
          h="400px"
          borderRadius="8px"
          bg="dark-green"
          backgroundImage={"url(/svgPatterns/certSvg.svg)"}
          backgroundSize={"cover"}
          backgroundRepeat={"repeat-y"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={4}
        >
          <Image
            src={GreenPill}
            alt="Green pill"
            width={"150"}
            height={"150"}
          />
          {/* Divider */}
          <Divider borderColor="green" borderWidth="1px" width="100%" />
          {/* Divider */}
          <Heading
            textColor={"white"}
            lineHeight="normal"
            fontWeight="500"
            fontSize={"20px"}
            my={2}
            fontFamily="Volkhov, serif"
          >
            {`Here goes the title of the hypercert / impact / work`}
          </Heading>
          <HStack spacing={2}  flexWrap={"wrap"}>
            <Tag
              color="green"
              borderColor={"green"}
              border={"1px"}
              rounded={"full"}
              bgColor={"transparent"}
              fontSize={"12px"}
              fontWeight={"normal"}
            >
              fair trade
            </Tag>
            <Tag
              color="green"
              borderColor={"green"}
              border={"1px"}
              rounded={"full"}
              bgColor={"transparent"}
              fontSize={"12px"}
              fontWeight={"normal"}
            >
              renewable energy
            </Tag>
            <Tag
              color="green"
              borderColor={"green"}
              border={"1px"}
              rounded={"full"}
              bgColor={"transparent"}
              fontSize={"12px"}
              fontWeight={"normal"}
            >
              recycling & waste reduction
            </Tag>
          </HStack>
          {/* Divider */}
          <Divider borderColor="green" borderWidth="1px" width="100%" />

          {/* Divider */}

    <Box height={44} width={32} position={'relative'}>
          <Image
            src={"/logo-yellow.svg"}
            alt="Green pill"
            fill
          />
          </Box>
        </VStack>
      </Box>
    </LandingLayout>
  );
};

export default Home;
