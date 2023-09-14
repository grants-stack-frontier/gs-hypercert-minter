import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import HyperCertificate from "components/HyperCert";
import React from "react";
import camelToTitle from "utils/case";
import type * as z from 'zod';
import type { schema } from "./GreenPillForm";

interface PreviewCompProps {
  formData: z.infer<typeof schema>;
}

const PreviewComp: React.FC<PreviewCompProps> = ({ formData }) => {
  const data = formData as unknown as Record<string, unknown>;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
            type="submit"
            onClick={onOpen}
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
        <ModalContent>
          <ModalHeader>Preview HyperCert</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDirection={"row"}>
            <Wrap>
              <WrapItem
                maxW={"full"}
                minW={"40%"}
                justifyContent={"space-between"}
              >
                {/* <Code h={'max'}>
                    {JSON.stringify(formData)}
                </Code> */}

                <Box w={"full"} gap={4}>
                  {Object.keys(data).map((key, i) => (
                    <div key={i}>
                      <FormLabel htmlFor={key}>{camelToTitle(key)}</FormLabel>
                      <Input id={key} isDisabled value={String(data[key])} />
                    </div>
                  ))}
                </Box>
              </WrapItem>
              <WrapItem p={3} minW={"50%"}>
                <HyperCertificate
                  formData={formData}
                />
              </WrapItem>
            </Wrap>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button variant={"outlined"} onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant={"secondary"}
              w={"full"}
              my={8}
              width={"150px"}
            >
              Mint HyperCert
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewComp;
