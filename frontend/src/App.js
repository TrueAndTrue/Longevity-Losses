import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import {
  Box,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Box
        height="100vh"
        bg={
          'linear-gradient(153deg,#5100cb 0,#6500fc 42%,#9617c9 75%,#d33092 100%) right bottom no-repeat'
        }
      >
        <Routes>
          <Route
            path="/profile"
            element={
              <>
                {' '}
                <Navbar navLink={'home'} /> <Profile />{' '}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {' '}
                <Navbar navLink={'my dashboard'} /> <Dashboard />{' '}
                <Box mt={10}>
                  {' '}
                  <Footer />{' '}
                </Box>
              </>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
