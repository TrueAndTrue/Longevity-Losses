import { Button } from '@chakra-ui/react';
import apiClient from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import ValueAlters from '../services/ValueAlters';

const RemoveBtn = ({ date, meal, displayMeals, setDisplayMeals }) => {
  const { user } = useAuth0();

  const removeItem = async () => {
    await apiClient.deleteMeal(
      user.sub,
      ValueAlters.calendarChange(date),
      meal
    );
  };

  return (
    <Button
      bg="red"
      textColor={'white'}
      onClick={removeItem}
      height={'30px'}
      width={'70px'}
    >
      Remove
    </Button>
  );
};

export default RemoveBtn;
