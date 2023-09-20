import useSWR from "swr";
import {getHyperCertClient} from "./useHypercert";
import {useWallets} from "@privy-io/react-auth";

export const useGetHypercertData = (uri: string) => {
  const { wallets } = useWallets();

  return useSWR(['metadata', uri], async () => {
    const hypercertClient = await getHyperCertClient(wallets)
    return hypercertClient.hyperCertClient?.storage.getMetadata(uri)
  });
}