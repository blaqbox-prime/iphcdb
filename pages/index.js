import { Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import connecMongo from '../db/db';
import {MemberModel} from '../db/models/MemberModel';
import {Url} from 'url';


import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip
} from '@chakra-ui/react'
import MembersTable from '../components/MembersTable';
import Stats from '../components/Stats';

export default function Home({members}) {
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