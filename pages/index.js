import { Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import connecMongo from '../db/db';
import {MemberModel} from '../db/models/MemberModel';
import { useRouter } from 'next/router'
import MembersTable from '../src/components/MembersTable';
import Stats from '../src/components/Stats';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';
import Loading from '../src/components/Loading';

export default function Home({members}) {

  const authUser = useSelector((state) => state.authUser);
  const router = useRouter();

  // useEffect(() => {
  //   if(!authUser){
  //     router.push('/signin')
  //   }
  // },[authUser]);

  return (
    <Loading/>
  );
  
}

