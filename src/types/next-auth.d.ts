import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserPublic } from "./user";

declare module "next-auth" {
  type User = UserPublic;

  interface Session extends DefaultSession {
    user: UserPublic;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserPublic;
  }
}
