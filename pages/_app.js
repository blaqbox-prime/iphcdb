// pages/_app.js
import { ChakraProvider, Container } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <Navbar/>
      <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default MyApp