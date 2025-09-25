"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "startup";
  title: string;
}

export function DashboardLayout({
  children,
  role,
  title,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <Header
        role={role}
        title={title}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <main className="md:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
