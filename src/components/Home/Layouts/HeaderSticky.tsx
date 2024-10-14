import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HeaderSticky({ children, className }: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-white pb-5 pt-5 sm:pt-6 md:pb-6 md:pt-8 lg:pb-8 lg:pt-10",
        className,
      )}
    >
      {children}
    </header>
  );
}
