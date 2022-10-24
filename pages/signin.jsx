import { Box, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React from 'react'
import { useForm } from 'react-hook-form'


function Signin() {
  const {register, handleSubmit, formState: { errors }} = useForm();
  return (
    <Box id="SignInForm">
    <Heading>Sign In</Heading>
    {/* ----------------------- */}
    <FormControl mb="3">
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("email")}/>
    </FormControl>
    {/* ----------------------- */}
    <FormControl mb="3">
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} />
    </FormControl>
    {/* ----------------------- */}
    <FormControl mb="3">
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" {...register("confirmPass")}/>
    </FormControl>
</Box>
  )
}

export default Signin