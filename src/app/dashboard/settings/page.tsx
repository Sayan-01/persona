"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BrainCircuit, Bell, User, Lock, CreditCard, HelpCircle, Save } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("persona")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-1/4">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
            <TabsList className="flex w-full flex-col items-start justify-start bg-transparent p-0">
              <TabsTrigger
                value="persona"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <BrainCircuit className="h-4 w-4" />
                <span>Persona Settings</span>
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
              <TabsTrigger
                value="help"
                className="flex w-full items-center justify-start gap-2 rounded-none border-l-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1">
          <TabsContent value="persona" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Persona Settings</CardTitle>
                <CardDescription>Customize your AI persona to match your brand voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="persona-name">Persona Name</Label>
                  <Input id="persona-name" defaultValue="My Professional Persona" />
                </div>

                <div className="space-y-2">
                  <Label>Writing Tone</Label>
                  <RadioGroup defaultValue="professional" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="professional" id="p-professional" />
                      <Label htmlFor="p-professional" className="flex-1 cursor-pointer">
                        <div className="font-medium">Professional</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Formal, authoritative tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="casual" id="p-casual" />
                      <Label htmlFor="p-casual" className="flex-1 cursor-pointer">
                        <div className="font-medium">Casual</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Relaxed, conversational tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="friendly" id="p-friendly" />
                      <Label htmlFor="p-friendly" className="flex-1 cursor-pointer">
                        <div className="font-medium">Friendly</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Warm, personable tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="inspirational" id="p-inspirational" />
                      <Label htmlFor="p-inspirational" className="flex-1 cursor-pointer">
                        <div className="font-medium">Inspirational</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Motivational, energetic tone</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology & SaaS</SelectItem>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="finance">Finance & Fintech</SelectItem>
                      <SelectItem value="healthcare">Healthcare & Wellness</SelectItem>
                      <SelectItem value="education">Education & Learning</SelectItem>
                      <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Select defaultValue="executives">
                    <SelectTrigger id="target-audience">
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executives">Executives (C-suite, Directors)</SelectItem>
                      <SelectItem value="managers">Managers & Team Leads</SelectItem>
                      <SelectItem value="professionals">Professionals & Individual Contributors</SelectItem>
                      <SelectItem value="small-business">Small Business Owners</SelectItem>
                      <SelectItem value="entrepreneurs">Entrepreneurs & Startups</SelectItem>
                      <SelectItem value="consumers">General Consumers</SelectItem>
                      <SelectItem value="students">Students & Academics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sample-content">Sample Content</Label>
                  <Textarea
                    id="sample-content"
                    placeholder="Add examples of your existing content to help train your AI"
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Providing more examples will help your AI better match your unique voice
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hashtags">Automatically add hashtags</Label>
                    <Switch id="hashtags" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Add relevant hashtags to your content automatically
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emojis">Use emojis</Label>
                    <Switch id="emojis" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Include appropriate emojis in generated content
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-1.5">
                  <Save className="h-4 w-4" />
                  Save Persona Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title (Optional)</Label>
                    <Input id="job-title" defaultValue="Marketing Director" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                      <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="europe-london">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="europe-paris">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-1.5">
                  <Save className="h-4 w-4" />
                  Save Account Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="content-ready" className="text-base">
                          Content Ready
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify when scheduled content is ready to post
                        </p>
                      </div>
                      <Switch id="content-ready" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="content-posted" className="text-base">
                          Content Posted
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify when content has been posted to platforms
                        </p>
                      </div>
                      <Switch id="content-posted" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-summary" className="text-base">
                          Weekly Summary
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive weekly summary of content performance
                        </p>
                      </div>
                      <Switch id="weekly-summary" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="product-updates" className="text-base">
                          Product Updates
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify about new features and improvements
                        </p>
                      </div>
                      <Switch id="product-updates" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-content-ready" className="text-base">
                          Content Ready
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Show notification when content is ready to review
                        </p>
                      </div>
                      <Switch id="app-content-ready" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-reminders" className="text-base">
                          Content Reminders
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Remind about upcoming scheduled content
                        </p>
                      </div>
                      <Switch id="app-reminders" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-1.5">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <div className="pt-4">
                  <h3 className="mb-4 font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Protect your account with 2FA</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-4 font-medium">Session Management</h3>
                  <div className="rounded-lg border p-4">
                    <p className="font-medium">Active Sessions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">You are currently logged in on 2 devices</p>
                    <Button variant="outline" className="mt-2">
                      Manage Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gap-1.5">
                  <Save className="h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription plan and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Plan: Free Trial</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Your trial ends in 10 days</p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Payment Methods</h3>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm">No payment methods added yet</p>
                    <Button variant="outline" className="mt-2">
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Billing History</h3>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm">No billing history available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get help with PersonaAI features and issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Documentation</h3>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Access guides and tutorials for using PersonaAI
                    </p>
                    <Button variant="outline">View Documentation</Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Contact Support</h3>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Get help from our support team</p>
                    <Button variant="outline">Contact Support</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Frequently Asked Questions</h3>
                  <div className="space-y-4 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">How do I create my first content piece?</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Go to the Content Brain section and click on "Create Content" to get started.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I edit AI-generated content?</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Yes, you can edit any content before posting or scheduling it.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">How do I connect my social media accounts?</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Go to Settings > Integrations to connect your social media profiles.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            rd>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
