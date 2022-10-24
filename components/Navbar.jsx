import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Navbar() {
  return (
   
        <Flex alignItems={'center'}
        height="50px" boxShadow="sm" px="5"
        justifyContent="space-between">
            {/* Left -- Branding */}
            <Flex alignItems={'center'}>
                <Text>IPHC DB</Text>
            </Flex>
            {/* Right -- NavButtons */}
            <Flex alignItems={'center'}>
                <Text>Sign in</Text>
            </Flex>
        </Flex>

  )
}

export default Navbar