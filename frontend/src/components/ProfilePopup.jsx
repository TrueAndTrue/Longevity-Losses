import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Text,
  Button,
  Image
} from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import ValueAlters from '../services/ValueAlters';
import { motion, MotionConfig } from 'framer-motion';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryZoomContainer } from 'victory';
import { useEffect, useState } from 'react';
import dumbbell from '../assets/dumbbell.png'



const ProfilePopup = ({ trigger, setTrigger, weight_data }) => {

  const { user } = useAuth0();
  console.log(weight_data)
  const chartData = [];

  const [chartState, setChartState] = useState(false);

  if (weight_data) {
    weight_data.forEach((weight) => {
      const date = ValueAlters.graphChange(weight[0]);
      const weightNum = weight[2];
      console.log(date, weightNum);
      chartData.push({ date, weightNum});
    })
    console.log(chartData)
  }

  useEffect(() => {
    setTimeout(() => {
      setChartState(true);
    }, 1000)
  }, [chartData]) 
 

  return trigger ? (
    <Box pos={'fixed'} display={'flex'} zIndex={21} justifyContent={'center'} alignItems={'center'} top={0} left={0} height={'100vh'} width={'100%'} bgColor={'rgba(12, 33, 49, 0.6)'}>
      <Box pos={'relative'} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexDir={'column'} bg={"rgba(12, 33, 49, 1)"} border={'2px solid black'} width={'70%'} height={'85%'} isRequired>
        <Box height={'7%'} borderBottom={'2px solid black'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}> 
          <Button bg={'green.400'} mr={'10px'} onClick={() => {setTrigger(false)}}> close </Button>
        </Box>
        {chartState && <Box fontSize={'xx-large'} mt={'10px'} color={'white'}> {user && user.given_name}'s weight loss </Box>}
        {chartState ? <Box> 
          <VictoryChart width={600} height={470} scale={{ x: "time" }} 
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                />
              }
            >
                 <VictoryLine
                  style={{
                    data: { stroke: "tomato" },
                    
                  }}
                  animate={{
                    duration: 2000,
                    
                  }}
                  data={chartData}
                  x="date"
                  y="weightNum"
                />

              </VictoryChart>
          </Box> 
          : 
          <motion.div 
            initial={{x: -150}}
            animate={{x: 150}}
            transition={{duration: 1.2}}
            > <Text fontSize={'xx-large'}>loading...</Text> 
          
          </motion.div>
          
          }
        </Box> 
      </Box>
    </Box>
  ) : "";
}

export default ProfilePopup;