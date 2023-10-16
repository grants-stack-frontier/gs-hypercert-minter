"use client";
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { formatAddress } from "utils/formatting";
import { useBalance, useChainId, useNetwork } from "wagmi";
import { ChainSwitcher } from "./ChainSwitcher";
import { useEffect, useState } from "react";

import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useWallets } from "@privy-io/react-auth";
import { useAuthenticationAndChainCheck } from "hooks/useAuthenticationAndCorrectChain";

const PrivyAuthButton = () => {
  const { ready, login, authenticated, user, logout } = usePrivy();
  const authenticatedAndCorrectChain = useAuthenticationAndChainCheck();
  const { chains } = useNetwork();
  const chainId = useChainId();
  const { wallet: activeWallet, ready: privyWagmiReady } = usePrivyWagmi();
  const { wallets } = useWallets();

  const [buttonText, setButtonText] = useState("");
  const [hasConnected, setHasConnected] = useState(false);

  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();

  const address = user?.wallet?.address;

  useEffect(() => {
    let newButtonText = "Connect";
    let newHasConnected = false;
    if (ready && privyWagmiReady) {
      if (activeWallet && authenticatedAndCorrectChain.length > 0) {
        newButtonText = `Logged in as ${formatAddress(address ?? "")}`;
        newHasConnected = true;
      } else if (
        activeWallet &&
        authenticatedAndCorrectChain.length === 0 &&
        !chains.find((connectedChain) => connectedChain.id === chainId)
      ) {
        newButtonText = "Please check your wallet and network";
      }
    } else if (!authenticatedAndCorrectChain && privyWagmiReady) {
      if (hasConnected && !wallets[0]) {
        void logout();
      } else {
        newButtonText = "Please check your wallet and network";
      }
    }

    setButtonText(newButtonText);
    setHasConnected(newHasConnected);
  }, [
    activeWallet,
    hasConnected,
    logout,
    authenticated,
    chains,
    chainId,
    address,
    ready,
    privyWagmiReady,
    authenticatedAndCorrectChain,
    wallets,
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
          {buttonText}
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
          <ChainSwitcher chains={chains} />
          <MenuItem
            bg={"transparent"}
            _hover={{
              bgColor: "green",
              color: "dark-green",
              fontWeight: "medium",
            }}
            onClick={() => router.push("/my-hypercerts")}
          >
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
