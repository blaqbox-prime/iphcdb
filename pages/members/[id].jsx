import {Box, useDisclosure, Button, Divider, Flex, Grid, Heading, Icon, Input, Stack, Text, useRadio, useRadioGroup, Center, CircularProgress} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { FaLock} from 'react-icons/fa';
import {baseURL} from '../../src/helpers'

import {
  FormControl,
  FormLabel,
  Select,
  Radio, RadioGroup 
} from '@chakra-ui/react'
import ChangePasswordModal from '../../src/components/ChangePasswordModal';
import { AddIcon } from '@chakra-ui/icons';
import AddDependant from '../../src/components/AddDependant';
import Dependants from '../../src/components/Dependants';

function Profile({member}) {

  const {city,suburb, street, province, postal_code} = member?.address;
  const {firstNames, lastName,contact, email,
         children, dateOfBirth, employmentStatus,
         gender, isMarried,isSeekingWork, occupation,
         spouse} = member;

  const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm();
    // const [data,setData] = useState();
    const [empStatus,setEmpStatus] = useState();
    // For Loading animation
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const spouseModal = useDisclosure();
    const childModal = useDisclosure();




    
    const onSubmit = async (data) => {

      console.log(data)

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
        _id: member._id,
          firstNames: data.firstNames,
          lastName: data.lastName,
          gender: data.gender,
          isAdmin: data.isAdmin,
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
     
      let res = await fetch(`/api/update-member`,{
          method: 'POST',
          body: JSON.stringify(formattedData),
      });

      if(res.status === 200){
          toast({
              title: 'Account created.',
              description: "Successfully Updated.",
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
      } else {

          let data = await res.json();
        //   console.log(data);

          toast({
              title: 'Failed to update',
              description: `server failed. Please try again later`,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
      }
  };


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

  const initdobFormat = () => {
    const dob = new Date(dateOfBirth);
    let day,month,year;
    day = dob.getDay();
    month = dob.getMonth();
    year = dob.getFullYear();

    return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
  } 

return (
  <Flex mt={5} 
  flexDirection={'column'}
  w="100"
  alignItems={'center'}
  >
                  <Heading fontSize="6xl">{`${member.firstNames} ${member.lastName}`}</Heading>
                  
                  <Divider maxW={'container.md'} my={2}/>

                  <Text fontSize="sm" color="red">Required fields are marked with a (*)</Text>

      {/* FORM --------- */}
      <Box as="form" onSubmit={handleSubmit(onSubmit, onInvalid)} w={['100%','100%',"60%"]} p={['2',"6"]} overflowY={["unset","unset",'auto']}>
          <Box id="personalInfoForm" minH={['unset','unset','100%']} mb="5">
              <Heading mb={5}>Personal Information</Heading>
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'firstNames' in errors}>
                  <FormLabel>First Names <Text as="span" color="red">*</Text></FormLabel> 
                  <Input type="text" defaultValue={firstNames} {...register("firstNames",  {required: 'Field is required'})} mb={1}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'firstNames'}/></Text>
              </FormControl>
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'lastName' in errors}>
                  <FormLabel>Last Name <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={lastName} {...register("lastName", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'lastName'}/></Text>


              </FormControl>
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'dob' in errors}>
                  <FormLabel>Date of Birth <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="date"  defaultValue={initdobFormat()} {...register("dob", {required:'Field is required'})}/>
                 <Text color="red"> <ErrorMessage errors={errors} name={'dob'}/></Text>

              </FormControl>
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'contact' in errors}>
                  <FormLabel>Contact Number <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={contact} {...register("contact",{required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'contact'}/></Text>
              </FormControl>
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'gender' in errors}>
                  <FormLabel>Gender <Text as="span" color="red">*</Text></FormLabel>
                  <RadioGroup defaultValue={gender}>
                      <Stack direction='row' gap={5}>
                          <Radio value='Male' {...register("gender")}>Male</Radio>
                          <Radio value='Female' {...register("gender")}>Female</Radio>
                      </Stack>
                  </RadioGroup>
              </FormControl>
               {/* ----------------------- */}
               <FormControl mb="3" isInvalid={'isMarried' in errors}>
                  <FormLabel>Are You Married? <Text as="span" color="red">*</Text></FormLabel>
                  <RadioGroup defaultValue={isMarried ? 'Yes' : 'No'}>
                      <Stack direction='row' gap={5}>
                          <Radio value='Yes' {...register("isMarried")}>Yes</Radio>
                          <Radio value='No' {...register("isMarried")}>No</Radio>
                      </Stack>
                  </RadioGroup>
              </FormControl>
          </Box>
          <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>

{/* Family ----------------------------------------------------------------- */}

            <Box id="familyForm" mb="16">
            <Heading mb={5}>Family</Heading>
            
            <Box id="spouseList">
            <Button leftIcon={<AddIcon/>}  onClick={() => spouseModal.onOpen()}color="blue.400"> Add Spouse </Button>
            </Box>

            <Dependants memberId={member._id} type="spouse"/>

            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>

            <Box id='childrenList'>
            <Button leftIcon={<AddIcon/>} onClick={() => childModal.onOpen()} color="blue.400"> Add Child </Button>
            </Box>

            <Dependants memberId={member._id} type="children"/>

            </Box>

            <Divider maxW={'container.md'} my={5} color="blackAlpha.800"/>


          {/* Home Address -------------------------------------*/}
          <Box id="homeAddressForm" mb="16">
              <Heading mb={5}>Where do you live?</Heading>
              <Grid gridTemplateColumns={"repeat(2,1fr)"} gap="3" mb="5">
                  {/* ----------------------- */}
              <FormControl isInvalid={'street' in errors}>
                  <FormLabel>Street <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={street} {...register("street", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'street'}/></Text>

              </FormControl>
              {/* ----------------------- */}
              <FormControl isInvalid={'suburb' in errors}>
                  <FormLabel>Suburb <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={suburb} {...register("suburb", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'suburb'}/></Text>

              </FormControl>
              {/* ----------------------- */}
              <FormControl isInvalid={'city' in errors}>
                  <FormLabel>City <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={city} {...register("city", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'city'}/></Text>
              </FormControl>
              
              {/* ----------------------- */}
              <FormControl isInvalid={'province' in errors}>
                  <FormLabel>Province <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={province} {...register("province", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'province'}/></Text>

              </FormControl>
              {/* ----------------------- */}
              <FormControl isInvalid={'postal' in errors}>
                  <FormLabel>Postal Code <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={postal_code} {...register("postal",  {required: 'Field is required'})}/>
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
                  <Select defaultChecked={employmentStatus} {...register("empStatus", {required: 'Select one option from the dropdown list'})} onChange={(e)=>{setEmpStatus(e.target.value)}}>
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
                  <Input type="text" defaultValue={occupation?.company} {...register("company")}/>
              </FormControl>
              {/* ----------------------- */}
              <FormControl mb="3">
                  <FormLabel>What is your job title <Text as="span" color="red">*</Text></FormLabel>
                  <Input type="text" defaultValue={occupation?.jobTitle} {...register("jobTitle")}/>
              </FormControl>
                      </Box>
                  )
              }
              {/* ----------------------- */}
              <FormControl mb="3" isInvalid={'isSeekingWork' in errors}>
                  <FormLabel>Are you actively seeking work? <Text as="span" color="red">*</Text></FormLabel>
                  <Select defaultChecked={isSeekingWork} {...register("isSeekingWork", {required: 'Select one option from the dropdown list'})}>
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
                  <Input type="email" defaultValue={email} {...register("email", {required: 'Field is required'})}/>
                  <Text color="red"><ErrorMessage errors={errors} name={'email'}/></Text>
              </FormControl>
              <Button leftIcon={<Icon as={FaLock}/>} type="button" colorScheme='red' px={8} onClick={()=> {onOpen()}}
                >Update password
          </Button>
          </Box>

          <Button type="submit" colorScheme='blue' px={8} 
          isLoading={isSubmitting}
          loadingText="Submitting"
          >Update profile</Button>
      </Box>

              {/* Modals */}
              <ChangePasswordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} member={member}/>
              <AddDependant isOpen={spouseModal.isOpen} onOpen={spouseModal.onOpen} onClose={spouseModal.onClose} currentMember={member} type="spouse"/>
              <AddDependant isOpen={childModal.isOpen} onOpen={childModal.onOpen} onClose={childModal.onClose} currentMember={member} type="child"/>

  </Flex>
)
}

export default Profile;

// export async function getStaticPaths(){

//   await connectMongo();
//   const members = await MemberModel.find();

//   const paths = JSON.parse(JSON.stringify(members)).map((member) => ({params: {id: member._id}}));

//   return {
//     paths: paths,
//     fallback: false
//   }


  
// }

export async function getServerSideProps(context) {

  const {params} = context;
  const id = params.id;

  const res = await fetch(`${baseURL}/api/member/${id}`);
  console.log(res)
  const data = await res.json();

  console.log(data);

  if(res.status === 200) {

    return {
        props: {
            member: data
        }
    }

  } else {
    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
  }
}