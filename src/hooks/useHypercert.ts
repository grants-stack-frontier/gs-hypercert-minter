import { HypercertClient } from "@hypercerts-org/sdk";
import type { ConnectedWallet } from '@privy-io/react-auth';
import {usePrivy, useWallets} from "@privy-io/react-auth";
import {useEffect, useState} from "react";

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
};

export const useHypercertClient = () => {
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const [hyperCertClient, setHyperCertClient] = useState<HypercertClient | null>(null);

  useEffect(() => {
    const loadHyperCertClient = async () => {
      const { hyperCertClient } = await getHyperCertClient(wallets);
      setHyperCertClient(hyperCertClient);
    };

    void loadHyperCertClient();
  }, [wallets, ready]);

  return hyperCertClient;
}


export async function getHyperCertClient(wallets: ConnectedWallet[]) {
  const wallet = wallets.find((wallet) => wallet.isConnected);
  console.log("loaded wallet", wallet);


  void wallet?.switchChain(5);

  const provider = await wallet?.getEthersProvider(); // ethers provider object

  if (!provider) {
    return { hyperCertClient: null };
  }

  const signer = provider.getSigner(wallet?.address); // ethers signer object

  console.log("loaded signer", signer);

  return {
    hyperCertClient: new HypercertClient({
      chainId: 5,
      operator: signer,
      ...tokens,
    }),
  };
}

