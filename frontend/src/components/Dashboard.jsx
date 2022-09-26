import { Box, Image, Text, Button } from '@chakra-ui/react';
import strong from '../assets/strong.png';
import healthy from '../assets/healthy.png';
import dieting from '../assets/dieting.png';
import { useState, useEffect } from 'react';
import Popup from './Popup';
import apiClient from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';


const Dashboard = props => {

  
  const { user } = useAuth0(); 
  const [cals, setCals] = useState(true)
  
  const firstTime = async () => {
    const clientCals = await apiClient.firstTimeCheck(user.sub);
    console.log(clientCals)
    setCals(clientCals)
    return clientCals;
  }
  
  useEffect(() => {
    firstTime();
  }, [user])

  const [trigger, setTrigger] = useState(false);
  
  useEffect(() => {
    console.log(cals, user)
    console.log(cals == false, "POGOGOPGO")
    if (user && cals == false) {
      setTrigger(true);
    }
  }, [cals])


  return (
    <>
    <Box height={'74vh'}>
      <Popup trigger={trigger} setTrigger={setTrigger}></Popup>

      <Box ml={'35px'} display={'flex'} alignItems={'center'} height={'100%'}>
        <Box>
          <Text fontWeight={'semi-bold'} fontSize={'60'} color={'white'}> The Ultimate</Text>  
          <Text fontWeight={'bold'} fontSize={'60'} color={'white'}> Weight Loss Experience </Text>
          <Button bg={'green.400'} color={"white"} borderRadius={'24px'} mt={'26px'} width={'200px'} height={'50px'} fontWeight={'800'} font-family={'Gilroy,arial,Myriad Pro,sans-serif'}> get started today </Button>
        </Box>

      </Box>      
        


      </Box>
    </>
  )
}

export default Dashboard