import { useHypercertClient } from "hooks/useHypercert";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { createOpenSeaUrl } from "./OpenSeaButton";
import { Button } from "@chakra-ui/react";
import type { HypercertClient } from "@hypercerts-org/sdk";

export const TweetButton = ({ text = "", tokenId = "" }) => {
  const {hyperCertClient} = useHypercertClient();
  
  const { chain } = useNetwork();
  if (!chain?.id) {
    return null;
  }
  return (
    <Button
      className="w-64"
      as={Link}
      color="twitter"
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${text}&url=${createOpenSeaUrl(
        (hyperCertClient as HypercertClient)?.contract?.address,
        tokenId,
        chain.id
      )}`}
    >
      Tweet gratitude
    </Button>
  );
};
