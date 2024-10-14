import Signup from "@/components/Auth/Signup";
import { redirectTo } from "@/libs/auth";

export default async function SignupPage() {
  await redirectTo("/");

  return <Signup />;
}
