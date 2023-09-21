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
} from "@chakra-ui/react";
import type { HypercertMetadata } from "@hypercerts-org/sdk";
import { useWallets } from "@privy-io/react-auth";
// import HyperCertificate from "components/HyperCert";
import { HypercertDisplay } from "./HypercertDisplay";
import { validateFormData } from "pages";
import React, { useState } from "react";
import PreviewData from "utils/DataPreview";
import mintClaim from "utils/mint";

import type { ContractTransaction } from "ethers";
import { type formSchema } from "utils/types";
import Confirmation from "./Confirmation";
interface PreviewCompProps {
  formData: formSchema;
  image: string | null | void;
}

const PreviewComp: React.FC<PreviewCompProps> = ({ formData, image }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { wallets } = useWallets();

  
  const [tx, setTx] = useState<ContractTransaction>();

  const shouldweMint = validateFormData(formData, image as unknown as string);
  const mintNow =  async () => await mintClaim(wallets, shouldweMint as unknown as HypercertMetadata, true);


  const handleMint = async () => {
    const result =  shouldweMint ? await mintNow() : false;

    if(result) 
      {
        console.log(result)
        setTx(result)
        
      }
      return new Error("Something went wrong");
  }


  return (
    <>
      <Button
        onClick={!shouldweMint ? onClose : onOpen}
        type="submit"
        variant={"secondary"}
        w={"full"}
        my={8}
        color={"green"}
        _hover={{ bgColor: "green", textColor: "dark-green" }}
        width={"max"}
      >
        Preview Hypercert
      </Button>
      <Modal isCentered={true} isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(20px)"
        />
        {tx?.blockHash || tx?.hash ? <ModalContent background={"#242423"} rounded={"2xl"} p={2}>
          <ModalHeader fontWeight={"400"}>Mint Success</ModalHeader>
          <ModalCloseButton onClick={() => {onClose(); setTx(undefined)}} />
          <ModalBody>
            <Confirmation id="confirmation" />

          </ModalBody>
          </ModalContent>
              :

        <ModalContent background={"#242423"} rounded={"2xl"} p={2}>
          <ModalHeader fontWeight={"400"}>Preview Hypercert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={"row"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box w={"360px"}>
                <PreviewData formData={formData} />
              </Box>

              <Box
                minW={"400px"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                {/* <HyperCertificate
                  formData={formData}
                /> */}
                <HypercertDisplay formData={formData} />
              </Box>
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
              <ArrowRightIcon mr={2} /> Mint HyperCert
            </Button>
          </ModalFooter>
        </ModalContent>}
      </Modal>
    </>
  );
};

export default PreviewComp;
