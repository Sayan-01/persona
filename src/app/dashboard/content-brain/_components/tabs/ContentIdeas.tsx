import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import AiPrompt from "../../../../../../AI/IdeaGeneratePrompt";
import IdeaCard from "../ideaCard";

const ContentIdeas = ({
  userProfile,
  aiPersona,
  activeTab,
  setShowEnhanced,
  handleUseIdea,
}: {
  userProfile: any;
  aiPersona: any;
  activeTab: string;
  setShowEnhanced: (show: boolean) => void;
  handleUseIdea: (idea: { title: string; description: string; keyPoints: string[]; hashtags: string[] }, platform: string) => void;
}) => {
  const [generating, setGenerating] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [promptDetails, setPromptDetails] = useState({
    topic: "",
    numberOfIdeas: "3",
    platform: "",
  });

  const handleGenerate = async () => {
    const prompt = AiPrompt(promptDetails.topic, promptDetails.platform, promptDetails.numberOfIdeas, userProfile, aiPersona);
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-content-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI template.");
      }
      const data = await res.json();
      if (data) {
        const dataObj = JSON.parse(data);
        console.log(dataObj.contentIdeas);
        setResult(dataObj.contentIdeas);
        if (activeTab === "ideas") {
          setShowIdeas(true);
        } else if (activeTab === "enhance") {
          setShowEnhanced(true);
        }
      }

      setGenerating(false);
    } catch (error) {
      console.log(error);
      setGenerating(false);
    }
  };
  return (
    <>
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
            onClick={handleGenerate}
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
    </>
  );
};

export default ContentIdeas;
