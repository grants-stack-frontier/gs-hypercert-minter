import type { Claim } from "@hypercerts-org/sdk";
import {
  Button,
  Center,
  GridItem,
  SimpleGrid,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HypercertTile } from "../components/HypercertTile";
import { LandingLayout } from "layouts/Layout";
import Link from "next/link";
import { useWallets } from "@privy-io/react-auth";
import { useChainId } from "wagmi";
import { useEffect, useState, useMemo } from "react";
import { useHypercertClient } from "hooks/useHypercert";


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
  const { wallets } = useWallets();
  const chainId = useChainId();
  // const [hyperCertClient, setHyperCertClient] =
  //   useState<HypercertClient | null>(null);
  const [data, setData] = useState<ClaimsByOwnerQuery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hyperCertClient = useHypercertClient();

  // const loadHyperCertClient = useCallback(async () => {
  //   if (!chainId || !wallets.length) {
  //     console.log("no chain or wallets");
  //     setHyperCertClient(null);
  //     return;
  //   }
  //   const wallet = wallets.find((wallet) => wallet.isConnected);
  //   const provider = await wallet?.getEthersProvider();
  //   if (!provider) return;
  //   const signer = provider.getSigner(wallet?.address);
  //   const client = new HypercertClient({
  //     chainId: chainId,
  //     operator: signer,
  //     ...tokens,
  //   });
  //   setHyperCertClient(client);
  // }, [chainId, wallets]);

  // useEffect(() => {
  //   void loadHyperCertClient();
  // }, [wallets.length, ready, loadHyperCertClient]);

  useEffect(() => {
    const fetchClaims = async () => {
      if (!hyperCertClient) return;
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

  if (isLoading) {
    return (
      <LandingLayout>
        <Spinner />
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <Center>
        <SimpleGrid
          maxWidth={960}
          columns={data?.claims.length === 0 ? 1 : 3}
          spacing={4}
          m={10}
        >
          {filteredClaims.length === 0 ? (
            <VStack alignItems="center" spacing={4}>
              <Text color="black" fontSize="xl" fontWeight="bold">
                No hypercerts found on this network.
              </Text>
            </VStack>
          ) : (
            filteredClaims.map((claim) => (
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
