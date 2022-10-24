import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'


function Navbar() {
  return (
   
        <Flex alignItems={'center'}
        height="50px" boxShadow="sm" px="5"
        justifyContent="space-between" mb={5}>
            {/* Left -- Branding */}
            <Flex alignItems={'center'}>
                <Link href={'/'}>
                    <Text cursor="pointer">IPHC DB</Text>
                </Link>
            </Flex>
            {/* Right -- NavButtons */}
            <Flex alignItems={'center'}>
                <Link href={'/signup'}>
                <Button size={"sm"} rightIcon={<AddIcon />}>Sign Up </Button>
                </Link>
            </Flex>
        </Flex>

  )
}

export default Navbar