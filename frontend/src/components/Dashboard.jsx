import { Box, Image } from '@chakra-ui/react';
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
    <Box>
      <Popup trigger={trigger} setTrigger={setTrigger}></Popup>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100vw'}>
        <Box fontSize={'60'} textColor={'white'} fontWeight={'300'} >
          <h1> The last weight loss app </h1>
          <Box fontWeight={'bold'}>
          <h1> you'll ever use. </h1>
          </Box>
        </Box>
      </Box>

      <Box display={'flex'} mt={125} alignItems={'center'} justifyContent={'space-around'}>
        <Box>
          <Image src={healthy} width={90} mb={5}/>
        </Box>
        <Box>
          <Image src={strong} width={90} mb={5}/>
        </Box>
        <Box>
          <Image src={dieting} width={90} mb={5}/>
        </Box>
      </Box>

      <Box display={'flex'}  alignItems={'flex-start'} justifyContent={'space-around'} t={30} mb={5}>
        <Box display={'flex'} flexDir={'column'} width={'25vw'} alignItems={'center'} border={'solid 2px #1BE479'} pr={9} pl={9} pt={6} pb={3}>
          <Box fontWeight={'bold'} textColor={'white'}  pb={3} fontSize={20}> <h1>Healthier = Happier</h1> </Box>   
          <Box fontWeight={'300'} textColor={'white'} > <p>Countless studies have proven that those who feel "in shape", are destined to feel happier and more fulfilled in their lives.</p></Box>
        </Box>
        <Box display={'flex'} flexDir={'column'} width={'25vw'} alignItems={'center'} border={'solid 2px #1BE479'} pr={9} pl={9} pt={6} pb={3}> 
          <Box fontWeight={'bold'} textColor={'white'}  pb={3} fontSize={20}> <h1>Confidence = Opportunity</h1> </Box>
          <Box fontWeight={'300'} textColor={'white'} > <p>Have you ever lost out on an opportunity because you were insecure or self-conscious? Well it's finally time to put that in the past.</p> </Box>
        </Box>
        <Box display={'flex'} flexDir={'column'} width={'25vw'} alignItems={'center'} border={'solid 2px #1BE479'} pr={9} pl={9} pt={6} pb={3}>
          <Box fontWeight={'bold'} textColor={'white'}  pb={3} fontSize={20}> <h1>Longevity = Lifestyle</h1> </Box>
          <Box fontWeight={'300'} textColor={'white'} > <p>Longevity Losses is not just a "diet", we will transform the way you view weight loss and alter a "diet change" into a lifestyle change.</p> </Box>
        </Box>
      </Box>
        <Box display={'flex'} pt={25} alignItems={'center'} justifyContent={'space-around'} flexDir={'column'} height={'13vh'}>
            
        


        </Box>
      </Box>
    </>
  )
}

export default Dashboard