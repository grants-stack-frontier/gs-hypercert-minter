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
import { useEffect, useState } from "react";
import { useHypercertClient } from "hooks/useHypercert";
import { useWalletUpdateListener } from "hooks/useWalletUpdateListener";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { usePrivy } from "@privy-io/react-auth";
import { useAuthenticationAndChainCheck } from "hooks/useAuthenticationAndCorrectChain";

type ClaimByOwnerQuery = Pick<
  Claim,
  | "chainName"
  | "contract"
  | "tokenID"
  | "creator"
  | "id"
  | "owner"
  | "totalUnits"
  | "uri"
>;

const MyHypercertsPage = () => {
  const { wallets } = useWallets();
  const { chains } = useNetwork();
  const chainId = useChainId();

  const { user } = usePrivy();
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const [resolvedData, setResolvedData] = useState<
    | { id: string; claim: ClaimByOwnerQuery; metadata: HypercertMetadata }[]
    | null
  >(null);

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
    setResolvedData(null);
    setHasFetched(false);
    const fetchClaimsAndMetadata = async () => {
      if (!hyperCertClient) {
        return;
      }
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

      const fetchedData: {
        id: string;
        claim: ClaimByOwnerQuery;
        metadata: HypercertMetadata;
      }[] = [];

      if (result?.claims) {
        // const filteredClaims = result.claims.filter(
        //   (claim: ClaimByOwnerQuery) =>
        //     chainId === 5
        //       ? claim.chainName === "hypercerts-testnet"
        //       : claim.chainName === "hypercerts-testnet"

  
        // );

        for (const claim of result.claims) {
          const claimMetadata: HypercertMetadata =
            await hyperCertClient.storage.getMetadata(claim.uri!);
            console.log(claimMetadata)
          // can check for prop.network below but not included on previous hypercerts
          const isGreenPillCertOnCorrectNetwork =
            claimMetadata?.properties?.some(
              (prop) => 
              (chainId === 10 && 
                prop.trait_type === "GreenPill" && 
                prop.value === "true") || 
              (chainId === 5 && 
                !(prop.trait_type === "GreenPill" && 
                  prop.value === "true"))
            );

          if (isGreenPillCertOnCorrectNetwork) {
            fetchedData.push({ id: claim.id, claim, metadata: claimMetadata });
          }
        }
      }

      setResolvedData(fetchedData);
    };

    setIsLoading(true);
    fetchClaimsAndMetadata()
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
        setHasFetched(true);
      });
  }, [hyperCertClient, wallets, chainId]);

  const renderHypercertTile = (idAndMetadata: { id: string; claim: ClaimByOwnerQuery; metadata: HypercertMetadata } ) => (
    <GridItem key={idAndMetadata.id}>
      <HypercertTile data={idAndMetadata} />
    </GridItem>
  );

  return (
    <LandingLayout>
      <Center>
        <SimpleGrid
          maxWidth={960}
          columns={
            resolvedData && resolvedData.length > 0 && !isLoading ? 3 : 1
          }
          spacing={4}
          m={10}
        >
          {isLoading || !hasFetched ? (
            <VStack
              spacing={4}
              w="full"
              h="full"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize="2xl"
                color="gray.600"
                fontWeight="bold"
                marginBottom=".5rem"
              >
                Fetching Hypercerts...
              </Text>
              <Spinner size="xl" color="gray.600" />
            </VStack>
          ) : hasFetched && resolvedData && resolvedData.length === 0 ? (
            <VStack alignItems="center" spacing={4}>
              <Text color="black" fontSize="xl" fontWeight="bold">
                No hypercerts found on this network.
              </Text>
            </VStack>
          ) : (
            resolvedData && resolvedData.map(renderHypercertTile)

          )}
        </SimpleGrid>
      </Center>
      {!isLoading && resolvedData && resolvedData.length > 0 && (
        <Link href="/">
          <Button backgroundColor="dark-green" textColor="white">
            Return to Minter
          </Button>
        </Link>
      )}
    </LandingLayout>
  );
};

export default MyHypercertsPage;
