"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Settings, HelpCircle, LogOut, Sparkles, FileText, PlusCircle, Instagram } from "lucide-react";
import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import ButtonLayout from "@/components/buttons/button-layout";


interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Integration",
      href: "/dashboard/integration",
      icon: <Instagram className="mr-2 h-4 w-4" />,
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
      <div className=" border flex flex-col justify-between h-full w-full gap-y-5 p-3 bg-[#171717] opacity-90 bg-clip-border backdrop-blur-3xl backdrop-filter rounded-3xl">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 pt-4 pb-0 justify-center"
        >
          {/* <Sparkles className="h-6 w-6 text-purple-600" strokeWidth={2.4}/> */}
          <span className="text-3xl font-extrabold text-[#879fff]  ">PersonaAI</span>
        </Link>
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
        <div className="mt-2 border-t pt-6">
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
          <UpgradeCard />
        </div>
      </div>
  );
}
