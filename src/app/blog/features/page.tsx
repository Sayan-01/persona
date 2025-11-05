import React from "react";

const Page = () => {
  const features = [
    {
      title: "Persona Trainer",
      description:
        "Teach AI to understand your brand's unique tone, voice, and communication style. Train it on your specific industry knowledge, brand values, and audience preferences so that every piece of content it creates feels authentic, consistent, and perfectly aligned with your goals.",
      benefits: ["Define your unique brand voice and tone", "Train AI on industry-specific knowledge", "Ensure authentic and consistent content", "Align output with brand values and goals"],
    },
    {
      title: "AI Content Brain",
      description: "Your creative partner that never runs out of ideas. It helps you brainstorm fresh topics, trending themes, and innovative content strategies tailored to your niche.",
      benefits: ["Generate unlimited content ideas and topics", "Stay ahead with trending themes", "Get engaging headlines and titles", "Improve tone and content structure"],
    },
    {
      title: "Multi-Platform Writer",
      description: "Create high-quality content for multiple platforms with ease. Get intelligent, AI-powered recommendations for every channel with platform-specific optimization.",
      benefits: ["Optimized content for social media platforms", "Blog posts and newsletter formatting", "Ad copy and marketing materials", "Platform-specific tone adjustments"],
    },
    {
      title: "Content Calendar",
      description: "Organize your entire content strategy from one intuitive dashboard. Plan, schedule, and publish across multiple platforms effortlessly.",
      benefits: ["Visual planning and scheduling interface", "Multi-platform publishing support", "Team collaboration tools", "Never miss important deadlines"],
    },
    {
      title: "Brand Score System",
      description: "Track your brand's performance like never before. Analyze consistency, quality, and engagement across all your content.",
      benefits: ["Monitor content consistency and quality", "Track engagement metrics", "Get actionable insights and reports", "Refine strategy based on data"],
    },
    {
      title: "Quick Setup",
      description: "Get started in minutes with our simple, guided setup process. PersonaAI makes onboarding effortless with no complex configuration or technical hassle.",
      benefits: ["Guided onboarding in minutes", "Easy preference customization", "Simple goal definition", "Instant productivity from day one"],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative mx-auto max-w-5xl px-6 py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-500/40 bg-white/70 px-3 py-1 text-sm text-slate-600 backdrop-blur">
            <span>✨</span>
            <span>Powerful features for content creators</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Everything you need to build and scale your personal brand</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            From AI-powered content creation to intelligent scheduling, PersonaAI provides a complete toolkit to help you create consistent, high-quality content that resonates with your audience.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Back to Home
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-slate-900 transition hover:bg-slate-100"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-xl font-semibold tracking-tight">Core Features</h2>
        <p className="mt-2 text-slate-600">Six powerful tools designed to transform your content creation workflow.</p>

        <div className="mt-6 grid gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {index + 1}. {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="text-sm text-slate-600"
                  >
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why PersonaAI */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight">Why PersonaAI?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Authentic Voice</p>
            <p className="mt-1 text-sm text-slate-600">Unlike generic AI tools, PersonaAI learns your unique voice and style, ensuring every piece of content sounds authentically you.</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Save Time</p>
            <p className="mt-1 text-sm text-slate-600">Cut content creation time by 80% while maintaining quality. Focus on strategy while AI handles the heavy lifting.</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Stay Consistent</p>
            <p className="mt-1 text-sm text-slate-600">Never miss a posting schedule. Keep your audience engaged with regular, high-quality content across all platforms.</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">Data-Driven Growth</p>
            <p className="mt-1 text-sm text-slate-600">Track what works with the Brand Score System and continuously improve your content strategy based on real insights.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-2 text-slate-600">From setup to publishing, PersonaAI streamlines your entire workflow.</p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">1. Train Your AI</p>
            <p className="mt-1 text-sm text-slate-600">Set up your persona with tone, goals, and sample content. The AI learns your unique voice in minutes.</p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">2. Create Content</p>
            <p className="mt-1 text-sm text-slate-600">Generate ideas, write posts, and enhance drafts using AI-powered tools tailored to your brand.</p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="text-sm font-medium text-slate-900">3. Schedule & Grow</p>
            <p className="mt-1 text-sm text-slate-600">Plan your calendar, publish across platforms, and track performance to continuously improve.</p>
          </li>
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-xl border bg-slate-50 p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Ready to unlock these powerful features?</h3>
              <p className="mt-1 text-sm text-slate-600">Start creating content that truly represents your brand with PersonaAI's comprehensive toolkit.</p>
            </div>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
