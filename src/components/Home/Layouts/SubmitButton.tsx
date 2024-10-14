import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/useWindowSize";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  loadingText: string;
}

export default function SubmitButton({ children, ...props }: Props) {
  const { width } = useWindowSize();

  const isMobile = width <= 640;

  return (
    <Button size={isMobile ? "lg" : "xl"} isFullWidth={isMobile} {...props}>
      {children}
    </Button>
  );
}
