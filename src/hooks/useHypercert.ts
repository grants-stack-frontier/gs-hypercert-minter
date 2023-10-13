import { HypercertClient } from "@hypercerts-org/sdk";
import type { ConnectedWallet } from "@privy-io/react-auth";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
};

export const useHypercertClient = () => {
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const chainId = useChainId();
  const [hyperCertClient, setHyperCertClient] =
    useState<HypercertClient | null>(null);

  useEffect(() => {
    const loadHyperCertClient = async () => {
      if (!chainId || !wallets.length) {
        console.log("no chain or wallets");
        setHyperCertClient(null);
        return;
      }
      const { hyperCertClient } = await getHyperCertClient(wallets, chainId);
      setHyperCertClient(hyperCertClient);
    };

    void loadHyperCertClient();
  }, [wallets.length, ready, chainId, wallets]);

  return hyperCertClient;
};

export async function getHyperCertClient(
  wallets: ConnectedWallet[],
  chainId: number
) {
  const wallet = wallets.find((wallet) => wallet.isConnected);

  if (!wallet) {
    return { hyperCertClient: null };
  }

  const provider = await wallet?.getEthersProvider(); // ethers provider object

  if (!provider) {
    return { hyperCertClient: null };
  }

  const signer = provider.getSigner(wallet?.address); // ethers signer object

  // console.log("loaded signer", await signer.getChainId());

  return {
    hyperCertClient: new HypercertClient({
      chainId: chainId,
      operator: signer,
      ...tokens,
    }),
  };
}
