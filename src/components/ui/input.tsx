import * as React from "react";

import { cn } from "@/libs/utils";
import { Eye, EyeClosed } from "lucide-react";
import ErrorMessage from "../Common/ErrorMessage";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: JSX.Element;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconLeft, errorMessage, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const togglePassword = () => {
      setIsShowPassword((prev) => !prev);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          {iconLeft && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transform">
              {iconLeft}
            </span>
          )}

          <input
            type={type === "password" && !isShowPassword ? "password" : "text"}
            className={cn(
              "flex w-full rounded-md border border-input bg-white px-4 py-3.5 text-sm text-dark shadow-sm outline-none transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:shadow-success disabled:cursor-not-allowed disabled:opacity-50",
              iconLeft && "pl-12",
              errorMessage &&
                "border-destructive focus-visible:border-destructive focus-visible:shadow-error",
              className,
            )}
            ref={ref}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform"
            >
              {isShowPassword ? <EyeClosed /> : <Eye />}
            </button>
          )}
        </div>

        <ErrorMessage message={errorMessage} />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
