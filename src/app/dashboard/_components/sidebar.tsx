"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Settings, HelpCircle, LogOut, Sparkles, FileText, PlusCircle, Instagram, Brain, HomeIcon, Package, ChartPie } from "lucide-react";
import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import ButtonLayout from "@/components/buttons/button-layout";
import { Paytone_One, Poppins } from "next/font/google";

const popp = Poppins({ subsets: ["latin"], weight: "800" });

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
      icon: ChartPie,
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
    <div className="w-[240px] border-r flex flex-col justify-between h-full p-3 py-3 bg-[#ffffff]">
      <Link
        href="/"
        className={`flex items-center p-2 justify-start rounded-xl`}
      >
        <div className="p-1.5 rounded-lg bg-black">
          <Brain
            color="#ffffff"
            size={22}
          />
        </div>
        <div>
          <h1 className="px-3 text-black font-medium">PersonaAI.</h1>
          <p className="px-3 text-black text-xs">AI content generation</p>
        </div>
      </Link>
      <nav className=" h-max">
        <p className="text-xs pl-2 py-2 font-medium text-neutral-500 mt-2">Menu</p>

        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn("flex items-center px-[8px] py-[8px] text-sm rounded-md", pathname === item.href ? "bg-zinc-100 text-zinc-800" : "hover:bg-gray-100 ")}
              >
                <item.icon
                  strokeWidth={2}
                  className={cn("h-[18px] w-[18px] mr-2", pathname === item.href ? "text-indigo-600 " : "text-zinc-700")}
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="h-40 mt-2">
        <p className="text-xs pl-2 py-2 font-medium text-neutral-500">History</p>
        <ul className="h-full flex items-center justify-center">
          <p className="text-xs pl-2 py-2 font-medium text-neutral-500 italic">Empty History</p>
        </ul>
      </section>
      <div className="mt-2 pt-6">
        <UpgradeCard />
        <Link
          href="/help"
          className={cn("flex  items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 text-gray-500")}
        >
          <HelpCircle
            strokeWidth={2.2}
            className="mr-3 h-[18px] w-[18px]"
          />
          Help & Support
        </Link>
        <Link
          href="/logout"
          className={cn("flex  items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 text-gray-500")}
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
