import { HypercertClient } from "@hypercerts-org/sdk";
import type { ConnectedWallet} from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import useSWR from 'swr';

async function initClient(wallets:ConnectedWallet[]) {
  
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const provider = await embeddedWallet?.getEthersProvider() // ethers provider object

  if(provider === undefined) return null;
  
  const signer = provider.getSigner(); // ethers signer object

  const tokens = {
    nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
    web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
  };

  return new HypercertClient({
    chainId: 5,
    operator: signer,
    ...tokens,
  });
}

export function useHypercertClient() {
  const { wallets } = useWallets();

  const fetcher = async () => initClient(wallets);
  const { data: hyperCertClient, error } = useSWR(fetcher, {
  shouldRetryOnError: false,
  revalidateOnFocus: false
  });


  return { hyperCertClient, error };
}
