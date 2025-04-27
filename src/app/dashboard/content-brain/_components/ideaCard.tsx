import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Copy, ThumbsUp } from "lucide-react";
import React from "react";

type Props = { title: string; description: string; keyPoints: string[]; hashtags: string[] };

const IdeaCard = ({ idea, onClickEvent, platform }: { idea: Props; onClickEvent: (idea: Props, platform: string) => void; platform: string }) => {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-900">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-purple-600">{platform}</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-base">{idea.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-500 dark:text-gray-400">
        {idea.description}
        <div className="mt-4">
          {idea.keyPoints.map((keyPoint: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <div className="text-sm text-purple-600 font-semibold">{index + 1}.</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{keyPoint}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {idea.hashtags.map((hashtag: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <div className="text-sm text-purple-600 font-semibold dark:text-purple-600">{hashtag}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <Copy className="h-4 w-4" />
            Save
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => onClickEvent(idea, platform)}
          >
            Use This Idea
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
