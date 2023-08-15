

import { LoginResult } from "@/types";
import type { NextAuthOptions } from "next-auth";
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
                    const apiUrl = process.env.LOGIN_URL || "http://localhost:4000/api/v1/users/login";
                    const response = await fetch(`${apiUrl}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });
                    const res: LoginResult = await response.json();
                    console.log(res);
                    if (res.success) {
                        return {
                            id: res.result.user_id,
                            email: credentials.email,
                            randomKey: "Hey cool",
                            accessToken: res.result.token, // Add accessToken to the returned user object

                        }
                    }
                    else return null;
                }
                catch (error) {
                    console.log("login error", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log(session, token);
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken,
                    id: token.id,
                    randomKey: token.randomKey,
                },
                accessToken: token,
            };
        },
        jwt: ({ token, user }) => {
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
