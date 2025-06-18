import type { ReactNode } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { auth } from "../../../auth";
import { HistoryProvider } from "../../../provider/historyProvider";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <HistoryProvider>
      <div className="flex h-screen bg-background">
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
