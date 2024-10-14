import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: Props) {
  return (
    <h3
      className={cn(
        "text-[1.625rem] font-bold text-dark sm:text-[2rem] lg:text-4xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}
