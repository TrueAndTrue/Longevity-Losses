import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react";
import apiClient from '../services/ApiClient';


const Popup = ({ trigger, setTrigger }) => {

  const { user } = useAuth0();

  const [daily, setDaily] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const [startingWeight, setStartingWeight] = useState('');

  const changeDaily = (event) => {
    setStartingWeight(event.target.value);
    setDaily(event.target.value + '0');
  }

  //try to change to have directly in the onChange later
  const changeDailyDirectly = (event) => {
    setDaily(event.target.value)
  }

  const formSubmit = () => {
    console.log(daily, 'daily');
    console.log(weightGoal, 'goal');
    console.log(startingWeight, 'start');
    setTrigger(false);

    apiClient.postFirstCals(user.sub, daily, weightGoal, startingWeight)
  }

  const weightGoalSetter = (event) => {
    setWeightGoal(event.target.value)
  }

  return trigger ? (
    <Box pos={'fixed'} display={'flex'} justifyContent={'center'} alignItems={'center'} top={0} left={0} height={'100vh'} width={'100%'} bgColor={'rgba(0,0,0,0.4)'}>
      <Box pos={'relative'} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <FormControl display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} bg={"linear-gradient(153deg,#5100cb 0,#6500fc 42%,#9617c9 75%,#d33092 100%) right bottom no-repeat"} border={'2px solid black'} width={'40%'} height={'70%'} isRequired>
          <Text fontSize={'4xl'} color={'white'}>Welcome!</Text>
          <Text fontSize={'2xl'} ml={'75px'} mr={'50px'} color={'white'}>Before you can continue, we need you to answer a few questions to help guide your experience.</Text>
          <FormLabel color={'white'} mt={'30px'}> What is your weight goal? (lbs)</FormLabel>
          <Input bg={'white'} width={'20%'} color={'black'} onChange={weightGoalSetter}/>
          <FormLabel color={'white'} mt={'30px'}> What is your current weight? (lbs)</FormLabel>
          <Input width={'20%'} bg={'white'} color={'black'} onChange={changeDaily}/>
          <FormHelperText color={'white'} > We'll never share your personal info. </FormHelperText>
          <FormLabel color={'white'} mt={'30px'}> What is your daily calorie limit? </FormLabel>
          <Input width={'20%'} bg={'white'} color={'black'} name="daily" value={daily} onChange={changeDailyDirectly}/>
          <FormHelperText color={'white'} > If you don't have one, use the recommended daily above. </FormHelperText>
          <Button mt={'25px'} bgColor={'green.400'} color='white' onClick={formSubmit}> Submit</Button>
        </FormControl>
      </Box>
    </Box>
  ) : "";
}

export default Popup;