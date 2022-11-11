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
    Button,useDisclosure, IconButton, Icon
  } from '@chakra-ui/react'

  import { useRouter } from 'next/router'
import ProfileCardModal from './ProfileCardModal';
import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

import { MdEdit, MdDelete } from 'react-icons/md';
import DeleteMemberModal from './DeleteMemberModal';


function MembersTable({members}) {

  const router = useRouter();
  const confirmDeleteModal = useDisclosure();
  const displayMemberProfileCard = useDisclosure();
  const {isOpen, onOpen, onClose} = displayMemberProfileCard;

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedForDeleteMember, setSelectedForDeleteMember] = useState(null);
  const authUser = useSelector((state) => state.authUser);
    
  console.log(members)

  const showProfile = (member) => {
    setSelectedMember(member);
    !isOpen && onOpen();
  }

  const showDeleteMemberModal = (member) => {
    setSelectedForDeleteMember(member);
    !confirmDeleteModal.isOpen && confirmDeleteModal.onOpen();
  }


  return (
    <Box>
      { authUser?.isAdmin && <Button w="100%" leftIcon={<AddIcon />} colorScheme={'blue'} onClick={()=>{router.push('/signup')}}>Add Member</Button>}
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
                  {authUser?.isAdmin && (<Th>Actions</Th>)}
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
                        { authUser?.isAdmin && (<Td>
                          <IconButton aria-label="Edit members profile" bg="transparent" icon={<Icon as={MdEdit}/>}/>
                          <IconButton aria-label="Delete members profile" bg="transparent" icon={<Icon as={MdDelete} color="red" onClick={()=>{showDeleteMemberModal()}}/>} />
                        </Td>)}
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
        {
          selectedForDeleteMember && <DeleteMemberModal isOpen={confirmDeleteModal.isOpen} member={selectedMember} onClose={confirmDeleteModal.onClose}/>
        }
    </Box>
  )
}

export default MembersTable