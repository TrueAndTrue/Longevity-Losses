import { useAuth0 } from "@auth0/auth0-react"
import apiClient from '../services/ApiClient';
import { useState } from "react";
import { useEffect } from "react";
import { Box, Image, Button, Input, FormHelperText, FormControl } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import './calendar.css';
import fire from '../assets/fire.gif';
import './profile.css';
import RemoveBtn from "./RemoveBtn";
import ValueAlters from "../services/ValueAlters";

const Profile = () => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState('');
  const [calsInfo, setCalsInfo] = useState('');
  const [calsError, setCalsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newCalsInfo, setNewCalsInfo] = useState('');
  const [calsInput, setCalsInput] = useState(false);
  const [calVal, setCalVal] = useState(new Date());
  const [showFire, setShowFire] = useState(false);
  const [displayMeals, setDisplayMeals] = useState([]);
  const [newMealInfo, setNewMealInfo] = useState('');
  const [newMealInfo2, setNewMealInfo2] = useState('');


  // const toggleFire = () => {
  //   setShowFire(!showFire);
  // }


  const calForm = () => {
    
    setShowFire(!showFire);
    setTimeout(() => {
      setShowFire(false)
    }, 3000)
    console.log(showFire)


    // checking if a week has passed
    if (Date.now() - Date.parse(calsInfo[0].weight_history[calsInfo[0].weight_history.length - 1][0]) < 604800000) {
      setCalsError(true);
      setErrorMsg('Must wait a week between entries.')
      setTimeout(() => {
        setCalsError(false);
      }, 3000)
    } 
    else {
      if (calsInput === true) {
        console.log('IN')
        setCalsError(true);
        setErrorMsg('Input below.');
        setTimeout(() => {
          setCalsError(false);
        }, 3000);
      }
      else {
        setCalsError(false);
        setCalsInput(true);
      }

    }
  }

  const submitMeals = () => {
    const mealInfo = newMealInfo + ': ' + newMealInfo2;
    apiClient.updateMeals(user.sub, mealInfo, ValueAlters.calendarChange(calVal));
    setNewMealInfo('');
  }

  const submitCals = () => {
    apiClient.updateCals(user.sub, newCalsInfo);
    setCalsInput(false);
  }
  
  useEffect(() => {
    const calendarLogic = async () => {
      const meals = await apiClient.getMeals(user.sub);
      let flag = false;
      meals.forEach((meal) => {
        if (meal[0] === ValueAlters.calendarChange(calVal)) {
          setDisplayMeals(meal[1]);
          flag = true;
        }
      });
      if (!flag) setDisplayMeals([]);
    }
    calendarLogic();
  }, [calVal]);

  useEffect(() => {
    const grabUser = async () => {
      const clientUser = await apiClient.pageLoad(user.sub);
      const clientCals = await apiClient.getCals(user.sub);
      setUserInfo(clientUser);
      setCalsInfo(clientCals);
    }
    grabUser();
  }, [user])

  return (
    <Box 
      display={'flex'} 
      flexDir={'row'} 
      height={'90vh'} 
      width={'100vw'} 
      justifyContent={'space-between'} 
      bg={'#0C2131'} 
      overflow={'hidden'}
    >
      <Box 
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'flex-start'} 
        color={'white'} 
        height={'100%'} 
        width={'25%'} 
        borderRight={'1px solid white'} 
        pos={'relative'} 
        overflow={'hidden'}
      >
        <Box 
          display={'flex'} 
          alignItems={'center'} 
          flexDir={'column'}
        >
          <Box fontSize={'larger'} fontWeight={'bold'} width={'100%'}> 
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} mt={'10px'}>
              <Box display={'flex'}>
                <h1>Weight Lost</h1>
              </Box>
              <Box display={'flex'} flexDir={'column'} alignItems={'flex-end'}>
                <Button borderRadius={'50%'} bgColor={'green.400'} fontSize={'medium'} width={'20px'} onClick={calForm} pos={'relative'} zIndex={10}>+</Button>
              </Box>
            </Box>
                {calsError && <Box color={'red'} fontSize={'small'}> {errorMsg} </Box>}
          </Box>
          <Box display={'flex'} flexDir={'column'}> {calsInfo && calsInfo[0].weight_history.map((weight, i) => {
            return <Box mt={'12px'} display={'flex'} fontSize={'18px'} alignItems={'center'}> {weight[0]} you weighed {weight[2]}lbs <Box ml={'44px'} fontSize={'xx-large'}> {weight[1] / -1} </Box> </Box>
          }
          )}
          <Box> 
            {calsInput && <FormControl>
              <FormHelperText color={'white'}>Input Weight below</FormHelperText>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Input width={'200px'} value={newCalsInfo} onChange={(e) => setNewCalsInfo(e.target.value)}></Input> 
                <Button bg={'green.400'} onClick={submitCals}>Add</Button>
              </Box>
            </FormControl>}
            <Image src={fire} mt={'50px'} data-showFire={showFire} className={'fire'}></Image>
          </Box>
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} flexDir={'column'} justifyContent={'flex-start'} alignItems={'center'} color={'white'} height={'100%'} width={'33%'}>
        <Box fontSize={'x-large'} fontWeight={'bold'}> You joined on {userInfo && userInfo[0].created_at}</Box>
        <Box fontSize={'xx-large'} fontWeight={'bold'} mt={'5px'}> You have lost a total of: {calsInfo[0] && calsInfo[0].weight_history[calsInfo[0].weight_history.length - 1][1]}lbs </Box>
        <Box fontSize={'x-large'} fontWeight={'bold'} mt={'5px'}> <h1>Daily Calorie Limit: {calsInfo[0] && calsInfo[0].daily_cals}</h1> </Box> 
      </Box>
      <Box display={'flex'} justifyContent={'center'} alignItems={'flex-start'} color={'white'} height={'100%'} borderLeft={'1px solid white'}>
      <Box display={'flex'} alignItems={'center'} flexDir={'column'}>
          <Box fontSize={'larger'} fontWeight={'bold'}> <h1> Meal Tracker </h1> </Box>
          <Box bg={'white'} color={'black'} margin={'35px'} boxShadow={'0 30px 40px 0 rgb(255 255 255 / 20%)'}>
            <Calendar onChange={setCalVal} value={calVal} background={'white'}></Calendar>
          </Box>
          <Box width={'100%'}>
          <FormControl width={'100%'} display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
              <FormHelperText color={'white'}>Input Meal below</FormHelperText>
              <Box display={'flex'} justifyContent={'space-between'} flexDir={'column'}>
                <Input width={'200px'} value={newMealInfo} onChange={(e) => setNewMealInfo(e.target.value)} placeHolder={'PB Sandwich'} color={'white'} m={'5px'}></Input> 
                <Input width={'200px'} value={newMealInfo2} onChange={(e) => setNewMealInfo2(e.target.value)} placeHolder={'Calorie Amount'} color={'white'} m={'5px'}></Input>
                <Button bg={'green.400'} onClick={submitMeals} m={'5px'}>Add</Button>
              </Box>
          </FormControl>

          </Box>
          <Box display={'flex'} flexDir={'column'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}>
            <h1>Meals:</h1>
            {displayMeals && displayMeals.map((meal) => {
              const mealName = meal.split(':')[0]
              const calAmount = meal.split(':')[1]
              return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'5px'} border={'2px solid white'} borderRadius={'0.375rem'} width={'60%'}> <Box mt={'5px'} mb={'5px'} display={'flex'} flexDir={'column'}> <Box> {mealName} </Box>  <Box> {calAmount} </Box> </Box> <Box  ml={'10px'} mt={'5px'} mb={'5px'}> <RemoveBtn date={calVal} meal={meal}> </RemoveBtn> </Box> </Box>
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;