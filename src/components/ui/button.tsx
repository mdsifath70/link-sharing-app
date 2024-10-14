import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-sm",
        "destructive-outline":
          "bg-white hover:bg-destructive/80 text-destructive hover:text-white border border-destructive shadow-sm",
        outline:
          "border border-primary bg-white text-primary hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary:
          "font-semibold bg-primary/10 text-primary hover:bg-primary/80 hover:text-primary-foreground shadow-sm",
        ghost: "font-semibold hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-3 rounded-md",
        sm: "px-3 py-2 text-xs rounded-md",
        lg: "px-6 lg:px-7 py-3 text-sm lg:text-base rounded-lg",
        xl: "px-8 md:px-9 py-3.5 md:py-4 text-base rounded-lg",
        icon: "px-3 py-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isFullWidth?: boolean;
  iconLeft?: JSX.Element;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      children,
      variant,
      size,
      asChild = false,
      isFullWidth = false,
      iconLeft,
      isLoading,
      loadingText,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "w-full": isFullWidth,
        })}
        ref={ref}
        type={type}
        {...props}
      >
        <>
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {iconLeft && iconLeft}
          {isLoading && loadingText ? loadingText : children}
        </>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
