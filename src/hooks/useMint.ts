import useSWR from 'swr';
import type { HypercertClient } from "@hypercerts-org/sdk";
import { TransferRestrictions, type HypercertMetadata } from "@hypercerts-org/sdk";
import { getHyperCertClient } from './useHypercert';
import type { ConnectedWallet} from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';

const totalUnits = "1000";

const fetcher = async (metadata: HypercertMetadata, wallets: ConnectedWallet[]) => {

  const hyperCertClient = await getHyperCertClient(wallets) as HypercertClient;

  console.log("Did we get a hyperCertClient?", hyperCertClient)

  return hyperCertClient?.mintClaim(metadata, totalUnits, TransferRestrictions.FromCreatorOnly);
}

const useMint = (metadata: HypercertMetadata) => {
  
  const { wallets } = useWallets();
  const { data, error } = useSWR('get_mint', () => fetcher(metadata, wallets));
  
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useMint;
