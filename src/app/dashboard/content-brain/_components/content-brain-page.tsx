"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, AlertCircle, X, Info, RefreshCw, Plus, Edit, MoveLeft, CheckCircle2, Clock, Send, Image as ImageIcon, Loader2 } from "lucide-react";
import { IdeaGenerateProps } from "../../../../../AI/IdeaGeneratePrompt";
import IdeaCard from "./idea-card";
import enhanceContentPrompt from "../../../../../AI/EnhanceContentPrompt";
import { toast } from "sonner";
import { saveAsDraft, savePost, publishPost, schedulePost } from "../../../../../server/post";
import AIinput from "@/components/global/ai-input";
import InputWrapper from "@/components/global/input-wrapper";
import { ContentLengths, Platforms, socialPlatforms } from "@/constants";
import { cn } from "@/lib/utils";
import EnhancetypeSelector from "./enhancetype-selector";
import { ContentEnhancePromptDetails, ContentGeneratePromptDetails, IdeaGeneratePromptDetails } from "../../../../../types";
import Link from "next/link";
import { addInHistory } from "../../../../../server/actions";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import ContentStatus from "./content-status";
import { getUserPersona } from "../../../../../server/user-profile";
import { useHistory } from "@/hooks/history-provider";
import { useCredits } from "@/hooks/credit-provider";
import generateContentPrompt from "../../../../../AI/ContentGeneratePrompt";

