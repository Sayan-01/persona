"use client";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ChevronLeft, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MarketingBrain from "../_components/MarketingBrain";
import EcommerceBrain from "../_components/EcommerceBrain";
import EdTechBrain from "../_components/EdTechBrain";
import StartupBrain from "../_components/StartupBrain";

type GenerateResult = {
  title?: string;
  text?: string;
  variants?: string[];
  meta?: string;
};

export function Field({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">{title}</h3>
        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{description}</Label>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function ResultCard({ title, content, extra }: { title?: string; content?: string; extra?: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <pre className="whitespace-pre-wrap text-sm text-slate-800">{content}</pre>
      {extra}
    </div>
  );
}

export default function GrowthContentComponent() {
  const [activeTab, setActiveTab] = useState<"ecommerce" | "edtech" | "startup" | "marketing">("ecommerce");
  const [ecommerceResult, setEcommerceResult] = useState<GenerateResult | null>(null);
  const [edtechResult, setEdtechResult] = useState<string | null>(null);
  const [startupResult, setStartupResult] = useState<string | null>(null);
  const [marketingResult, setMarketingResult] = useState<any>(null);
  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="w-full flex min-[1150px]:flex-row flex-col gap-0 min-[1150px]:h-full"
      >
        {/* Top nav like content-brain */}
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
                value="ecommerce"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🛍️ <span className="hidden min-[535px]:block">E-commerce</span>
              </TabsTrigger>
              <TabsTrigger
                value="edtech"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🎓 <span className="hidden min-[535px]:block">EdTech</span>
              </TabsTrigger>
              <TabsTrigger
                value="startup"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                🚀 <span className="hidden min-[535px]:block">Startup</span>
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className=" h-12 w-min border-0 border-b rounded-none border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 text-gray-500 px-4"
              >
                📣 <span className="hidden min-[535px]:block">Marketing</span>
              </TabsTrigger>
            </TabsList>
          </nav>

          {/* Tabs content area */}
          <section className="min-[1150px]:h-[calc(100%-48px)] h-full overflow-scroll box">
            <TabsContent value="ecommerce">
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
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">E-commerce Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Generate listings, ad copy and bulk product content</p>
                  </div>
                </div>
                <EcommerceBrain setEcommerceResult={setEcommerceResult} />
              </div>
            </TabsContent>

            <TabsContent value="edtech">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">EdTech Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Outlines, quizzes and study notes</p>
                  </div>
                </div>
                <EdTechBrain setEdtechResult={setEdtechResult} />
              </div>
            </TabsContent>

            <TabsContent value="startup">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Startup Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Pitch copy and cold outreach</p>
                  </div>
                </div>
                <StartupBrain setStartupResult={setStartupResult} />
              </div>
            </TabsContent>

            <TabsContent value="marketing">
              <div className="md:p-8 p-5 max-w-[750px] min-[1536px]:border-x-2 border-dashed mx-auto bg-white dark:bg-zinc-900 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="leading-none font-semibold text-2xl opacity-80 dark:text-white dark:opacity-90">Marketing Assistant</h1>
                    <p className="text-muted-foreground text-sm mt-1 opacity-80 dark:text-gray-400">Campaign ideas and schedules</p>
                  </div>
                </div>
                <MarketingBrain
                  marketingResult={marketingResult}
                  setMarketingResult={setMarketingResult}
                />
              </div>
            </TabsContent>
          </section>
        </div>

        {/* Output section */}
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
          <TabsContent value="ecommerce">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">Result</h3>
              {ecommerceResult ? (
                <ResultCard
                  title={ecommerceResult.title}
                  content={`${ecommerceResult.meta ? ecommerceResult.meta + "\n\n" : ""}${ecommerceResult.text || ""}`}
                  extra={<CopyButton text={`${ecommerceResult.meta || ""}\n\n${ecommerceResult.text || ""}`} />}
                />
              ) : (
                <div className="text-sm text-slate-600">No result yet — enter product details and click Generate.</div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="edtech">
            <div className="p-5">
              <h3 className="font-semibold mb-2">Output</h3>
              {edtechResult ? <ResultCard content={edtechResult} /> : <div className="text-sm text-slate-600">No output yet.</div>}
            </div>
          </TabsContent>
          <TabsContent value="startup">
            <div className="p-5">
              <h3 className="font-semibold mb-2">Pitch & Email</h3>
              {startupResult ? <ResultCard content={startupResult} /> : <div className="text-sm text-slate-600">No output yet.</div>}
            </div>
          </TabsContent>
          <TabsContent value="marketing">
            <div className="p-5">
              <h3 className="font-semibold mb-2">Campaign Output Preview</h3>
              {marketingResult ? (
                <div className="space-y-3">
                  <ResultCard
                    title="Top Post Idea"
                    content={marketingResult.topIdea || marketingResult.text || "No text"}
                  />
                  <div className="border rounded p-3 bg-slate-50">
                    <h4 className="font-semibold mb-2">Generated Schedule</h4>
                    <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(marketingResult.schedule || marketingResult.posts || marketingResult, null, 2)}</pre>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-600">No campaign generated yet. Provide inputs and click Generate.</div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-2 px-2 py-1 border rounded text-sm"
    >
      Copy
    </button>
  );
}
