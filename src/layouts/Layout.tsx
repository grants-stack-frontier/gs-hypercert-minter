import { Analytics } from "@vercel/analytics/react";
import { Flex, Img, Link, Text, VStack } from "@chakra-ui/react";
import PrivyAuthButton from "components/PrivyAuthButton";
import Head from "next/head";
import NextLink from "next/link";
import site from "../config/site";

export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack minHeight="100vh">
      <Head>
        <title>{site.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />

      {children}
      <Analytics />
      <Footer />
    </VStack>
  );
};

function Header() {
  return (
    <Flex
      as="nav"
      position={"absolute"}
      w={"full"}
      justifyContent="space-between"
      alignItems="center"
      textColor={"dark-green"}
      zIndex={10}
      backgroundColor={"transparent"}
      height={"5rem"}
      top={"0"}
    >
      <Link as={NextLink} href={"/"} variant="primary" textColor={"dark-green"}>
        <Img
          src={"/logo.svg"}
          alt="Green pill logo"
          width={"146px"}
          height={"50px"}
        />
      </Link>

      <PrivyAuthButton />
    </Flex>
  );
}

export const Hero = () => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      textAlign={"left"}
      height={"32rem"}
      width={"full"}
      padding={"4rem"}
      backgroundColor={"green"}
      backgroundImage={"url(/svgPatterns/heroSvg.svg)"}
      backgroundSize={"cover"}
      backgroundRepeat={"repeat-x"}
      fontSize={"2xl"}
    >
      <Text fontSize={"6xl"} color={"dark-green"} fontWeight={"bold"}>
        Green Pill
      </Text>
      <Text color={"dark-green"}>A regenerative internet</Text>
      <Text color={"dark-green"}>Powered by the blockchain</Text>
      <Text color={"dark-green"}>Built by supermodular.xyz</Text>
    </Flex>
  );
};

export const Footer = () => (
  <Flex
    as="footer"
    w={"full"}
    justifyContent="center"
    alignItems="center"
    textColor={"dark-green"}
    backgroundColor={"green"}
    height={"5rem"}
    bottom={"0"}
  >
    Learn More
  </Flex>
);
