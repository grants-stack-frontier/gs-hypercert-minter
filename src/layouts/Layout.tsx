import { Box, Button, Link, Flex, Center, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import site from "../config/site";
import Head from "next/head";
import NextLink from "next/link";
import * as GreenPillLogo from "../../public/svgPatterns/pattern-7.svg";
import Image from "next/image";

function PrivyAuthButton() {
  const { login, ready, authenticated, user, logout } = usePrivy();

  if (!ready) return <Box>Loading...</Box>;

  if (authenticated)
    return (
      <Button onClick={logout} variant="secondary" marginRight="10px" >
        Logged in as {user?.wallet?.address}
      </Button>
    );

  if (ready && !authenticated)
    return (
      <Button onClick={login} variant="secondary" marginRight="10px">
        Connect
      </Button>
    );
}

const Footer = () => (
  <Center as="footer" position="sticky" bottom="0">
    <Text maxW={"70%"} textAlign={"center"}>
      {`Crafted with ❤️ by supermodular.xyz | Pursuing the construction of a more regenerative 🌍 internet`}
      <Link
        as={NextLink}
        href={`https://supermodular.xyz`}
        target="_blank"
        variant="primary"
      >
        learn more
      </Link>
    </Text>
  </Center>
);

export const LandingLayout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        as="nav"
        position={"sticky"}
        w={"full"}
        justifyContent="space-between"
        alignItems="center"
        textColor={"dark-green"}
        zIndex={10}
        backgroundColor={"green"}
        height={"5rem"} top={"0"}
      >
       <Link as={NextLink} href={"/"} variant="primary" textColor={"dark-green"}>     
          <Image src={GreenPillLogo} alt="Green pill logo" />
      </Link>
        <PrivyAuthButton />
      </Flex>
      <Flex direction={"column"} justifyContent={"center"} justify={"space-between"}>
      <Center>{children}</Center>
      {/* <Center  position={"sticky"} bottom={"0"} alignSelf={"flex-end"} width={"full"}>
        <Footer />
      </Center> */}
      </Flex>
      
    </>
  );
};
