import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { formatAddress } from "utils/formatting";
import { useBalance } from "wagmi";

const PrivyAuthButton = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();
  
  const [,copyToClipboard] = useCopyToClipboard();

  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

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
          <MenuItem>{data?.formatted} {data?.symbol}</MenuItem>
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
