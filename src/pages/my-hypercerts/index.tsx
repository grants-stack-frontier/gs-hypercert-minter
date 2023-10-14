import type { Claim, HypercertMetadata } from "@hypercerts-org/sdk";
import {
  Button,
  Center,
  GridItem,
  SimpleGrid,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HypercertTile } from "../../components/HypercertTile";
import { LandingLayout } from "layouts/Layout";
import Link from "next/link";
import { useWallets } from "@privy-io/react-auth";
import { useChainId, useNetwork } from "wagmi";
import { useEffect, useState, useMemo } from "react";
import { useHypercertClient } from "hooks/useHypercert";
import { useWalletUpdateListener } from "hooks/useWalletUpdateListener";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { usePrivy } from "@privy-io/react-auth";
import useSWR from "swr";
import { fetchChapters } from "utils/db";
import { useAuthenticationAndChainCheck } from "hooks/useAuthenticationAndCorrectChain";

type ClaimsByOwnerQuery = {
  claims: Array<
    Pick<
      Claim,
      | "chainName"
      | "contract"
      | "tokenID"
      | "creator"
      | "id"
      | "owner"
      | "totalUnits"
      | "uri"
    >
  >;
};
const MyHypercertsPage = () => {
  const { data: chapters } = useSWR("chapters", fetchChapters);
  const { wallets } = useWallets();
  const { chains } = useNetwork();
  const chainId = useChainId();

  const { user } = usePrivy();
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();

  const [data, setData] = useState<ClaimsByOwnerQuery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [resolvedClaims, setResolvedClaims] = useState<Claim[] | null>(null);

  useWalletUpdateListener(
    chainId,
    activeWallet,
    wallets,
    user,
    chains,
    setActiveWallet
  );
  const hyperCertClient = useHypercertClient();

  useAuthenticationAndChainCheck();

  useEffect(() => {
    const fetchClaims = async () => {
      if (!hyperCertClient) return;
      setIsLoading(true);
      const wallet = wallets.find((wallet) => wallet.isConnected);
      if (!wallet) return;
      const result = await hyperCertClient.indexer.claimsByOwner(
        wallet.address,
        {
          orderDirections: "desc",
          skip: 0,
          first: 1000,
        }
      );
      setData(result);
      setIsLoading(false);
    };
    void fetchClaims();
  }, [hyperCertClient, wallets]);

  const filteredClaims = useMemo(() => {
    if (!data?.claims) return [];

    return data.claims.filter(
      (
        claim: Pick<
          Claim,
          | "chainName"
          | "contract"
          | "tokenID"
          | "creator"
          | "id"
          | "owner"
          | "totalUnits"
          | "uri"
        >
      ) =>
        chainId === 5
          ? claim.chainName === "hypercerts-testnet"
          : claim.chainName === "hypercerts-testnet"
    );
  }, [data, chainId]);

  useEffect(() => {
    const fetchClaimsWithMatchingMetadata = async () => {
      const claimsPromises = filteredClaims.map(async (claim) => {
        if (!hyperCertClient) return undefined;

        const claimMetadata: HypercertMetadata =
          await hyperCertClient.storage.getMetadata(claim.uri!);
        const isMatchingChapter = chapters?.some(
          (chapter) => chapter.label === claimMetadata.name
        );

        return isMatchingChapter ? claim : undefined;
      });

      const resolved = await Promise.all(claimsPromises);
      setResolvedClaims(resolved.filter(Boolean) as Claim[]);
    };

    fetchClaimsWithMatchingMetadata().catch(console.error);
  }, [filteredClaims, hyperCertClient, chapters]);

  return (
    <LandingLayout>
      <Center>
        <SimpleGrid
          maxWidth={960}
          columns={data?.claims.length === 0 ? 1 : 3}
          spacing={4}
          m={10}
        >
          {isLoading ? (
            <Spinner />
          ) : filteredClaims.length === 0 ? (
            <VStack alignItems="center" spacing={4}>
              <Text color="black" fontSize="xl" fontWeight="bold">
                No hypercerts found on this network.
              </Text>
            </VStack>
          ) : (
            resolvedClaims &&
            resolvedClaims.map((claim) => (
              <GridItem key={claim.id}>
                {claim.uri ? <HypercertTile {...claim} /> : null}
              </GridItem>
            ))
          )}
        </SimpleGrid>
      </Center>
      <Link href="/">
        <Button backgroundColor="dark-green" textColor="white">
          Return to Minter
        </Button>
      </Link>
    </LandingLayout>
  );
};

export default MyHypercertsPage;
