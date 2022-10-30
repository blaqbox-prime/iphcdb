import React from 'react'
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
    Tooltip
  } from '@chakra-ui/react'

function MembersTable({members}) {
    console.log(members)

  return (
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
  )
}

export default MembersTable