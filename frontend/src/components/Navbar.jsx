import { Box, Button, Image } from "@chakra-ui/react"
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react"
import apiClient from "../services/ApiClient";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = ({navLink}) => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const requester = async () => {
      const clientUser = await apiClient.pageLoad(user.sub);
      setUserInfo(clientUser);
    }
    requester();
  }, [user])
 
 
  return (
      <header>
        {navLink === 'my dashboard' && <Box display={'flex'} alignItems="center" justifyContent="space-between" borderBottom={'1px solid #A9A9A9'} height={'10vh'} width={'100vw'}>
          <Box ml={3} textColor={'white'} opacity={1}>
            <h1 >Longevity Losses</h1>
          </Box>
          <Box opacity={2} mr={5}>
            {navLink === 'my dashboard' && <Link to="/profile">
              <Button textColor={'white'} variant="link" mr={5}> {navLink} </Button>
            </Link>}
              {(user) && <LogoutBtn text="logout"/>}
              {(!user) && <LoginBtn text="login"/>}
          </Box>
        </Box>
        } 
        {navLink === 'home' && <Box display={'flex'} alignItems="center" justifyContent="space-between" borderBottom={'1px solid #A9A9A9'} height={'10vh'} bg={"#0C2131"} width={'100vw'}>
          <Box ml={3} textColor={'white'} opacity={1}>
            <h1 >Longevity Losses</h1>
          </Box>
          <Box color={'white'}> You joined on {userInfo && userInfo[0].created_at} </Box>
          <Box opacity={2} mr={5}>
          {navLink === 'home' && <Link to="/">
            <Button textColor={'white'} variant="link" mr={5}> {navLink} </Button>
            </Link>}
              {(user) && <LogoutBtn text="logout"/>}
              {(!user) && <LoginBtn text="login"/>}
          </Box>
        </Box>
        }
      </header>
  );
}


export default Navbar;