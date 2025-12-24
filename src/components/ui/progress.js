import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div ref={ref} className={twMerge(clsx("relative h-4 w-full overflow-hidden rounded-full bg-slate-100", className))} {...props}>
    <div
      className="h-full w-full flex-1 bg-slate-900 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";