
import { loginUser } from "@/api/auth";
import { loginResult } from "@/types";
import { AxiosResponse } from "axios";
import { compare } from "bcryptjs";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                try {
                    const res: AxiosResponse<loginResult> = await loginUser({
                        email: credentials.email, password: credentials.password
                    });
                    if (res.data.success) {
                        return {
                            id: res.data.result.user_id,
                            email: credentials.email,
                            randomKey: "Hey cool",

                        }
                    }
                    else return null;
                }
                catch (error) {
                    console.log("error", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            // console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            // console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/singOut',
    }
};
