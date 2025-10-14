import { useMemo, useState } from "react";
import { callAiApi } from "@/utils/helper";
import { Field } from "./growth-content-component";
import AIinput from "@/components/global/ai-input";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

type Platform = "linkedin" | "instagram" | "twitter" | "youtube" | "facebook";

function buildMarketingPrompt({
  campaignName,
  goal,
  platforms,
  durationDays,
  numberOfPosts,
}: {
  campaignName: string;
  goal: string;
  platforms: Platform[];
  durationDays: number;
  numberOfPosts: number;
}) {
  return `You are a senior marketing manager. For campaign: ${campaignName}
Goal: ${goal}
Platforms: ${platforms.join(",")}
Duration (days): ${durationDays}
Create ${numberOfPosts} post ideas / captions and adapt each into platform-specific variants (LinkedIn long, Instagram caption + hashtag set, Twitter/X short thread starter). Also provide a simple schedule with dates spaced evenly across the duration and suggested posting times for each platform.`;
}

function MarketingBrain({ marketingResult, setMarketingResult }: { marketingResult: any; setMarketingResult: (result: any) => void }) {
  const [campaignName, setCampaignName] = useState("");
  const [goal, setGoal] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [duration, setDuration] = useState(30);
  const [numberOfPosts, setNumberOfPosts] = useState(12);
  const [loading, setLoading] = useState(false);

  const removePlatform = (name: string) => {
    setPlatforms(platforms.filter((item) => item !== name));
  };

  async function onGenerate() {
    setLoading(true);
    const prompt = buildMarketingPrompt({ campaignName, goal, platforms, durationDays: duration, numberOfPosts });
    const res = await callAiApi(prompt);
    setMarketingResult(res);
    setLoading(false);
  }


  return (
    <div className="space-y-8">
      <Field
        title="🥎 Campaign name"
        description="Enter campaign name for the marketing content"
      >
        <AIinput
          value={campaignName}
          onChange={(e: any) => setCampaignName(e.target.value)}
          placeholder="Enter campaign name"
        />
      </Field>

      <div className="mt-3">
        <Field
          title="🎯 Goal of Campaign"
          description="Enter campaign goal for the marketing content"
        >
          <AIinput
            value={goal}
            onChange={(e: any) => setGoal(e.target.value)}
            placeholder="e.g. lead gen, awareness"
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field
          title="🎇 Platforms"
          description="Select platforms for the marketing content"
        >
          
          {/* Skills Tags Display */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[60px] p-3 border-2 border-dashed border-indigo-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
            {platforms.map((skill, index) => (
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
            {platforms.length === 0 && <div className="text-gray-500 dark:text-gray-400 text-sm italic">Select the platform you want to generate content for</div>}
          </div>

          {/* Suggested Skills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Suggestions:</span>
            {["LinkedIn", "Facebook", "Instagram", "Twitter", "blog"].map((suggestion: any) => (
              <button
                key={suggestion}
                onClick={() => {
                  if (!platforms.includes(suggestion)) {
                    setPlatforms([...platforms, suggestion]);
                  }
                }}
                className="text-xs bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md transition-colors"
                disabled={platforms.includes(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <Field
            title="Duration (days)"
            description="Enter duration for the marketing content"
          >
            <AIinput
              type="number"
              value={duration}
              onChange={(e: any) => setDuration(Number(e.target.value))}
              placeholder="30"
            />
          </Field>
        </div>
        <div>
          <Field
            title="Number of posts"
            description="Enter number of posts for the marketing content"
          >
            <AIinput
              type="number"
              value={numberOfPosts}
              onChange={(e: any) => setNumberOfPosts(Number(e.target.value))}
              placeholder="12"
            />
          </Field>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={onGenerate}
          disabled={loading}
          className="w-full hover:bg-gradient-to-r gap-2 h-10 rounded-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-zinc-800 dark:to-zinc-900 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-zinc-700/60 dark:hover:to-zinc-800/40 text-white shadow-lg  transition-all hover:duration-200 duration-200 "
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>✨ Generate</>
          )}
        </Button>
      </div>
    </div>
  );
}

export default MarketingBrain;
