"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PlusCircle,
  FileText,
  Calendar,
  Edit,
  ArrowUpRight,
  Trash2,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle2,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Content</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all your content drafts and posts</p>
        </div>
        <Button className="gap-1.5">
          <PlusCircle className="h-4 w-4" />
          Create New
        </Button>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex w-full gap-2 sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input placeholder="Search content..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select defaultValue="recent">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="posted">Posted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="bg-purple-50 px-4 py-2 dark:bg-purple-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-300"
                  >
                    Draft
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Schedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="LinkedIn" />
                    <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">LinkedIn Post</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  AI in Business Operations: Transforming Decision-Making
                </CardTitle>
                <CardDescription className="line-clamp-2">Created 2 days ago • Professional Tone</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  The integration of AI in business operations is revolutionizing how companies make strategic
                  decisions. AI systems can process vast amounts of data to identify patterns and insights that would be
                  impossible for humans to detect...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  Edit Draft
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-300"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Scheduled
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Reschedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Cancel Scheduling</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="Twitter" />
                    <AvatarFallback className="bg-sky-500 text-[10px]">TW</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">Twitter Thread</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  5 Tips for Managing Remote Teams Effectively
                </CardTitle>
                <CardDescription className="line-clamp-2">Scheduled for May 25, 2025 at 10:00 AM</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  1/ Managing remote teams requires a different approach than traditional office settings. Here are 5
                  tips I've learned leading distributed teams for the past 3 years...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Reschedule
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-green-50 px-4 py-2 dark:bg-green-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Posted
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          <span>View Post</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Create Similar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="LinkedIn" />
                    <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">LinkedIn Post</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  The Future of Work: Trends to Watch in 2025
                </CardTitle>
                <CardDescription className="line-clamp-2">Posted on May 15, 2025 • 127 reactions</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  As we approach the mid-point of 2025, several workplace trends are becoming clear. The hybrid model is
                  here to stay, but with new innovations in collaboration technology...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  <ArrowUpRight className="h-4 w-4" />
                  View Post
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-purple-50 px-4 py-2 dark:bg-purple-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-300"
                  >
                    Draft
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Schedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="LinkedIn" />
                    <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">LinkedIn Article</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  How to Build a Customer-Centric Organization
                </CardTitle>
                <CardDescription className="line-clamp-2">Created 1 week ago • Professional Tone</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  In today's competitive landscape, customers expect personalized, seamless experiences. Building a
                  truly customer-centric organization requires alignment across all departments...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  Edit Draft
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Add draft cards here (similar format to the cards above) */}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Scheduled content cards would go here */}
            <Card className="overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-300"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Scheduled
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Reschedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Cancel Scheduling</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="Twitter" />
                    <AvatarFallback className="bg-sky-500 text-[10px]">TW</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">Twitter Thread</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  5 Tips for Managing Remote Teams Effectively
                </CardTitle>
                <CardDescription className="line-clamp-2">Scheduled for May 25, 2025 at 10:00 AM</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  1/ Managing remote teams requires a different approach than traditional office settings. Here are 5
                  tips I've learned leading distributed teams for the past 3 years...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Reschedule
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posted">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Posted content cards would go here */}
            <Card className="overflow-hidden">
              <div className="bg-green-50 px-4 py-2 dark:bg-green-900/20">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Posted
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          <span>View Post</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Create Similar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="LinkedIn" />
                    <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">LinkedIn Post</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">
                  The Future of Work: Trends to Watch in 2025
                </CardTitle>
                <CardDescription className="line-clamp-2">Posted on May 15, 2025 • 127 reactions</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  As we approach the mid-point of 2025, several workplace trends are becoming clear. The hybrid model is
                  here to stay, but with new innovations in collaboration technology...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="gap-1.5">
                  <ArrowUpRight className="h-4 w-4" />
                  View Post
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
