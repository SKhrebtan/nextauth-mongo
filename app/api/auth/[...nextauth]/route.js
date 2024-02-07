import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}