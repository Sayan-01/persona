"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sparkles,
  RefreshCw,
  ThumbsUp,
  Copy,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  LightbulbIcon,
  Wand2,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  Info,
  Plus,
  Edit,
  MoveLeft,
} from "lucide-react";
import { ContentEditor } from "@/components/content-editor";
import { IdeaGenerateProps } from "../../../../../AI/IdeaGeneratePrompt";
import IdeaCard from "./idea-card";
import enhanceContentPrompt from "../../../../../AI/EnhanceContentPrompt";
import SocialShareButtons from "@/components/buttons/SocialShareButtons";
import { toast } from "sonner";
import { saveAsDraft, savePost } from "../../../../../server/post";
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
import { useContext } from "react";
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
  const [selectedIdea, setSelectedIdea] = useState<{ title: string; description: string; keyPoints: string[]; hashtags: string[]; platform: string } | null>(null);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [contentDraft, setContentDraft] = useState<{ id: string; content: string }>();
  const [contentStatus, setContentStatus] = useState("draft"); // draft, scheduled, published
  const [editorContent, setEditorContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [contentForEnhance, setContentForEnhance] = useState("");
  const [enhanceType, setEnhanceType] = useState("rewrite");
  const [enhanceContent, setEnhanceContent] = useState("");
  const [userPersona, setUserPersona] = useState<any>(null);
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

  const handleGenerate = async (type: string) => {
    switch (type) {
      case "idea generate":
        const ideaPrompt = IdeaGenerateProps({
          topic: ideaGeneratePromptDetails.topic,
          numberOfIdeas: ideaGeneratePromptDetails.numberOfIdeas,
          platform: ideaGeneratePromptDetails.platform,
          userPersona: userPersona,
        });
        setGenerating(true);
        try {
          const res = await fetch("/api/social-media-content-api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: ideaPrompt,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch AI template.");
          }
          const data = await res.json(); //json

          console.log(data);

          if (data) {
            decrementCredits(100);
            const dataObj = JSON.parse(data); //object
            setResult(dataObj);
            if (activeTab === "ideas") {
              setShowIdeas(true);
            } else if (activeTab === "enhance") {
              setShowEnhanced(true);
            }
          }

          setGenerating(false);
        } catch (error) {
          console.log("Error in idea generation", error);
          setGenerating(false);
        }
        break;

      case "content generate":
        setGenerating(true);
        try {
          const contentPrompt = generateContentPrompt({
            platform: contentGeneratePromptDetails.contentType,
            topic: ideaGeneratePromptDetails.topic || contentGeneratePromptDetails.topic,
            keyPoints: selectedIdea?.keyPoints || contentGeneratePromptDetails.keyPoints,
            hashtags: selectedIdea?.hashtags || contentGeneratePromptDetails.hashtags,
            contentLength: contentGeneratePromptDetails.contentLength,
            userPersona: userPersona,
          });

          const res = await fetch("/api/social-media-content-api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: contentPrompt,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to generate content.");
          }

          const data = await res.json();
          if (data) {
            const dataObj = JSON.parse(data);
            const content = dataObj.content;

            //Save Content
            const id = v4();
            setContentDraft({ id, content });
            await savePost({
              id,
              title: selectedIdea?.title || contentGeneratePromptDetails.topic,
              platform: contentGeneratePromptDetails.contentType,
              length: contentGeneratePromptDetails.contentLength,
              body: dataObj.content,
            });
            //Add Content in history
            await addInHistory(user.id, id, selectedIdea?.title || contentGeneratePromptDetails.topic);
            setHistory([{ contentId: id, contentTitle: selectedIdea?.title || contentGeneratePromptDetails.topic }, ...history]);
            setShowDraft(true);
          }

          setGenerating(false);
        } catch (error) {
          console.log(error);
          setGenerating(false);
        }
        break;

      case "content enhance":
        setGenerating(true);
        try {
          const contentPrompt = enhanceContentPrompt({
            platform: contentEnhancePromptDetails.contentType,
            previousContent: contentEnhancePromptDetails.previousContent,
            enhanceType: contentEnhancePromptDetails.enhanceType,
            userPersona: userPersona,
          });

          const res = await fetch("/api/social-media-content-api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: contentPrompt,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to generate content.");
          }

          const data = await res.json();
          if (data) {
            const dataObj = JSON.parse(data);

            setEnhanceContent(dataObj.content);
            setShowDraft(true);
          }

          setGenerating(false);
        } catch (error) {
          console.log(error);
          setGenerating(false);
        }
        break;
    }
  };

  const handleUseIdea = (idea: { title: string; description: string; keyPoints: string[]; hashtags: string[] }, platform: string) => {
    setSelectedIdea({ ...idea, platform });
    setActiveTab("create");
    // setGContentType(platform.toLowerCase().includes("linkedin") ? "linkedin" : "twitter");
  };

  const handleContentAction = async (contentStatus: string) => {
    if (!selectedIdea?.title || !selectedIdea?.platform) {
      toast("No content is present");
      return;
    }
    switch (contentStatus) {
      case "draft":
        if (!contentDraft?.id) {
          toast("No content is present");
          return;
        }
        const res = await saveAsDraft({ id: contentDraft?.id });
        if (res) toast("🟢 Draft saved successfully");
        break;
    }
  };

  // const handleContentSave = (content: string) => {
  //   setEditorContent(content);
  //   setContentDraft(content);
  //   setShowDraft(true);
  // };

  const handleEnhanceContent = () => {
    setShowEnhanced(true);
    // TODO: Implement AI enhancement logic
  };

  return (
    //1150 & 1316
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex min-[1150px]:flex-row flex-col gap-0 min-[1150px]:h-full"
      >
        {/* Input section */}
        <div className="flex-1 border-r h-full">
          <nav className="flex border-b min-[1316px]:justify-between justify-end h-12">
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
          
          <section className="min-[1150px]:h-[calc(100%-48px)] h-full overflow-scroll box">
            {/* Content Ideas Tab */}
            <TabsContent
              value="ideas"
              className=""
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
                    className="text-indigo-400 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-600 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>

                {/* Enhanced Title with Progress */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80">Generate Content Ideas</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80">Get AI-powered content ideas based on your persona and industry trends</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Enhanced Content Section */}
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
                    className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Ideas...
                      </>
                    ) : (
                      <>✨ Generate Ideas</>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Create Tab */}
            <TabsContent value="create">
              <div className="p-8 max-w-[750px] border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Generate Your Content</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Get AI-powered content ideas based on your persona and industry trends</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <InputWrapper
                    heading={"🔥 Topic or Idea"}
                    label={"Paste your content idea here to get AI-powered content"}
                  >
                    <AIinput
                      id="topic"
                      placeholder="e.g., 🤔 Stop Wasting Time! Automate Your Business with AI."
                      value={selectedIdea?.title}
                      onChange={(e: any) => setSelectedIdea((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                      className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-gray-500"
                    />
                  </InputWrapper>
                  {/* Key points */}
                  <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">🤖 Key Points (Optional)</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Paste the content description below <span className="text-pink-500">*</span>
                        </Label>
                        <textarea
                          id="keywords"
                          value={selectedIdea?.description}
                          onChange={(e) => setSelectedIdea((prev) => (prev ? { ...prev, content: e.target.value } : null))}
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
                          onValueChange={(e) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, contentType: e })}
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
                  {/* Content length */}
                  <Card className="border-indigo-200 dark:border-zinc-700 border-2 border-dashed mb-8">
                    <CardHeader className="">
                      <CardTitle className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">👽 Content Length</CardTitle>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Choose the ideal length for your content</p>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={contentGeneratePromptDetails.contentLength}
                        onValueChange={(value) => setContentGeneratePromptDetails({ ...contentGeneratePromptDetails, contentLength: value as "short" | "medium" | "long" })}
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
                </div>
                <div>
                  <Button
                    onClick={() => handleGenerate("content generate")}
                    disabled={generating}
                    className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Contents...
                      </>
                    ) : (
                      <>✨ Generate Contents</>
                    )}
                  </Button>
                </div>
                {contentStatus == "scheduled" && (
                  <div className="space-y-2 mt-8">
                    <Label htmlFor="schedule-date">Schedule Date & Time</Label>
                    <Input
                      type="datetime-local"
                      id="schedule-date"
                    />
                  </div>
                )}
                {/* <SocialShareButtons
                  content={contentDraft}
                  postId={undefined}
                /> */}

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Content Draft</CardTitle>
                    <CardDescription>Review and publish your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <Label>Content Status</Label>
                      <RadioGroup
                        value={contentStatus}
                        onValueChange={setContentStatus}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="draft"
                            id="s1"
                          />
                          <Label htmlFor="s1">Save as Draft</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="scheduled"
                            id="s2"
                          />
                          <Label htmlFor="s2">Schedule Post</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="published"
                            id="s3"
                          />
                          <Label htmlFor="s3">Publish Now</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowDraft(false)}
                    >
                      Back to Editor
                    </Button>
                    <Button
                      onClick={() => handleContentAction(contentStatus)}
                      className="gap-2"
                    >
                      {contentStatus === "draft" && (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Save to Drafts
                        </>
                      )}
                      {contentStatus === "scheduled" && (
                        <>
                          <Clock className="h-4 w-4" />
                          Schedule Post
                        </>
                      )}
                      {contentStatus === "published" && (
                        <>
                          <Send className="h-4 w-4" />
                          Publish Now
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="enhance">
              <div className="p-8 max-w-[750px] border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
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
                    setContentEnhancePromptDetails={setContentEnhancePromptDetails}
                  />
                </div>
                <Button
                  onClick={() => handleGenerate("content enhance")}
                  disabled={generating}
                  className="w-full gap-2 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700 dark:hover:to-zinc-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>✨ Enhance Content</>
                  )}
                </Button>
              </div>
            </TabsContent>
          </section>
        </div>
        {/* Output box */}
        <div className=" min-[1150px]:w-[450px] w-full h-full min-h-[500px] ">
          {/* Auto Save Badge */}
          <nav className="flex items-center px-4 h-12 border-b justify-between ">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 dark:bg-zinc-500 rounded-full"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">auto saved</span>
            </div>

            <div className="flex ml-4 space-x-3">
              <button className="text-amber-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="1"
                  ></circle>
                  <circle
                    cx="12"
                    cy="5"
                    r="1"
                  ></circle>
                  <circle
                    cx="12"
                    cy="19"
                    r="1"
                  ></circle>
                </svg>
              </button>
            </div>
          </nav>
          <div className="min-[1150px]:h-[calc(100%-48px)] h-full  overflow-y-auto p-5 ">
            <TabsContent
              value="ideas"
              className=" h-full rounded-xl"
            >
              {showIdeas ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Generated Ideas</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-1 pb-8">
                    {result?.map((idea: { title: string; description: string; keyPoints: string[]; hashtags: string[] }, index: number) => (
                      <IdeaCard
                        idea={idea}
                        onClickEvent={handleUseIdea}
                        platform={ideaGeneratePromptDetails.platform.join(" ,")}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center flex-col justify-center">
                  <div className="text-[70px] -mt-10">🔥</div>
                  <h1 className="font-bold text-lg">Answer The Prompt</h1>
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
                <>
                  <p
                    dangerouslySetInnerHTML={{ __html: contentDraft.content }}
                    className="whitespace-pre-wrap rounded-md border h-fit bg-amber-200 dark:bg-zinc-800 p-4 pb-5"
                  />
                  <div className="h-5" />
                  <div className="space-y-5">
                    {/* Share Your Content Section */}
                    <div className="bg-gray-50 dark:bg-zinc-800  border border-gray-200 dark:border-zinc-700 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Share Your Content</h4>

                      <div className="grid grid-cols-5 gap-1.5 mb-2">
                        {socialPlatforms.map((platform) => (
                          <button
                            key={platform.name}
                            className={cn(
                              "flex items-center justify-center p-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md",
                              platform.color,
                              platform.textColor
                            )}
                            title={platform.name}
                          >
                            <platform.icon className="w-3.5 h-3.5" />
                          </button>
                        ))}
                      </div>

                      <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-zinc-800 dark:to-zinc-900 text-white py-2 px-3 rounded-md font-medium hover:from-gray-900 hover:to-black dark:hover:from-zinc-700 dark:hover:to-zinc-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md text-xs">
                        Share to All Platforms
                      </button>
                      <ContentStatus
                        contentStatus={contentStatus}
                        setContentStatus={setContentStatus}
                        handleContentAction={handleContentAction}
                      />
                    </div>
                  </div>
                  <div className="h-5"></div>
                </>
              ) : (
                <div className="h-full w-full flex items-center flex-col justify-center">
                  <div className="text-[70px] -mt-10">🧠</div>
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
              className=" h-[calc(100%-48px)] rounded-xl"
            >
              <ContentEditor
                initialContent={enhanceContent}
                onSave={() => {}}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
