import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Popup from './Popup';
import apiClient from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Dashboard = props => {
  const { user, loginWithPopup } = useAuth0();
  const [cals, setCals] = useState(true);

  const firstTime = async () => {
    const clientCals = await apiClient.firstTimeCheck(user.sub);
    setCals(clientCals);
  };

  useEffect(() => {
    firstTime();
  }, [user]);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (user && cals == false) {
      setTrigger(true);
    }
  }, [cals]);

  return (
    <>
      <Box height={'77vh'}>
        <Popup trigger={trigger} setTrigger={setTrigger}></Popup>

        {!user ? (
          <Box
            ml={'35px'}
            display={'flex'}
            alignItems={'center'}
            height={'100%'}
          >
            <Box paddingRight={'200px'}>
              <Text fontWeight={'semi-bold'} fontSize={'60'} color={'white'}>
                {' '}
                The Ultimate
              </Text>
              <Text fontWeight={'bold'} fontSize={'60'} color={'white'}>
                {' '}
                Weight Loss Experıence{' '}
              </Text>
              <Button
                bg={'green.400'}
                color={'white'}
                borderRadius={'24px'}
                mt={'26px'}
                width={'200px'}
                height={'50px'}
                fontWeight={'700'}
                onClick={() => {
                  loginWithPopup();
                }}
              >
                {' '}
                get started today{' '}
              </Button>
            </Box>
            <Loader />

            <motion.Box
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            >
              <motion.svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="500.000000pt"
                height="200.000000pt"
                viewBox="0 0 960.000000 480.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
                  fill="white"
                  stroke="none"
                >
                  <motion.path
                    d="M1600 2400 l0 -1850 230 0 230 0 0 1850 0 1850 -230 0 -230 0 0
            -1850z"
                  />
                  <motion.path
                    d="M7540 2400 l0 -1850 230 0 230 0 0 1850 0 1850 -230 0 -230 0 0
            -1850z"
                  />
                  <motion.path
                    d="M1010 2400 l0 -1470 230 0 230 0 0 1470 0 1470 -230 0 -230 0 0
            -1470z"
                  />
                  <motion.path
                    d="M8130 2400 l0 -1470 230 0 230 0 0 1470 0 1470 -230 0 -230 0 0
            -1470z"
                  />
                  <motion.path d="M420 2400 l0 -1090 230 0 230 0 0 1090 0 1090 -230 0 -230 0 0 -1090z" />
                  <motion.path
                    d="M8720 2400 l0 -1090 230 0 230 0 0 1090 0 1090 -230 0 -230 0 0
            -1090z"
                  />
                  <motion.path d="M0 2400 l0 -200 150 0 150 0 0 200 0 200 -150 0 -150 0 0 -200z" />
                  <motion.path
                    d="M2190 2400 l0 -200 2610 0 2610 0 0 200 0 200 -2610 0 -2610 0 0
            -200z"
                  />
                  <motion.path d="M9300 2400 l0 -200 150 0 150 0 0 200 0 200 -150 0 -150 0 0 -200z" />
                </g>
              </motion.svg>
            </motion.Box>
          </Box>
        ) : (
          <Box
            ml={'35px'}
            display={'flex'}
            alignItems={'center'}
            height={'100%'}
          >
            <Box paddingRight={'200px'}>
              <Text fontWeight={'semi-bold'} fontSize={'60'} color={'white'}>
                {' '}
                welcome {(user && user.given_name).toLocaleLowerCase()},{' '}
              </Text>
              <Text fontWeight={'bold'} fontSize={'60'} color={'white'}>
                {' '}
                glad to see you back{' '}
              </Text>
              <Link to="/profile">
                <Button
                  bg={'green.400'}
                  color={'white'}
                  borderRadius={'24px'}
                  mt={'26px'}
                  width={'200px'}
                  height={'50px'}
                  fontWeight={'700'}
                >
                  {' '}
                  my dashboard{' '}
                </Button>
              </Link>
            </Box>
            <motion.Box
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            >
              <motion.svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="500.000000pt"
                height="200.000000pt"
                viewBox="0 0 960.000000 480.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
                  fill="white"
                  stroke="none"
                >
                  <motion.path
                    d="M1600 2400 l0 -1850 230 0 230 0 0 1850 0 1850 -230 0 -230 0 0
            -1850z"
                  />
                  <motion.path
                    d="M7540 2400 l0 -1850 230 0 230 0 0 1850 0 1850 -230 0 -230 0 0
            -1850z"
                  />
                  <motion.path
                    d="M1010 2400 l0 -1470 230 0 230 0 0 1470 0 1470 -230 0 -230 0 0
            -1470z"
                  />
                  <motion.path
                    d="M8130 2400 l0 -1470 230 0 230 0 0 1470 0 1470 -230 0 -230 0 0
            -1470z"
                  />
                  <motion.path d="M420 2400 l0 -1090 230 0 230 0 0 1090 0 1090 -230 0 -230 0 0 -1090z" />
                  <motion.path
                    d="M8720 2400 l0 -1090 230 0 230 0 0 1090 0 1090 -230 0 -230 0 0
            -1090z"
                  />
                  <motion.path d="M0 2400 l0 -200 150 0 150 0 0 200 0 200 -150 0 -150 0 0 -200z" />
                  <motion.path
                    d="M2190 2400 l0 -200 2610 0 2610 0 0 200 0 200 -2610 0 -2610 0 0
            -200z"
                  />
                  <motion.path d="M9300 2400 l0 -200 150 0 150 0 0 200 0 200 -150 0 -150 0 0 -200z" />
                </g>
              </motion.svg>
            </motion.Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
