"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  legendItems,
  weightageRows,
  statCards,
  tierCards,
  phases,
  weeks,
  DAYS,
  BG,
  TC,
  type WeekCard,
} from "./data";

/* ─── Pillar color mapping for Tailwind inline styles ──────── */
const PILL_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  DSA:          { bg: "#E6F1FB", text: "#185FA5", dot: "#378ADD" },
  Aptitude:     { bg: "#FAEEDA", text: "#633806", dot: "#EF9F27" },
  "CS Core":    { bg: "#EEEDFE", text: "#3C3489", dot: "#7F77DD" },
  Project:      { bg: "#EAF3DE", text: "#3B6D11", dot: "#639922" },
  "System Design": { bg: "#FAECE7", text: "#993C1D", dot: "#D85A30" },
  "Mock/Comm":  { bg: "#FBEAF0", text: "#993556", dot: "#D4537E" },
};

export default function TimeTablePage() {
  const [activeWeek, setActiveWeek] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>("Mon");
  const detailRef = useRef<HTMLDivElement>(null);

  const handleWeekClick = useCallback(
    (weekId: string) => {
      if (activeWeek === weekId) {
        setActiveWeek(null);
        return;
      }
      setActiveWeek(weekId);
      setActiveDay("Mon");
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 0);
    },
    [activeWeek]
  );

  const weekDetail = activeWeek ? weeks[activeWeek] : null;
  const filteredCols = weekDetail
    ? weekDetail.cols.filter(
        (c) =>
          c.items[0] !== "Skip this week entirely" &&
          c.items[0] !== "Skip — not needed for fresher Tier 2 roles yet"
      )
    : [];
  const schedBlocks = weekDetail && activeDay ? weekDetail.days[activeDay] ?? [] : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 font-sans">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Optimized 8-Week Placement Roadmap
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          SDE · 9 hrs/day (9–1, 3–5, 7–10) · DSA-dominant · Tier 2 primary target
        </p>
      </div>

      {/* ── Legend ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {legendItems.map((item) => {
          const s = PILL_STYLES[item.label];
          return (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium"
              style={{ background: s?.bg, color: s?.text }}
            >
              <span
                className="h-[7px] w-[7px] rounded-full"
                style={{ background: s?.dot }}
              />
              {item.label}
            </span>
          );
        })}
      </div>

      {/* ── Weightage bars ────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Revised overall weightage
        </p>
        <div className="space-y-2">
          {weightageRows.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-medium text-foreground">
                {row.label}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${row.pct}%`, background: row.color }}
                />
              </div>
              <span className="w-8 text-right text-[11px] text-muted-foreground tabular-nums">
                {row.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {statCards.map((card) => (
          <div
            key={card.value}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              {card.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* ── Company tier strategy ─────────────────────────── */}
      <div className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Company tier strategy
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tierCards.map((tier) => (
            <div
              key={tier.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h4
                className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: tier.titleColor }}
              >
                {tier.title}
              </h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {tier.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{ background: tier.tagStyle.bg, color: tier.tagStyle.text }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {tier.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase grids ───────────────────────────────────── */}
      {phases.map((phase) => (
        <div key={phase.label} className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
            {phase.label}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {phase.weeks.map((wk: WeekCard) => {
              const isActive = activeWeek === wk.id;
              return (
                <div
                  key={wk.id}
                  onClick={() => handleWeekClick(wk.id)}
                  className={`group relative cursor-pointer rounded-xl border p-3.5 transition-all duration-200
                    ${
                      isActive
                        ? "border-primary ring-2 ring-primary/20 bg-card shadow-sm"
                        : "border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm"
                    }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {wk.num}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground leading-tight">
                    {wk.name}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {wk.bars.map((bar) => (
                      <div key={bar.label} className="flex items-center gap-2">
                        <span className="w-8 text-[10px] text-muted-foreground shrink-0">
                          {bar.label}
                        </span>
                        <div className="flex-1 h-[5px] rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: bar.width, background: bar.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── Detail panel ──────────────────────────────────── */}
      <div
        ref={detailRef}
        className={`overflow-hidden transition-all duration-300 ${
          activeWeek
            ? "max-h-[4000px] opacity-100 mb-8"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {weekDetail && (
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            {/* Header */}
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              {weekDetail.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground mb-6">
              {weekDetail.sub}
            </p>

            {/* Pillar columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCols.map((col) => (
                <div key={col.label}>
                  <h4
                    className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: col.color }}
                  >
                    {col.label}
                  </h4>
                  <div className="space-y-0">
                    {col.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 py-1.5 border-b border-border last:border-b-0"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: col.color }}
                        />
                        <span className="text-xs text-foreground leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Schedule section ─────────────────────────── */}
            <div className="border-t border-border pt-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                {weekDetail.mode === "all"
                  ? "Daily schedule — all pillars every day · 9–1 · 3–5 · 7–10"
                  : "Daily schedule — 3-pillar rotation · 9–1 · 3–5 · 7–10 · click a day"}
              </p>

              {/* Day tabs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`rounded-full px-3.5 py-1 text-[11px] font-medium border transition-all duration-150 cursor-pointer
                      ${
                        activeDay === day
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-muted-foreground/40 hover:text-foreground"
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Schedule blocks */}
              <div className="space-y-2">
                {schedBlocks.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 rounded-lg border border-border bg-background p-3 sm:p-3.5"
                  >
                    <span className="text-[11px] font-medium text-muted-foreground sm:min-w-[90px] shrink-0 tabular-nums">
                      {s.time}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span
                        className="inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        style={{
                          background: BG[s.pillar],
                          color: TC[s.pillar],
                        }}
                      >
                        {s.pillar}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {s.task}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Hint ──────────────────────────────────────────── */}
      <p className="text-center text-[11px] text-muted-foreground mt-2">
        ↑ Click a week card · then pick a day to see that day&apos;s exact schedule
      </p>
    </div>
  );
}
