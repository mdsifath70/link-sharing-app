import { useSession } from "next-auth/react";

export default function useUser() {
  const {
    data: session,
    update: updateSession,
    status: sessionStatus,
  } = useSession();

  const isLoadingUser = sessionStatus === "loading";
  const user = session?.user || null;

  return { isLoadingUser, sessionStatus, user, session, updateSession };
}
