import { Box, useMediaQuery } from "@chakra-ui/react";
import GreenPillForm from "components/GreenPillForm";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LandingLayout } from "../layouts/Layout";
import * as GreenGem from '/public/collection_logos/green-gem.png';
const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false)
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)")
  useEffect(() => {
    setIsClient(true)
  }, [])
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
      </Box>
    </LandingLayout>
  );
};

export default Home;
