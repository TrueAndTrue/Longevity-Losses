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



const ProfilePopup = ({ trigger, setTrigger }) => {

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
    <Box pos={'fixed'} display={'flex'} zIndex={2} justifyContent={'center'} alignItems={'center'} top={0} left={0} height={'100vh'} width={'100%'} bgColor={'rgba(12,33,49,0.6)'}>
      <Box pos={'relative'} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} bg={"green.400"} border={'2px solid black'} width={'40%'} height={'70%'} isRequired>
          
        </Box>
      </Box>
    </Box>
  ) : "";
}

export default ProfilePopup;