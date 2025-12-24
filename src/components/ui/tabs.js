import React, { useState } from "react";

const TabsContext = React.createContext({});

export const Tabs = ({ value, onValueChange, children, className }) => {
  return (
    <div className={className}>
      {}
      {}
      {children}
    </div>
  );
};

export const TabsList = ({ className, children }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, className }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm ${className}`}
  >
    {children}
  </button>
);