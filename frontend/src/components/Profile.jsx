import { useAuth0 } from '@auth0/auth0-react';
import apiClient from '../services/ApiClient';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Box,
  Image,
  Button,
  Input,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import './calendar.css';
import fire from '../assets/fire.gif';
import './profile.css';
import RemoveBtn from './RemoveBtn';
import ValueAlters from '../services/ValueAlters';
import { VictoryLine, VictoryChart, VictoryZoomContainer } from 'victory';

const Profile = () => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState('');
  const [calsInfo, setCalsInfo] = useState('');
  const [calsError, setCalsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newCalsInfo, setNewCalsInfo] = useState('');
  const [calsInput, setCalsInput] = useState(false);
  const [calVal, setCalVal] = useState(new Date());
  const [displayMeals, setDisplayMeals] = useState([]);
  const [newMealInfo, setNewMealInfo] = useState('');
  const [newMealInfo2, setNewMealInfo2] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipeQuery, setRecipeQuery] = useState('');
  const [chartData, setChartData] = useState([]);
  const [chartLoader, setChartLoader] = useState(false);

  const calForm = () => {
    // checking if a week has passed
    if (
      Date.now() -
        Date.parse(
          calsInfo[0].weight_history[calsInfo[0].weight_history.length - 1][0]
        ) <
      604800000
    ) {
      setCalsError(true);
      setErrorMsg('Must wait a week between entries.');
      setTimeout(() => {
        setCalsError(false);
      }, 3000);
    } else {
      if (calsInput === true) {
        setCalsError(true);
        setErrorMsg('Input below.');
        setTimeout(() => {
          setCalsError(false);
        }, 3000);
      } else {
        setCalsError(false);
        setCalsInput(true);
      }
    }
  };

  const submitMeals = () => {
    const mealInfo = newMealInfo + ': ' + newMealInfo2;
    apiClient.updateMeals(
      user.sub,
      mealInfo,
      ValueAlters.calendarChange(calVal)
    );
    setNewMealInfo('');
    setNewMealInfo2('');
    displayMeals.push(mealInfo)
  };

  useEffect(() => {
    if (calsInfo) {
      const tempData = [];
      calsInfo[0].weight_history.forEach(weight => {
        const date = ValueAlters.graphChange(weight[0]);
        const weightNum = weight[2];
        tempData.push({ date, weightNum });
      });
      setChartData(tempData);
      setTimeout(() => {
        setChartLoader(true);
      }, 500);
    }
  }, [calsInfo]);

  const submitCals = async () => {
    await apiClient.updateCals(user.sub, newCalsInfo);
    const clientCals = await apiClient.getCals(user.sub);
    setCalsInfo(clientCals);
    setCalsInput(false);
  };

  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of my numbers to white
          fill: 'white',
          padding: 1,
        },
      },
    },
  };

  useEffect(() => {
    const calendarLogic = async () => {
      const meals = await apiClient.getMeals(user.sub);
      let flag = false;
      meals.forEach(meal => {
        if (meal[0] === ValueAlters.calendarChange(calVal)) {
          setDisplayMeals(meal[1]);
          flag = true;
        }
      });
      if (!flag) setDisplayMeals([]);
    };
    calendarLogic();
  }, [calVal]);

  useEffect(() => {
    const query = async () => {
      const tempRecipes = await apiClient.getRecipes(recipeQuery)
      tempRecipes.pop();
      setRecipes(tempRecipes);
    };
    query();
  }, [recipeQuery]);

  useEffect(() => {
    const grabUser = async () => {
      const clientUser = await apiClient.pageLoad(user.sub);
      const clientCals = await apiClient.getCals(user.sub);
      setUserInfo(clientUser);
      setCalsInfo(clientCals);
    };
    grabUser();
  }, [user]);

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
      {/** LEFT COL */}

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
          width={'80%'}
          height={'100%'}
        >
          <Box fontSize={'larger'} fontWeight={'bold'} width={'100%'}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
              mt={'10px'}
            >
              <Box display={'flex'}>
                <h1>Weight Lost</h1>
              </Box>
              <Box display={'flex'} flexDir={'column'} alignItems={'flex-end'}>
                <Button
                  borderRadius={'50%'}
                  bgColor={'green.400'}
                  fontSize={'xx-large'}
                  width={'20px'}
                  onClick={calForm}
                  pos={'relative'}
                  paddingBottom={'5px'}
                  zIndex={10}
                >
                  +
                </Button>
              </Box>
            </Box>
            {calsError && (
              <Box color={'red'} fontSize={'small'}>
                {' '}
                {errorMsg}{' '}
              </Box>
            )}
          </Box>
          <Box
            display={'flex'}
            flexDir={'column'}
            width={'100%'}
            height={'67%'}
            overflowY={'auto'}
            className={'left'}
          >
            {' '}
            {calsInfo &&
              chartLoader &&
              calsInfo[0].weight_history.map((weight) => {
                return (
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={'15px'}
                    border={'2px solid white'}
                    borderRadius={'0.375rem'}
                    minWidth={'100%'}
                    height={'60px'}
                  >
                    {' '}
                    <Box
                      padding={'5px'}
                      display={'flex'}
                      fontSize={'18px'}
                      alignItems={'center'}
                    >
                      {' '}
                      {weight[0]} you weighed {weight[2]}lbs{' '}
                      <Box ml={'20px'} fontSize={'xx-large'}>
                        {' '}
                        {weight[1] / -1}{' '}
                      </Box>{' '}
                    </Box>{' '}
                  </Box>
                );
              })}
          </Box>
          {calsInput && (
            <FormControl>
              <FormHelperText color={'white'}>
                Input Weight below
              </FormHelperText>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Input
                  width={'200px'}
                  value={newCalsInfo}
                  onChange={e => setNewCalsInfo(e.target.value)}
                ></Input>
                <Button bg={'green.400'} onClick={submitCals}>
                  Add
                </Button>
              </Box>
            </FormControl>
          )}
          {chartLoader && (
            <VictoryChart
              width={600}
              height={470}
              scale={{ x: 'time' }}
              theme={chartTheme}
              minDomain={{
                y:
                  parseInt(
                    calsInfo[0].weight_history[
                      calsInfo[0].weight_history.length - 1
                    ][2]
                  ) - 10,
              }}
              padding={40}
              containerComponent={<VictoryZoomContainer zoomDimension="x" />}
            >
              <VictoryLine
                style={{
                  data: { stroke: 'white', strokeWidth: 5 },
                }}
                animate={{
                  duration: 3000,
                }}
                data={chartData}
                x="date"
                y="weightNum"
              />
            </VictoryChart>
          )}
        </Box>
      </Box>

      {/** MIDDLE COL */}

      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        color={'white'}
        height={'100%'}
        width={'42%'}
      >
        <Box fontSize={'xx-large'} fontWeight={'bold'} mt={'5px'}>
          {' '}
          You have lost a total of:{' '}
          {calsInfo[0] &&
            calsInfo[0].starting_weight -
              calsInfo[0].weight_history[
                calsInfo[0].weight_history.length - 1
              ][2]}
          lbs
        </Box>

        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          overflowY={'auto'}
          className="middle"
        >
          <Box fontSize={'x-large'} fontWeight={'bold'} mt={'5px'}>
            {' '}
            Diet Friendly Recipes
          </Box>

          <FormControl
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            flexDir={'column'}
            alignItems={'center'}
          >
            <FormHelperText zIndex={1} color={'white'}>
              Search Recipes:
            </FormHelperText>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              flexDir={'column'}
            >
              <Input
                width={'200px'}
                zIndex={1}
                value={recipeQuery}
                onChange={e => setRecipeQuery(e.target.value)}
                placeHolder={'Chicken Stew'}
                color={'white'}
                m={'5px'}
              ></Input>
            </Box>
          </FormControl>

          <Box
            display={'flex'}
            height={'100%'}
            width={'100%'}
            flexDir={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
          >
            {recipes &&
              recipes.map(el => (
                <Box
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  m={'10px'}
                  width={'30%'}
                >
                  {' '}
                  <Box fontSize={'large'}> {el.recipe.label} </Box> <Box> </Box>{' '}
                  <Image src={el.recipe.image} width={'100%'}></Image>{' '}
                  <Box>
                    {' '}
                    <a href={el.recipe.shareAs}> Checkout this recipe </a>{' '}
                  </Box>{' '}
                </Box>
              ))}
          </Box>
        </Box>
      </Box>

      {/** RIGHT COL */}

      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-start'}
        color={'white'}
        height={'100%'}
        borderLeft={'1px solid white'}
        width={'25%'}
      >
        <Box display={'flex'} alignItems={'center'} flexDir={'column'}>
          <Box fontSize={'larger'} fontWeight={'bold'}>
            {' '}
            <h1> Meal Tracker </h1>
          </Box>
          <Box
            bg={'white'}
            color={'black'}
            margin={'35px'}
            boxShadow={'0 30px 40px 0 rgb(255 255 255 / 20%)'}
          >
            {/** CALENDAR */}

            <Calendar
              onChange={setCalVal}
              value={calVal}
              background={'white'}
            ></Calendar>
          </Box>
          <Box width={'100%'}>
            <FormControl
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <FormHelperText color={'white'}>Input Meal below</FormHelperText>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                flexDir={'column'}
              >
                <Input
                  width={'200px'}
                  value={newMealInfo}
                  onChange={e => setNewMealInfo(e.target.value)}
                  placeHolder={'PB Sandwich'}
                  color={'white'}
                  m={'5px'}
                ></Input>
                <Input
                  width={'200px'}
                  value={newMealInfo2}
                  onChange={e => setNewMealInfo2(e.target.value)}
                  placeHolder={'Calorie Amount'}
                  color={'white'}
                  m={'5px'}
                ></Input>
                <Button bg={'green.400'} onClick={submitMeals} m={'5px'}>
                  Add
                </Button>
              </Box>
            </FormControl>
          </Box>
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'100%'}
          >
            <h1>Meals:</h1>
            {displayMeals &&
              displayMeals.map(meal => {
                const mealName = meal.split(':')[0];
                const calAmount = meal.split(':')[1];
                return (
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    mt={'5px'}
                    border={'2px solid white'}
                    borderRadius={'0.375rem'}
                    width={'60%'}
                  >
                    {' '}
                    <Box
                      mt={'5px'}
                      mb={'5px'}
                      display={'flex'}
                      flexDir={'column'}
                    >
                      {' '}
                      <Box> {mealName} </Box> <Box> {calAmount} </Box>{' '}
                    </Box>{' '}
                    <Box ml={'10px'} mt={'5px'} mb={'5px'}>
                      {' '}
                      <RemoveBtn date={calVal} meal={meal} displayMeals={displayMeals} setDisplayMeals={setDisplayMeals}>
                        {' '}
                      </RemoveBtn>{' '}
                    </Box>{' '}
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
