// pages/_app.js
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../src/components/Navbar'
import { Provider } from 'react-redux';
import store from '../src/redux/store';


function MyApp({ Component, pageProps }) {
  return (

    <Provider store={store}>
    <ChakraProvider>
      <Container maxW="container.xl">
        <Navbar/>
      <Component {...pageProps} />
      </Container>
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp