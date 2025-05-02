import { BrandScore } from "@/components/dashboard/brand-score";
import { PersonaList } from "@/components/dashboard/persona-list";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Zap, Calendar, Sparkles, PlusCircle, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import DashboardHeading from "./_components/dashboard-heading";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <DashboardHeading
        title={"Welcome to PersonaAI"}
        description={"Let's start creating content that sounds like you"}
      />

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Generate Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get content ideas based on your persona</p>
              <Button
                variant="outline"
                className="mt-4 w-full"
              >
                Brainstorm
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Create Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Write a new post for LinkedIn or Twitter</p>
              <Button className="mt-4 w-full">New Content</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Enhance Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Improve or rewrite existing content</p>
              <Button
                variant="outline"
                className="mt-4 w-full"
              >
                Enhance
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Schedule Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Plan your content publishing calendar</p>
              <Button
                variant="outline"
                className="mt-4 w-full"
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
          <h2 className="text-xl font-semibold">Content Overview</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Brand Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78/100</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+12 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">LinkedIn Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Twitter Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Posts ready to go</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Content and Trending Topics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Content */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Your latest content drafts and posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">AI in Business Operations</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">LinkedIn • Draft</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">5 Tips for Remote Teams</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Twitter • Scheduled</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    View
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Future of Work Trends</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">LinkedIn • Posted</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Trending in Your Industry</CardTitle>
            <CardDescription>Popular topics to create content about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">AI in Customer Experience</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">High engagement potential</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Future of Remote Work</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rising search trends</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sustainable Business Practices</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Growing audience interest</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
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
      <RecentActivity />
      <UserNav />
    </div>
  );
}
