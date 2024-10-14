import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Text({ children, className }: Props) {
  return <p className={cn("text-sm sm:text-base", className)}>{children}</p>;
}
