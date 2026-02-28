"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="h-svh flex flex-col md:flex-row overflow-y-hidden bg-background p-2 md:p-2 2xl:p-2.5 3xl:p-3 gap-2 2xl:gap-2.5 3xl:gap-3">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 right-4 z-40 p-2 bg-card border border-border rounded-xl text-foreground "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <section className="flex relative flex-col items-start w-full min-w-0">
        <section className="h-full overflow-y-auto max-h-svh w-full min-w-0 relative">
          {children}
        </section>
      </section>
      <ThemeToggle />
    </main>
  );
};

export default Layout;
