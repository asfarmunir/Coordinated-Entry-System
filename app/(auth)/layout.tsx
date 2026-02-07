"use client";

import { ThemeToggle } from "@/components/theme-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`relative 
        min-h-svh w-screen overflow-y-auto`}
    >
      <div className="relative ">{children}</div>
      <ThemeToggle />
    </div>
  );
};

export default Layout;
