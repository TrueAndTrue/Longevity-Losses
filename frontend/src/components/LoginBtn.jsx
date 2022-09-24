import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react"

const LoginBtn = ({ text }) => {

  const { loginWithPopup } = useAuth0();

  //hello

    return (
    <Button bg='green.400' textColor={'white'} onClick={() => {
      loginWithPopup();
    }}>
      login
    </Button>
  )
}

export default LoginBtn;