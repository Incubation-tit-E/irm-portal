"use client";

import { User, Settings, LogOut, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/lib/stores/useAuth";
import { useRouter } from "next/navigation";
import { clearSession } from "@/actions/auth";

interface HeaderProps {
  role: "admin" | "startup";
  title: string;
  onMenuClick: () => void;
}

export function Header({ role, title, onMenuClick }: HeaderProps) {
  const { clearUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await clearSession();
    clearUser();
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 fixed top-0 right-0 left-0 md:left-64 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 h-auto p-2"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {role === "admin" ? "Admin User" : "Startup User"}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">{role}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={
                    role === "admin" ? "/admin/settings" : "/startup/settings"
                  }
                  className="flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={
                    role === "admin" ? "/admin/settings" : "/startup/settings"
                  }
                  className="flex items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
