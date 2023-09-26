import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { useMyHypercerts } from "hooks/useMyHypercerts";
import Lottie from "lottie-react";
import confirmation from 'utils/confirmation.json';

export default function Confirmation({id}:{id:string}) {
    
    
    const { data } = useMyHypercerts();

    const lastClaim = data?.claims[data?.claims.length - 1];
    
    return(
        <VStack m={8}>
        <Lottie animationData={confirmation} loop={false} style={{height: 120}}/>
        <Heading color={'white'} fontSize={24} maxW={'300px'} fontWeight={'normal'} textAlign={'center'}>Your Hypercert Mint was successful</Heading>
        <HStack m={8}>
        <Button  onClick={()=>window.open(`https://hypercerts.org/app/view/#claimId=${lastClaim?.id}`)} variant={"secondary"}>View Hypercert</Button>
        <Button gap={2} onClick={()=>window.open(`https://optimistic.etherscan.io/tx/${id}`)} variant={"secondary"} bgColor={"green"}
              textColor={"dark-green"}><ExternalLinkIcon boxSize={4} fontWeight={'medium'}/> Verify</Button>
        </HStack>
        </VStack>
        
    )
}