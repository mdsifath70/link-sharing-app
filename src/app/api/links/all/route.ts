import { responses } from "@/libs/api";
import { isAuthorized } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await isAuthorized(req);
    if (!user) {
      return responses.exceptions.unauthorized();
    }

    // get all links
    const links = await prisma.link.findMany({
      where: { userId: user.id },
    });

    // response
    return responses.successNext({
      message: "All links",
      payload: links,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
