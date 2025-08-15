"use client";

import UpgradeCard from "@/app/dashboard/_components/upgrade-card";
import { cn } from "@/lib/utils";
import { Brain, Calendar, ChartPie, FileText, HelpCircle, Instagram, LogOut, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { HistoryContext } from "../../../../provider/historyProvider";
import { getAllHistory } from "../../../../server/actions";

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

export function Sidebar({ userId }: { userId: string | undefined }) {
  const pathname = usePathname();
  const { history, setHistory } = useContext(HistoryContext);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      const newHistory = await getAllHistory(userId);
      setHistory((history : History[]) => [...history, ...newHistory]);
    };
    fetchHistory();
  }, [])  

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
        <div className="p-[6px] rounded-lg border border-orange-600/60 text-lg bg-amber-600/20">
          🏀
        </div>
        <div>
          <h1 className="px-3 text-black font-medium">PersonaAI.</h1>
          <p className="px-3 text-black text-xs">AI content generation</p>
        </div>
      </Link>
      <nav className=" h-[280px] px-0.5">
        <p className="text-xs pl-2 py-2 font-medium text-neutral-500 mt-3">Menu</p>

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
      <section className="h-full mt-2 px-0.5 overflow-hidden">
        <p className="text-xs pl-2 py-2 font-medium text-neutral-500">History</p>
        <ul className="h-[calc(100%-32px)] overflow-x-scroll box flex items-center justify-center mt-1">
          {history.length > 0 ? (
            <div className="h-full w-full flex items-start justify-start flex-col text-zinc-500">
              {history.map((item: any, index: number) => (
                <li key={index} className="w-full">
                  <Link href={`/dashboard/content-brain/${item.contentId}`} className={cn("flex w-full items-center px-[8px] py-[4px] text-sm rounded-md gap-1", pathname === item.href ? "bg-zinc-100 text-zinc-800" : "hover:bg-gray-100 ")}>
                   <p className="one_liner">{item.contentTitle}</p>
                  </Link>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-xs pl-2 pb-8 font-medium text-neutral-500 italic">Empty History</p>
          )}
        </ul>
      </section>
      <div className="mt-2 pt-1">
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
