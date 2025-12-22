import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function Badge({ className, variant, ...props }) {
  return (
    <div className={twMerge(clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2", className))} {...props} />
  );
}