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
import HyperCertificate from "components/HyperCert";
import { useAtom } from "jotai";
import { intentAtom } from "pages";
import React from "react";
import PreviewData from "utils/DataPreview";
import { type formSchema } from "utils/types";

interface PreviewCompProps {
  formData: formSchema;
  handleForm: () => Promise<boolean>;
}

const PreviewComp: React.FC<PreviewCompProps> = ({ formData, handleForm }) => {
  
  
  
  const [wantToMint, setWantToMint] = useAtom(intentAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  

  return (
    <>
      <Button
            onClick={async () => await handleForm() ?  onOpen() : null}
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
            <Button variant={'secondary'} bgColor={'green'} textColor={'dark-green'} onClick={() => {onClose();  wantToMint ? setWantToMint(false): onClose()}}>Cancel</Button>
            <Button
              type="submit"
              variant={"secondary"}
              width={"max"}
              onClick={handleForm}
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
