import { useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { useAuth0 } from "@auth0/auth0-react"
import apiClient from './services/ApiClient';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() {

  const { user } = useAuth0();

  const grabUser = async () => {
    const clientUser = await apiClient.pageLoad(user.sub);
  }
  grabUser();
 


  return (
    <BrowserRouter>
        <Box height="100vh" bg={'linear-gradient(153deg,#5100cb 0,#6500fc 42%,#9617c9 75%,#d33092 100%) right bottom no-repeat'}>
          <Routes>
            <Route path='/profile' element={<> <Navbar navLink={'home'} /> <Profile /> </>} />
            <Route path="/" element={<> <Navbar navLink={'my dashboard'}/> <Dashboard /> <Box mt={10}> <Footer/> </Box ></>} />
          </Routes>
        </Box>
    </BrowserRouter>

  );
}

export default App;
