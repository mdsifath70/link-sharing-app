import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function BottomSticky({ children, className }: Props) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 bg-white pb-5 pt-5 text-right sm:pb-6 sm:pt-6 md:pb-7 md:pt-7 lg:pb-8 lg:pt-8",
        className,
      )}
    >
      <hr className="mb-5 sm:mb-6" />
      {children}
    </div>
  );
}
