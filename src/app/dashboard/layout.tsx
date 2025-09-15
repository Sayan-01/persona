import type { ReactNode } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { auth } from "../../../auth";
import { HistoryProvider } from "../../../provider/historyProvider";
import { Fira_Code, Roboto_Mono, Source_Code_Pro } from "next/font/google";
const roboto_Mono = Roboto_Mono({ subsets: ["latin"] });

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <HistoryProvider>
      <div className={`flex h-screen bg-background dark:bg-zinc-900 ${roboto_Mono.className}`}>
        <aside className="hidden flex-col lg:flex">
          <Sidebar userId={session?.user?.id || undefined} />
        </aside>
        <div className="flex flex-col flex-1 relative overflow-auto ">
          <Header />
          <main className="box h-[calc(100vh-64px)] overflow-y-auto flex box">
            <div className="mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </HistoryProvider>
  );
}
