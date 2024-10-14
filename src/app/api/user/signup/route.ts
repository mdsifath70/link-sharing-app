import { responses } from "@/libs/api/responses";
import getHashed from "@/libs/getHashed";
import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { isStrongPassword } from "validator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, confirmPassword } = body;

    // validations
    if (!email || !password || !confirmPassword) {
      throw responses.error({ message: "Missing Fields" });
    }
    if (!isStrongPassword(password)) {
      throw responses.error({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    if (password !== confirmPassword) {
      throw responses.error({
        message: "Password and confirm password does not match",
      });
    }

    const emailFormatted = email.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: emailFormatted },
    });
    if (userExists) {
      throw responses.error({
        message: "Already have an account with this Email",
      });
    }

    const hashedPassword = await getHashed(password);

    const getUsername = async () => {
      let username: string = emailFormatted.split("@")[0];
      // check is exists
      const existsUser = await prisma.user.findUnique({ where: { username } });
      if (existsUser) {
        username += "." + Math.floor(Math.random() * 1000);
      }
      return username;
    };
    const username = await getUsername();

    // new user
    await prisma.user.create({
      data: {
        username,
        email: emailFormatted,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });

    // response
    return responses.successNext({
      message: `Signed up successful, Please login`,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
