import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions as NextAuthOptionsProps } from "next-auth";
import { json, prisma } from "@/app/api/db";
import { compare } from "bcrypt";

export const NextAuthOptions: NextAuthOptionsProps = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            type: "credentials",
            async authorize(credentials, req): Promise<any> {
                try {
                    if (typeof credentials !== "undefined") {
                        const user = await prisma.users.findUnique({
                            where: { email: credentials?.email },
                        });
                        if (!user) {
                            return null;
                        }
                        const isMatch = await compare(
                            credentials?.password || "",
                            user.password
                        );
                        if (!isMatch) return null;
                        // console.log("userDataBase ", )
                        return JSON.parse(json(user));
                    }
                } catch (error) {
                    console.error("err ", error);
                }
            },

        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token['is_admin'] = !!user?.is_admin,
                    token.id = user?.id
            }
            return token
        },
        async session({ token, session }: any) {
            if (token?.id) {
                session.user = { id: token.id, name: token.name, email: token.email, is_admin: token?.is_admin };
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};
