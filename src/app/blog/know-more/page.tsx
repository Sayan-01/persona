import React from "react";

import Link from "next/link";

const Page = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative mx-auto max-w-5xl px-6 py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-500/40 bg-white/70  px-3 py-1 text-sm text-slate-600 backdrop-blur">
            <span>💡</span>
            <span>Tips for using PersonaAI</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Build your personal brand with clarity and consistency
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            PersonaAI learns your voice and helps you ideate, write, and schedule
            content across platforms—so you stay consistent without sounding generic.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-slate-900 transition hover:bg-slate-100"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-xl font-semibold tracking-tight">Quick start</h2>
        <p className="mt-2 text-slate-600">
          Get value in minutes. Follow these steps to set up your brand brain.
        </p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">1. Build your Persona</p>
            <p className="mt-1 text-sm text-slate-600">
              Define goals, tone, niche, audience, and add sample content. This trains
              the AI on your voice.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">2. Ideate with Content Brain</p>
            <p className="mt-1 text-sm text-slate-600">
              Generate ideas aligned to your positioning. Select platform and idea
              count to explore directions.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">3. Create and Enhance</p>
            <p className="mt-1 text-sm text-slate-600">
              Turn ideas into posts. Provide topic and key points; refine length and
              tone. Use enhance to sharpen drafts.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">4. Schedule and Track</p>
            <p className="mt-1 text-sm text-slate-600">
              Save to drafts, schedule, or publish. Keep consistency via the calendar
              and monitor your brand score.
            </p>
          </li>
        </ol>
      </section>

      {/* What you can do */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight">What you can do</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">AI-Powered Content Brain</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Ideas generation and trend-aligned prompts</li>
              <li>• Content creation with tone and length controls</li>
              <li>• Enhancement for clarity, hooks, and CTAs</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Multi-Platform Writer</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• LinkedIn, X/Twitter, Blogs/Medium, Newsletters</li>
              <li>• YouTube support: titles, descriptions, outlines</li>
              <li>• SEO and keyword suggestions</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Calendar & Workflow</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Drafts, Scheduled, and Posted views</li>
              <li>• Reschedule and duplicate posts quickly</li>
              <li>• Track performance and consistency</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Personal Brand Focus</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Voice-trained generation—no generic output</li>
              <li>• Clear goals and audience targeting</li>
              <li>• Gamified brand score to stay on track</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best practices */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight">Best practices</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Train your voice</p>
            <p className="mt-1 text-sm text-slate-600">
              Add 5–10 sample posts and specify tone (e.g., analytical, friendly,
              direct). The more context, the better the output.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Start narrow, then scale</p>
            <p className="mt-1 text-sm text-slate-600">
              Pick one platform and publish 3×/week. Use the calendar to build
              momentum before expanding to more channels.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Structure your posts</p>
            <p className="mt-1 text-sm text-slate-600">
              Use strong hooks, 2–4 key points, and a clear CTA. The enhancer can
              help tighten intros and conclusions.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Measure what matters</p>
            <p className="mt-1 text-sm text-slate-600">
              Track consistency and tone match over vanity metrics. Improve inputs;
              the outputs will follow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-xl border bg-slate-50 p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Ready to create your next post?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Open Content Brain to generate ideas and draft content tailored to your voice.
              </p>
            </div>
            <Link
              href="/dashboard/content-brain"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Open Content Brain
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
