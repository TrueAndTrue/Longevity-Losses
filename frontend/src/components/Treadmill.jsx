import { Box, Image } from "chakra-ui/react";
import treadmill from '../assets/treadmill-workouts.gif'

const Treadmill = props => {

  return (
    <Box bg='purple.400'> 
        <Image src={treadmill} width={150} mt={50} bgColor='purple.400' display={'inline'}/>
    </Box>
  )
}

export default Treadmill;