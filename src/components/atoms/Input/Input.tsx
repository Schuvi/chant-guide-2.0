import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  }
>(({ className, type, startIcon, endIcon, ...props }, ref) => {
  return (
    <div className="relative">
      {startIcon && (
        <div className="absolute left-3 top-[48%] transform -translate-y-1/2 text-muted-foreground">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          {
            "pl-10": startIcon,
            "pr-10": endIcon,
          },
          className
        )}
        ref={ref}
        {...props}
      />
      {endIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {endIcon}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
