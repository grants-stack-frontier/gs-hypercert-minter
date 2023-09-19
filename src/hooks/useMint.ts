import type { HypercertClient} from "@hypercerts-org/sdk";
import { TransferRestrictions, type HypercertMetadata } from "@hypercerts-org/sdk";
import type { ConnectedWallet } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import useSWR from 'swr';
import { getHyperCertClient } from './useHypercert';
import { useAtom } from "jotai";
import { intentAtom } from "pages";

const totalUnits = "1000";

const fetcher = async (metadata: HypercertMetadata, wallets: ConnectedWallet[]) => {

  const hyperCertClient = await getHyperCertClient(wallets) as HypercertClient;

  console.log("Did we get a hyperCertClient?", hyperCertClient)

  return hyperCertClient?.mintClaim(metadata, totalUnits, TransferRestrictions.FromCreatorOnly);
}

const useMint = (metadata: HypercertMetadata, wantToMint: boolean) => {



  const { wallets } = useWallets();
  const [, setWantToMint] = useAtom(intentAtom);

  const wallet = wallets.find((wallet) => wallet.isConnected);

  let key = null;
  
  if (wallet?.address) {
    key = [wallet.address, wantToMint];
  }

  const { data, error } = useSWR(key, () => fetcher(metadata, wallets));





  if (error) {
    console.log("Error minting", error);
    setWantToMint(false);
  }

  if (data) {
    console.log("Minting!", data);
    setWantToMint(false);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useMint;
