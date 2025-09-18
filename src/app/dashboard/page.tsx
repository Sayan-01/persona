import { BrandScore } from "@/components/dashboard/brand-score";
import { PersonaList } from "@/components/dashboard/persona-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Zap, Calendar, Sparkles, PlusCircle, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";


export default function DashboardPage() {
  return (
    <div className={`p-4 h-full box bg-white dark:bg-zinc-900 `}>
      
      <div className="mb-10 ">
        <h1 className="text-3xl font-black dark:text-white mb-1">Welcome to Persona AI</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">This is a content generation and management software operate using AI </p>
      </div>
      {/* Quick Actions */}
      <div className="mb-8 ">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Generate Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Get content ideas based on your persona</p>
              <Button
                variant="outline"
                className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Brainstorm
              </Button>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Create Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Write a new post for LinkedIn or Twitter</p>
              <Button className="mt-4 w-full dark:bg-purple-600 dark:hover:bg-purple-700">New Content</Button>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Enhance Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Improve or rewrite existing content</p>
              <Button
                variant="outline"
                className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Enhance
              </Button>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Schedule Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Plan your content publishing calendar</p>
              <Button
                variant="outline"
                className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Stats */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Content Overview</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg dark:text-white">Brand Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold dark:text-white">78/100</div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 ">+12 from last week</p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">LinkedIn Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold dark:text-white">12</div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 ">This month</p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">Twitter Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold dark:text-white">24</div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 ">This month</p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold dark:text-white">8</div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 ">Posts ready to go</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Content and Trending Topics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Content */}
        <Card >
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Content</CardTitle>
            <CardDescription className="dark:text-zinc-400">Your latest content drafts and posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">AI in Business Operations</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400 ">LinkedIn • Draft</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="dark:text-zinc-200"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">5 Tips for Remote Teams</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400 ">Twitter • Scheduled</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="dark:text-zinc-200"
                  >
                    View
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">Future of Work Trends</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400 ">LinkedIn • Posted</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="dark:text-zinc-200"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card >
          <CardHeader>
            <CardTitle className="dark:text-white">Trending in Your Industry</CardTitle>
            <CardDescription className="dark:text-zinc-400">Popular topics to create content about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">AI in Customer Experience</div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400 ">High engagement potential</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">Future of Remote Work</div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400 ">Rising search trends</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">Sustainable Business Practices</div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400 ">Growing audience interest</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <BrandScore />
      {/* <ContentCalendar/> */}
      <PersonaList />
    </div>
  );
}
