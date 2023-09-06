import { HypercertClient } from "@hypercerts-org/sdk";
import type { ConnectedWallet} from '@privy-io/react-auth';

const tokens = {
  nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
};

export async function getHyperCertClient(wallets: ConnectedWallet[]) {

  

  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  console.log("loaded embedded wallet", embeddedWallet)
  void embeddedWallet?.switchChain(5);
  
  const provider = await embeddedWallet?.getEthersProvider() // ethers provider object
  
  if(!provider)
    return {hyperCertClient: null}

  const signer = provider.getSigner(embeddedWallet?.address); // ethers signer object

  console.log("loaded signer", signer)
  

  return new HypercertClient({
    chainId: 5,
    operator: signer,
    ...tokens,
  });
}
