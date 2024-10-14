import { redirect } from "next/navigation";
import { getAuthSession } from "./getAuthSession";

export const redirectTo = async (url: string) => {
  const session = await getAuthSession();

  if (session?.user?.id) {
    return redirect(url);
  }
};
