'use client'
import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { formatAddress } from "utils/formatting";
import { useBalance } from "wagmi";
import { useNetwork } from "wagmi";
import { useRouter } from "next/router";
const PrivyAuthButton = () => {
  const [chainName, setChainName] = useState<string>("" as string);
  const { login, ready, authenticated, user, logout } = usePrivy();
  
  const router = useRouter();
  const [,copyToClipboard] = useCopyToClipboard();
  const { chain } = useNetwork();
  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  useEffect(() => {

    if (chain) {
      setChainName(chain.name);
    }
  }
  , [chain]);

  const address = user?.wallet?.address;
  if (!ready) return <Box>Loading...</Box>;

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
          {`Logged in as ` + formatAddress(address ?? "")}
        </MenuButton>
        <MenuList >
          <MenuItem onClick={() => copyToClipboard(user?.wallet?.address as string)}><CopyIcon mr={2}/> Copy Wallet Address</MenuItem>
          <MenuItem>
            Connected to: {chainName ? chainName : 'Loading...'}
          </MenuItem>
          <MenuItem>{data?.formatted} {data?.symbol}</MenuItem>
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
