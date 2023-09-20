import {Claim, HypercertClaimdata} from "@hypercerts-org/sdk";
import {useGetHypercertData} from "../hooks/useGetHypercertData";

export const HypercertTile = ({ uri, id }: Omit<Claim, 'creation'> ) => {
  const { data } = useGetHypercertData(uri || '')
  if (!data) {
    return null;
  }


  const chainId = 5;

  return (
    <div>
      <h2>{data.name}</h2>
      <a href={`https://grants-stack-builder-orpin.vercel.app/#/projects/new?chainId=${chainId}&hypercertId=${id}`} target={'_blank'}>Apply</a>
      <img src={data.image} alt={data.name} style={{ width: '100%', height: 'auto'}}/>
    </div>
  );
}