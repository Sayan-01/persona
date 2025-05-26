import type { ReactNode } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden flex-col lg:flex">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 relative overflow-auto ">
        <Header/>
        <main className="box h-[calc(100vh-64px)] overflow-y-auto flex">
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
