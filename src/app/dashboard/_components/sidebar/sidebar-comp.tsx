"use client";

import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import { cn } from "@/lib/utils";
import { ArrowBigDown, Brain, Calendar, ChartPie, ChartSpline, ChevronDown, ChevronLeftCircleIcon, FileText, Hash, HelpCircle, Instagram, LogOut, Menu, Settings, Sparkles, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Poppins, Roboto_Mono } from "next/font/google";
import { useHistory } from "@/hooks/history-provider";
import { useCredits } from "@/hooks/credit-provider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllHistory } from "../../../../../server/actions";
import { DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

export interface History {
  id?: string;
  contentId: string;
  contentTitle: string;
  userId?: string;
}

const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });

export function SidebarComp({ userId, defaultOption = false }: { userId: string | undefined; defaultOption?: boolean }) {
  const pathname = usePathname();
  const { history, setHistory } = useHistory();
  const { credits } = useCredits();

  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(() => (defaultOption ? { open: true } : {}), [defaultOption]);

  // ✅ Mount fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Stable fetch function
  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    const newHistory = await getAllHistory(userId);
    setHistory(newHistory); // overwrite instead of appending duplicates
  }, [userId, setHistory]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (!isMounted) {
    return null; // ✅ always return something
  }

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: ChartPie,
    },

    {
      title: "Content Brain",
      href: "/dashboard/content-brain",
      icon: Brain,
    },
    {
      title: "Youtube Brain",
      href: "/dashboard/youtube-brain",
      icon: TvMinimalPlay,
    },
    {
      title: "Growth Brain",
      href: "/dashboard/growth-content",
      icon: ChartSpline,
    },

    {
      title: "Integration",
      href: "/dashboard/integration",
      icon: Instagram,
    },

    {
      title: "My Content",
      href: "/dashboard/content",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <Sheet
      modal={!defaultOption}
      {...openState}
    >
      <DialogTitle className="hidden">Sidebar Navigation</DialogTitle>
      <SheetTrigger className="h-9 w-9 flex flex-col items-center justify-center rounded-lg border border-[#545454]/30 fixed z-[50] md:hidden left-5 top-[14px] outline-none bg-zinc-700">
        <div className="h-[1px] bg-white/70 w-4 mb-[5px]" />
        <div className="h-[1px] bg-white/70 w-4" />
      </SheetTrigger>
      <SheetContent
        showX={!defaultOption}
        side="left"
        className={cn(`w-[240px] gap-0 hidden flex-col min-[1150px]:flex justify-between h-full p-4 bg-[#ffffff] dark:bg-zinc-900  border-0 ${roboto_Mono.className}`, {
          "hidden md:flex z-0 ": defaultOption,
          "flex md:hidden z-[100] ": !defaultOption, 
        })}
      >
        <div className="">
          <Link
            href="/"
            className={`flex items-center p-2 justify-start rounded-xl`}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-orange-600/60 text-lg bg-amber-600/20"> 🏀 </div>
            <div>
              <h1 className={`px-3 text-black dark:text-white font-semibold`}>PersonaAI.</h1>
              <p className="px-3 text-black dark:text-zinc-400 text-xs">AI content tool</p>
            </div>
          </Link>
          <p className="text-xs pl-2 py-2 font-medium text-neutral-500 dark:text-zinc-400 mt-3">Menu</p>
        </div>
        <nav className=" overflow-y-auto px-0.5 relative mb-auto">
          <ul className="space-y-1 ">
            {navItems.map((item, index) =>
              (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-[8px] py-[8px] text-sm rounded-md",
                      pathname === item.href ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300" : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    )}
                  >
                    <item.icon
                      strokeWidth={2}
                      className={cn("h-[18px] w-[18px] mr-2", pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-400")}
                    />
                    {item.title}
                  </Link>
                </li>
              )
            )}
            <div className="h-4 w-full bg-zinc-900 md:hidden block" />
          </ul>
        </nav>

        <div className="mt-0 pt-3 h-[272px] relative">
          <div className="h-[60px] bg-gradient-to-b from-transparent via-zinc-900 z-10 to-zinc-900 pointer-events-none absolute -top-[40px] left-0 w-full md:hidden block" />

          <UpgradeCard credits={credits}/>
          <Link
            href="/help"
            className={cn("flex items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400")}
          >
            <HelpCircle
              strokeWidth={2.2}
              className="mr-3 h-[18px] w-[18px]"
            />
            Help & Support
          </Link>
          <Link
            href="/logout"
            className={cn("flex items-center px-[10px] py-[10px] text-sm rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400")}
          >
            <LogOut
              strokeWidth={2.2}
              className="mr-3 h-[18px] w-[18px]"
            />
            Logout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
