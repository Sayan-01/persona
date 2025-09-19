"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ContentGenerator = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title or topic");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to generate content
      // In a real implementation, you would call your API endpoint here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock generated data
      setGeneratedTitle(`Ultimate Guide to ${title} in 2024`);
      setGeneratedContent(
        `In this comprehensive guide, we'll explore everything you need to know about ${title}. \n\n` +
        `## Introduction\n` +
        `Welcome to our deep dive into ${title}. Whether you're a beginner or an expert, this guide will provide valuable insights and practical tips.\n\n` +
        `## Why ${title} Matters\n` +
        `Understanding ${title} is crucial in today's digital landscape. It can help you achieve better results and stand out from the competition.\n\n` +
        `## Getting Started with ${title}\n` +
        `1. First steps to master ${title}\n` +
        `2. Essential tools and resources\n` +
        `3. Common mistakes to avoid\n\n` +
        `## Advanced Tips and Strategies\n` +
        `Take your ${title} skills to the next level with these expert strategies.\n\n` +
        `## Conclusion\n` +
        `By following this guide, you'll be well on your way to mastering ${title}. Start implementing these tips today!`
      );
      
      setGeneratedTags([
        title.toLowerCase(),
        `${title} tips`,
        `how to ${title}`,
        `${title} guide`,
        `best ${title} practices`,
        `${title} for beginners`,
        `2024 ${title} trends`,
        `learn ${title}`
      ]);
      
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Content Generator</h1>
        <p className="text-muted-foreground mb-8">
          Generate SEO-optimized content, titles, and tags for your videos or articles.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Topic or Title
            </label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="Enter a topic or title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={generateContent} 
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Additional Context (Optional)
            </label>
            <Textarea
              id="content"
              placeholder="Add any additional context or specific requirements..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="min-h-[120px]"
            />
          </div>

          {generatedTitle && (
            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Generated Title</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedTitle)}
                    className="text-sm gap-1"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-md border">
                  <p className="text-lg font-medium">{generatedTitle}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Generated Content</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent)}
                    className="text-sm gap-1"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-md border whitespace-pre-line">
                  {generatedContent}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Suggested Tags</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedTags.join(", "))}
                    className="text-sm gap-1"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-md border">
                  {generatedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-background text-sm rounded-full border flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => {
                          copyToClipboard(tag);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
