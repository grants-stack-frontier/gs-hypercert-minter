import { useMyHypercerts } from "../hooks/useMyHypercerts";
import { Center, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { HypercertTile } from "../components/HypercertTile";
import { LandingLayout } from "layouts/Layout";

const MyHypercertsPage = () => {
  const { data, isLoading } = useMyHypercerts();

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
        <SimpleGrid maxWidth={960} columns={3} spacing={4} m={10}>
          {data?.claims.map((claim) => (
            <GridItem key={claim.id}>
              {claim.uri ? <HypercertTile {...claim} /> : null}
            </GridItem>
          ))}
        </SimpleGrid>
      </Center>
    </LandingLayout>
  );
};

export default MyHypercertsPage;
