import type { HypercertMetadata } from "@hypercerts-org/sdk";
import { TransferRestrictions } from "@hypercerts-org/sdk";
import { useQuery } from "wagmi";
import hyperCertClient from "./useHypercert";
import type { QueryKey } from "@tanstack/react-query";

const totalUnits = "10000";

const useMint = (metadata: HypercertMetadata) => {

  return useQuery('hypercerts' as unknown as QueryKey, () => hyperCertClient.mintClaim(
    metadata,
    totalUnits,
    TransferRestrictions.FromCreatorOnly,

  ))
} 


export default useMint;