import { responses } from "@/libs/api";
import { isAuthorized } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { excludeProperties } from "@/libs/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await isAuthorized(req);
    if (!user) {
      return responses.exceptions.unauthorized();
    }

    const userMe = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!userMe) {
      return responses.exceptions.unauthorized();
    }

    const userExcluded = excludeProperties(userMe, [
      "password",
      "passwordResetToken",
      "passwordResetTokenExpAt",
    ]);

    // response
    return responses.successNext({
      message: "User me",
      payload: userExcluded,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
