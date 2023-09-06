import { Box, Button } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { formatAddress } from "utils/formatting";

 const PrivyAuthButton = () => {
    
  const { login, ready, authenticated, user, logout } = usePrivy();
    
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