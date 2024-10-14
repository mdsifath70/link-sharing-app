import { responses } from "@/libs/api";
import { isAuthorized } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { links }: { links: LinkItemType[] } = body;

    const user = await isAuthorized(req);
    if (!user) {
      return responses.exceptions.unauthorized();
    }

    // delete links
    await prisma.link.deleteMany({
      where: { userId: user.id },
    });

    // create links
    await prisma.link.createMany({
      data: links.map((link) => ({
        userId: user.id,
        ...link,
      })),
    });
    const newLinks = await prisma.link.findMany({ where: { userId: user.id } });

    // response
    return responses.successNext({
      message: "Links saved successfully",
      payload: newLinks,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
