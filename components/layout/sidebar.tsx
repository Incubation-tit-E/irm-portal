"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Building2,
  PlusCircle,
  User,
  X,
} from "lucide-react";

interface SidebarProps {
  role: "admin" | "startup";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ role, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const adminNavItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/reports", icon: FileText, label: "All Reports" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
    { href: "/admin/createUsers", icon: User, label: "Create User" },
  ];

  const startupNavItems = [
    { href: "/startup/report", icon: PlusCircle, label: "Submit Report" },
    { href: "/startup/history", icon: FileText, label: "Report History" },
    { href: "/startup/settings", icon: Settings, label: "Settings" },
  ];

  const navItems = role === "admin" ? adminNavItems : startupNavItems;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-30 md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "w-64 bg-slate-50 border-r border-slate-200 h-screen fixed left-0 top-0 z-40",
          "transform transition-transform ease-in-out duration-300",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                IRM Portal
              </h2>
              <p className="text-sm text-slate-500 capitalize">
                {role} Dashboard
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
