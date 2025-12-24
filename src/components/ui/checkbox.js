import React from "react";

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={`h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-950 ${className}`}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";