import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { BrainCircuit, Bell, User, Lock, CreditCard, HelpCircle, Save } from "lucide-react";
import { auth } from "../../../../auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth()
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
        <p className="text-gray-500">{JSON.stringify(session?.user)}</p>
      </div>

      <Tabs
        defaultValue="persona"
        orientation="vertical"
        className="flex flex-col gap-8 lg:flex-row"
      >
        {/* Sidebar Tabs */}
        <div className="lg:w-1/4">
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
        </div>

        {/* Tab Contents */}
        <div className="flex-1 space-y-8">
          {/* Persona */}
          <TabsContent
            value="persona"
            className="mt-0"
          >
            <Card>
              <CardHeader>
                <CardTitle>Persona Settings</CardTitle>
                <CardDescription>Customize your AI persona to match your brand voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="persona-name">Persona Name</Label>
                  <Input
                    id="persona-name"
                    defaultValue="My Professional Persona"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Writing Tone</Label>
                  <RadioGroup
                    defaultValue="professional"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem
                        value="professional"
                        id="p-professional"
                      />
                      <Label
                        htmlFor="p-professional"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">Professional</div>
                        <div className="text-sm text-gray-500">Formal, authoritative tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem
                        value="casual"
                        id="p-casual"
                      />
                      <Label
                        htmlFor="p-casual"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">Casual</div>
                        <div className="text-sm text-gray-500">Relaxed, conversational tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem
                        value="friendly"
                        id="p-friendly"
                      />
                      <Label
                        htmlFor="p-friendly"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">Friendly</div>
                        <div className="text-sm text-gray-500">Warm and supportive tone</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem
                        value="witty"
                        id="p-witty"
                      />
                      <Label
                        htmlFor="p-witty"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">Witty</div>
                        <div className="text-sm text-gray-500">Playful and humorous tone</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="persona-desc">Persona Description</Label>
                  <Textarea
                    id="persona-desc"
                    placeholder="Describe your persona's style, goals, and quirks..."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Persona
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your profile and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Update your password and enable 2FA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your subscription and payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  You are currently on the <strong>Pro Plan</strong>. Your next billing date is <strong>Nov 15, 2025</strong>.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Manage Billing</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Help */}
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get assistance or contact support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">Need help? Check out our documentation or contact our support team.</p>
              </CardContent>
              <CardFooter>
                <Button>Contact Support</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
