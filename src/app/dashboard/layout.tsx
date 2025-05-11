import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, FileText, Calendar, Settings, PlusCircle, Bell, LogOut, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar } from "./_components/sidebar";
import ButtonLayout from "@/components/buttons/button-layout";
import Search from "@/components/global/search";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#111111] p-3">
      <aside className="hidden w-[250px] flex-col lg:flex  pr-3">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 relative overflow-auto rounded-3xl border">
        <header className=" sticky top-0 z-30 w-full p-7 py-0 border-b">
          <div className="container flex h-16 items-center justify-end gap-4 py-4">
            <div className="flex items-center gap-4">
              <ButtonLayout icon>
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </ButtonLayout>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/user.jpg"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="box h-[calc(100vh-76px)] overflow-y-auto flex  px-7 ">
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
