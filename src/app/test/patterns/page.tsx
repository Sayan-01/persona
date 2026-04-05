'use client';

import React, { useState, useMemo } from 'react';
import { CATEGORIES, Category, Pattern, SubPattern } from './data';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export default function DSAPatternBook() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = useMemo(() => {
    let result = CATEGORIES;

    // Filter by category first
    if (activeCategory !== 'all') {
      result = result.filter(cat => cat.id === activeCategory);
    }

    // Filter by search query within patterns
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.map(cat => ({
        ...cat,
        patterns: cat.patterns.filter(pat => 
          pat.name.toLowerCase().includes(query) ||
          pat.subPatterns.some(sub => 
            sub.name.toLowerCase().includes(query) ||
            sub.signals.some(s => s.toLowerCase().includes(query)) ||
            sub.examples.some(ex => ex.toLowerCase().includes(query))
          )
        )
      })).filter(cat => cat.patterns.length > 0);
    }

    return result;
  }, [searchQuery, activeCategory]);

  const stats = {
    categories: CATEGORIES.length,
    subPatterns: CATEGORIES.reduce((acc, cat) => 
      acc + cat.patterns.reduce((pAcc, pat) => pAcc + pat.subPatterns.length, 0), 0
    ),
    questions: 156 // Static for now as per original
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-[#e8e8f0] font-['DM_Sans'] text-sm leading-relaxed antialiased ${poppins.className}`}>
      <style jsx global>{`
        :root {
          --bg: #0a0a0f;
          --surface: #111118;
          --surface2: #16161f;
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --text: #e8e8f0;
          --text2: #9090a8;
          --text3: #5a5a72;
          --accent: #7c6dfa;
          --accent2: #a594ff;
          --green: #3dd68c;
          --amber: #f5a623;
          --coral: #ff6b6b;
          --teal: #2dd4bf;
          --pink: #f472b6;
          --blue: #60a5fa;
        }

        @font-face {
          font-family: 'Syne';
          src: url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        }

        .syne { font-family: 'Syne', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        .c-purple { background: rgba(124,109,250,0.12); color: var(--accent2); }
        .c-green  { background: rgba(61,214,140,0.1);  color: var(--green); }
        .c-amber  { background: rgba(245,166,35,0.1);  color: var(--amber); }
        .c-coral  { background: rgba(255,107,107,0.1); color: var(--coral); }
        .c-teal   { background: rgba(45,212,191,0.1);  color: var(--teal); }
        .c-pink   { background: rgba(244,114,182,0.1); color: var(--pink); }
        .c-blue   { background: rgba(96,165,250,0.1);  color: var(--blue); }

        .s-arrays  { background: rgba(124,109,250,0.2); }
        .s-search  { background: rgba(45,212,191,0.2); }
        .s-linked  { background: rgba(61,214,140,0.2); }
        .s-trees   { background: rgba(245,166,35,0.2); }
        .s-graphs  { background: rgba(255,107,107,0.2); }
        .s-dp      { background: rgba(244,114,182,0.2); }
        .s-stack   { background: rgba(96,165,250,0.2); }
        .s-heap    { background: rgba(124,109,250,0.2); }
        .s-back    { background: rgba(45,212,191,0.2); }
        .s-math    { background: rgba(61,214,140,0.2); }
        .s-adv     { background: rgba(245,166,35,0.2); }
      `}</style>

      {/* HEADER */}
      <header className="sm:px-12 px-5 pt-[60px] pb-10 border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(124,109,250,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="mono text-[11px] text-[var(--accent2)] tracking-[.15em] uppercase mb-3.5">// interview preparation</div>
        <h1 className="syne text-[clamp(28px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] text-white">
          DSA <span className="text-[var(--accent2)]">Pattern</span> Book
        </h1>
        <p className="mt-3 text-[var(--text2)] text-[14px] sm:text-[15px] max-w-[560px]">
          Every core pattern and sub-pattern mapped to signals, templates, and real interview questions.
        </p>
        <div className="flex gap-x-8 gap-y-6 mt-7 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <span className="syne text-xl sm:text-2xl font-bold text-white">{stats.categories}</span>
            <span className="text-[10px] sm:text-xs text-[var(--text3)] uppercase tracking-[.08em]">Categories</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="syne text-xl sm:text-2xl font-bold text-white">{stats.subPatterns}</span>
            <span className="text-[10px] sm:text-xs text-[var(--text3)] uppercase tracking-[.08em]">Sub-patterns</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="syne text-xl sm:text-2xl font-bold text-white">{stats.questions}+</span>
            <span className="text-[10px] sm:text-xs text-[var(--text3)] uppercase tracking-[.08em]">Example Questions</span>
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 sm:px-12 px-5 py-5 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="relative flex-1 min-w-[200px] sm:max-w-[360px] w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)] text-sm">⌕</span>
          <input 
            type="search" 
            placeholder="Search pattern, signal, question…" 
            className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg py-2.5 pl-9 pr-3 text-[#e8e8f0] text-[13px] outline-none transition-colors focus:border-[var(--accent)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex overflow-x-auto box gap-1.5">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`text-xs px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all' 
                ? 'bg-[var(--accent)] border-[var(--accent)] text-white' 
                : 'bg-transparent text-[var(--text2)] hover:border-[var(--border2)] hover:text-[var(--text)]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white' 
                  : 'bg-transparent text-[var(--text2)] hover:border-[var(--border2)] hover:text-[var(--text)]'
              }`}
            >
              {cat.title.replace(' & ', '/').replace(' Manipulation', '')}
            </button>
          ))}
        </div>
      </div>

      <main className="sm:px-12 px-4 pb-[60px]">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            {/* SECTION HEAD */}
            <div className="flex items-center gap-3.5 py-8 pt-10">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${category.colorClass}`}>
                {category.icon}
              </div>
              <span className="syne text-lg font-bold text-white tracking-[-0.01em]">{category.title}</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* TABLE */}
            <div className="border border-[var(--border)] rounded-xl overflow-x-auto mb-6 bg-[var(--surface)]">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[var(--surface2)]">
                    <th className="mono text-[10px] font-medium tracking-[.1em] uppercase text-[var(--text3)] p-3 sm:p-4 text-left border-b border-[var(--border)] w-[12%]">Pattern</th>
                    <th className="mono text-[10px] font-medium tracking-[.1em] uppercase text-[var(--text3)] p-3 sm:p-4 text-left border-b border-[var(--border)] w-[14%]">Sub-pattern</th>
                    <th className="mono text-[10px] font-medium tracking-[.1em] uppercase text-[var(--text3)] p-3 sm:p-4 text-left border-b border-[var(--border)] w-[20%]">Signals</th>
                    <th className="mono text-[10px] font-medium tracking-[.1em] uppercase text-[var(--text3)] p-3 sm:p-4 text-left border-b border-[var(--border)] w-[30%]">How to handle</th>
                    <th className="mono text-[10px] font-medium tracking-[.1em] uppercase text-[var(--text3)] p-3 sm:p-4 text-left border-b border-[var(--border)] w-[24%]">Example questions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.patterns.map((pattern, pIdx) => (
                    <React.Fragment key={pIdx}>
                      {pattern.subPatterns.map((sub, sIdx) => {
                        const isLastSub = sIdx === pattern.subPatterns.length - 1;
                        return (
                          <tr key={sub.name} className="transition-colors hover:bg-white/[0.02] group">
                            {sIdx === 0 && (
                              <td 
                                rowSpan={pattern.subPatterns.length} 
                                className="p-3 sm:p-4 align-middle border-r border-b border-[var(--border)] bg-[var(--bg)]"
                              >
                                <span className="syne text-[13px] font-extrabold text-[var(--accent2)] block text-center leading-tight">
                                  {pattern.name}
                                </span>
                              </td>
                            )}
                            <td className="p-3 sm:p-4 border-r border-b border-[var(--border)]">
                              <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md leading-[1.4] ${sub.color}`}>
                                {sub.name}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4 border-b border-[var(--border)]">
                              <div className="flex flex-wrap gap-1.5">
                                {sub.signals.map((sig, sigIdx) => (
                                  <span key={sigIdx} className="mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text3)] bg-[var(--surface2)] whitespace-nowrap">
                                    "{sig}"
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 border-b border-[var(--border)]">
                              <div className="text-[12.5px] leading-[1.65] text-[var(--text2)]">
                                {sub.howTo.split(/(<b>.*?<\/b>|<code>.*?<\/code>)/).map((part, partIdx) => {
                                  if (part.startsWith('<b>')) {
                                    return <b key={partIdx} className="text-[var(--text)] font-semibold">{part.replace(/<\/?b>/g, '')}</b>;
                                  }
                                  if (part.startsWith('<code>')) {
                                    return <code key={partIdx} className="mono text-[11px] bg-white/5 px-1.5 py-0.5 rounded text-[var(--accent2)]">{part.replace(/<\/?code>/g, '')}</code>;
                                  }
                                  return part;
                                })}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 border-b border-[var(--border)]">
                              <ul className="space-y-1">
                                {sub.examples.map((ex, exIdx) => (
                                  <li key={exIdx} className="text-[12px] text-[var(--text2)] leading-snug flex gap-2">
                                    <span className="mono text-[10px] text-[var(--text3)] opacity-60 min-w-[16px] pt-[1px]">
                                      {['①', '②', '③', '④', '⑤'][exIdx] || (exIdx + 1)}
                                    </span>
                                    {ex}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </main>

      <footer className="text-center py-6 border-t border-[var(--border)] text-[var(--text3)] text-xs">
        Built for interview prep &nbsp;·&nbsp; <span className="text-[var(--accent2)]">{stats.subPatterns} sub-patterns</span> &nbsp;·&nbsp; <span className="text-[var(--accent2)]">{stats.questions}+ questions</span>
      </footer>
    </div>
  );
}