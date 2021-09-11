import { ChakraProvider, Container } from '@chakra-ui/react';
import { HomePage } from './components/HomePage';
import { RecoilRoot } from 'recoil';

export const App = () => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Container marginTop={4}>
          <HomePage />
        </Container>
      </RecoilRoot>
    </ChakraProvider>
  );
};
