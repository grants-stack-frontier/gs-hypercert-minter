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
  useDisclosure
} from "@chakra-ui/react";
import type { HypercertMetadata } from "@hypercerts-org/sdk";
import { useWallets } from "@privy-io/react-auth";
import HyperCertificate from "components/HyperCert";
import { validateFormData } from "pages";
import type { RefObject } from "react";
import React from "react";
import useSWR from "swr";
import PreviewData from "utils/DataPreview";
import mintClaim from "utils/mint";
import { exportImage } from "utils/svg";
import { type formSchema } from "utils/types";
interface PreviewCompProps {
  formData: formSchema;
  reference: RefObject<HTMLDivElement>;
}

const PreviewComp: React.FC<PreviewCompProps> = ({ formData, reference }) => {
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {wallets} = useWallets();
  
  const {data: image} = useSWR(reference, () => exportImage(reference))

  const shouldweMint = validateFormData(formData, image as unknown as string);
  

  return (
    <>
      <Button
            onClick={() => shouldweMint ?  onOpen() : null}
            type="submit"
            variant={"secondary"}
            w={"full"}
            my={8}
            width={"max"}
          >
            Preview Hypercert
          </Button>
      <Modal isCentered={true} isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(20px)"
        />
        <ModalContent background={'#242423'} rounded={'2xl'} p={2}>
          <ModalHeader fontWeight={'400'}>Preview HyperCert</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex flexDirection={'row'} justifyContent={'space-between'} gap={4}>
              
              
                
                
                
                <Box w={'360px'}>
                <PreviewData formData={formData} />
                </Box>
                
              
                <Box minW={'400px'} justifyContent={'flex-end'} alignItems={'center'}>
                <HyperCertificate
                  formData={formData}
                />
                </Box>
              
            </Flex>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button variant={'secondary'} bgColor={'green'} textColor={'dark-green'} onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant={"secondary"}
              width={"max"}
              onClick={shouldweMint ? () => mintClaim(wallets,shouldweMint as unknown as HypercertMetadata, true) : () => onClose()}
            >
              <ArrowRightIcon mr={2}/> Mint HyperCert
            </Button>
          </ModalFooter>  
        </ModalContent>
        
      </Modal>
    </>
  );
};

export default PreviewComp;
