"use client";
import { Button, Spinner } from "@chakra-ui/react";
import { HypercertClient } from "@hypercerts-org/sdk";
import { LandingLayout } from "layouts/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { useNetwork, useWaitForTransaction } from "wagmi";
const createTxUrl = (hash: string, network: string) => {
  const networkMap = { goerli: "goerli", optimism: "optimistic" };
  const prefix = networkMap[network as keyof typeof networkMap];

  return `https://${prefix}.etherscan.io/tx/${hash}`;
};

const metadatafetcher = async (id: string) => {
  const hypercertClient = new HypercertClient({
    chainId: 5,
  });

  return hypercertClient.indexer.claimById(id);
};

const MintingCert: NextPage = () => {
  const router = useRouter();
  const hash = router.query.hash as `0x${string}`;
  const { chain } = useNetwork();
  const tx = useWaitForTransaction({ hash, enabled: !!hash });

  const {data: metadata} = useSWR(tx.data?.logs?.[1], metadatafetcher);

  const {claim}  = metadata || {};

  useEffect(() => {
    if (tx.data?.logs) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const claimId = [tx.data.to?.toLowerCase(), claim?.id as string].join("-");
      void router.push(`/hypercert/${claimId}`);
    }
  }, [claim, metadata, router, tx.data?.logs, tx.data?.to]);
  
  

  return (
    <LandingLayout>
      <div className="flex h-full flex-col items-center sm:pt-32">
        <Spinner />
        <div className="mb-16 pt-8 text-2xl font-bold italic text-indigo-900 sm:mb-32">
          Minting...
        </div>

        <Button
          as={Link}
          href={createTxUrl(hash, chain?.network as string)}
        >
          View Transaction
        </Button>
      </div>
    </LandingLayout>
  );
};

export default MintingCert;
