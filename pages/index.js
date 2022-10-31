import { Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import connecMongo from '../db/db';
import {MemberModel} from '../db/models/MemberModel';
import { useRouter } from 'next/router'
import MembersTable from '../components/MembersTable';
import Stats from '../components/Stats';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';

export default function Home({members}) {

  const authUser = useSelector((state) => state.authUser);
  const router = useRouter();

  useEffect(() => {
    if(!authUser){
      router.push('/signin')
    }
  },[authUser]);

  console.log(members)
  return (
    <div>
      <Head>
        <title>IPHC Members Database</title>
        <meta name="description" content="IPHC Members Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>
        Database Dashboard 
      </Heading>
      <Box as="main">
        {/* Quick stats */}
        <Stats members={members}/>
        {/* Table of members */}
        <MembersTable members={members} />

      </Box>     
    </div>
  )
}

export async function getServerSideProps(){
  try{
    await connecMongo();

  
        //create document
        const members = await MemberModel.find();
        
        const jsonData = JSON.stringify(members);


        return {
          props: {members: JSON.parse(jsonData)}
        }
  


}catch(error){
    console.log(error)
    return {
      props: {
        members: []
      }
    }
}
}