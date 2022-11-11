import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import React from 'react'

function DeleteMemberModal({isOpen, onOpen, onClose, member}) {

    const toast = useToast();

    const deleteMember = (member) => {
        toast({
            title: 'Deleted Successfully',
                    description: 'Member has been removed from the database',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
        })
        onClose();
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Delete Member</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>
                    {`Are you sure you want to delete ${member.firstNames} ${member.lastName}`}?
                </Text>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button color="blue">Cancel</Button>
                    <Button colorScheme="red" onClick={deleteMember}>Delete</Button>
                </ButtonGroup>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default DeleteMemberModal