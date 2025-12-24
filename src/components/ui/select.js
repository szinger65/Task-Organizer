import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const Select = ({ children, value, onValueChange }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950"
    >
      {children}
    </select>
  );
};
export const SelectTrigger = ({ children, className }) => <>{children}</>;
export const SelectValue = () => null;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;