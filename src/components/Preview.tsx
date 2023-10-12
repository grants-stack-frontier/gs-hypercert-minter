import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import type { HypercertMetadata } from "@hypercerts-org/sdk";
import { useWallets } from "@privy-io/react-auth";
import { HypercertDisplay } from "./HypercertDisplay";
import { validateFormData } from "pages";
import React, { useState } from "react";
import PreviewData from "utils/DataPreview";
import mintClaim from "utils/mint";

import type { ContractTransaction } from "ethers";
import { type formSchema } from "utils/types";
import { MintConfirmation } from "./MintConfirmation";
import { useWaitForTransaction, type Chain } from "wagmi";

interface PreviewProps {
  formData: formSchema;
  image: string;
  authenticatedAndCorrectChain: string;
  chain: Chain | undefined;
}

const Preview: React.FC<PreviewProps> = ({
  formData,
  image,
  authenticatedAndCorrectChain,
  chain,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useWallets();

  const [tx, setTx] = useState<ContractTransaction>();
  const [loading, setLoading] = useState(false);

  const shouldweMint = validateFormData(formData, image as unknown as string);

  const { isSuccess } = useWaitForTransaction({
    hash: tx?.hash as `0x${string}`,
  });

  const handleMint = async () => {
    let transaction;

    if (chain && shouldweMint) {
      try {
        setLoading(true);
        transaction = await mintClaim(
          wallets,
          shouldweMint as unknown as HypercertMetadata,
          true,
          chain?.id
        );

        if (transaction) {
          setLoading(false);
          console.log("transaction", transaction);
          setTx(transaction);
        }
      } catch (e) {
        setLoading(false);
        return new Error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Tooltip
        label="Please connect via the button in the top right corner to continue"
        placement="top"
        isDisabled={authenticatedAndCorrectChain.length > 0}
      >
        <Button
          onClick={shouldweMint ? onOpen : onClose}
          type="submit"
          variant={"secondary"}
          w={"full"}
          my={8}
          color={"green"}
          _hover={{ bgColor: "green", textColor: "dark-green" }}
          width={"max"}
          isDisabled={!authenticatedAndCorrectChain}
        >
          Preview Hypercert
        </Button>
      </Tooltip>

      <Modal isCentered={true} isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(20px)" />
        {tx?.hash ? (
          isSuccess ? (
            <ModalContent background={"#242423"} rounded={"2xl"} p={2}>
              <ModalHeader fontWeight={"600"} color={"white"}>
                Mint Success
              </ModalHeader>
              <ModalCloseButton
                onClick={() => {
                  onClose();
                  setTx(undefined);
                }}
              />
              <ModalBody>
                <MintConfirmation txHash={tx?.hash} chain={chain} />
              </ModalBody>
            </ModalContent>
          ) : (
            <ModalContent
              background={"#242423"}
              rounded={"2xl"}
              p={2}
              height="400px"
            >
              <ModalHeader
                fontWeight={"600"}
                color={"white"}
                textAlign="center"
                fontSize={"300%"}
              >
                Minting...
              </ModalHeader>
              <ModalBody>
                <Flex justify="center" align="center" height="100%">
                  <Spinner size="xl" thickness="4px" color="green" />
                </Flex>
              </ModalBody>
            </ModalContent>
          )
        ) : (
          <ModalContent
            background={"#242423"}
            rounded={"3xl"}
            p={2}
            width={"max"}
          >
            <ModalHeader fontWeight={"600"} color={"white"}>
              Preview Hypercert
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody maxWidth={"100vw"}>
              <Flex justifyContent={"space-between"} gap={4} flexWrap={"wrap"}>
                <Box w={"360px"}>
                  <PreviewData formData={formData} />
                </Box>

                <HypercertDisplay formData={formData} />
              </Flex>
            </ModalBody>
            <ModalFooter gap={4}>
              <Button
                variant={"secondary"}
                bgColor={"green"}
                textColor={"dark-green"}
                _hover={{ textColor: "green", bgColor: "dark-green" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={"secondary"}
                width={"max"}
                onClick={handleMint}
                _hover={{ bgColor: "green", textColor: "dark-green" }}
              >
                <ArrowRightIcon mr={2} />
                {loading ? <>Confirm in your wallet</> : <> Mint HyperCert</>}
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default Preview;
