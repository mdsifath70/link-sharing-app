import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  pyDisabled?: boolean;
}

export default function BoxContainer({
  children,
  pyDisabled,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "scrollbar flex h-[calc(100vh-theme(spacing.16))] overflow-y-auto rounded-lg bg-white px-5 sm:px-6 md:px-8 lg:px-10",
        !pyDisabled && "py-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
