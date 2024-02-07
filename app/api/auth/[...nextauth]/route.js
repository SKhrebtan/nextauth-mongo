import bcrypt from 'bcryptjs';
// import { Account, User as AutUser } from 'next-auth';
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";
import User from '../../../models/User';
import connect from '../../../utils/db';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: {label:'Password', type: 'password'}
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error.message)
        }
        }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true
      }
       if (account?.provider === 'github') {
         await connect();
         try {
          const existingUser = await User.findOne({email:user.email})
           if (!existingUser) {
             const newUser = new User({
              email:user.email
             })
             await newUser.save();
             return true
           }
           return true
         } catch (error) {
           console.log('error saving user', error.message);
           return false
         }
      }
    }
  }
}
export const authHandler = NextAuth(authOptions);
export {authHandler as GET, authHandler as POST}