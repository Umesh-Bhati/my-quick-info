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


          console.log("credentials ", credentials)
          const users = await prisma.users.findMany()
          console.log("manyUsers ", users)
          const user = await prisma.users.findUnique({
            where: { email: credentials?.email },
          });
          console.log("sign-inUser ", user)
          if (!user) {
            return null
          }

          console.log("credentials?.password ", credentials?.password)
          console.log("credentials?.passwordType ", typeof credentials?.password)
          console.log("user?.password ", user?.password)
          console.log("user?.passwordType ", typeof user?.password)

          // const passwordCorrect = await bcrypt.compare(
          //   "12345678",
          //   "$2b$10$zj1JQnzFNQ1vYQQGlYg.1eWDKVauzVTB09yyIGzdi2ilsCwfiKKjO"
          // )
          // console.log("passwordCorrect ", passwordCorrect)
          // if (!passwordCorrect) {
          //   return null;
          // }

          return user;
        } catch (error) {

        }
      },
    }),
  ],


});

export { handler as GET, handler as POST };