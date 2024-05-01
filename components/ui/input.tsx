"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "password";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    if (props.variant === "password") {
      return (
        <div
          className={cn(
            "flex bg-red-500 w-full items-center rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:[#A0A5B6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <input
            {...props}
            type={show ? "text" : "password"}
            ref={ref}
            className="w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          {show ? (
            <EyeIcon
              onClick={() => setShow(false)}
              className="h-[16px] w-[16px]"
            />
          ) : (
            <EyeOffIcon
              onClick={() => setShow(true)}
              className="h-[16px] w-[16px]"
            />
          )}
        </div>
      );
    }
    return (
      <input
        type={type}
        className={cn(
          "flex bg-red-500 w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:[#A0A5B6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
