"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [persona, setPersona] = useState({
    tone: "",
    toneNotes: "",
    industry: "",
    targetAudience: [],
    contentGoals: [],
    sampleContent: "",
  })

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Save persona settings and navigate to dashboard
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full px-5 fixed top-0 z-10 bg-background">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">PersonaAI</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-24">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-8 flex justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Create Your AI Persona</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Let's set up your AI content assistant to match your brand voice
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Step {step} of 5</div>
          </div>

          {/* Step 1: Writing Tone */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Define Your Writing Tone</CardTitle>
                <CardDescription>How do you want your AI-generated content to sound?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup
                    value={persona.tone}
                    onValueChange={(value) => setPersona({ ...persona, tone: value })}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional" className="flex-1 cursor-pointer">
                        <div className="font-medium">Professional & Authoritative</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Formal, expert tone with industry-specific terminology
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value="conversational" id="conversational" />
                      <Label htmlFor="conversational" className="flex-1 cursor-pointer">
                        <div className="font-medium">Conversational & Engaging</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Natural, friendly tone that connects with readers
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value="educational" id="educational" />
                      <Label htmlFor="educational" className="flex-1 cursor-pointer">
                        <div className="font-medium">Educational & Informative</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Clear, instructional tone that explains complex topics simply
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value="persuasive" id="persuasive" />
                      <Label htmlFor="persuasive" className="flex-1 cursor-pointer">
                        <div className="font-medium">Persuasive & Compelling</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Convincing tone that drives action and engagement
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value="empathetic" id="empathetic" />
                      <Label htmlFor="empathetic" className="flex-1 cursor-pointer">
                        <div className="font-medium">Empathetic & Supportive</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Understanding and compassionate tone that builds trust
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="customToneNotes">Additional Tone Preferences (Optional)</Label>
                    <Textarea
                      id="customToneNotes"
                      placeholder="Add any specific tone preferences or examples of content you'd like to emulate..."
                      value={persona.toneNotes}
                      onChange={(e) => setPersona({ ...persona, toneNotes: e.target.value })}
                      className="h-20"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} disabled={!persona.tone}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Industry/Niche */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Your Industry</CardTitle>
                <CardDescription>This helps tailor content ideas and terminology for your field</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Primary Industry</Label>
                    <Select
                      value={persona.industry}
                      onValueChange={(value) => setPersona({ ...persona, industry: value })}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology & SaaS</SelectItem>
                        <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                        <SelectItem value="finance">Finance & Fintech</SelectItem>
                        <SelectItem value="healthcare">Healthcare & Wellness</SelectItem>
                        <SelectItem value="education">Education & E-learning</SelectItem>
                        <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                        <SelectItem value="consulting">Business Consulting</SelectItem>
                        <SelectItem value="creative">Creative & Design</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization (Optional)</Label>
                    <Input id="specialization" placeholder="e.g., AI Development, Content Marketing, etc." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Target Audience */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Define Your Target Audience</CardTitle>
                <CardDescription>Who are you creating content for?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Primary Audience Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select primary role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="executives">Executives (C-suite, Directors)</SelectItem>
                        <SelectItem value="managers">Managers & Team Leads</SelectItem>
                        <SelectItem value="professionals">Professionals & Individual Contributors</SelectItem>
                        <SelectItem value="small-business">Small Business Owners</SelectItem>
                        <SelectItem value="entrepreneurs">Entrepreneurs & Startups</SelectItem>
                        <SelectItem value="consumers">General Consumers</SelectItem>
                        <SelectItem value="students">Students & Academics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demographics">Demographics (Optional)</Label>
                    <Input id="demographics" placeholder="e.g., Age range, location, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests & Pain Points</Label>
                    <Textarea
                      id="interests"
                      placeholder="What does your audience care about? What problems are they trying to solve?"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
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
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="educate" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="educate" className="flex-1 cursor-pointer">
                        <div className="font-medium">Educate</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Share knowledge & expertise</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="inspire" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="inspire" className="flex-1 cursor-pointer">
                        <div className="font-medium">Inspire</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Motivate & encourage action</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="engage" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="engage" className="flex-1 cursor-pointer">
                        <div className="font-medium">Engage</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Start conversations & build community
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="sell" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="sell" className="flex-1 cursor-pointer">
                        <div className="font-medium">Convert</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Generate leads & drive sales</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="authority" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="authority" className="flex-1 cursor-pointer">
                        <div className="font-medium">Build Authority</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Establish thought leadership</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" id="entertain" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="entertain" className="flex-1 cursor-pointer">
                        <div className="font-medium">Entertain</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Delight & provide value</div>
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
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
                <CardDescription>
                  Provide examples of your existing content to help train your AI assistant
                </CardDescription>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      The more examples you provide, the better your AI will match your voice and style
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="gap-1.5">
                  Complete Setup <Check className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
