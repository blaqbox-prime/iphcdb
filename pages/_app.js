// pages/_app.js
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../src/components/Navbar'
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
<SessionProvider session={session}>
    <Provider store={store}>
    <ChakraProvider>
      <Container maxW="container.xl">
        <Navbar/>
      <Component {...pageProps} />
      </Container>
    </ChakraProvider>
    </Provider>
</SessionProvider>
  )
}

export default MyApp