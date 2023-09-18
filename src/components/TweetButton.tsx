import { getHyperCertClient } from "hooks/useHypercert";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { createOpenSeaUrl } from "./OpenSeaButton";
import { Button } from "@chakra-ui/react";
import type { HypercertClient } from "@hypercerts-org/sdk";
import { useWallets } from "@privy-io/react-auth";

export const TweetButton = async ({ text = "", tokenId = "" }) => {
  const {wallets} = useWallets();

  const hyperCertClient = await getHyperCertClient(wallets) as HypercertClient;
  
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
        (hyperCertClient)?.contract?.address,
        tokenId,
        chain.id
      )}`}
    >
      Tweet gratitude
    </Button>
  );
};
