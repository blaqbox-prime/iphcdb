import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Tooltip,
    Box,
    Button,useDisclosure
  } from '@chakra-ui/react'

  import { useRouter } from 'next/router'
import ProfileCardModal from './ProfileCardModal';

function MembersTable({members}) {

  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedMember, setSelectedMember] = useState(null);
    
  console.log(members)

  const showProfile = (member) => {
    setSelectedMember(member);
    !isOpen && onOpen();
  }

  return (
    <Box>
      <Button w="100%" colorScheme={'blue'} onClick={()=>{}}>Add New Member</Button>
      <TableContainer my="3">
          <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name(s)</Th>
                  <Th>Surname</Th>
                  <Th>Email</Th>
                  <Th>Contact</Th>
                  <Th>Employment Status</Th>
                  <Th>Actively Seeking Work</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Render Each Record */}

                {
                  members.map(member => (
                    <Tooltip label={`View ${member.firstNames}'s full profile`} key={member._id} >
                      <Tr 
                      cursor="pointer"
                      _hover={
                        {backgroundColor: "blue.100",}
                      }
                      onClick={()=>{showProfile(member)}}
                    >
                        <Td>{member.firstNames}</Td>
                        <Td>{member.lastName}</Td>
                        <Td>{member.email}</Td>
                        <Td>{member.contact}</Td>
                        <Td>{member.employmentStatus}</Td>
                        <Td>{member.isSeekingWork ? "Yes" : "No" }</Td>
                        <Td></Td>
                    </Tr>
                    </Tooltip>
                  ))
                }
              </Tbody>
          </Table>
        </TableContainer>
        {
          selectedMember && <ProfileCardModal isOpen={isOpen} member={selectedMember} onClose={onClose}/>
        }
    </Box>
  )
}

export default MembersTable