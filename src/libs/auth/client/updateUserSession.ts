import { getAuthHeaders } from "@/libs/auth/client";
import { UserPublic } from "@/types/user";
import axios from "axios";
import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";

interface Props {
  updateSession: SessionContextValue["update"];
  session: Session | null;
}

export async function updateUserSession({ updateSession, session }: Props) {
  const authHeaders = await getAuthHeaders(session);

  // get user me
  const res = await axios.get<ApiResponse<UserPublic>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/me`,
    {
      headers: authHeaders,
    },
  );
  const user = res.data?.payload;

  // update session
  if (user) {
    await updateSession({ user });
  }

  return user;
}
