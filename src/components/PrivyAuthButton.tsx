"use client";
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { formatAddress } from "utils/formatting";
import { useBalance } from "wagmi";
import ChainSwitcher from "./ChainSwitcher";
import { useEffect } from "react";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

const PrivyAuthButton = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();
  const { setActiveWallet } = usePrivyWagmi();
  const { wallets } = useWallets();

  useEffect(() => {
    const activeWallet = wallets.find(
      (w) => w.address === user?.wallet?.address
    );
    if (activeWallet) {
      void setActiveWallet(activeWallet);
    }
  }, [wallets.length, user?.wallet?.address, setActiveWallet, authenticated]);

  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();

  const address = user?.wallet?.address;
  if (!ready) return <Box>Loading...</Box>;

  if (authenticated) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bgColor="dark-green"
          color="green"
          _hover={{ bgColor: "mid-green", textColor: "dark-green" }}
          _active={{ bgColor: "mid-green", textColor: "dark-green" }}
        >
          {`Logged in as ` + formatAddress(address ?? "")}
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
          <ChainSwitcher />
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
