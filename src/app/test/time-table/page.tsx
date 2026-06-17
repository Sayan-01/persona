"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { getProgress, toggleProgress, togglePillarProgress } from "../../../../server/time-table";
import { toast } from "sonner";

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
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialProgress = async () => {
      try {
        const res = await getProgress();
        if (res.success && res.data) {
          const initialState: Record<string, boolean> = {};
          res.data.forEach((p) => {
            initialState[`${p.weekId}-${p.pillar}-${p.itemIndex}`] = p.completed;
          });
          setCheckedState(initialState);
        }
      } catch (err) {
        console.error("Error loading progress", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialProgress();
  }, []);

  const handleSubtopicToggle = async (weekId: string, pillar: string, itemIndex: number) => {
    const key = `${weekId}-${pillar}-${itemIndex}`;
    const newValue = !checkedState[key];

    // Optimistic update
    setCheckedState((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    try {
      const res = await toggleProgress(weekId, pillar, itemIndex, newValue);
      if (!res.success) {
        // Revert state
        setCheckedState((prev) => ({
          ...prev,
          [key]: !newValue,
        }));
        if (res.error === "Unauthorized") {
          toast.error("Please login to track your progress");
        } else {
          toast.error(res.error || "Failed to save progress");
        }
      }
    } catch (err) {
      // Revert state
      setCheckedState((prev) => ({
        ...prev,
        [key]: !newValue,
      }));
      toast.error("Failed to save progress");
    }
  };

  const handlePillarToggle = async (weekId: string, pillar: string, itemsCount: number, currentlyAllCompleted: boolean) => {
    const newValue = !currentlyAllCompleted;
    const indices = Array.from({ length: itemsCount }, (_, i) => i);
    
    // Optimistic update
    setCheckedState((prev) => {
      const next = { ...prev };
      indices.forEach((idx) => {
        next[`${weekId}-${pillar}-${idx}`] = newValue;
      });
      return next;
    });

    try {
      const res = await togglePillarProgress(weekId, pillar, indices, newValue);
      if (!res.success) {
        // Revert state
        setCheckedState((prev) => {
          const next = { ...prev };
          indices.forEach((idx) => {
            next[`${weekId}-${pillar}-${idx}`] = currentlyAllCompleted;
          });
          return next;
        });
        if (res.error === "Unauthorized") {
          toast.error("Please login to track your progress");
        } else {
          toast.error(res.error || "Failed to save progress");
        }
      } else {
        toast.success(`${pillar} marked as ${newValue ? "completed" : "incomplete"}`);
      }
    } catch (err) {
      // Revert state
      setCheckedState((prev) => {
        const next = { ...prev };
        indices.forEach((idx) => {
          next[`${weekId}-${pillar}-${idx}`] = currentlyAllCompleted;
        });
        return next;
      });
      toast.error("Failed to save progress");
    }
  };

  const getWeekProgress = useCallback((weekId: string) => {
    const detail = weeks[weekId];
    if (!detail) return { completed: 0, total: 0 };
    
    let total = 0;
    let completed = 0;
    
    detail.cols.forEach((col) => {
      if (
        col.items[0] !== "Skip this week entirely" &&
        col.items[0] !== "Skip — not needed for fresher Tier 2 roles yet"
      ) {
        col.items.forEach((_, idx) => {
          total++;
          if (checkedState[`${weekId}-${col.label}-${idx}`]) {
            completed++;
          }
        });
      }
    });
    
    return { completed, total };
  }, [checkedState]);

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
              const { completed, total } = getWeekProgress(wk.id);
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
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {wk.num}
                    </p>
                    {total > 0 && (
                      <span className="text-[10px] font-medium text-muted-foreground tabular-nums bg-muted/60 px-1.5 py-0.5 rounded">
                        {completed}/{total}
                      </span>
                    )}
                  </div>
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
            <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {weekDetail.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {weekDetail.sub}
                </p>
              </div>
              {(() => {
                const { completed, total } = getWeekProgress(activeWeek!);
                if (total === 0) return null;
                const pct = Math.round((completed / total) * 100);
                return (
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-semibold text-foreground bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                      {pct}% Completed ({completed}/{total})
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Pillar columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCols.map((col) => {
                const allCompleted = col.items.every((_, idx) => checkedState[`${activeWeek}-${col.label}-${idx}`]);
                const someCompleted = col.items.some((_, idx) => checkedState[`${activeWeek}-${col.label}-${idx}`]);

                return (
                  <div key={col.label} className="border border-border rounded-xl p-3 bg-card/50">
                    <div 
                      onClick={() => handlePillarToggle(activeWeek!, col.label, col.items.length, allCompleted)}
                      className="flex items-center justify-between mb-3 group/header cursor-pointer select-none"
                    >
                      <h4
                        className={`text-[11px] font-semibold uppercase tracking-wider transition-all duration-200
                          ${allCompleted ? "line-through opacity-50" : ""}`}
                        style={{ color: col.color }}
                      >
                        {col.label}
                      </h4>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-150
                          ${
                            allCompleted
                              ? "border-transparent text-white"
                              : someCompleted
                              ? "border-transparent text-white"
                              : "border-muted-foreground/30 opacity-20 group-hover/header:opacity-100"
                          }`}
                        style={{
                          backgroundColor: allCompleted ? col.color : someCompleted ? `${col.color}80` : "transparent",
                        }}
                      >
                        {allCompleted ? (
                          <svg
                            className="h-2.5 w-2.5 fill-none stroke-current stroke-[3]"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : someCompleted ? (
                          <span className="h-0.5 w-2 bg-white rounded-full" />
                        ) : (
                          <svg
                            className="h-2.5 w-2.5 fill-none stroke-current stroke-[3] text-muted-foreground"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {col.items.map((item, idx) => {
                        const isCompleted = checkedState[`${activeWeek}-${col.label}-${idx}`] || false;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleSubtopicToggle(activeWeek!, col.label, idx)}
                            className="flex items-start gap-2.5 py-2 border-b border-border last:border-b-0 cursor-pointer group/item select-none hover:bg-muted/40 px-1.5 rounded-lg transition-colors"
                          >
                            <div
                              className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-all duration-150
                                ${
                                  isCompleted
                                    ? "border-transparent text-white shadow-sm"
                                    : "border-muted-foreground/30 group-hover/item:border-muted-foreground/60"
                                }`}
                              style={{
                                backgroundColor: isCompleted ? col.color : "transparent",
                              }}
                            >
                              {isCompleted && (
                                <svg
                                  className="h-2 w-2 fill-none stroke-current stroke-[3]"
                                  viewBox="0 0 24 24"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`text-xs leading-relaxed transition-all duration-200
                                ${
                                  isCompleted
                                    ? "text-muted-foreground line-through opacity-50"
                                    : "text-foreground"
                                }`}
                            >
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
