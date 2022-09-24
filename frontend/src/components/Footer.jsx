import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box borderTop={'2px solid white'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        mt={3}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Link href={'#'} color={'white'}>Home</Link>
          <Link href={'#'} color={'white'}>About</Link>
          <Link href={'#'} color={'white'}>Blog</Link>
          <Link href={'#'} color={'white'}>Contact</Link>
        </Stack>
        <Text color={'white'}>© 2022 Longevity Losses. All rights reserved</Text>
      </Container>
    </Box>
  );
}