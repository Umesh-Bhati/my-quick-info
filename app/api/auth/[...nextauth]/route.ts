import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });


const handler = NextAuth({

  session: {
    strategy: 'jwt',

  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      type: "credentials",
      async authorize(credentials, req) {
        try {
          const user = await prisma.users.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) {
            return null
          }
          return user;
        } catch (error) {

        }
      },
    }),
  ],


});

export { handler as GET, handler as POST };