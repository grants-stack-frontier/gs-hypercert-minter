import { TransferRestrictions, type HypercertMetadata } from "@hypercerts-org/sdk";
import type { ConnectedWallet } from '@privy-io/react-auth';
import { getHyperCertClient } from '../hooks/useHypercert';

const totalUnits = "1000";

const mintClaim = async (wallets: ConnectedWallet[], metadata: HypercertMetadata, wantToMint: boolean) => {
  const wallet = wallets.find((wallet) => wallet.isConnected);

  console.log(wallet?.address, wantToMint, "just above here")

  if (wallet?.address && wantToMint) {
    const { hyperCertClient } = await getHyperCertClient(wallets);

    console.log("Did we get a hyperCertClient?", hyperCertClient)
    if (hyperCertClient) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const claim = await hyperCertClient.mintClaim(metadata, totalUnits, TransferRestrictions.FromCreatorOnly);
      return claim;
    }
    else {
      console.log("No hyperCertClient")
      return null;
    }
  }
}


export default mintClaim;
