import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={twMerge(clsx("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className))}
    {...props}
  />
));
Label.displayName = "Label";