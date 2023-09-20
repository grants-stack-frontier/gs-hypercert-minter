import useSWR from "swr";
import {getHyperCertClient} from "./useHypercert";
import {useWallets} from "@privy-io/react-auth";
import {useAccount} from "wagmi";

export const useMyHypercerts = () => {
  const { wallets } = useWallets();
  const { address } = useAccount();

  return useSWR("myHypercerts", async () => {
    const hypercertClient = await getHyperCertClient(wallets)
    if (!address) {
      return null;
    }
    return hypercertClient.hyperCertClient?.indexer.claimsByOwner(address);
  });
}