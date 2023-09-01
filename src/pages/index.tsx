import Image from "next/image";
import { useState } from "react";
import GreenPillForm from "components/GreenPillForm";
import type { NextPage } from "next";
import { LandingLayout } from "../layouts/Layout";
import { HStack, Box } from "@chakra-ui/react";
import * as GreenGem from '/public/collection_logos/green-gem.png'
import { useEffect } from "react";
const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <LandingLayout>
      <HStack
        my={40}
        p={40}
        w="full"
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={20}
      >
        <GreenPillForm isClient={isClient}/>
        <Box
          w="400px"
          h="500px"
          flexShrink={0}
          borderRadius="8px"
          border="2px solid #4FB477"
          bg="#C2E812"
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Image src={GreenGem} alt="Green pill logo" width={'366'} height={'366'}/>
        </Box>
      </HStack>
    </LandingLayout>
  );
};

export default Home;
