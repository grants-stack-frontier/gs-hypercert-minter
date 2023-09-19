import { Button } from "@chakra-ui/react";
import { useWallets } from "@privy-io/react-auth";
import { getHyperCertClient } from "hooks/useHypercert";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { createOpenSeaUrl } from "./OpenSeaButton";

export const TweetButton = async ({ text = "", tokenId = "" }) => {
  const {wallets} = useWallets();

  const {hyperCertClient} =  await getHyperCertClient(wallets);
  
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
        (hyperCertClient)?.contract?.address as string,
        tokenId,
        chain.id
      )}`}
    >
      Tweet gratitude
    </Button>
  );
};
