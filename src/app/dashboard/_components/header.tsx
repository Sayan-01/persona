'use client'
import React from "react";
import { Home as HomeIcon, Search, PlusSquare, ChevronLeft, ChevronRight, Settings, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[segments.length - 1] || "Home";

  // Optional: format to Capitalize first letter
  const formattedCurrent = current.charAt(0).toUpperCase() + current.slice(1).replace(/-/g, " ");
  
  return (
    <div className="bg-white border-gray-200">
      <div className="flex items-center h-16 px-4 border-b">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">{segments[0].charAt(0).toUpperCase() + segments[0].slice(1).replace(/-/g, " ")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments.length > 1 && (
              <BreadcrumbSeparator />
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{segments[1]?(segments[1].charAt(0).toUpperCase() + segments[1].slice(1).replace(/-/g, " ")):""}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search */}
        <div className="ml-auto flex items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* New Project Button */}
          <button className="mx-3 bg-zinc-900 text-white px-3 py-1.5 rounded-lg flex items-center text-sm">
            <PlusSquare className="h-4 w-4 mr-1.5" />
            New Project
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-[33.4px] w-[33.4px] rounded-full"
              >
                <Avatar className="h-[33.4px] w-[33.4px]">
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
    </div>
  );
};

export default Header;
