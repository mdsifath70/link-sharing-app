import { responses } from "@/libs/api";
import { cloudinary } from "@/libs/api/cloudinary";
import { isAuthorized } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { excludeProperties, formDataToObj } from "@/libs/utils";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const formDataObj = formDataToObj(formData);

    const { username, email, firstName, lastName, image } = formDataObj;

    const user = await isAuthorized(req);
    if (!user) {
      return responses.exceptions.unauthorized();
    }

    // initialize
    const emailFormatted: string | undefined = email?.toLowerCase();

    // validations
    const existsUserUsername = await prisma.user.findUnique({
      where: { username, NOT: { id: user.id } },
    });
    if (existsUserUsername) {
      throw responses.error({
        message: "Username already taken, try with another",
        payload: { errors: { username: true } },
      });
    }
    // validations
    const existsUserEmail = await prisma.user.findUnique({
      where: { email: emailFormatted, NOT: { id: user.id } },
    });
    if (existsUserEmail) {
      throw responses.error({
        message: "Already have an account with this Email",
        payload: { errors: { email: true } },
      });
    }

    const data: Partial<{ image: string }> = {};

    if (image) {
      const imageFile = image as File;
      const res = await cloudinary.uploadStream({
        file: imageFile,
        folder: "sharing-app",
      });
      data.image = res?.url || "";
    }

    // update user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        username,
        email: emailFormatted,
        firstName,
        lastName,
        name: firstName ? `${firstName} ${lastName}` : "",
        ...data,
      },
    });

    const payloadExcluded = excludeProperties(updatedUser, [
      "password",
      "passwordResetToken",
      "passwordResetTokenExpAt",
    ]);

    // response
    return responses.successNext({
      message: "User profile updated",
      payload: payloadExcluded,
    });
  } catch (error) {
    return responses.catchErrorNext(error);
  }
}
