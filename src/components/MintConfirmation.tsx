import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import confirmation from "utils/confirmation.json";
import Link from "next/link";
import type { Chain } from "wagmi";

interface MintConfirmationProps {
  txHash: string;
  chain?: Chain & { unsupported?: boolean };
}

export const MintConfirmation = (props: MintConfirmationProps) => {
  const { txHash } = props;

  return (
    <VStack m={8}>
      <Lottie
        animationData={confirmation}
        loop={false}
        style={{ height: 120 }}
      />
      <Heading
        color={"white"}
        fontSize={24}
        maxW={"300px"}
        fontWeight={"normal"}
        textAlign={"center"}
      >
        Your Hypercert Mint was successful
      </Heading>
      <HStack m={8}>
        <Link href={`/my-hypercerts`}>
          <Button as="a" variant={"secondary"}>
            View Hypercerts
          </Button>
        </Link>
        <Link
          href={
            props?.chain?.network
              ? `https://${props.chain.network}.etherscan.io/tx/${txHash}`
              : ""
          }
        >
          <Button
            as="a"
            gap={2}
            variant={"secondary"}
            bgColor={"green"}
            textColor={"dark-green"}
            disabled={!props?.chain?.network}
          >
            <ExternalLinkIcon boxSize={4} fontWeight={"medium"} />
            View Transaction
          </Button>
        </Link>
      </HStack>
    </VStack>
  );
};
