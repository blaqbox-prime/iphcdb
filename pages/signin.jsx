import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { signin } from '../src/redux/reducers/authUser/authUserSlice';
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"


function Signin({csrfToken}) {
  
  const {register, handleSubmit, formState: { errors, isSubmitting, isValid }} = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password
    }

    const res = await signIn('credentials',{...user,redirect: false},);

    console.log(res);
  
    if(res.status == 200) toast({
      title: `Signed In`,
                status: 'success',
                duration: 5000,
                isClosable: true,
    });

    if(res.status == 401) return toast({
      title: `Check credentials`,
                description: "Check credentials and try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
    });


   return router.push('/');

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
    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    <Heading mb={6} fontSize="5xl">Sign In</Heading>
    {/* ----------------------- */}
     <FormControl mb="3" isInvalid={'email' in errors}>
                    <FormLabel>Email address </FormLabel>
                    <Input type="email" name="email" {...register("email", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'email'}/></Text>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'password' in errors}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" {...register("password", {required: 'Field is required'})} />
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

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}