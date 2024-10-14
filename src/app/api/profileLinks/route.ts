import { responses } from "@/libs/api";
import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const username = searchParams.get("username");

    // validations
    if (!username) {
      return responses.exceptions.notFound("Username is required");
    }

    // get user by username
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        image: true,
        links: {
          select: {
            id: true,
            platformName: true,
            url: true,
          },
        },
      },
    });
    if (!user) {
      return responses.exceptions.notFound("Not found with this username");
    }

    const { links, ...userProfile } = user;
    const payload = {
      profile: userProfile,
      links,
    };

    // response
    return responses.successNext({
      message: "Profile links",
      payload,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
