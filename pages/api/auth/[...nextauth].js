import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connecMongo from "../../../db/db";
import { MemberModel } from "../../../db/models/MemberModel";
const bcrypt = require("bcrypt");
import {baseURL} from '../../../src/helpers'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {

        const fetchData = async () => {
          await connecMongo();

        const {email,password} = credentials;
        console.log('sign in data: ',credentials);

        //get document
        const member = await MemberModel.findOne({ email: email });
        console.log(member);

        if (!member) {
          return null;
        }

        if (!bcrypt.compareSync(password, member.password)) {
          return null;
        } else {
          return member;
        }
        }

        const user = await fetchData();

      return user ? user : null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token, user }) {

      console.log('session user:',token)

      const authUser = await fetch(`${baseURL}/api/member/getbyemail?email=${token.email}`);

      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user = { ...session.user,...await authUser.json()};
      
      return session
    },
  }
};
export default NextAuth(authOptions);
