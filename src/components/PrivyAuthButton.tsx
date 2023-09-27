"use client";
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverHeader,
  Portal,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { formatAddress } from "utils/formatting";
import { useBalance } from "wagmi";
import { useNetwork } from "wagmi";
import { useRouter } from "next/router";
import { useWallets } from "@privy-io/react-auth";
import type { Chain } from "wagmi";
import { useDisclosure } from "@chakra-ui/react";

const PrivyAuthButton = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { chains, chain } = useNetwork();
  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });
  const { wallets } = useWallets();
  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();

  const [chainName, setChainName] = useState<string>("" as string);

  useEffect(() => {
    if (chain) {
      setChainName(chain.name);
    }
  }, [chain]);

  const address = user?.wallet?.address;
  if (!ready) return <Box>Loading...</Box>;

  if (authenticated) {
    return (
      <Menu onClose={onClose}>
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
        <MenuList>
          <MenuItem
            onClick={() => copyToClipboard(user?.wallet?.address as string)}
          >
            <CopyIcon mr={2} /> Copy Wallet Address
          </MenuItem>
          <MenuItem>
            Connected to: {chainName ? chainName : "Loading..."}
          </MenuItem>
          <Popover closeOnBlur={false} isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button
                as="div"
                variant="unstyled"
                fontWeight="bold"
                textAlign="left"
                p={0}
                _hover={{ bg: "gray.100" }}
                _focus={{ boxShadow: "none" }}
                onClick={onOpen}
              >
                Switch Network
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Select a Network</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {chains &&
                    chains.map((chainItem: Chain) => {
                      if (chainItem.name === chainName) {
                        return null;
                      }
                      return (
                        <MenuItem
                          key={chainItem.name}
                          onClick={async () => {
                            if (wallets && wallets[0]) {
                              try {
                                await wallets[0].switchChain(chainItem.id);
                                onClose();
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}
                        >
                          {chainItem.name}
                        </MenuItem>
                      );
                    })}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>

          <MenuItem>
            {data?.formatted} {data?.symbol}
          </MenuItem>
          <MenuItem onClick={() => router.push("/my-hypercerts")}>
            {" "}
            My Hypercerts
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
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
