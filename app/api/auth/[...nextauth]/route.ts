import NextAuth from 'next-auth';
import { NextAuthOptions } from '@/configs/NextAuthOptions';



const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };