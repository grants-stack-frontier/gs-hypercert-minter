import { HypercertClient } from "@hypercerts-org/sdk";
import type { ConnectedWallet } from '@privy-io/react-auth';
import {usePrivy, useWallets} from "@privy-io/react-auth";
import {useEffect, useState} from "react";
import {useNetwork} from "wagmi";

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
};

export const useHypercertClient = () => {
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const [hyperCertClient, setHyperCertClient] = useState<HypercertClient | null>(null);
  const { chain } = useNetwork();


  useEffect(() => {
    const loadHyperCertClient = async () => {
      const { hyperCertClient } = await getHyperCertClient(wallets, chain?.id || 10);
      setHyperCertClient(hyperCertClient);
    };

    void loadHyperCertClient();
  }, [wallets, ready, chain?.id]);

  return hyperCertClient;
}


export async function getHyperCertClient(wallets: ConnectedWallet[], chainId: number) {
  const wallet = wallets.find((wallet) => wallet.isConnected);

  // void wallet?.switchChain(chainId);

  const provider = await wallet?.getEthersProvider(); // ethers provider object

  if (!provider) {
    return { hyperCertClient: null };
  }

  const signer = provider.getSigner(wallet?.address); // ethers signer object

  console.log("loaded signer", signer);

  return {
    hyperCertClient: new HypercertClient({
      chainId: chainId,
      operator: signer,
      ...tokens,
    }),
  };
}

