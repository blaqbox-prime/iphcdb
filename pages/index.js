import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import connectMongo from "../db/db";
import MembersTable from "../src/components/MembersTable";
import Stats from "../src/components/Stats";
import { MemberModel } from "../db/models/MemberModel";

export default function Dashboard({ members }) {
  const authUser = useSelector((state) => state.authUser);
  const router = useRouter();

  useEffect(() => {
    console.log(authUser);

    if (!authUser) {
      router.push("/signin");
    }
  }, [authUser]);

  // console.log(members)
  return !authUser ? <></> : (

    <div>
      <Head>
        <title>IPHC Members Database</title>
        <meta name="description" content="IPHC Members Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>Database Dashboard</Heading>
      <Box as="main">
        {/* Quick stats */}
        <Stats members={members} />
        {/* Table of members */}
        <MembersTable members={members} />
      </Box>
    </div>
  );
}

export async function getStaticProps(context) {

  try {
    await connectMongo();

    //fetch user
    const members = await MemberModel.find();

    const jsonData = JSON.stringify(members);
    console.log(members);

    return {
      props: { members: JSON.parse(jsonData) },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        members: [],
      },
    };
  }
}
