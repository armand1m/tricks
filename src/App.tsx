import { ChakraProvider, Container } from '@chakra-ui/react';
import { HomePage } from './components/HomePage';
import { RecoilRoot } from 'recoil';
import { theme } from './theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Container mt={4}>
        <HomePage />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);
