'use client'
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
} from "@chakra-ui/react";
import { WalletConnector, usePrivy, useWallets } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { formatAddress } from "utils/formatting";
import { useBalance, useEnsName } from "wagmi";
const PrivyAuthButton = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();
  

  
  const router = useRouter();
  const [,copyToClipboard] = useCopyToClipboard();
  const {wallets} = useWallets()
  const wallet = wallets.find((wallet) => wallet.isConnected);
  useEffect(() => console.log('Loaded Auth Button/Menu'), [wallets])

  const chainId = wallet?.chainId.substring(7)

  const { data } = useBalance({
    address: wallet?.address as `0x${string}`,
    chainId: Number(chainId)
  });
  


  const { data:ensName, isError, isLoading } = useEnsName({
    address: wallet?.address as `0x${string}`,
    enabled: Boolean(wallet?.address)
  })

  
  if (!ready) return <Box>Loading...</Box>;
  
  
  const handleChain = () => {
    const nextChainId = chainId != '10' ? 10 : 5;
    void wallet?.switchChain(nextChainId)
  };
  

  console.log(chainId)
  
  
  


  if (authenticated) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bgColor="dark-green"
          color='green'
          _hover={{ bgColor: "mid-green", textColor: "dark-green" }}
          _active={{ bgColor: "mid-green", textColor: "dark-green" }}
        >
          {`Logged in as `}
          {typeof ensName == 'string' ? ensName : formatAddress(wallet?.address ?? "") }
        </MenuButton>
        <MenuList >
          <MenuItem onClick={() => copyToClipboard(user?.wallet?.address as string)}><CopyIcon mr={2}/> Copy Wallet Address</MenuItem>
          <MenuItem>{data?.formatted.substring(0,6)} {data?.symbol} <Tag ml={1} color={chainId === '10' ? 'green' : 'red'} backgroundColor={chainId === '10' ? 'dark-green' : 'red.100'}>{chainId === '10' ? 'Optimism' : 'Wrong Network' }</Tag></MenuItem>
          <MenuItem onClick={handleChain}>
              {chainId  != '10' ? 'Switch to Optimism' : 'Switch to Testnet(Goerli)'}
            </MenuItem>

          <MenuItem onClick={() => router.push('/my-hypercerts')}> My Hypercerts</MenuItem>
          <MenuItem onClick={logout}>Logout 
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button onClick={login} variant="secondary" marginRight="10px">
      Connect
    </Button>
  );
};

export default PrivyAuthButton;
