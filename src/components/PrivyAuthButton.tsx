import { usePrivy } from "@privy-io/react-auth";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { Button, Box } from "@chakra-ui/react";
import { formatAddress } from "utils/formatting";

 const PrivyAuthButton = () => {
    const { login, ready, authenticated, user, logout } = usePrivy();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { wallet: activeWallet } = usePrivyWagmi();
  
    console.log(activeWallet);
  
    const address = user?.wallet?.address;
    if (!ready) return <Box>Loading...</Box>;
  
    if (authenticated) {
      return (
        <Button
          onClick={logout}
          variant="secondary"
          marginRight="10px"
          width={"max-content"}
        >
          {`Logged in as ` + formatAddress(address ?? "")}
        </Button>
      );
    }
  
    
      return (
        <Button onClick={login} variant="secondary" marginRight="10px">
          Connect
        </Button>
      );
  };
  


  export default PrivyAuthButton;