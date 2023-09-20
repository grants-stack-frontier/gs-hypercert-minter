import {useMyHypercerts} from "../hooks/useMyHypercerts";
import {Center, GridItem, SimpleGrid, Spinner} from "@chakra-ui/react";
import {HypercertTile} from "../components/HypercertTile";
import { LandingLayout } from "layouts/Layout";

const MyHypercertsPage = () => {
  const { data, isLoading } = useMyHypercerts();

  if (isLoading) {
    return <Spinner />;
  }

  return (
<LandingLayout>
    <Center>

      <SimpleGrid maxWidth={960} columns={3} spacing={4}>
        {data?.claims.map((claim) => (
          <GridItem>{claim.uri ? <HypercertTile {...claim} />: null}</GridItem>
        ))}
      </SimpleGrid>
    </Center>
    </LandingLayout>
  );
}

export default MyHypercertsPage;