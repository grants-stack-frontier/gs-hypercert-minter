import type { Claim } from "@hypercerts-org/sdk";
import { useGetHypercertData } from "../hooks/useGetHypercertData";
import Link from "next/link";
import Image from "next/image";
import { HStack, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useChainId } from "wagmi";

export const HypercertTile = ({ uri, id }: Omit<Claim, "creation">) => {
  const { data } = useGetHypercertData(uri ?? "");
  const chainId = useChainId();

  if (!data) {
    return null;
  }

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
      <Image src={data.image} alt={data.name} width={320} height={400} />
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
          href={`https://grants-builder.greenpill.network/#/projects/new?chainId=${chainId}&hypercertId=${id}`}
          color="dark-green"
          target={"_blank"}
        >
          <ExternalLinkIcon boxSize={4} /> Apply
        </Link>
      </HStack>
    </VStack>
  );
};
