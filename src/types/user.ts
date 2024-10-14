import { User } from "@prisma/client";

export interface UserPublic
  extends Omit<
    User,
    "password" | "passwordResetToken" | "passwordResetTokenExpAt"
  > {
  token?: string;
}
