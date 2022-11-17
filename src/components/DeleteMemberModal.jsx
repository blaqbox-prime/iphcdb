import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/reducers/authUser/authUserSlice';

function DeleteMemberModal({isOpen, onOpen, onClose, member}) {
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const router = useRouter()
    
    const toast = useToast();

    const deleteMember = async () => {
        
        const res = await fetch('/api/deletemember',{
            method: 'POST',
            body: JSON.stringify(member),
        })

        if(res.status == 200){
            toast({
                title: 'Deleted Successfully',
                        description: 'Member has been removed from the database',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
            })

            if(authUser._id == member._id){
                dispatch(signout);
                router.reload();
            }
        }

        if(res.status == 404) return toast({
            title: `${resData.message}`,
                      description: "Member is not registered",
                      status: 'error',
                      duration: 5000,
                      isClosable: true,
          });
      
          if(res.status == 500) return toast({
            title: `${resData.message}`,
                      description: "Server error. Try again later",
                      status: 'error',
                      duration: 5000,
                      isClosable: true,
          });
      

        onClose();
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>{authUser._id == member._id ? "Delete Member (Admin Account)": 'Delete Member'}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>
                    {`Are you sure you want to delete ${member.firstNames} ${member.lastName}`}?
                </Text>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button color="blue" onClick={()=>{onClose()}}>Cancel</Button>
                    <Button colorScheme="red" onClick={deleteMember}>Delete</Button>
                </ButtonGroup>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default DeleteMemberModal