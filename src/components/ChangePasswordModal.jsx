import { Box,Button, ButtonGroup, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';


function ChangePasswordModal({isOpen, onOpen, onClose, member}) {
    const authUser = useSelector((state) => state.authUser);
    const toast = useToast();
    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm();


    // onSubmit
    const onSubmit = async (data) => {

        data['member_id'] = member._id;

        if(data.password !== data.confirmPass){
            return toast({
                    title: `Passwords do not match`,
                              status: 'error',
                              duration: 1000,
                              isClosable: true,
                  });
        }


        const res = await fetch('/api/member/update-password',{
            method: 'POST',
            body: JSON.stringify(data),
        })

        if(res.status == 200){
            toast({
                title: 'Password Updated Successfully',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
            })
        }
      
        const resData = res.json();

          if(res.status == 500) return toast({
            title: `${resData.message}`,
                      description: "Server error. Try again later",
                      status: 'error',
                      duration: 5000,
                      isClosable: true,
          });

        onClose();

    }


    // OnInvalid
    const onInvalid = (err) => {
        if(!isValid){
            return toast(
                {
                    title: 'Form is incomplete',
                    description: 'Please fill in all required fields and try again',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  }
            );
        }
    }
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>{ "Update Password"}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
               
            <Box as="form" onSubmit={handleSubmit(onSubmit, onInvalid)} w={'100%'} p={'2'} overflowY={["unset","unset",'auto']}>
                                 {/* ----------------------- */}
    <FormControl mb="3" isInvalid={'password' in errors}>
    <FormLabel>Password <Text as="span" color="red">*</Text></FormLabel>
    <Input type="password" {...register("password", {required: 'Field is required'})} />
    <Text color={'red'}>
    <ErrorMessage errors={errors} name={'password'}/>
    </Text>
                    </FormControl>
{/* ----------------------- */}
<FormControl mb="3" isInvalid={'confirmPass' in errors}>
    <FormLabel>Confirm Password <Text as="span" color="red">*</Text></FormLabel>
    <Input type="password" {...register("confirmPass", {required: 'Passwords do not match'})}/>
    <Text color={'red'}>
    <ErrorMessage errors={errors} name={'confirmPass'}/>
    </Text>
</FormControl>
                <ButtonGroup>
                    <Button color="red" variant={'ghost'} onClick={()=>{onClose()}}>Cancel</Button>
                    <Button colorScheme="blue" isLoading={isSubmitting} type='submit'>Update Password</Button>
                </ButtonGroup>

            </Box>

            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ChangePasswordModal