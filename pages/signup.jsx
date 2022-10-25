import { Box, Button, Flex, Grid, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Radio, RadioGroup 
  } from '@chakra-ui/react'

function Signup() {

    const {register, handleSubmit, formState: { errors }} = useForm();
    // const [data,setData] = useState();
    const [empStatus,setEmpStatus] = useState();
    // For Loading animation
    const [isLoading, setLoading] = useState(false);
    // track matching password error
    const [isMatchingPass,setIsMatchingPass] = useState();
    const toast = useToast();

    const router = useRouter();


    // log form result on submit
    const onSubmit = (data) => {

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
        setLoading(true);
        fetch('/api/addmember',{
            method: 'POST',
            body: JSON.stringify(formattedData),
        }).then(result => result.json()).then(res => {
            router.push('/');
        })
        .catch(error => console.log(error));
        setLoading(false);
    };

    const hasMatchingPasswords = (pass1, pass2) => {
        return pass1 === pass2;
    }


  return (
    <Flex height={["100vh","100vh","80vh"]} boxShadow={["unset","unset","md"]} mt={5} 
    flexDirection={["column", "column" ,"row"]}
    >
        <Box w={["100%","100%","40%"]} maxheight={['unset','unset',"100%"]} bgImg={["none", "none" ,"images/church1.jpg"]} bgPos={"center"} bgSize="cover" color={["black", "black", "white"]} p={['2',"6"]} >
            <Heading fontSize="4xl">Members Database</Heading>
        </Box>

        {/* FORM --------- */}
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w={['100%','100%',"60%"]} p={['2',"6"]} overflowY={["unset","unset",'auto']}>
            <Box id="personalInfoForm" minH={['unset','unset','100%']} mb="5">
                <Heading mb={5}>Personal Information</Heading>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>First Names</FormLabel>
                    <Input type="text" {...register("firstNames",  {required: true, maxLength: 50})}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register("lastName")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" {...register("dob")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Contact Number</FormLabel>
                    <Input type="text" {...register("contact")}/>
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
            {/* Home Address -------------------------------------*/}
            <Box id="homeAddressForm" mb="16">
                <Heading mb={5}>Where do you live?</Heading>
                <Grid gridTemplateColumns={"repeat(2,1fr)"} gap="3" mb="5">
                    {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Street</FormLabel>
                    <Input type="text"{...register("street")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Suburb</FormLabel>
                    <Input type="text" {...register("suburb")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input type="text" {...register("city")}/>
                </FormControl>
                
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Province</FormLabel>
                    <Input type="text" {...register("province")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl>
                    <FormLabel>Postal Code</FormLabel>
                    <Input type="text" {...register("postal")}/>
                </FormControl>
                </Grid>
            </Box>
            {/* Occupation -------------------------------------*/}
            <Box id="occupationForm" mb="16">
                <Heading mb={5}>Occupation</Heading>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>Employment status</FormLabel>
                    <Select placeholder='---- Select ----' {...register("empStatus")} onChange={(e)=>{setEmpStatus(e.target.value)}}>
                        <option value='Employed'>Employed</option>
                        <option value='Self-Employed'>Self-Employed</option>
                        <option value='Unemployed'>Unemployed</option>
                    </Select>
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
                    <Select placeholder='---- Select ----' {...register("isSeekingWork")}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </Select>
                </FormControl>
            </Box>
            <Box id="loginCredentialsForm" mb="16">
                <Heading>Account Information</Heading>
                <Text fontSize="sm" mb="5">These will be used to access the database</Text>
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
                    {!isMatchingPass && <FormErrorMessage>Passwords do not match</FormErrorMessage>}
                </FormControl>
            </Box>
            <Button type="submit" colorScheme='blue' px={8} 
            isLoading={isLoading}
            loadingText="Submitting"
            >Submit</Button>
        </Box>
    </Flex>
  )
}

export default Signup