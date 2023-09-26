import {useHypercertClient} from "./useHypercert";
import {usePrivy} from "@privy-io/react-auth";
import {useQuery} from "@tanstack/react-query";

export const useMyHypercerts = () => {
  const { user } = usePrivy();
  const client = useHypercertClient();
  const address = user?.wallet?.address;

  return useQuery(["my-hypercerts", address], async () => {
    if (!client || !address) {
      return null;
    }
    return client.indexer.claimsByOwner(address);
  }, {
    enabled: !!client && !!address,
  });

}