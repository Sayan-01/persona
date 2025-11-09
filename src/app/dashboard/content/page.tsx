"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, FileText, Calendar, Edit, ArrowUpRight, Trash2, Filter, Search, MoreHorizontal, CheckCircle2, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteDraft, getDrafts, getPostedContent, getScheduledContent } from "../../../../server/post";
import { cn } from "@/lib/utils";

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [drafts, setDrafts] = useState<any>([]);
  const [postedContent, setPostedContent] = useState<any>([]);
  const [scheduledContent, setScheduledContent] = useState<any>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      const drafts = await getDrafts();
      setDrafts(drafts);
    };
    fetchDrafts();
    const fetchPostedContent = async () => {
      const postedContent = await getPostedContent();
      setPostedContent(postedContent);
    };
    fetchPostedContent();
    const fetchScheduledContent = async () => {
      const scheduledContent = await getScheduledContent();
      setScheduledContent(scheduledContent);
    };
    fetchScheduledContent();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 ">
          <h1 className="text-3xl font-black dark:text-white mb-1">Welcome to Persona AI</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">This is a content generation and management software operate using AI </p>
        </div>

      

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="posted">Posted</TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="w-full flex flex-col gap-5">
              {drafts.map((draft: any, index: number) => (
                <ContentCard content={draft} type="Draft" key={index}/>
              ))}
            </div>
            <div>
              {scheduledContent.map((scheduled: any, index: number) => (
                <ContentCard content={scheduled} type="Scheduled" key={index}/>
              ))}
            </div>
            <div>
              {postedContent.map((post: any, index: number) => (
                <Card className="overflow-hidden" key={index}>
                  <div className="bg-green-50 px-4 py-2 ">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-100 text-green-700 "
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Posted
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
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
                        <AvatarImage
                          src="/placeholder.svg"
                          alt="LinkedIn"
                        />
                        <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{post.platform}</p>
                    </div>
                    <CardTitle className="mt-2 line-clamp-2 text-base">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">Posted on May 15, 2025 • 127 reactions</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="line-clamp-3 text-sm text-gray-500 ">{post.body}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button
                      variant="outline"
                      className="gap-1.5"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      View Post
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {drafts.map((draft: any, index: number) => (
              <ContentCard  type="Draft" content={draft} key={index}/>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Scheduled content cards would go here */}
            <Card className="overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 ">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-100 text-amber-700 "
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Scheduled
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
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
                        <DropdownMenuItem className="text-red-600 ">
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
                    <AvatarImage
                      src="/placeholder.svg"
                      alt="Twitter"
                    />
                    <AvatarFallback className="bg-sky-500 text-[10px]">TW</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">Twitter Thread</p>
                </div>
                <CardTitle className="mt-2 line-clamp-2 text-base">5 Tips for Managing Remote Teams Effectively</CardTitle>
                <CardDescription className="line-clamp-2">Scheduled for May 25, 2025 at 10:00 AM</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="line-clamp-3 text-sm text-gray-500 ">
                  1/ Managing remote teams requires a different approach than traditional office settings. Here are 5 tips I've learned leading distributed teams for the past 3 years...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button
                  variant="outline"
                  className="gap-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  Reschedule
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posted">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{/* Posted content cards would go here */}</div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

const ContentCard = ({ content , type}: { content: any , type: string}) => {
  return (
    <Card
      key={content.id}
      className="overflow-hidden"
    >
      <div className={cn("px-4 py-2 ", {
        "bg-green-50": type === "Posted",
        "bg-purple-50": type === "Draft",
        "bg-amber-50": type === "Scheduled",
      })}>
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn("", {
              "border-green-200 bg-green-100 text-green-700 ": type === "Posted",
              "border-purple-200 bg-purple-100 text-purple-700 ": type === "Draft",
              "border-amber-200 bg-amber-100 text-amber-700 ": type === "Scheduled",
            })}
          >
            {type}
          </Badge>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
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
                <DropdownMenuItem className="text-red-600 ">
                  <div
                    className="flex gap-4"
                    onClick={() => deleteDraft(content.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="/placeholder.svg"
              alt="LinkedIn"
            />
            <AvatarFallback className="bg-blue-600 text-[10px]">LI</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{content.platform}</p>
        </div>
        <CardTitle className="mt-2 line-clamp-2 text-base">{content.title}</CardTitle>
        <CardDescription className="line-clamp-2">Created 2 days ago • Professional Tone</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p
          className="line-clamp-3 text-sm text-gray-500 "
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button
          variant="outline"
          className="gap-1.5"
        >
          Edit Draft
        </Button>
      </CardFooter>
    </Card>
  );
};