import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginBtn = ({ text }) => {
  const { loginWithPopup } = useAuth0();

  return (
    <Button
      bg="green.400"
      textColor={'white'}
      borderRadius={'24px'}
      onClick={() => {
        loginWithPopup();
      }}
    >
      {text}
    </Button>
  );
};

export default LoginBtn;
