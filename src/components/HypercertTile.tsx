import type { Claim } from "@hypercerts-org/sdk";
import { useGetHypercertData } from "../hooks/useGetHypercertData";
import Link from "next/link";
import Image from "next/image";

export const HypercertTile = ({ uri, id }: Omit<Claim, 'creation'> ) => {
  const { data } = useGetHypercertData(uri || '')
  if (!data) {
    return null;
  }


  const chainId = 5;

  return (
    <div>
      <h2>{data.name}</h2>
      <Link href={`https://grants-stack-builder-orpin.vercel.app/#/projects/new?chainId=${chainId}&hypercertId=${id}`} target={'_blank'}>Apply</Link>
      <Image src={data.image} alt={data.name} style={{ width: '100%', height: 'auto'}}/>
    </div>
  );
}