import { Box, Button, Divider, Flex, Grid, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';


import {
    FormControl,
    FormLabel,
    Select,
    Radio, RadioGroup 
} from '@chakra-ui/react'
import { signin } from '../src/redux/reducers/authUser/authUserSlice'

function Signup() {
    
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm();
    // const [data,setData] = useState();
    const [empStatus,setEmpStatus] = useState();
    // For Loading animation
    const toast = useToast();

    const router = useRouter();


    // log form result on submit
    const onSubmit = async (data) => {

        console.log(data)

        if(!hasMatchingPasswords(data.password,data.confirmPass)){
            return toast(
                    {
                        title: 'Passwords don\'t match',
                        description: 'Check passwords and try again',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      }
                );

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

        if(res.status === 200){
            toast({
                title: 'Account created.',
                description: "You have been successfully added to the IPHC database.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              dispatch(signin(await res.json().member));
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
    <Flex mt={5} 
    flexDirection={'column'}
    w="100"
    alignItems={'center'}
    >
                    <Heading fontSize="6xl">Sign Up</Heading>
                    
                    <Divider maxW={'container.md'} my={2}/>

                    <Text fontSize="sm" color="red">Required fields are marked with a (*)</Text>

        {/* FORM --------- */}
        <Box as="form" onSubmit={handleSubmit(onSubmit, onInvalid)} w={['100%','100%',"60%"]} p={['2',"6"]} overflowY={["unset","unset",'auto']}>
            <Box id="personalInfoForm" minH={['unset','unset','100%']} mb="5">
                <Heading mb={5}>Personal Information</Heading>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'firstNames' in errors}>
                    <FormLabel>First Names <Text as="span" color="red">*</Text></FormLabel> 
                    <Input type="text" {...register("firstNames",  {required: 'Field is required'})} mb={1}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'firstNames'}/></Text>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'lastName' in errors}>
                    <FormLabel>Last Name <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("lastName", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'lastName'}/></Text>


                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'dob' in errors}>
                    <FormLabel>Date of Birth <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="date" {...register("dob", {required:'Field is required'})}/>
                   <Text color="red"> <ErrorMessage errors={errors} name={'dob'}/></Text>

                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'contact' in errors}>
                    <FormLabel>Contact Number <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("contact",{required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'contact'}/></Text>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'gender' in errors}>
                    <FormLabel>Gender <Text as="span" color="red">*</Text></FormLabel>
                    <RadioGroup defaultValue='Male'>
                        <Stack direction='row' gap={5}>
                            <Radio value='Male' {...register("gender")}>Male</Radio>
                            <Radio value='Female' {...register("gender")}>Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                 {/* ----------------------- */}
                 <FormControl mb="3" isInvalid={'isMarried' in errors}>
                    <FormLabel>Are You Married? <Text as="span" color="red">*</Text></FormLabel>
                    <RadioGroup defaultValue='No'>
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
                <FormControl isInvalid={'street' in errors}>
                    <FormLabel>Street <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text"{...register("street", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'street'}/></Text>

                </FormControl>
                {/* ----------------------- */}
                <FormControl isInvalid={'suburb' in errors}>
                    <FormLabel>Suburb <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("suburb", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'suburb'}/></Text>

                </FormControl>
                {/* ----------------------- */}
                <FormControl isInvalid={'city' in errors}>
                    <FormLabel>City <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("city", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'city'}/></Text>
                </FormControl>
                
                {/* ----------------------- */}
                <FormControl isInvalid={'province' in errors}>
                    <FormLabel>Province <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("province", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'province'}/></Text>

                </FormControl>
                {/* ----------------------- */}
                <FormControl isInvalid={'postal' in errors}>
                    <FormLabel>Postal Code <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("postal",  {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'postal'}/></Text>
                </FormControl>
                </Grid>
            </Box>
            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>

            {/* Occupation -------------------------------------*/}
            <Box id="occupationForm" mb="16">
                <Heading mb={5}>Occupation</Heading>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'empStatus' in errors}>
                    <FormLabel>Employment status <Text as="span" color="red">*</Text></FormLabel>
                    <Select placeholder='---- Select ----' {...register("empStatus", {required: 'Select one option from the dropdown list'})} onChange={(e)=>{setEmpStatus(e.target.value)}}>
                        <option value='Employed'>Employed</option>
                        <option value='Self-Employed'>Self-Employed</option>
                        <option value='Unemployed'>Unemployed</option>
                    </Select>
                    <Text color="red"><ErrorMessage errors={errors} name={'empStatus'}/></Text>

                </FormControl>
                {
                    (empStatus == 'Employed' || (empStatus == 'Self-Employed')) && (
                        <Box>
                            {/* ----------------------- */}
                <FormControl mb="3" >
                    <FormLabel>Which company do you work for? <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("company")}/>
                </FormControl>
                {/* ----------------------- */}
                <FormControl mb="3">
                    <FormLabel>What is your job title <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="text" {...register("jobTitle")}/>
                </FormControl>
                        </Box>
                    )
                }
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'isSeekingWork' in errors}>
                    <FormLabel>Are you actively seeking work? <Text as="span" color="red">*</Text></FormLabel>
                    <Select placeholder='---- Select ----' {...register("isSeekingWork", {required: 'Select one option from the dropdown list'})}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </Select>
                    <Text color="red"><ErrorMessage errors={errors} name={'isSeekingWork'}/></Text>
                </FormControl>
            </Box>

            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>
                {/* Login Credentials----------------------- */}

            <Box id="loginCredentialsForm" mb="16">
                <Heading>Account Information</Heading>
                <Text fontSize="sm" mb="5">These will be used to access the database</Text>
                {/* ----------------------- */}
                <FormControl mb="3" isInvalid={'email' in errors}>
                    <FormLabel>Email address <Text as="span" color="red">*</Text></FormLabel>
                    <Input type="email" {...register("email", {required: 'Field is required'})}/>
                    <Text color="red"><ErrorMessage errors={errors} name={'email'}/></Text>
                </FormControl>
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