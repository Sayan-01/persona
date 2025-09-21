"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { contentGoals, industry, toneOptions } from "../onboarding-constants";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPersona } from "../../../../types";
import { upsertOnboardingUserPersona } from "../../../../server/user-profile";
import { toast } from "sonner";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function OnboardingComponent({ user }: { user: any }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [persona, setPersona] = useState<UserPersona>({
    tone: [],
    industry: "",
    brandDetails: "",
    targetAudience: "",
    usp: "",
    contentGoals: [] as string[],
    sampleContent: "",
  });

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (!user?.id) {
        toast("Authentication required", {
          description: "Please sign in to save your persona settings.",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await upsertOnboardingUserPersona({
          userId: user.id,
          ...persona,
        });
        toast("Success!", {
          description: "Your AI persona has been configured.",
        });
        router.refresh();
        router.push("/");
      } catch (error) {
        toast("Error", {
          description: "Failed to save your persona settings. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  function toggleTone(value: string) {
    setPersona((prev) => {
      const current = prev.tone;
      return {
        ...prev,
        tone: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  }

  return (
    <main className={`flex-1 py-24 p-5`}>
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Create Your AI Persona</h1>
            <p className="text-sm text-gray-500">Let's set up your AI content assistant to match your brand voice</p>
          </div>
          <div className="text-sm text-gray-500">Step {step} of 5</div>
        </div>

        {/* Step 1: Writing Tone */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Define Your Main Writing Tone</CardTitle>
              <CardDescription>How do you want your AI-generated content to sound?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toneOptions.map((tone) => (
                  <div
                    key={tone.value}
                    className="flex items-start space-x-3 rounded-md border p-4 hover:border-zinc-600 duration-200"
                  >
                    <Checkbox
                      id={tone.value}
                      checked={persona?.tone?.includes(tone?.value)}
                      onCheckedChange={() => toggleTone(tone?.value)}
                    />
                    <Label
                      htmlFor={tone.value}
                      className="flex-1 flex-col items-start flex cursor-pointer"
                    >
                      <div className="font-medium">{tone.title}</div>
                      <div className="text-sm text-gray-500">{tone.desc}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={persona.tone.length === 0}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Industry/Niche */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Beest describes your brand or personal identity</CardTitle>
              <CardDescription>This helps tailor content ideas and terminology for your field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry ">Primary Industry</Label>
                  <Select
                    value={persona.industry}
                    onValueChange={(value) => setPersona({ ...persona, industry: value })}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[316px]">
                      {industry.map((industry) => (
                        <SelectItem
                          key={industry.id}
                          value={industry.value}
                        >
                          {industry.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandDetails">Describe your brand or content type, in detail</Label>
                  <Input
                    value={persona.brandDetails}
                    onChange={(e) => setPersona({ ...persona, brandDetails: e.target.value })}
                    id="brandDetails"
                    placeholder="e.g., AI Development, Content Marketing, etc."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!persona.industry || !persona.brandDetails}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Target Audience */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Explane Your company unique selling points</CardTitle>
              <CardDescription>What makes your work stand out from the competition?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Age Group of your target audience</Label>
                  <Select
                    value={persona.targetAudience}
                    onValueChange={(value) => setPersona({ ...persona, targetAudience: value })}
                  >
                    <SelectTrigger id="targetAudience">
                      <SelectValue placeholder="Select age group of your target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-10">6 to 10</SelectItem>
                      <SelectItem value="13-17">13 to 17</SelectItem>
                      <SelectItem value="18-24">18 to 24</SelectItem>
                      <SelectItem value="25-34">25 to 34</SelectItem>
                      <SelectItem value="35-44">35 to 44</SelectItem>
                      <SelectItem value="45-54">45 to 54</SelectItem>
                      <SelectItem value="55-64">55 to 64</SelectItem>
                      <SelectItem value="65+">65+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usp">Describe what makes your brand or content unique</Label>
                  <Textarea
                    value={persona.usp}
                    onChange={(e) => setPersona({ ...persona, usp: e.target.value })}
                    id="usp"
                    placeholder="What does your audience care about? What problems are they trying to solve?"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!persona.usp}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Content Goals */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Set Your Content Goals</CardTitle>
              <CardDescription>What do you want to achieve with your content?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {contentGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center space-x-4 rounded-md border p-4 hover:border-zinc-600 duration-200 "
                    >
                      <input
                        type="checkbox"
                        id={goal.id}
                        className="h-4 w-4 rounded border-gray-300 mb-7"
                        checked={persona.contentGoals.includes(goal.id)}
                        onChange={(e) => {
                          const goals = e.target.checked ? [...persona.contentGoals, goal.id] : persona.contentGoals.filter((g) => g !== goal.id);
                          setPersona({ ...persona, contentGoals: goals });
                        }}
                      />
                      <Label
                        htmlFor={goal.id}
                        className="flex-1 cursor-pointer flex flex-col items-start"
                      >
                        <div className="font-medium w-max">{goal.label}</div>
                        <div className="text-sm text-gray-500 overflow-x-auto w-[285px]">{goal.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!persona.contentGoals.length}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Sample Content */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Add Sample Content (Optional)</CardTitle>
              <CardDescription>Provide examples of your existing content to help train your AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sample-content">Paste your best content examples here</Label>
                  <Textarea
                    id="sample-content"
                    placeholder="Paste LinkedIn posts, tweets, articles, or any content that represents your voice"
                    className="min-h-[200px]"
                    value={persona.sampleContent}
                    onChange={(e) => setPersona({ ...persona, sampleContent: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">The more examples you provide, the better your AI will match your voice and style</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="gap-1.5"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    Complete Setup <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
