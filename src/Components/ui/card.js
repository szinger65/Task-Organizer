import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(clsx("rounded-xl border bg-white text-slate-950 shadow-sm", className))} {...props} />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(clsx("flex flex-col space-y-1.5 p-6", className))} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={twMerge(clsx("font-semibold leading-none tracking-tight", className))} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(clsx("p-6 pt-0", className))} {...props} />
));
CardContent.displayName = "CardContent";