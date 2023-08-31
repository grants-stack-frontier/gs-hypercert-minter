import { Box, Button, Link, Flex, Center, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import site from "config/site";
import Head from "next/head";
import NextLink from "next/link";

function PrivyAuthButton() {
  const { login, ready, authenticated, user, logout } = usePrivy();

  if (!ready) return <Box>Loading...</Box>;

  if (authenticated)
    return (
      <Button onClick={logout} variant="primary">
        Logged in as {user?.wallet?.address}
      </Button>
    );

  if (ready && !authenticated)
    return (
      <Button onClick={login} variant="primary">
        Log in
      </Button>
    );
}

const Footer = () => (
  <Center as="footer" position="fixed" bottom="0">
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
        p="6"
        position={"sticky"}
        w={"full"}
        top={0}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link as={NextLink} href={"/"} variant="primary">
          {site.title}
        </Link>
        <PrivyAuthButton />
      </Flex>

      <Center>{children}</Center>

      <Center>
        <Footer />
      </Center>
    </>
  );
};
