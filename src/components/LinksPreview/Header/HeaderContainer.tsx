import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function HeaderContainer({ children }: Props) {
  return (
    <div className="rounded-b-3xl pt-6 md:bg-primary md:pb-56">{children}</div>
  );
}
