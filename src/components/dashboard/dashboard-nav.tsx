"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageSquare, Calendar, Settings, Users, BarChart3, HelpCircle, LogOut, Sparkles, FileText, PlusCircle } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function DashboardNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Content Brain",
      href: "/dashboard/content-brain",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Content",
      href: "/dashboard/content",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex flex-col justify-between h-full gap-2 p-6">
      <div className="flex flex-col gap-2 h-full">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
          >
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
            >
              {item.icon}
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
        <Button className="mt-4 gap-1.5">
          <PlusCircle className="h-4 w-4" />
          Create Content
        </Button>
      <div className="mt-6 border-t pt-6">
        <Link href="/help">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </Link>
        <Link href="/logout">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
}
