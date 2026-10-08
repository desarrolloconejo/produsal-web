"use client";

import { ReactNode } from "react";

interface NavbarWrapperProps {
  children: ReactNode;
}

export function NavbarWrapper({ children }: NavbarWrapperProps) {
  return (
    <div
      data-navbar-wrapper
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-sm"
    >
      {children}
    </div>
  );
}
