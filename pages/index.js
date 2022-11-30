import { Box, Center, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import connectMongo from "../db/db";
import MembersTable from "../src/components/MembersTable";
import Stats from "../src/components/Stats";
import { MemberModel } from "../db/models/MemberModel";

import { useSession, signIn, signOut } from "next-auth/react"
import Protected from "../src/components/Protected";

export default function Dashboard({ members }) {
  const authUser = useSelector((state) => state.authUser);
  const router = useRouter();
  const { data: session } = useSession()


  return (
  <Protected>
    <div>
      <Heading>Database Dashboard</Heading>
      <Box as="main">
        {/* Quick stats */}
        <Stats members={members} />
        {/* Table of members */}
        <MembersTable members={members} />
      </Box>
    </div>
    </Protected>);
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
