"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { BrainCircuit, Bell, User, Lock, CreditCard, HelpCircle, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";
import { useState } from "react";
import { updateUserInfo, updateUserPersona } from "../../../../server/user-profile";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const userId = session?.user?.id;

  console.log(typeof session?.user);

  const [isPending, startTransition] = useTransition();

  const [accountForm, setAccountForm] = useState({
    name: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (session?.user) {
      setAccountForm({
        name: session.user.name || "",
        //@ts-ignore
        avatarUrl: session.user.avatarUrl || "",
      });
    }
  }, [session?.user]);

  const [personaForm, setPersonaForm] = useState({
    name: "My Professional Persona",
    tone: "professional",
    description: "",
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountForm({ ...accountForm, [e.target.id]: e.target.value });
  };

  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonaForm({ ...personaForm, [e.target.id]: e.target.value });
  };

  const handleSaveAccount = () => {
    if (!userId) return;
    startTransition(async () => {
      await updateUserInfo(userId, {
        name: accountForm.name,
        avatarUrl: accountForm.avatarUrl,
      });

      await update({
        name: accountForm.name,
        avatarUrl: accountForm.avatarUrl,
      });
    });
  };

  const handleSavePersona = () => {
    if (!userId) return;
    startTransition(async () => {
      await updateUserPersona(userId, {
        tone: [personaForm.tone],
        brandDetails: personaForm.name,
        usp: personaForm.description,
        industry: "general",
        contentGoals: ["engagement"],
        style: ["default"],
        sampleContent: personaForm.description,
      });
    });
  };

  return (
    <div className="min-h-screen p-4 bg-zinc-900">
      <div className="">
        <div className="mb-10 ">
          <h1 className="text-3xl font-black dark:text-white mb-1">This is Your Settings Page</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">This is a content generation and management software operate using AI </p>
        </div>
      </div>

      <Tabs
        defaultValue="persona"
        orientation="vertical"
        className="flex flex-col gap-4 lg:flex-row"
      >
        {/* Sidebar Tabs */}
        <div className="lg:w-1/6 min-w-[240px] relative">
          <TabsList className="flex w-full h-max overflow-x-auto p-0 lg:pb-0 pb-1 box lg:flex-col flex-row items-start justify-start bg-transparent relative">
            <TabsTrigger
              value="persona"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>Persona Settings</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
            >
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary"
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="flex w-full items-center justify-start gap-2 border-transparent px-3 py-2 text-start data-[state=active]:border-l-primary mr-4"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </TabsTrigger>
          </TabsList>
          <div className="bg-gradient-to-r from-transparent to-zinc-900 absolute top-0 right-0 w-20 h-10 pointer-events-none" />
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
                <Button
                  onClick={handleSavePersona}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Persona
                    </>
                  )}
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
                    value={accountForm.name}
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="space-y-2 border  p-4 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      {accountForm.avatarUrl ? (
                        <img
                          src={accountForm.avatarUrl}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover border border-gray-300"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold">{accountForm.name?.[0] || "U"}</div>
                      )}
                    </div>

                    <div>
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formData = new FormData();
                          formData.append("file", file);

                          const res = await fetch("/api/upload-avatar", {
                            method: "POST",
                            body: formData,
                          });

                          const data = await res.json();
                          if (data.url) {
                            setAccountForm({ ...accountForm, avatarUrl: data.url });
                          }
                        }}
                      />
                      <label
                        htmlFor="avatar"
                        className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        Upload / Change
                      </label>
                    </div>
                  </div>

                  {accountForm.avatarUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setAccountForm({ ...accountForm, avatarUrl: "" })}
                    >
                      Remove Avatar
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveAccount}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
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
