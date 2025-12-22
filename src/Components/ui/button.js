import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    outline: "border border-slate-200 bg-white hover:bg-slate-100",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  return (
    <button
      ref={ref}
      className={twMerge(clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant || "default"],
        sizes[size || "default"],
        className
      ))}
      {...props}
    />
  );
});
Button.displayName = "Button";