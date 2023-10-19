import Link from "next/link";
import Image from "next/image";
import {Box, Button, HStack, VStack} from "@chakra-ui/react";
import {CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import { useChainId } from "wagmi";
import type { HypercertMetadata } from "@hypercerts-org/sdk";
import {useCopyToClipboard} from "@uidotdev/usehooks";

interface HypercertTileProps {
  data: { id: string; metadata: HypercertMetadata };
}

export const HypercertTile = ({ data }: HypercertTileProps) => {
  const chainId = useChainId();
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <VStack
      p={4}
      bgColor={"white"}
      shadow={"base"}
      border={"default-grey"}
      borderRadius={12}
      justifyContent={"flex-end"}
      alignItems={"flex-end"}
      _hover={{ backgroundColor: "gray.50" }}
    >
      <Image
        src={data.metadata.image}
        alt={data.metadata.name}
        width={320}
        height={400}
      />
      <HStack
        justifyContent={"space-between"}
        w={"100%"}
      >
        <Button onClick={() => copyToClipboard(data.id)} variant={'outline'}>
          <CopyIcon mr={2} />Copy ID
        </Button>
        <Box
          px={4}
          py={2}
          _hover={{
          background: "green",
          fontWeight: "medium",
          borderRadius: "full",
          textColor: "dark-green",
        }}>

          <Link
            href={`${process.env.NEXT_PUBLIC_GRANTS_BUILDER_URL}/#/projects/new?chainId=${chainId}&hypercertId=${data.id}`}
            color="dark-green"
            target={"_blank"}
          >
            <ExternalLinkIcon boxSize={4} /> Apply
          </Link>
        </Box>
      </HStack>
    </VStack>
  );
};
