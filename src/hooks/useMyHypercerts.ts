// import { useHypercertClient } from "./useHypercert";
// import { useQuery } from "@tanstack/react-query";
// import { usePrivyWagmi } from "@privy-io/wagmi-connector";
// import { useChainId } from "wagmi";

// export const useMyHypercerts = () => {
//   const { wallet } = usePrivyWagmi();
//   const client = useHypercertClient();
//   const chainId = useChainId();
//   const address = wallet?.address;

//   return useQuery(
//     ["my-hypercerts", address, chainId],
//     async () => {
//       if (!client || !address) {
//         return null;
//       }
//       const result = await client.indexer.claimsByOwner(address, {
//         orderDirections: "desc",
//         skip: 0,
//         first: 1000,
//       });

//       return result;
//     },
//     {
//       enabled: !!client && !!address,
//     }
//   );
// };
