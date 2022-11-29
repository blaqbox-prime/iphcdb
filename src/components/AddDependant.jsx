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
  CircularProgress,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Center,
  useToast,
  ModalFooter,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { baseURL } from "../helpers";

function AddDependant({ isOpen, onClose, onOpen, currentMember, type }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        const res = await fetch(`${baseURL}/api/members`);
        if (res.status == 200) {
          const data = await res.json();
          console.log(data);
          setMembers(data.members);
          setLoading(false);
        } else {
          toast({
            title: `Server error`,
            description: "Please Try again later",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

      fetchData();
    }

    return () => {};
  }, [isOpen]);

  const onCheckboxChange = (e, member) => {
    const value = e.target.checked;
    let newSelected = selected;
    if (!selected.includes(member._id)) {
      newSelected.push(member._id);
      setSelected(newSelected);
    } else {
      newSelected = newSelected.filter((_id) => _id !== member._id);
      setSelected(newSelected);
    }
  };


  const onSubmit = async () => {

    if(selected.length < 1) return;

    setIsSubmitting(true);

    let res = await fetch(`/api/member/add-${type}`,{
        method: 'POST',
        body: JSON.stringify({selected,_id:currentMember._id}),
    });

    setIsSubmitting(false);

    if(res.status === 200){
        toast({
            title: `${type == 'spouse' ? 'Spouse(s) Added' : 'Child(ren) Added'}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    } else {

        let data = await res.json();
        console.log(data);

        toast({
            title: 'Failed to add',
            description: `server failed. Please try again later`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="768px">
        <ModalHeader>{`Add ${type}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Selected</Th>
                    <Th>Name(s)</Th>
                    <Th>Surname</Th>
                    <Th>Gender</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {members?.map((member) => (
                    <Tr key={member._id}>
                      <Td>
                        <Checkbox
                          colorScheme="green"
                          onChange={(e) => {
                            onCheckboxChange(e, member);
                          }}
                        ></Checkbox>
                      </Td>
                      <Td>{member.firstNames}</Td>
                      <Td>{member.lastName}</Td>
                      <Td>{member.gender}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </ModalBody>
        <ModalFooter>

          <Flex width="100%" justifyContent="space-between" alignItems={'center'}>
          
          <Link href='/signup'>
            <Text cursor="pointer" >Not found? <Text as="span" color={'red'} _hover={{textDecoration:'underline'}}>Add member to database</Text></Text>
          </Link>

          <Box>
          <Button
            color="red"
            onClick={() => {
              onClose();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={()=>{onSubmit()}}
          isLoading={isSubmitting}
          >
            Add {type}
          </Button>
          </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddDependant;
