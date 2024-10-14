import { responses } from "@/libs/api";
import getJwtToken from "@/libs/getJwtToken";
import prisma from "@/libs/prisma";
import { excludeProperties } from "@/libs/utils";
import { UserPublic } from "@/types/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_EXPIRES),
  },
  jwt: {
    maxAge: parseInt(process.env.NEXTAUTH_EXPIRES),
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Jhondoe" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },

      async authorize(credentials) {
        // destructure
        const { email, password } = credentials || {};

        // validation
        if (!email || !password) {
          throw responses.error({ message: "Email or password is missing" });
        }

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        // if user was not found
        if (!user || !user?.password) {
          throw responses.error({ message: "Email or password is incorrect" });
        }

        // check to see if password valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw responses.error({ message: "Email or password is incorrect" });
        }

        // remove secure fields
        const userPublic = excludeProperties(user, [
          "password",
          "passwordResetToken",
          "passwordResetTokenExpAt",
        ]) as unknown as UserPublic;

        // get sign token
        const token = getJwtToken({ id: userPublic.id });
        userPublic.token = token;

        return userPublic;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.user) {
        token.user = { ...token.user, ...session.user };
        return token;
      }

      if (user) {
        token.user = user as UserPublic;
      }

      return token;
    },

    session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default authOptions;
