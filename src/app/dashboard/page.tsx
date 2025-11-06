import { BrandScore } from "@/components/dashboard/brand-score";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Zap, Calendar, Sparkles, PlusCircle, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";


export default function DashboardPage() {
  return (
    <div className={`p-4 lg:p-6 h-auto box bg-white dark:bg-zinc-900`}>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-black dark:text-white">Persona AI Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Plan, generate, schedule and track content across your personas.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button className="dark:bg-purple-600 dark:hover:bg-purple-700">
            Create New Content
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Create Persona
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Brand Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold dark:text-white">78/100</div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">+12 vs last week</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold dark:text-white">6</div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold dark:text-white">8</div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Next 14 days</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Published (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold dark:text-white">21</div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Across channels</p>
          </CardContent>
        </Card>
      </div>

      {/* Guided quick actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Brainstorm Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Generate topic ideas by persona.</p>
            <Button variant="outline" className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
              Open Brainstorm
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Create Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Compose a post for LinkedIn or X.</p>
            <Button className="mt-4 w-full dark:bg-purple-600 dark:hover:bg-purple-700">
              Start Writing
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Enhance Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Rewrite, summarize, or expand.</p>
            <Button variant="outline" className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
              Improve Draft
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Schedule Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Plan your publishing calendar.</p>
            <Button variant="outline" className="mt-4 w-full dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
              Open Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Workflow lanes */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-white">Drafts</CardTitle>
            <CardDescription className="dark:text-zinc-400">Work in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">AI in Business Operations</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">LinkedIn • Draft</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">Edit</Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">How to brief an AI writer</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">X • Draft</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-white">Scheduled</CardTitle>
            <CardDescription className="dark:text-zinc-400">Queued for publishing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">5 Tips for Remote Teams</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">X • Tomorrow 10:00</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">View</Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">Quarterly roadmap update</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">LinkedIn • Fri 14:00</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">View</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-zinc-100 dark:border-zinc-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-white">Published</CardTitle>
            <CardDescription className="dark:text-zinc-400">Recent wins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">Future of Work Trends</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">LinkedIn • 1.2k impressions</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">View</Button>
                </div>
              </div>
              <div className="rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white one_liner">Customer onboarding checklist</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">X • 320 likes</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="dark:text-zinc-200">View</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI suggestions + Brand score */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">AI Suggestions</CardTitle>
            <CardDescription className="dark:text-zinc-400">Personalized topics to create now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">AI in Customer Experience</div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400">High engagement potential</div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-zinc-700">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white">Future of Remote Work</div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400">Rising search trends</div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700">
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div>
          <BrandScore />
        </div>
      </div>

      {/* Personas */}
    </div>
  );
}
