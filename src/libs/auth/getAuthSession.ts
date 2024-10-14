import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const authOptions = options;

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
