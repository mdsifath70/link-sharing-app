import Login from "@/components/Auth/Login";
import { redirectTo } from "@/libs/auth";

export default async function LoginPage() {
  await redirectTo("/");

  return <Login />;
}
