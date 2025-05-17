"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Settings, HelpCircle, LogOut, Sparkles, FileText, PlusCircle, Instagram, Brain, HomeIcon } from "lucide-react";
import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import ButtonLayout from "@/components/buttons/button-layout";
import { Paytone_One, Poppins } from "next/font/google";

const payt = Poppins({ subsets: ["latin"], weight: "800" });

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Integration",
      href: "/dashboard/integration",
      icon: Instagram,
    },
    {
      title: "Content Brain",
      href: "/dashboard/content-brain",
      icon: Sparkles,
    },
    {
      title: "My Content",
      href: "/dashboard/content",
      icon: FileText,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="border-r flex flex-col justify-between h-full w-full gap-y-5 p-3 dark:bg-[#1B1B1D] bg-[#ffffff]">
      <Link
        href="/"
        className={`flex items-center gap-2 pt-2 -mb-2.5 justify-start px-2 ${payt.className}`}
      >
        <span className="text-3xl px-3 font-extrabold text-[#6180fc]">PersonaAI</span>
      </Link>
      <nav className="px-2 h-full">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn("flex items-center px-[10px] py-[10px] text-sm rounded-md", pathname === item.href ? "bg-indigo-50 dark:bg-[#27272A] text-indigo-600 dark:text-indigo-50" : "hover:bg-gray-100 dark:hover:bg-[#27272A]")}
              >
                <item.icon
                  strokeWidth={2.2}
                  className={cn("h-[18px] w-[18px] mr-3", pathname === item.href ? "text-indigo-600 dark:text-indigo-50" : "text-gray-500")}
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-2 pt-6">
        <UpgradeCard />
        <Link
          href="/help"
          className={cn("flex mx-2 items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 text-gray-500")}
        >
          <HelpCircle
            strokeWidth={2.2}
            className="mr-3 h-[18px] w-[18px]"
          />
          Help & Support
        </Link>
        <Link
          href="/logout"
          className={cn("flex mx-2 items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 text-gray-500")}
        >
          <LogOut
            strokeWidth={2.2}
            className="mr-3 h-[18px] w-[18px]"
          />
          Logout
        </Link>
      </div>
    </div>
  );
}
