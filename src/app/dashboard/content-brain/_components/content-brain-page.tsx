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
import { Sparkles, RefreshCw, ThumbsUp, Copy, MessageSquare, ArrowRight, CheckCircle2, LightbulbIcon, Wand2, Clock, Send } from "lucide-react";
import { ContentEditor } from "@/components/content-editor";
import { IdeaGenerateProps } from "../../../../../AI/IdeaGeneratePrompt";
import generateContentPrompt from "../../../../../AI/ContentGeneratePrompt";
import { getUserAIPersona, getUserProfile } from "../../../../../server/user-profile";
import IdeaCard from "./ideaCard";
import enhanceContentPrompt from "../../../../../AI/EnhanceContentPrompt";
import SocialShareButtons from "@/components/buttons/SocialShareButtons";

export default function ContentBrainPage({ user }: { user: { id: string; email: string; name: string; isVarified: boolean; isAdmin: boolean } }) {
  const [activeTab, setActiveTab] = useState("ideas");
  const [contentType, setContentType] = useState("linkedin");
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [contentDraft, setContentDraft] = useState("");
  const [contentStatus, setContentStatus] = useState("draft"); // draft, scheduled, published
  const [selectedIdea, setSelectedIdea] = useState<{ title: string; description: string; keyPoints: string[]; hashtags: string[]; platform: string } | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [contentForEnhance, setContentForEnhance] = useState("");
  const [enhanceType, setEnhanceType] = useState("rewrite");
  const [promptDetails, setPromptDetails] = useState({
    topic: "",
    numberOfIdeas: "3",
    platform: "",
  });
  const [enhanceContent, setEnhanceContent] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userProfileDetails = await getUserProfile(user.id);
        setUserProfile(userProfileDetails);
        
      }
    };
    fetchProfile();
  }, [user]);

  const handleGenerate = async (type: string) => {
    switch (type) {
      case "idea generate":
        const ideaPrompt = IdeaGenerateProps({topic: promptDetails.topic, numberOfIdeas: promptDetails.numberOfIdeas, platform: promptDetails.platform, userProfile: userProfile.profile, aiPersona: userProfile.aiPersona});
        setGenerating(true);
        try {
          const res = await fetch("/api/generate-content-idea", {
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
          const data = await res.json();
          if (data) {
            const dataObj = JSON.parse(data);            
            setResult(dataObj.contentIdeas);
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
            platform: contentType,
            topic: promptDetails.topic,
            keyPoints: selectedIdea?.keyPoints || [],
            hashtags: selectedIdea?.hashtags || [],
            contentLength: "medium",
            userProfile: userProfile.profile,
            userPersona: userProfile.aiPersona,
          });
          

          const res = await fetch("/api/generate-content-idea", {
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
            setContentDraft(dataObj.content);
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
            platform: contentType,
            content: contentForEnhance,
            enhanceType: enhanceType,
            userProfile: userProfile.profile,
            userPersona: userProfile.aiPersona,
          });

          const res = await fetch("/api/generate-content-idea", {
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
    setContentType(platform.toLowerCase().includes("linkedin") ? "linkedin" : "twitter");
  };

  const handleContentAction = () => {
    // TO DO: implement content action logic
  };

  const handleContentSave = (content: string) => {
    setEditorContent(content);
    setContentDraft(content);
    setShowDraft(true);
  };

  const handleEnhanceContent = () => {
    setShowEnhanced(true);
    // TODO: Implement AI enhancement logic
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">AI Content Brain</h1>
        <p className="text-gray-500 dark:text-gray-400">Generate ideas, enhance content, and create engaging posts</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="ideas"
            className="gap-2"
          >
            <LightbulbIcon className="h-4 w-4" />
            Content Ideas
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Create Content
          </TabsTrigger>
          <TabsTrigger
            value="enhance"
            className="gap-2"
          >
            <Wand2 className="h-4 w-4" />
            Enhance Content
          </TabsTrigger>
        </TabsList>

        {/* Content Ideas Tab */}
        <TabsContent value="ideas">
          <Card>
            <CardHeader>
              <CardTitle>Generate Content Ideas</CardTitle>
              <CardDescription>Get AI-powered content ideas based on your persona and industry trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Theme (Optional)</Label>
                <Input
                  id="topic"
                  placeholder="e.g., leadership, productivity, industry trends"
                  value={promptDetails.topic}
                  onChange={(e) => setPromptDetails({ ...promptDetails, topic: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Number of Ideas</Label>
                <RadioGroup
                  defaultValue="10"
                  className="flex space-x-4"
                  value={promptDetails.numberOfIdeas}
                  onValueChange={(value) => setPromptDetails({ ...promptDetails, numberOfIdeas: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="3"
                      id="r1"
                    />
                    <Label htmlFor="r1">3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="5"
                      id="r1"
                    />
                    <Label htmlFor="r1">5</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="10"
                      id="r2"
                    />
                    <Label htmlFor="r2">10</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="20"
                      id="r3"
                    />
                    <Label htmlFor="r3">20</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Platform</Label>
                <RadioGroup
                  defaultValue="all"
                  className="flex space-x-4"
                  value={promptDetails.platform}
                  onValueChange={(value) => setPromptDetails({ ...promptDetails, platform: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="all"
                      id="p1"
                    />
                    <Label htmlFor="p1">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="linkedin"
                      id="p2"
                    />
                    <Label htmlFor="p2">LinkedIn</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="twitter"
                      id="p3"
                    />
                    <Label htmlFor="p3">Twitter</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleGenerate("idea generate")}
                disabled={generating}
                className="w-full gap-2"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          {showIdeas && (
            <div className="mt-8 space-y-4">
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
              <div className="grid gap-4 md:grid-cols-2">
                {result?.map((idea: { title: string; description: string; keyPoints: string[]; hashtags: string[] }, index: number) => (
                  <IdeaCard
                    idea={idea}
                    platform={promptDetails.platform}
                    key={index}
                    onClickEvent={handleUseIdea}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Create Content Tab */}
        <TabsContent value="create">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Generate platform-optimized content based on your persona</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={contentType}
                    onValueChange={setContentType}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                      <SelectItem value="linkedin-article">LinkedIn Article</SelectItem>
                      <SelectItem value="twitter">Twitter Post</SelectItem>
                      <SelectItem value="twitter-thread">Twitter Thread</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Idea</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., AI in customer service, leadership tips, industry news"
                    value={selectedIdea?.title || ""}
                    onChange={(e) => setSelectedIdea((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Key Points (Optional)</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Include these key points in the content"
                    className="min-h-[80px]"
                    value={selectedIdea?.description || ""}
                    onChange={(e) => setSelectedIdea((prev) => (prev ? { ...prev, content: e.target.value } : null))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content Length</Label>
                  <RadioGroup
                    defaultValue="medium"
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="short"
                        id="l1"
                      />
                      <Label htmlFor="l1">Short</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="medium"
                        id="l2"
                      />
                      <Label htmlFor="l2">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="long"
                        id="l3"
                      />
                      <Label htmlFor="l3">Long</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleGenerate("content generate")}
                  disabled={generating}
                  className="w-full gap-2"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating Contents...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Contents
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Add Content Editor */}
            {/* <ContentEditor
              initialContent={contentDraft as string}
              onSave={handleContentSave}
              onEnhance={handleEnhanceContent}
            /> */}

            {contentStatus === "scheduled" && (
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Schedule Date & Time</Label>
                <Input
                  type="datetime-local"
                  id="schedule-date"
                />
              </div>
            )}
            <SocialShareButtons content={contentDraft} postId={undefined} />

            <Card>
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
                <div className="whitespace-pre-wrap rounded-md border p-4">{contentDraft}</div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowDraft(false)}
                >
                  Back to Editor
                </Button>
                <Button
                  onClick={handleContentAction}
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

        {/* Enhance Content Tab */}
        <TabsContent value="enhance">
          <Card>
            <CardHeader>
              <CardTitle>Enhance Existing Content</CardTitle>
              <CardDescription>Improve, rewrite, or optimize your content with AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                    <SelectItem value="twitter">Twitter Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="existing-content">Paste Your Content</Label>
                <Textarea
                  value={contentForEnhance}
                  onChange={(e) => setContentForEnhance(e.target.value)}
                  id="existing-content"
                  placeholder="Paste the content you want to enhance"
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Enhancement Type</Label>
                <RadioGroup
                  defaultValue="rewrite"
                  className="grid grid-cols-2 gap-4"
                  value={enhanceType}
                  onValueChange={(value) => setEnhanceType(value)}
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem
                      value="rewrite"
                      id="e1"
                    />
                    <Label
                      htmlFor="e1"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Rewrite</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Completely rewrite while keeping the message</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem
                      value="tone"
                      id="e2"
                    />
                    <Label
                      htmlFor="e2"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Adjust Tone</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Make more professional, casual, or friendly</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem
                      value="expand"
                      id="e3"
                    />
                    <Label
                      htmlFor="e3"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Expand</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Add more details and examples</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem
                      value="shorten"
                      id="e4"
                    />
                    <Label
                      htmlFor="e4"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">Condense</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Make more concise and to the point</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleGenerate("content enhance")}
                disabled={generating}
                className="w-full gap-2"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Enhancing Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Enhance Content
                  </>
                )}
              </Button>
            </CardFooter>
            <ContentEditor
              initialContent={enhanceContent}
              onSave={() => {}}
            />
          </Card>

          {showEnhanced && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Enhanced Content</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
              <Card className="border-2 border-purple-200 dark:border-purple-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Enhanced Version</CardTitle>
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Improved
                    </div>
                  </div>
                  <CardDescription>The content has been rewritten to be more engaging</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                    <p className="text-sm">
                      The future of AI isn't just about automation, but augmentation. As we enter 2025, the most successful organizations will be those that leverage AI to enhance human capabilities,
                      not replace them.
                    </p>
                    <p className="mt-2 text-sm">
                      While many focus on cost-cutting through AI, the real competitive advantage comes from elevating human creativity and strategic thinking by offloading routine tasks.
                    </p>
                    <p className="mt-2 text-sm">What's your strategy for human-AI collaboration? Are you merely automating, or truly augmenting your team's capabilities?</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        #ArtificialIntelligence
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">#FutureOfWork</span>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                        #BusinessStrategy
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Button
                      variant="outline"
                      className="gap-1.5"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button className="gap-1.5">
                      Save to Drafts
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
