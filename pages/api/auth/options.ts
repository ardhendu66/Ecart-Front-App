import { DefaultSession, NextAuthOptions, Session, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { ConnectionWithMongoose } from "@/lib/mongoose";
import UserModel from "@/lib/User";
import { envVariables } from "@/config/config";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'Credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your emailId"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials): Promise<any> {
                if(!credentials || !credentials.email || !credentials.password) {
                    // return { error: "Please fill all the details carefully" };
                    throw new Error("Please fill all the details carefully");
                };

                await ConnectionWithMongoose();
                try {
                    const user = await UserModel.findOne({
                        email: credentials.email
                    });
                    if(!user) {                        
                        // return { error: "Please give a correct Email-id" };
                        throw new Error("Account with this email-id not found");
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password, user.password
                    );
                    if(!isPasswordCorrect) {
                        // return { error: "Incorrect password" };
                        throw new Error("Incorrect password given");
                    }
                    return user;
                }
                catch(err: any) {
                    console.error(err.message);
                    throw new Error(err.message);
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 60 * 60 * 10,
        updateAge: 60 * 60 * 5,
    },
    callbacks: {
        async session({ session, token }) {
            if(token) {
                session.user._id = token._id?.toString()
                session.user.name = token.name
                session.user.email = token.email
                session.user.phoneNo = token.phoneNo
                session.user.image = token.picture 
                session.user.emailVerified = token.emailVerified as boolean
                session.user.addressLine1 = token.addressLine1
                session.user.addressLine2 = token.addressLine2
                session.user.houseNo = token.houseNo
                session.user.city = token.city
                session.user.pincode = token.pincode
                session.user.street = token.street
                session.user.landmark = token.landmark
                session.user.state = token.state
                session.user.country = token.country
            }
            return session as Session | DefaultSession;
        },

        async jwt({ token, user }) {
            if(user) {
                token._id = user._id?.toString()
                token.name = user.name
                token.email = user.email
                token.phoneNo = user.phoneNo
                token.picture = user.image
                token.emailVerified = user.emailVerified as boolean
                token.addressLine1 = user.addressLine1
                token.addressLine2 = user.addressLine2
                token.houseNo = user.houseNo
                token.city = user.city
                token.pincode = user.pincode
                token.street = user.street
                token.landmark = user.landmark
                token.state = user.state
                token.country = user.country
                token.sub = "sub-token"
            }
            return token as JWT;
        },
    },
    secret: envVariables.nextAuthSecret as string,
    pages: {
        signIn: '/auth/login'
    }
}