import Logo from "@/components/Common/Logo";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthBox({ children }: Props) {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-8">
      <div className="mb-8 text-center">
        <Logo />
      </div>

      <div className="rounded-lg bg-white p-8">{children}</div>
    </section>
  );
}
