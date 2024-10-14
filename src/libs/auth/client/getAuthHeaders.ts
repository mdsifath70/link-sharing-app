import { Session } from "next-auth";

export async function getAuthHeaders(session: Session | null): Promise<object> {
  if (session) {
    const { token } = session?.user || {};
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}
