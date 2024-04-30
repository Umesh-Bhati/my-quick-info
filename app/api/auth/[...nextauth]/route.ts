import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
// export  "force/dynamic" 

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });


export const NextAuthOptions: any = {
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
          if (typeof credentials !== 'undefined') {
            const user = await prisma.users.findUnique({
              where: { email: credentials?.email },
            });
            console.log("userFromAuth ", user)
            if (!user) {
              return null
            }
            const isMatch = await compare(credentials?.password || '', user.password)
            console.log("isMatch ", isMatch)
            if (!isMatch) return null
            return user;
          }
        } catch (error) {
          console.error("err ", error);
        }
      },
      callbacks: {
        async session({ session, token, user }) {
          const sanitizedToken = Object.keys(token).reduce((p, c) => {
            // strip unnecessary properties
            if (
              c !== "iat" &&
              c !== "exp" &&
              c !== "jti" &&
              c !== "apiToken"
            ) {
              return { ...p, [c]: token[c] }
            } else {
              return p
            }
          }, {})
          return { ...session, user: sanitizedToken, apiToken: token.apiToken }
        },
        async jwt({ token, user, account, profile }) {
          if (typeof user !== "undefined") {
            return user as JWT
          }
          return token
        }
      }
    }),
  ],
}

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };