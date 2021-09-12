import { ChakraProvider, Container } from '@chakra-ui/react';
import { HomePage } from './components/HomePage';
import { RecoilRoot } from 'recoil';

export const App = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Container mt={4}>
        <HomePage />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);