export default function ContentBrainPage({ user }: { user: { id: string; email: string; name: string; isVarified: boolean; isAdmin: boolean } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ideas");
  const [ideaGeneratePromptDetails, setIdeaGeneratePromptDetails] = useState<IdeaGeneratePromptDetails>({
    topic: "",
    numberOfIdeas: "3",
    platform: [],
  });
  const [contentGeneratePromptDetails, setContentGeneratePromptDetails] = useState<ContentGeneratePromptDetails>({
    topic: "",
    description: "",
    contentType: "linkedIn",
    hashtags: [],
    keyPoints: [],
    contentLength: "medium",
  });
  const [contentEnhancePromptDetails, setContentEnhancePromptDetails] = useState<ContentEnhancePromptDetails>({
    contentType: "linkedIn",
    previousContent: "",
    enhanceType: "rewrite",
  });

  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [contentDraft, setContentDraft] = useState<{ id: string; content: string } | null>(null);
  const [contentStatus, setContentStatus] = useState("draft");
  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [enhanceContent, setEnhanceContent] = useState("");
  const [userPersona, setUserPersona] = useState<any>(null);
  const [uploadedMedia, setUploadedMedia] = useState<{ id: string; url: string; type: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const { history, setHistory } = useHistory();
  const { decrementCredits } = useCredits();

  useEffect(() => {
    const fetchUserPersona = async () => {
      if (user) {
        const userPersonaDetails = await getUserPersona(user.id);
        setUserPersona(userPersonaDetails);
      }
    };
    fetchUserPersona();
  }, [user]);

  const removePlatform = (name: string) => {
    setIdeaGeneratePromptDetails({
      ...ideaGeneratePromptDetails,
      platform: ideaGeneratePromptDetails.platform.filter((item) => item !== name),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadedMedia((prev) => [...prev, { id: data.id, url: data.url, type: data.type }]);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async (type: string) => {
    setGenerating(true);
    try {
      let prompt = "";
      if (type === "idea generate") {
        prompt = IdeaGenerateProps({
          topic: ideaGeneratePromptDetails.topic,
          numberOfIdeas: ideaGeneratePromptDetails.numberOfIdeas,
          platform: ideaGeneratePromptDetails.platform,
          userPersona: userPersona,
        });
      } else if (type === "content generate" || type === "regenerate") {
        prompt = generateContentPrompt({
          platform: contentGeneratePromptDetails.contentType,
          topic: contentGeneratePromptDetails.topic,
          keyPoints: selectedIdea?.keyPoints || [],
          hashtags: selectedIdea?.hashtags || [],
          contentLength: contentGeneratePromptDetails.contentLength,
          userPersona: userPersona,
        });
      } else if (type === "content enhance") {
        prompt = enhanceContentPrompt({
          platform: contentEnhancePromptDetails.contentType,
          previousContent: contentEnhancePromptDetails.previousContent,
          enhanceType: contentEnhancePromptDetails.enhanceType,
          userPersona: userPersona,
        });
      }

      const res = await fetch("/api/social-media-content-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI Generation failed");

      const rawData = await res.json();
      const data = JSON.parse(rawData);

      if (type === "idea generate") {
        setResult(data);
        setShowIdeas(true);
        decrementCredits(100);
      } else if (type === "content generate" || type === "regenerate") {
        const content = data.content || data;
        if (type === "content generate") {
          const post = await savePost({
            title: contentGeneratePromptDetails.topic,
            platform: contentGeneratePromptDetails.contentType,
            body: content,
          });
          const id = post.id;
          setContentDraft({ id, content });
          await addInHistory(user.id, id, contentGeneratePromptDetails.topic);
          setHistory([{ contentId: id, contentTitle: contentGeneratePromptDetails.topic }, ...history]);
          setActiveTab("create");
        } else {
          setContentDraft((prev) => (prev ? { ...prev, content } : null));
          if (contentDraft?.id) {
            await savePost({
              id: contentDraft.id,
              title: contentGeneratePromptDetails.topic,
              platform: contentGeneratePromptDetails.contentType,
              body: content,
            });
          }
        }
      } else if (type === "content enhance") {
        setEnhanceContent(data.content || data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleUseIdea = (idea: any, platform: string) => {
    setSelectedIdea({ ...idea, platform });
    setContentGeneratePromptDetails((prev) => ({
      ...prev,
      topic: idea.title,
      contentType: platform.toLowerCase().includes("linkedin") ? "linkedIn" : platform.toLowerCase().includes("twitter") || platform.toLowerCase().includes("x") ? "twitter" : "facebook",
    }));
    setActiveTab("create");
  };

  const handleContentAction = async (status: string) => {
    if (!contentDraft?.id) {
      toast.error("No content generated yet");
      return;
    }

    const platform = contentGeneratePromptDetails.contentType;

    try {
      switch (status) {
        case "draft":
          await saveAsDraft({ id: contentDraft.id });
          toast.success("Saved as draft");
          break;

        case "published":
          await savePost({
            id: contentDraft.id,
            title: contentGeneratePromptDetails.topic,
            platform,
            body: contentDraft.content,
            mediaIds: uploadedMedia.map((m) => m.id),
            status: "Published",
          });
          const pubRes = await publishPost(contentDraft.id, platform);
          if (pubRes.success) {
            toast.success("Published successfully!");
          } else if (pubRes.error === "ACCOUNT_NOT_CONNECTED") {
            toast.error("Account not connected", {
              description: `Please connect your ${platform} account in settings.`,
              action: { label: "Connect", onClick: () => router.push("/dashboard/settings") },
            });
          } else {
            toast.error(pubRes.error || "Failed to publish");
          }
          break;

        case "scheduled":
          if (!scheduledAt) {
            toast.error("Set a schedule time first");
            return;
          }
          await savePost({
            id: contentDraft.id,
            title: contentGeneratePromptDetails.topic,
            platform,
            body: contentDraft.content,
            mediaIds: uploadedMedia.map((m) => m.id),
            status: "Scheduled",
            scheduledAt: new Date(scheduledAt),
          });
          await schedulePost(contentDraft.id, new Date(scheduledAt));
          toast.success("Post scheduled!");
          break;
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex min-[1150px]:flex-row flex-col gap-0 min-[1150px]:h-full"
      >
        {/* Input section */}
        <div className="flex-1 border-r h-full">
          <nav className="flex border-b-2 min-[1316px]:justify-between justify-end h-12">
            <div className="min-[1316px]:flex items-center py-2 px-2 hidden">
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <TabsList className="p-0 flex h-12 bg-transparent px-0 ">
              <TabsTrigger
                value="ideas"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                💡 <span className="hidden min-[535px]:block">Generate Ideas</span>
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                📝 <span className="hidden min-[535px]:block">Create Content</span>
              </TabsTrigger>
              <TabsTrigger
                value="enhance"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                📜 <span className="hidden min-[535px]:block">Enhance Content</span>
              </TabsTrigger>
            </TabsList>
          </nav>

          <section className="min-[1150px]:h-[calc(100%-48px)] h-full overflow-y-auto box">
            <TabsContent
              value="ideas"
              className="m-0"
            >
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border border-indigo-200 dark:border-zinc-700 rounded-xl p-4 mb-8 flex items-start">
                  <div className="flex-shrink-0 text-indigo-600 ">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-indigo-800 dark:text-indigo-400 font-medium">💡 Click here to check out our tips for using Persona AI</p>
                  </div>
                  <Link
                    href="/blog/know-more"
                    className="text-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80">Generate Content Ideas</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80">Get AI-powered content ideas based on your persona and industry trends</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">🔥 Content</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Paste the content description below <span className="text-pink-500">*</span>
                        </Label>
                        <textarea
                          maxLength={1000}
                          value={ideaGeneratePromptDetails.topic}
                          onChange={(e) => setIdeaGeneratePromptDetails({ ...ideaGeneratePromptDetails, topic: e.target.value })}
                          className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
                          placeholder="Paste the content description here..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">{ideaGeneratePromptDetails.topic.length}/1000 characters</div>
                          <div className="w-24 bg-gray-200 dark:bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-indigo-500 dark:bg-zinc-500 h-1 rounded-full"
                              style={{ width: `${(ideaGeneratePromptDetails.topic.length / 1000) * 100}%`, minWidth: "5px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Skills Section */}
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">🎇 Platform</h3>
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Which platform should be the focus? <span className="text-pink-500">*</span>
                      </Label>

                      {/* Skills Tags Display */}
                      <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-2 border-dashed border-indigo-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
                        {ideaGeneratePromptDetails.platform.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-indigo-100 dark:bg-zinc-700 border border-indigo-200 dark:border-zinc-600 rounded-lg py-2 px-3 text-sm flex items-center gap-2 hover:bg-indigo-200 dark:hover:bg-zinc-600 transition-colors"
                          >
                            <span className="text-indigo-800 dark:text-white font-medium">{skill}</span>
                            <button
                              onClick={() => removePlatform(skill)}
                              className="text-indigo-600 dark:text-white hover:text-indigo-800 dark:hover:text-zinc-200 hover:bg-indigo-300 dark:hover:bg-zinc-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {ideaGeneratePromptDetails.platform.length === 0 && <div className="text-gray-500 dark:text-gray-400 text-sm italic">Select the platform you want to generate content for</div>}
                      </div>

                      {/* Suggested Skills */}
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Suggestions:</span>
                        {["LinkedIn", "Facebook", "Instagram", "Twitter", "blog"].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              if (!ideaGeneratePromptDetails.platform.includes(suggestion)) {
                                setIdeaGeneratePromptDetails({ ...ideaGeneratePromptDetails, platform: [...ideaGeneratePromptDetails.platform, suggestion] });
                              }
                            }}
                            className="text-xs bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md transition-colors"
                            disabled={ideaGeneratePromptDetails.platform.includes(suggestion)}
                          >
                            + {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Creativity Level */}
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">🎯 Number of Ideas</h3>
                      <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">How many ideas should be generated?</Label>
                      <div className="relative">
                        <AIinput
                          maxLength={1}
                          type="text"
                          value={ideaGeneratePromptDetails.numberOfIdeas}
                          onChange={(e: any) => setIdeaGeneratePromptDetails({ ...ideaGeneratePromptDetails, numberOfIdeas: e.target.value })}
                          className=" dark:focus:ring-zinc-500 h-10 bg-white dark:bg-zinc-800 mt-0"
                          placeholder="3"
                        />
                        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Conservative (0.0)</span>
                          <span>Balanced (0.5)</span>
                          <span>Creative (1.0)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Enhanced Create Button */}
                  <Button
                    onClick={() => handleGenerate("idea generate")}
                    disabled={generating}
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" /> Generating...
                      </>
                    ) : (
                      "✨ Generate Ideas"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Create Tab */}
            <TabsContent value="create">
              <div className="p-8 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Generate Your Content</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Get AI-powered content based on your persona and industry trends</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <InputWrapper
                    heading={"🔥 Topic or Idea"}
                    label={"Paste your content idea here"}
                  >
                    <AIinput
                      placeholder="e.g., 🤗 Stop Wasting Time! Automate Your Business with AI."
                      value={contentGeneratePromptDetails.topic}
                      onChange={(e: any) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, topic: e.target.value })}
                    />
                  </InputWrapper>

                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">🤖 Key Points (Optional)</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Paste the content description below <span className="text-pink-500">*</span>
                        </Label>
                        <textarea
                          id="keywords"
                          value={contentGeneratePromptDetails.description}
                          onChange={(e) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, description: e.target.value })}
                          className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
                          placeholder="• Include relevant statistics or data&#10;• Mention your personal experience&#10;• Add industry insights or trends&#10;• Specify your target audience"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">482/1000 characters</div>
                          <div className="w-24 bg-gray-200 dark:bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-indigo-500 dark:bg-zinc-500 h-1 rounded-full"
                              style={{ width: "48%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">🎨 Platform Selection</h3>
                      <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose where you'll publish your content</Label>
                      <div className="relative">
                        <Select
                          value={contentGeneratePromptDetails.contentType}
                          onValueChange={(v) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, contentType: v })}
                        >
                          <SelectTrigger className="!h-14 w-full border-dashed border-2 border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-400 dark:hover:border-zinc-600 transition-colors p-2 shadow-none rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Platforms.map((p) => (
                              <SelectItem
                                key={p.value}
                                value={p.value}
                                className="py-1"
                              >
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* Content length */}
                  <Card className="border-indigo-200 dark:border-zinc-700 border-2 border-dashed mb-8">
                    <CardHeader className="">
                      <CardTitle className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">👽 Content Length</CardTitle>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Choose the ideal length for your content</p>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={contentGeneratePromptDetails.contentLength}
                        onValueChange={(v: any) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, contentLength: v })}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {ContentLengths.map((length) => {
                          const Icon = length.icon;
                          const isSelected = contentGeneratePromptDetails.contentLength === length.value;
                          return (
                            <div
                              key={length.value}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className={`relative flex-1 rounded-xl border-2 p-4 cursor-pointer transition-all  ${
                                  isSelected ? `${length.border} ${length.bg} ` : "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-200 dark:hover:border-zinc-600"
                                }`}
                              >
                                <RadioGroupItem
                                  value={length.value}
                                  id={length.value}
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor={length.value}
                                  className="cursor-pointer flex justify-center items-center"
                                >
                                  <div className="flex flex-col items-center text-center gap-3">
                                    <Icon className={`h-6 w-6 ${isSelected ? length.color : "text-slate-400 dark:text-gray-500"}`} />
                                    <div>
                                      <div className={`font-medium ${isSelected ? length.color : "text-slate-700 dark:text-gray-300"}`}>{length.label}</div>
                                      <div className={`text-xs mt-1 ${isSelected ? `text-white/80 opacity-80` : "text-slate-500 dark:text-gray-400"}`}>{length.desc}</div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">🖼️ Attach Media</h3>
                    <div className="flex flex-wrap gap-4">
                      {uploadedMedia.map((m) => (
                        <div
                          key={m.id}
                          className="relative w-20 h-20 rounded-lg border overflow-hidden"
                        >
                          <img
                            src={m.url}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-0 right-0 h-5 w-5 rounded-none"
                            onClick={() => setUploadedMedia((prev) => prev.filter((i) => i.id !== m.id))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <label className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors">
                        {uploading ? <Loader2 className="h-5 w-5 animate-spin text-indigo-600" /> : <ImageIcon className="h-5 w-5 text-gray-400" />}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleGenerate("content generate")}
                    disabled={generating}
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  >
                    {generating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : "✨ Generate Content"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="enhance"
              className="m-0"
            >
              <div className="p-8 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Enhance Existing Content</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Improve, rewrite, or optimize your content with AI</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">🎨 Platform Selection</h3>
                      <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose where you'll publish your content</Label>
                      <div className="relative">
                        <Select
                          value={contentEnhancePromptDetails.contentType}
                          onValueChange={(e) => setContentEnhancePromptDetails({ ...contentEnhancePromptDetails, contentType: e })}
                        >
                          <SelectTrigger className="!h-14 w-full border-dashed border-2 border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-400 dark:hover:border-zinc-600 transition-colors p-2 shadow-none rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-slate-200 dark:border-zinc-700">
                            {Platforms.map((p) => (
                              <SelectItem
                                key={p.value}
                                value={p.value}
                                className="py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center text-sm`}>{p.label.split(" ")[0]}</div>
                                  <div className="text-left">
                                    <div className="font-medium text-sm -ml-0.5">{p.label}</div>
                                    <div className="text-xs text-slate-500">{p.desc}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">🔥 Existing Content</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Paste the old content which you try to enhance <span className="text-pink-500">*</span>
                        </Label>
                        <textarea
                          value={contentEnhancePromptDetails.previousContent}
                          onChange={(e) => setContentEnhancePromptDetails({ ...contentEnhancePromptDetails, previousContent: e.target.value })}
                          id="existing-content"
                          className="w-full border-2 border-dashed border-indigo-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-4 h-48 text-sm resize-none outline-none hover:border-indigo-400 dark:hover:border-zinc-600 transition-all"
                          placeholder="Paste tyour content here..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">482/1000 characters</div>
                          <div className="w-24 bg-gray-200 dark:bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-indigo-500 dark:bg-zinc-500 h-1 rounded-full"
                              style={{ width: "48%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <EnhancetypeSelector
                    contentEnhancePromptDetails={contentEnhancePromptDetails}
                    setContentEnhancePromptDetails={(d: any) => setContentEnhancePromptDetails(d)}
                  />
                  <Button
                    onClick={() => handleGenerate("content enhance")}
                    disabled={generating}
                    className="w-full h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  >
                    {generating ? "Enhancing..." : "✨ Enhance Content"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </section>
        </div>

        {/* Output box */}
        <div className=" min-[1150px]:w-[450px] w-full h-full min-h-[500px]  flex flex-col border-t-2 min-[1150px]:border-t-0">
          <nav className="flex items-center px-4 h-12 border-b-2 justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Live Preview</span>
            </div>
          </nav>

          <div className="min-[1150px]:h-[calc(100%-48px)] h-full  overflow-y-auto p-5 ">
            <TabsContent
              value="ideas"
              className="m-0 h-full"
            >
              {showIdeas ? (
                <div className="grid gap-4">
                  {result.map((idea: any, i: number) => (
                    <IdeaCard
                      key={i}
                      idea={idea}
                      onClickEvent={handleUseIdea}
                      platform={ideaGeneratePromptDetails.platform.join(", ")}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full w-full flex items-center flex-col justify-center">
                  <div className="text-[70px] md:-mt-10 mt-10">🔥</div>
                  <h1 className="font-bold text-lg">Answer Of The Prompt</h1>
                  <p className="text-sm text-zinc-600 dark:text-gray-400 text-center">
                    Get the pest output result by filling
                    <br /> proper information
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="create"
              className=" h-full rounded-xl"
            >
              {contentDraft ? (
                <div className="space-y-6">
                  <div
                    className="whitespace-pre-wrap rounded-xl border h-fit bg-amber-50 dark:bg-zinc-900 border-amber-200 p-5 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: contentDraft.content }}
                  />

                  <Card className="border-2 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wider text-zinc-500">Publication Control</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup
                        value={contentStatus}
                        onValueChange={(v) => setContentStatus(v)}
                        className="flex flex-wrap gap-4"
                      >
                        {["draft", "scheduled", "published"].map((s) => (
                          <div
                            key={s}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={s}
                              id={`status-${s}`}
                            />
                            <Label
                              htmlFor={`status-${s}`}
                              className="capitalize"
                            >
                              {s}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {contentStatus === "scheduled" && (
                        <Input
                          type="datetime-local"
                          value={scheduledAt}
                          onChange={(e) => setScheduledAt(e.target.value)}
                        />
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2 bg-indigo-600"
                        onClick={() => handleContentAction(contentStatus)}
                      >
                        {contentStatus === "published" ? (
                          <>
                            <Send className="h-4 w-4" /> Publish Now
                          </>
                        ) : contentStatus === "scheduled" ? (
                          <>
                            <Clock className="h-4 w-4" /> Schedule
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Save
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div className="h-full w-full flex items-center flex-col justify-center">
                  <div className="text-[70px] md:-mt-10 mt-10">🧠</div>
                  <h1 className="font-bold text-lg">Answer The Prompt</h1>
                  <p className="text-sm text-zinc-600 dark:text-gray-400 text-center">
                    Get the pest output result by filling
                    <br /> proper information
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="enhance"
              className="m-0"
            >
              {enhanceContent ? (
                <div
                  className="p-5 rounded-xl border bg-amber-50 dark:bg-zinc-900"
                  dangerouslySetInnerHTML={{ __html: enhanceContent }}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-50 py-20">
                  🪄 <p>Enhanced output will appear here</p>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
