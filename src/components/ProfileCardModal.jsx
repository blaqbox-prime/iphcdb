import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  Box,
  Flex,
  List,
  Icon,
  HStack,
  Divider, 
  Link,
  ListItem
} from '@chakra-ui/react'
import Dependants from './Dependants'

import {MdAlternateEmail, MdOutlinePhone} from 'react-icons/md'
import {FaMapMarkerAlt} from 'react-icons/fa'

function ProfileCardModal({isOpen, onOpen, onClose, member}) {

  const {city,suburb, street, province, postal_code} = member.address;

  const addressmapsLink = () =>{
    const baseURL = 'https://www.google.com/maps/search/?api=1&query=';
    let query = `${baseURL}${street.replace(' ','+')},${suburb.replace(' ','+')},${city.replace(' ','+')},${province.replace(' ','+')},${postal_code.replace(' ','+')}`;
    return query;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent maxW="container.md">
        <ModalHeader>{`${member.firstNames} ${member.lastName}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        {/* Personal Info */}

        {/* Individual details ---------- */}

        <Heading fontSize={'2xl'}>Personal Information</Heading>
       
        <Flex gap={['100px','200px','300px']}>
        <Box>
        <Text mb={4}>First Names: <br/> {member.firstNames}</Text>
        <Text mb={4}>Surname: <br/> {member.lastName}</Text>
        <Text mb={4}>Date of Birth: <br/> {new Date(member.dateOfBirth).toDateString()}</Text>
        <Text mb={4}>Gender: <br/> {member.gender}</Text>
        <Text mb={4}>Married: <br/> <Text as={'span'} color={member.isMarried ? 'green.600' : 'red.600'}>{member.isMarried ? 'Yes' : 'No'}</Text> </Text>
        </Box>
        
        {/* Family ---------*/}

        <Box>
        {/* Spouses */}
        <Box mb={4}>
        <Text>Spouse(s):</Text>
        <Dependants memberId={member._id} type="spouse"/>

        </Box> 

        {/* Children */}
        <Box mb={4}>
        <Text>Children:</Text>
      <Dependants memberId={member._id} type="children"/>
        </Box> 
        </Box>
        </Flex>
        <Divider my={3}/>
        {/* Contacts */}
        <Heading fontSize={'2xl'} mb={2}>Contacts</Heading>

        <HStack spacing={4} mb={2}>
          <Icon as={MdOutlinePhone} />
          <Text>{member.contact}</Text>
        </HStack>

        <HStack spacing={'4'} mb={4}>
          <Icon as={MdAlternateEmail} />
          <Text>{member.email}</Text>
        </HStack>
        <Divider my={3}/>
        {/* Address */}
        <Heading fontSize={'2xl'} mb={2}>Address</Heading>
        <Link isExternal={true} href={addressmapsLink()}> 
        <HStack>
          <Icon as={FaMapMarkerAlt}/>
          <Text as="address">
            {`${street}, ${suburb}, ${city}, ${province}`}
          </Text>
        </HStack>
        </Link>
        <Divider my={3}/>
        {/* Employment Status */}
        <Heading fontSize={'2xl'} mb={2}>Employment</Heading>

        <Text mb={4}>Employment status: <br/> {member.employmentStatus}</Text>
        {
          member.employmentStatus !== 'Unemployed' && (<Box>
             <Text mb={4}>Company: <br/> {member.occupation.company}</Text>
             <Text mb={4}>Position: <br/> {member.occupation.jobTitle}</Text>
          </Box>)
        }

      <Text mb={4}>Actively seeking work: <br/>
       <Text as={'span'} color={member.isSeekingWork ? 'green.600' : 'red.600'}>{member.isSeekingWork ? 'Yes' : 'No'}</Text>
      </Text>

        </ModalBody>
          
      <ModalFooter>
        <Button colorScheme={'blue'} onClick={onClose}>Close</Button>
      </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

export default ProfileCardModal