import { Box, Button, Divider, Flex, Grid, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ErrorMessage } from '@hookform/error-message';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Radio, RadioGroup 
  } from '@chakra-ui/react'

function Signup() {

    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm();
    // const [data,setData] = useState();
    const [empStatus,setEmpStatus] = useState();
    // For Loading animation
    const [isLoading, setLoading] = useState(false);
    // track matching password error
    const [isMatchingPass,setIsMatchingPass] = useState();
    const toast = useToast();

    const router = useRouter();


    // log form result on submit
    const onSubmit = async (data) => {

        console.log(data)

        if(!hasMatchingPasswords(data.password,data.confirmPass)){
            return;
        }

        let addressData = {
            street: data.street,
            suburb: data.suburb,
            city: data.city,
            province: data.province,
            postal_code: data.postal
        };

        let occupationData = {
            company: data.company,
            jobTitle: data.jobTitle,
        };

        let formattedData = {
            firstNames: data.firstNames,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            contact: data.contact,
            dateOfBirth: data.dob,
            address: addressData,
            employmentStatus: data.empStatus,
            isSeekingWork: data.isSeekingWork == 'Yes' ? true : false,
            isMarried: data.isMarried == 'Yes' ? true : false,
            occupation: occupationData,
        }

        // submit to backend

        let host = process.env.NODE_ENV == 'production' ? 'https://iphcdb.vercel.app' :'http://localhost:3000'
       
        let res = await fetch(`${host}/api/addmember`,{
            method: 'POST',
            body: JSON.stringify(formattedData),
        });

        console.log(res);

        if(res.status === 200){
            toast({
                title: 'Account created.',
                description: "You have been successfully added to the IPHC database.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            setTimeout(() => {
                router.push('/');
            },2000)
        } else {

            let data = await res.json();
            console.log(data);

            toast({
                title: 'Failed to create account',
                description: `${data.error.keyValue.email} is already registered`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
        }
    };

    const hasMatchingPasswords = (pass1, pass2) => {
        return pass1 === pass2;
    }


  return (
    <Flex mt={5} 
    flexDirection={'column'}
    w="100"
    alignItems={'center'}
    >
                    <Heading fontSize="6xl">Sign Up</Heading>
                    <Divider maxW={'container.md'} my={2}/>

        {/* FORM --------- */}
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w={['100%','100%',"60%"]} p={['2',"6"]} overflowY={["unset","unset",'auto']}>
            <Box id="personalInfoForm" minH={['unset','unset','100%']} mb="5">
                <Heading mb={5}>Personal Information</Heading>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'firstNames' in errors}>
                    <FormLabel>First Names</FormLabel> 
                    <Input type="text" {...register("firstNames",  {required: 'Field is required'})} mb={1}/>
                    <ErrorMessage errors={errors} name={'firstNames'}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register("lastName", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'lastName'}/>

                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" {...register("dob", {required:'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'dob'}/>

                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Contact Number</FormLabel>
                    <Input type="text" {...register("contact",{required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'contact'}/>
                </FormControl>
                 {/* ----------------------- */}
                 <FormControl mb="3">
                    <FormLabel>Are You Married?</FormLabel>
                    <RadioGroup >
                        <Stack direction='row' gap={5}>
                            <Radio value='Yes' {...register("isMarried")}>Yes</Radio>
                            <Radio value='No' {...register("isMarried")}>No</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>
            {/* Home Address -------------------------------------*/}
            <Box id="homeAddressForm" mb="16">
                <Heading mb={5}>Where do you live?</Heading>
                <Grid gridTemplateColumns={"repeat(2,1fr)"} gap="3" mb="5">
                    {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Street</FormLabel>
                    <Input type="text"{...register("street", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'street'}/>

                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Suburb</FormLabel>
                    <Input type="text" {...register("suburb", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'suburb'}/>

                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input type="text" {...register("city", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'city'}/>

                </FormControl>
                
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Province</FormLabel>
                    <Input type="text" {...register("province", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'province'}/>

                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Postal Code</FormLabel>
                    <Input type="text" {...register("postal",  {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'postal'}/>
                </FormControl>
                </Grid>
            </Box>
            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>

            {/* Occupation -------------------------------------*/}
            <Box id="occupationForm" mb="16">
                <Heading mb={5}>Occupation</Heading>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Employment status</FormLabel>
                    <Select placeholder='---- Select ----' {...register("empStatus", {required: 'Select one option from the dropdown list'})} onChange={(e)=>{setEmpStatus(e.target.value)}}>
                        <option value='Employed'>Employed</option>
                        <option value='Self-Employed'>Self-Employed</option>
                        <option value='Unemployed'>Unemployed</option>
                    </Select>
                    <ErrorMessage errors={errors} name={'empStatus'}/>

                </FormControl>
                {
                    (empStatus == 'Employed' || (empStatus == 'Self-Employed')) && (
                        <Box>
                            {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Which company do you work for?</FormLabel>
                    <Input type="text" {...register("company")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>What is your job title</FormLabel>
                    <Input type="text" {...register("jobTitle")}/>
                </FormControl>
                        </Box>
                    )
                }
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Are you actively seeking work?</FormLabel>
                    <Select placeholder='---- Select ----' {...register("isSeekingWork", {required: 'Select one option from the dropdown list'})}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </Select>
                    <ErrorMessage errors={errors} name={'isSeekingWork'}/>
                </FormControl>
            </Box>

            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>
                {/* Login Credentials----------------------- */}

            <Box id="loginCredentialsForm" mb="16">
                <Heading>Account Information</Heading>
                <Text fontSize="sm" mb="5">These will be used to access the database</Text>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" {...register("email", {required: 'Field is required'})}/>
                    <ErrorMessage errors={errors} name={'email'}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("password", {required: 'Field is required'})} />
                    <ErrorMessage errors={errors} name={'password'}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...register("confirmPass", {required: 'Passwords do not match'})}/>
                    <ErrorMessage errors={errors} name={'confirmPass'}/>
                </FormControl>
            </Box>
            <Button type="submit" colorScheme='blue' px={8} 
            isLoading={isSubmitting}
            loadingText="Submitting"
            >Submit</Button>
        </Box>
    </Flex>
  )
}

export default Signup