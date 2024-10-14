import { getAuthSession } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { UserPublic } from "@/types/user";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
  sub: { id: string };
}

export const isAuthorized = async (
  req?: NextRequest,
): Promise<UserPublic | null> => {
  const isServer = typeof window === "undefined";
  if (isServer && !req) {
    return null;
  }

  // get with nextAuth
  const session = await getAuthSession();
  const user = session?.user;
  if (user) return user;

  // get with token
  if (req) {
    const bearerToken = req.headers.get("authorization");
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decodedToken = decoded as unknown as DecodedToken;
      const { id } = decodedToken?.sub || {};

      // get user
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (user) return user;
      return null;
    }
  }

  return null;
};
