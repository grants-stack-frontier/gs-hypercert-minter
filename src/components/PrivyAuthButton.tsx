"use client";
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { formatAddress } from "utils/formatting";
import { useBalance, useNetwork } from "wagmi";
import { ChainSwitcher } from "./ChainSwitcher";
import { useEffect, useState } from "react";

import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useWallets } from "@privy-io/react-auth";
import { useAuthenticationAndChainCheck } from "hooks/useAuthenticationAndCorrectChain";

const PrivyAuthButton = () => {
  const { login, authenticated, user, logout } = usePrivy();
  const authenticatedAndCorrectChain = useAuthenticationAndChainCheck();
  const { chain, chains } = useNetwork();
  const { wallet: activeWallet, ready: privyWagmiReady } = usePrivyWagmi();
  const { wallets } = useWallets();

  const [buttonText, setButtonText] = useState("");
  const [hasConnected, setHasConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();

  const address = user?.wallet?.address;

  useEffect(() => {
    setLoading(true);
    const handleLogout = async () => {

      try {
        await logout();
        setHasConnected(false);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    if (privyWagmiReady && authenticatedAndCorrectChain) {
      if (activeWallet && authenticatedAndCorrectChain.length > 0) {
        setButtonText(`Logged in as ${formatAddress(address ?? "")}`);
        setHasConnected(true);
      } else if (
        activeWallet &&
        authenticatedAndCorrectChain.length === 0 &&
        !chains.find((connectedChain) => connectedChain.id === chain?.id)
      ) {
        setButtonText("Please check your wallet and network");
      } else {
        setButtonText("Connect");
      }
    } else if (!authenticatedAndCorrectChain) {
      if (privyWagmiReady) {
          if (hasConnected && !wallets[0]) {
              void handleLogout();
          } else {
              setButtonText("Please check your wallet and network");
          }
      } else {
          setButtonText("Connect");
      }
  }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [
    activeWallet,
    hasConnected,
    logout,
    authenticated,
    chains,
    chain,
    address,
    privyWagmiReady,
    authenticatedAndCorrectChain,
    wallets
  ]);

  if (user && authenticated) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={activeWallet ? <ChevronDownIcon /> : undefined}
          bgColor="dark-green"
          color="green"
          _hover={{ bgColor: "mid-green", textColor: "dark-green" }}
          _active={{ bgColor: "mid-green", textColor: "dark-green" }}
          // isDisabled={activeWallet && !authenticatedAndCorrectChain}
        >
          {loading ? <Spinner/> : buttonText}
        </MenuButton>

        <MenuList p={2} background={"#242423"} textColor={"white"}>
          <MenuItem
            onClick={() => copyToClipboard(user?.wallet?.address as string)}
            p={2}
            bg={"transparent"}
            rounded={"md"}
            _hover={{
              bgColor: "green",
              color: "dark-green",
              fontWeight: "medium",
            }}
          >
            <CopyIcon mr={2} /> Copy Wallet Address
          </MenuItem>

          <MenuItem
            p={2}
            bg={"transparent"}
            rounded={"md"}
            _hover={{
              bgColor: "green",
              color: "dark-green",
              fontWeight: "medium",
            }}
          >
            {data?.formatted.substring(0, 8)} {data?.symbol}
          </MenuItem>
          <ChainSwitcher chain={chain} chains={chains} />
          <MenuItem
            bg={"transparent"}
            _hover={{
              bgColor: "green",
              color: "dark-green",
              fontWeight: "medium",
            }}
            onClick={() => router.push("/my-hypercerts")}
          >
            {" "}
            My Hypercerts
          </MenuItem>
          <MenuItem
            onClick={logout}
            p={2}
            rounded={"md"}
            bg={"transparent"}
            _hover={{
              bgColor: "green",
              color: "dark-green",
              fontWeight: "medium",
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button onClick={login} variant="secondary" marginRight="10px">
      Connect
    </Button>
  );
};

export default PrivyAuthButton;
