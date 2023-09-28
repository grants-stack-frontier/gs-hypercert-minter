import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import type { Chain } from "wagmi";
import { useNetwork } from "wagmi";

export default function ChainSwitcher() {
  const [chainName, setChainName] = useState<string>("" as string);
  const { chains, chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      setChainName(chain.name);
    }
  }, [chain]);

  const { wallets } = useWallets();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <MenuItem
        onClick={onOpen}
        bg={"transparent"}
        rounded={"md"}
        _hover={{ bgColor: "green", color: "dark-green", fontWeight: "medium" }}
      >
        Switch Network
      </MenuItem>
      <MenuItem
        bg={"transparent"}
        rounded={"md"}
        _hover={{ bgColor: "green", color: "dark-green", fontWeight: "medium" }}
      >
        Connected to: {chainName ? chainName : "Loading..."}
      </MenuItem>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(20px)" />
        <ModalContent
          background={"#242423"}
          rounded={"2xl"}
          p={2}
          color={"white"}
          fontWeight={"medium"}
        >
          <ModalHeader>Select a Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                    p={2}
                    rounded={"md"}
                    _hover={{
                      bgColor: "green",
                      color: "dark-green",
                      fontWeight: "medium",
                    }}
                  >
                    {chainItem.name}
                  </MenuItem>
                );
              })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
