"use client";

import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import { cn } from "@/lib/utils";
import { ArrowBigDown, Brain, Calendar, ChartPie, ChevronDown, ChevronLeftCircleIcon, FileText, Hash, HelpCircle, Instagram, LogOut, Menu, Settings, Sparkles, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Poppins } from "next/font/google";
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
      title: "Youtube Brain",
      href: "/dashboard/youtube-brain",
      icon: TvMinimalPlay,
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
        className={cn("w-[240px] gap-0 hidden flex-col min-[1150px]:flex justify-between h-full p-4 bg-[#ffffff] dark:bg-zinc-900  border-0", {
          "hidden md:flex z-0 ": defaultOption,
          "flex md:hidden z-[100] ": !defaultOption,
        })}
      ><div>
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
        <nav className="h-[320px] px-0.5">
          <p className="text-xs pl-2 py-2 font-medium text-neutral-500 dark:text-zinc-400 mt-3">Menu</p>

          <ul className="space-y-1">
            {navItems.map((item, index) =>
              item.title === "Content Brain" || item.title === "Special Brain" ? (
                <li key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn("flex items-center px-[8px] py-[8px] text-sm rounded-md", "hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:no-underline")}
                      >
                        <div className="flex">
                          <item.icon
                            strokeWidth={2}
                            className={cn("h-[18px] w-[18px] mr-2", "text-zinc-700 dark:text-zinc-400")}
                          />
                          {item.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 ">
                        <div className={cn("ml-4 mt-1 space-y-1 border-l border-zinc-700/50 pl-3 relative")}>
                          <div className="absolute -left-[2px] top-0 w-1 h-1 rounded-full bg-zinc-700" />
                          <div className="absolute -left-[2px] -bottom-1 w-1 h-1 rounded-full bg-zinc-700" />

                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-[8px] py-[8px] text-sm rounded-md",
                              pathname === item.href ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300" : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            )}
                          >
                            <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                            Social Content
                          </Link>
                          <Link
                            href="/dashboard/growth-content"
                            className={cn(
                              "flex items-center px-[8px] py-[8px] text-sm rounded-md",
                              pathname === "/dashboard/growth-content"
                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300"
                                : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            )}
                          >
                            <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                            Growth Content
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ) : (
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
          </ul>
        </nav>
        </div>
        {/* <section className="h- mt-2 px-0.5 overflow-hidden relative">
           <p className="text-xs pl-2 py-2 font-medium text-neutral-500 dark:text-zinc-400">History</p>
          <ul className="h-[calc(100%-42px)] overflow-x-scroll box flex items-center justify-center mt-1">
            {history.length > 0 ? (
              <div className="h-full w-full flex items-start justify-start flex-col">
                {history.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="w-full"
                  >
                    <Link
                      href={`/dashboard/content-brain/${item.contentId}`}
                      className={cn(
                        "flex w-full items-center px-[8px] py-[6px] text-sm rounded-md gap-1 text-zinc-500 dark:text-zinc-400",
                        pathname === item.href ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200" : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      <p className="one_liner">{item.contentTitle}</p>
                    </Link>
                  </li>
                ))}
              </div>
            ) : (
              <p className="text-xs pl-2 pb-6 font-medium text-neutral-500 dark:text-zinc-500 italic">Empty History</p>
            )}
          </ul>
          <div className="h-[58px] pointer-events-none flex items-end justify-center bg-gradient-to-b from-transparent via-white dark:via-zinc-900  to-white dark:to-zinc-900 w-full absolute -bottom-6"></div>
        </section> */}
        <div className="mt-0 pt-1">
          <UpgradeCard credits={credits} />
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
