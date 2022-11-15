import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import {FaUserCircle} from 'react-icons/fa';
import {BiExit} from 'react-icons/bi'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { signout } from '../redux/reducers/authUser/authUserSlice';
import { useRouter } from 'next/router';


function Navbar() {

    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const signoutUser = () => {
        dispatch(signout);
        router.reload();
    }

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
                <Menu isLazy>
                    <MenuButton>
                        <Flex alignItems={'center'}>
                        <Icon boxSize={6} as={FaUserCircle}/>
                {authUser && <Text ml="3">{authUser.firstNames}</Text>}
                        </Flex>
                    </MenuButton>
                    {
                        authUser && (
                            <MenuList>
                                <MenuItem icon={<Icon as={FaUserCircle}/>}>Profile</MenuItem>
                                <MenuItem icon={<Icon as={BiExit}/>} onClick={signoutUser}>Sign Out</MenuItem>
                            </MenuList>
                        )
                    }
                </Menu>
            </Flex>
        </Flex>

  )
}

export default Navbar