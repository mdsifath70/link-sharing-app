import { SessionContextValue } from "next-auth/react";
import { getAuthSession } from "./";

export async function getAuthHeaders(
  sessionData?: SessionContextValue,
): Promise<{ Authorization: string } | object> {
  if (sessionData) {
    const { user } = sessionData?.data || {};
    const { token } = user || {};
    if (token) return { Authorization: `Bearer ${token}` };
  }

  const session = await getAuthSession();
  const { token } = session?.user || {};
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}
