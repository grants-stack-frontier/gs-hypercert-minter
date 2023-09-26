import {useHypercertClient} from "./useHypercert";
import {useQuery} from "@tanstack/react-query";

export const useGetHypercertData = (uri: string) => {
  const hypercertClient = useHypercertClient();

  return useQuery(['metadata', uri], async () => {
    return hypercertClient?.storage.getMetadata(uri)
  }, {
    enabled: !!hypercertClient,
  });
}