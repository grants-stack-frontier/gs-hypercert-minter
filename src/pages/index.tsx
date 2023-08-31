import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Flare } from "../components/Flare";
import { LandingLayout } from "../layouts/Layout";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <LandingLayout height={"100vh"}>
      <Center
        display="flex"
        flexDirection={isLargerThan800 ? "row" : "column"}
        alignItems={'center'}
        marginBottom={'90px'}
      >
        <Box
          pt={24}
          display="flex"
          justifyContent={isLargerThan800 ? "flex-start" : "space-between"}
          flexDirection={"column"}
          gap={8}
        >
          <Heading as="h1" fontFamily="volkhov" textAlign="left" fontSize={isLargerThan800 ? '5xl' : '3xl'} color={'yellow'} maxW={'400px'}>
            Turning  Degens  to Regens 
            (one green pill at a time)
          </Heading>

          <Button
            onClick={() => router.push("/design")}
            size="xl"
            variant={"primary"}
          >
            Generate your HyperCert
          </Button>
        </Box>

        <Box
          flex="1"
          px="16"
          display="flex"
          justifyContent="center"
          alignItems="center"
          
        >
          <Image
            src="https://greenpill.network/src/images/footer-img-sequence/32.png"
            id="hero-img"
            width={200}
            height={200}
            position="absolute"
            alt="Green Pill"
            zIndex={20}
          />
          <Flare />
        </Box>
      </Center>
    </LandingLayout>
  );
};

export default Home;
