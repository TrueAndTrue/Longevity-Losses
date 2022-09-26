import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutBtn = ({ text }) => {
  const { logout, user } = useAuth0();
  return (
    <Button
      bg="green.400"
      textColor={'white'}
      onClick={() => {
        logout();
      }}
    >
      {user && text}
      {!user && '...'}
    </Button>
  );
};

export default LogoutBtn;
