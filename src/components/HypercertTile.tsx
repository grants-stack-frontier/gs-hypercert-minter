import Link from "next/link";
import Image from "next/image";
import { HStack, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useChainId } from "wagmi";
import type { HypercertMetadata } from "@hypercerts-org/sdk";

interface HypercertTileProps {
  data: { id: string; metadata: HypercertMetadata };
}

export const HypercertTile = ({ data }: HypercertTileProps) => {
  const chainId = useChainId();

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
        justifyContent={"flex-end"}
        w={"max"}
        px={4}
        py={2}
        _hover={{
          background: "green",
          fontWeight: "medium",
          borderRadius: "full",
          textColor: "dark-green",
        }}
      >
        <Link
          href={`https://grants-builder.greenpill.network/#/projects/new?chainId=${chainId}&hypercertId=${data.id}`}
          color="dark-green"
          target={"_blank"}
        >
          <ExternalLinkIcon boxSize={4} /> Apply
        </Link>
      </HStack>
    </VStack>
  );
};
