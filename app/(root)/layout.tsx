"use client";

import Sidebar from "@/components/shared/Sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh flex flex-col sm:flex-row overflow-y-hidden bg-background p-2 2xl:p-2.5 3xl:p-3 gap-2 2xl:gap-2.5 3xl:gap-3">
      <Sidebar />
      <section className="flex relative flex-col items-start w-full">
        <section className="h-full overflow-y-auto max-h-svh md:pb-0 w-full relative">
          {children}
        </section>
      </section>
      <ThemeToggle />
    </main>
  );
};

export default Layout;
