import type { ReactNode } from "react";
import Header from "./_components/header";
import { auth } from "../../../auth";
import { HistoryProvider } from "../../hooks/history-provider";
import { Fira_Code, Roboto_Mono, Source_Code_Pro } from "next/font/google";
import Unauthorized from "@/components/unauthorized";
import Sidebar from "./_components/sidebar";
import MobilePrevent from "./_components/mobile-prevention";
const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user?.email) return <Unauthorized/>
  return (
    <MobilePrevent>
      <HistoryProvider>
        <div className={`flex h-screen bg-background dark:bg-zinc-900 ${roboto_Mono.className}`}>
          <aside className="md:w-[240px]">
            <Sidebar userId={session?.user?.id || ""} />
          </aside>
          <div className="flex flex-col pt-[64px] md:pt-0 flex-1 relative overflow-auto border-l-2 border-dashed dark:border-zinc-800">
            <Header />
            <main className="box h-[calc(100vh-64px)] overflow-y-auto flex box">
              <div className="mx-auto w-full">{children}</div>
            </main>
          </div>
        </div>
      </HistoryProvider>
    </MobilePrevent>
  );
}
