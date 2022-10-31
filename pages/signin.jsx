import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { signin } from '../src/redux/reducers/authUser/authUserSlice';

function Signin() {
  
  const {register, handleSubmit, formState: { errors, isSubmitting, isValid }} = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password
    }

    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      body: JSON.stringify(user),
    });

    const resData = await res.json();

    if(res.status == 404) return toast({
      title: `${resData.message}`,
                description: "Member is not registered",
                status: 'error',
                duration: 5000,
                isClosable: true,
    });

    if(res.status == 400) return toast({
      title: `${resData.message}`,
                description: "Check credentials and try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
    });

    console.log(resData);

    dispatch(signin(resData.member));

    router.push('/');

  }

  const onInvalid = (errors) => {
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
    <Center w="100%" h="70vh">
    <Box as={'form'} onSubmit={handleSubmit(onSubmit,onInvalid)} id="SignInForm" w="400px" px={6} py={16}>
    <Heading mb={6} fontSize="5xl">Sign In</Heading>
    {/* ----------------------- */}
     <FormControl mb="3" isInvalid={'email' in errors}>
                    <FormLabel>Email address </FormLabel>
                    <Input type="email" {...register("email", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'email'}/></Text>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'password' in errors}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("password", {required: 'Field is required'})} />
                    <Text color={'red'}>
                    <ErrorMessage errors={errors} name={'password'}/>
                    </Text>
                    </FormControl>
    {/* ----------------------- */}
    <Button w={'100%'} type="submit" colorScheme={'blue'} isLoading={isSubmitting} mb={5}>Sign In</Button>
    <Link href="/signup">
    <Button w={'100%'} variant="link" color={'red.300'} fontWeight="normal"> Not already registered? Sign Up</Button>
    </Link>
</Box>
    </Center>
  )
}

export default Signin