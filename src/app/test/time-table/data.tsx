// ─── Color maps ──────────────────────────────────────────────
export const COLOR: Record<string, string> = {
  DSA: '#378ADD',
  Apti: '#EF9F27',
  CS: '#7F77DD',
  Project: '#639922',
  'Sys Design': '#D85A30',
  'Mock/Comm': '#D4537E',
  Apply: '#D4537E',
  Resume: '#639922',
};

export const BG: Record<string, string> = {
  DSA: '#E6F1FB',
  Apti: '#FAEEDA',
  CS: '#EEEDFE',
  Project: '#EAF3DE',
  'Sys Design': '#FAECE7',
  'Mock/Comm': '#FBEAF0',
  Apply: '#FBEAF0',
  Resume: '#EAF3DE',
};

export const TC: Record<string, string> = {
  DSA: '#185FA5',
  Apti: '#633806',
  CS: '#3C3489',
  Project: '#3B6D11',
  'Sys Design': '#993C1D',
  'Mock/Comm': '#993556',
  Apply: '#993556',
  Resume: '#3B6D11',
};

// ─── Legend pills ────────────────────────────────────────────
export interface LegendItem {
  label: string;
  pillClass: string;
  dotClass: string;
}

export const legendItems: LegendItem[] = [
  { label: 'DSA', pillClass: 'p-dsa', dotClass: 'd-dsa' },
  { label: 'Aptitude', pillClass: 'p-apti', dotClass: 'd-apti' },
  { label: 'CS Core', pillClass: 'p-cs', dotClass: 'd-cs' },
  { label: 'Project', pillClass: 'p-proj', dotClass: 'd-proj' },
  { label: 'System Design', pillClass: 'p-sys', dotClass: 'd-sys' },
  { label: 'Mock/Comm', pillClass: 'p-mock', dotClass: 'd-mock' },
];

// ─── Weightage bars ──────────────────────────────────────────
export interface WeightageRow {
  label: string;
  pct: number;
  color: string;
}

export const weightageRows: WeightageRow[] = [
  { label: 'DSA', pct: 47, color: '#378ADD' },
  { label: 'CS Core', pct: 20, color: '#7F77DD' },
  { label: 'Aptitude', pct: 12, color: '#EF9F27' },
  { label: 'Project / Apply', pct: 11, color: '#639922' },
  { label: 'Mock / Comm', pct: 7, color: '#D4537E' },
  { label: 'System Design', pct: 3, color: '#D85A30' },
];

// ─── Stat cards ──────────────────────────────────────────────
export interface StatCard {
  value: string;
  label: string;
}

export const statCards: StatCard[] = [
  { value: '350+ | 1700', label: 'LC solved · LC rating — strong base' },
  { value: '40% medium', label: 'No-hint solve rate → target 70%+' },
  { value: '8.0 CGPA', label: '3 deployed projects · 1 mo internship' },
];

// ─── Tier cards ──────────────────────────────────────────────
export interface TierCard {
  title: string;
  titleColor: string;
  tags: string[];
  tagStyle: { bg: string; text: string };
  note: string;
}

export const tierCards: TierCard[] = [
  {
    title: 'Tier 1 — Stretch',
    titleColor: '#185FA5',
    tags: ['Google', 'Microsoft', 'Atlassian'],
    tagStyle: { bg: '#E6F1FB', text: '#185FA5' },
    note: 'Hard DSA + system design. Apply Week 6+. Referral mandatory.',
  },
  {
    title: 'Tier 2 — Primary ★',
    titleColor: '#3B6D11',
    tags: ['Juspay', 'Razorpay', 'Zepto', 'Zomato', 'Cred', 'Groww'],
    tagStyle: { bg: '#EAF3DE', text: '#3B6D11' },
    note: 'Strong DSA + project depth + CS core. Apply Week 4+.',
  },
  {
    title: 'Tier 3 — Safety',
    titleColor: '#633806',
    tags: ['Juspay (campus)', 'Deloitte', 'Accenture', 'TCS'],
    tagStyle: { bg: '#FAEEDA', text: '#633806' },
    note: 'Apti + moderate DSA. On-campus from Aug 9. Auto-secured by Week 6.',
  },
];

// ─── Bar definitions per week card ──────────────────────────
export interface BarDef {
  label: string;
  width: string;
  color: string;
}

// ─── Week detail types ───────────────────────────────────────
export interface ColDef {
  label: string;
  color: string;
  items: string[];
}

export interface ScheduleBlock {
  time: string;
  pillar: string;
  task: string;
}

export interface WeekDetail {
  title: string;
  sub: string;
  cols: ColDef[];
  mode: 'rotate' | 'all';
  days: Record<string, ScheduleBlock[]>;
}

// ─── Week card type ──────────────────────────────────────────
export interface WeekCard {
  id: string;
  num: string;
  name: string;
  bars: BarDef[];
}

export interface Phase {
  label: string;
  weeks: WeekCard[];
}

// ─── Phases & week cards ─────────────────────────────────────
export const phases: Phase[] = [
  {
    label: 'Phase 1 — Pattern Reinforcement (Week 1–4)',
    weeks: [
      {
        id: 'w1',
        num: 'WEEK 1',
        name: 'Pattern Reinforcement I',
        bars: [
          { label: 'DSA', width: '90%', color: '#378ADD' },
          { label: 'Apti', width: '20%', color: '#EF9F27' },
          { label: 'CS', width: '30%', color: '#7F77DD' },
          { label: 'Proj', width: '10%', color: '#639922' },
          { label: 'Sys', width: '0%', color: '#D85A30' },
          { label: 'Mock', width: '10%', color: '#D4537E' },
        ],
      },
      {
        id: 'w2',
        num: 'WEEK 2',
        name: 'Pattern Reinforcement II',
        bars: [
          { label: 'DSA', width: '85%', color: '#378ADD' },
          { label: 'Apti', width: '20%', color: '#EF9F27' },
          { label: 'CS', width: '40%', color: '#7F77DD' },
          { label: 'Proj', width: '10%', color: '#639922' },
          { label: 'Sys', width: '0%', color: '#D85A30' },
          { label: 'Mock', width: '15%', color: '#D4537E' },
        ],
      },
      {
        id: 'w3',
        num: 'WEEK 3',
        name: 'Project Upgrade + DSA',
        bars: [
          { label: 'DSA', width: '60%', color: '#378ADD' },
          { label: 'Apti', width: '15%', color: '#EF9F27' },
          { label: 'CS', width: '30%', color: '#7F77DD' },
          { label: 'Proj', width: '80%', color: '#639922' },
          { label: 'Sys', width: '15%', color: '#D85A30' },
          { label: 'Mock', width: '10%', color: '#D4537E' },
        ],
      },
      {
        id: 'w4',
        num: 'WEEK 4',
        name: 'CS Core Deep + Resume',
        bars: [
          { label: 'DSA', width: '55%', color: '#378ADD' },
          { label: 'Apti', width: '20%', color: '#EF9F27' },
          { label: 'CS', width: '85%', color: '#7F77DD' },
          { label: 'Proj', width: '20%', color: '#639922' },
          { label: 'Sys', width: '10%', color: '#D85A30' },
          { label: 'Mock', width: '20%', color: '#D4537E' },
        ],
      },
    ],
  },
  {
    label: 'Phase 2 — Apply & Simulate (Week 5–8)',
    weeks: [
      {
        id: 'w5',
        num: 'WEEK 5',
        name: 'Mock Interviews + Apply',
        bars: [
          { label: 'DSA', width: '60%', color: '#378ADD' },
          { label: 'Apti', width: '25%', color: '#EF9F27' },
          { label: 'CS', width: '55%', color: '#7F77DD' },
          { label: 'Proj', width: '15%', color: '#639922' },
          { label: 'Sys', width: '20%', color: '#D85A30' },
          { label: 'Mock', width: '60%', color: '#D4537E' },
        ],
      },
      {
        id: 'w6',
        num: 'WEEK 6',
        name: 'Full Grind + Applications',
        bars: [
          { label: 'DSA', width: '55%', color: '#378ADD' },
          { label: 'Apti', width: '30%', color: '#EF9F27' },
          { label: 'CS', width: '50%', color: '#7F77DD' },
          { label: 'Proj', width: '20%', color: '#639922' },
          { label: 'Sys', width: '20%', color: '#D85A30' },
          { label: 'Mock', width: '70%', color: '#D4537E' },
        ],
      },
      {
        id: 'w7',
        num: 'WEEK 7',
        name: 'Interview Simulation',
        bars: [
          { label: 'DSA', width: '50%', color: '#378ADD' },
          { label: 'Apti', width: '30%', color: '#EF9F27' },
          { label: 'CS', width: '55%', color: '#7F77DD' },
          { label: 'Proj', width: '10%', color: '#639922' },
          { label: 'Sys', width: '25%', color: '#D85A30' },
          { label: 'Mock', width: '85%', color: '#D4537E' },
        ],
      },
      {
        id: 'w8',
        num: 'WEEK 8',
        name: 'D-Day Readiness',
        bars: [
          { label: 'DSA', width: '45%', color: '#378ADD' },
          { label: 'Apti', width: '35%', color: '#EF9F27' },
          { label: 'CS', width: '55%', color: '#7F77DD' },
          { label: 'Proj', width: '10%', color: '#639922' },
          { label: 'Sys', width: '20%', color: '#D85A30' },
          { label: 'Mock', width: '90%', color: '#D4537E' },
        ],
      },
    ],
  },
];

// ─── Week details (keyed by id) ──────────────────────────────
export const weeks: Record<string, WeekDetail> = {
  w1: {
    title: 'Week 1 — Pattern Reinforcement I',
    sub: 'Goal: push medium no-hint solve rate from 40% → 55%. No new topics. Fix patterns.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['Daily: 2 fresh mediums + 1 re-solve old problem timed', 'Focus patterns: arrays, strings, two-pointer, sliding window', 'Identify wrong pattern triggers — log every mistake', 'No editorials until 35 min of genuine attempt'] },
      { label: 'CS Core', color: '#7F77DD', items: ['OS: processes, threads, scheduling — 1 hr/day reading', 'Cover: PCB, context switch, paging, segmentation', 'Use GateSmash / InterviewBit OS notes', 'Goal: finish OS theory this week'] },
      { label: 'Aptitude', color: '#EF9F27', items: ['Light — 20 Qs/day, quant basics only', 'Number system, LCM/HCF, percentages', 'IndiaBix free practice — no pressure yet'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['Record yourself solving 1 problem aloud/day', 'Fix: thinking aloud, variable naming, communication'] },
      { label: 'Project', color: '#639922', items: ['No changes — just know your projects well this week'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Skip this week entirely'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Pattern drill: 2 fresh medium array/string problems — no hints, strict 35 min each, think aloud' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: processes vs threads, PCB, context switching — read + write short notes' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Re-solve 2 old problems you got wrong earlier — identify why you were wrong' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Two-pointer pattern: 3 problems, increasing difficulty — log pattern triggers' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs quant basics — number system, LCM/HCF, timed 20 min' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Sliding window: 2 fresh mediums — no hints, 35 min each, verbalize every step' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: memory management — paging, segmentation, virtual memory' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Re-solve 2 problems from Week 1 mistake log — timed, no looking' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Binary search pattern: 3 problems — classical + rotated + on-answer variants' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Record: solve 1 medium aloud, review your own explanation' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'HashMap/HashSet patterns: 2 fresh mediums — no hints, 35 min each' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: scheduling algorithms — FCFS, SJF, Round Robin, Priority (write examples)' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Mistake review session: re-read all this week\'s wrong approaches, fix mental model' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Stack/Queue patterns: 3 problems — monotonic stack focus' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — percentages, ratio, time-speed-distance, timed 20 min' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Linked list patterns: 2 mediums — slow/fast pointer, reverse, merge' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: deadlock — conditions, prevention, Banker\'s algorithm (understand, don\'t memorize)' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Re-solve 2 problems from earlier — timed, no notes, explain after' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Tree traversal patterns: 3 problems — BFS level-order + DFS variants' },
        { time: '9:00 – 10:00', pillar: 'CS', task: 'OS quick revision: 10 verbal Q&A — answer each in under 90 sec' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Graph BFS/DFS patterns: 2 mediums — grid problems + standard graph' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: inter-process communication — pipes, semaphores, mutex, condition variables' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Timed set: 3 mediums in 75 min — simulate OA pressure, no hints' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Heap patterns: 2 problems — top-K, merge K sorted lists' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — logical reasoning: blood relations, seating arrangement' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems in 90 min — mixed patterns, no hints, track solve rate' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Deep review of OA: for each unsolved — identify pattern, re-solve clean' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'OS full revision: all topics covered this week — write 1-page summary' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Weak pattern from this week: 3 focused problems — target the gap' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Record: "introduce yourself" + explain 1 project cold — under 2 min each' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — attempt all, no pressure, track which patterns you missed' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve contest problems — understand editorial, re-implement clean' },
        { time: '3:00 – 4:00', pillar: 'CS', task: 'Week 1 OS notes revision — read your own summary' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Pattern recognition drill: given a problem, identify pattern in under 2 min — 5 problems' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: 'Light: 15 mixed Qs — no stress, maintain habit only' },
      ],
    },
  },

  w2: {
    title: 'Week 2 — Pattern Reinforcement II',
    sub: 'Goal: push medium no-hint rate to 65%+. Add DP + advanced graphs. Start DBMS.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['DP patterns: 1D, 2D, interval, knapsack variants', 'Advanced graphs: Dijkstra, topo sort, union-find', 'Daily: 2 fresh mediums + 1 hard attempt + 1 re-solve', 'Timed OA simulation every Saturday'] },
      { label: 'CS Core', color: '#7F77DD', items: ['DBMS: ER diagrams, normalization (1NF–3NF), indexing', 'Transactions, ACID, isolation levels — write examples', 'SQL: joins, subqueries, group by, window functions', 'CN: OSI model, TCP/UDP, HTTP/HTTPS, DNS basics'] },
      { label: 'Aptitude', color: '#EF9F27', items: ['Continue 20 Qs/day — add logical reasoning rotation', 'No pressure — Tier 3 safety net only'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['1 Pramp mock this week — just to get comfortable', 'Record problem walk-through 2x this week'] },
      { label: 'Project', color: '#639922', items: ['No changes — finalizing Week 3 plan only'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Skip — not needed for fresher Tier 2 roles yet'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'DP: 1D patterns — climbing stairs, house robber, min cost — 2 mediums, no hints' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS: ER diagrams, normalization 1NF→3NF — read + draw examples' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Re-solve 2 hard problems from W1 OA — timed, explain complexity' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP: 2D patterns — unique paths, edit distance — 2 problems' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — time & work, profit & loss, timed 20 min' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'DP: interval — matrix chain, balloon burst — 1 medium + 1 hard attempt' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS: indexing (B-tree, hash), query optimization, explain plan' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Graph: Dijkstra — implement from scratch, 2 variants' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP: knapsack variants — 0/1, unbounded, subset sum — 3 problems' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Pramp peer mock session — record feedback, review after' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Graph: topological sort — Kahn\'s + DFS approach, 2 application problems' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS: transactions, ACID properties, isolation levels (read committed, serializable)' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Mistake review: re-solve all DP problems you couldn\'t do in W2 so far' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP: LIS, LCS — 2 problems + 1 hard variant (Russian dolls)' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — logical: syllogisms, direction sense, timed 20 min' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Graph: union-find — connected components, MST (Kruskal), 2 problems' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CN: OSI model layers — what happens when you type a URL, TCP handshake' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Timed drill: 2 mediums in 45 min — one graph, one DP, simulate interview' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP: coin change variants, target sum — 3 problems including 1 hard' },
        { time: '9:00 – 10:00', pillar: 'CS', task: 'DBMS verbal Q&A: 10 common interview Qs — answer aloud, timed' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Graph: Bellman-Ford, cycle detection (directed + undirected) — 2 problems' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CN: TCP vs UDP, HTTP methods, status codes, HTTPS (TLS handshake), DNS' },
        { time: '3:00 – 5:00', pillar: 'DSA', task: 'Re-solve: pick your 3 weakest problems from W1+W2 — clean solve, explain aloud' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Backtracking: subsets, permutations, combination sum — 3 problems' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — permutation & combination, probability, timed' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems in 90 min — mixed, no hints, track solve rate vs W1' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA deep review: every unsolved problem — re-solve clean after understanding pattern' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'DBMS + CN combined: write 1-page summary each, 10 verbal Q&A' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'SQL practice: 10 queries — joins, subqueries, group by, window functions' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Record: walk through 1 project end-to-end in 3 min — cold, no notes' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — aim to solve 3+, note which patterns you still freeze on' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve + pattern log update: list your top 5 remaining weak patterns' },
        { time: '3:00 – 4:00', pillar: 'CS', task: 'CN revision: your own notes — TCP, HTTP, DNS, status codes' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Pattern recognition speed drill: 6 problems — identify pattern only, no solving' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '15 Qs — light mixed review, maintain habit' },
      ],
    },
  },

  w3: {
    title: 'Week 3 — Project Upgrade + DSA Continuity',
    sub: 'Upgrade 1 existing project (Redis/WebSocket/Queue). No new build. DSA continues daily.',
    cols: [
      { label: 'Project', color: '#639922', items: ['Pick best project — add Redis caching layer', 'Add WebSocket or BullMQ job queue feature', 'Draw architecture diagram (Excalidraw)', 'Record 2-min Loom walkthrough after upgrade', 'Prepare deep explanation: "why Redis? why queues?"'] },
      { label: 'DSA', color: '#378ADD', items: ['Maintain: 2 mediums/day — patterns from W1+W2', 'No new heavy patterns — consolidate', 'Timed OA simulation Saturday as usual'] },
      { label: 'CS Core', color: '#7F77DD', items: ['OOPs deep: inheritance, polymorphism, interfaces, SOLID', 'Design patterns: Singleton, Factory, Observer', 'Relate patterns to your own project code'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs/day — maintain habit, no ramp-up yet'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Light: understand caching strategies, pub/sub — relevant to project upgrade', 'No HLD/LLD exercises yet'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['Prep: explain project upgrade in 3 min cold', 'Record "why did you add Redis?" — practice answer'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 medium problems — patterns from W1+W2, no hints, 35 min each, think aloud' },
        { time: '11:00 – 1:00', pillar: 'Project', task: 'Add Redis: install, connect to existing project, add caching for 1 slow endpoint' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'OOPs: inheritance + polymorphism — write TypeScript examples for each' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP continuity: 2 problems from weak patterns identified in W2 log' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — quant/logical mixed, 20 min timed, maintain habit' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — graph/tree patterns, timed, verbalize approach before coding' },
        { time: '11:00 – 1:00', pillar: 'Project', task: 'Add BullMQ or Redis pub/sub — implement 1 background job (email, notification, etc.)' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'OOPs: SOLID principles — map each principle to your project code specifically' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Graph patterns: 2 problems — cycle detection or shortest path variants' },
        { time: '9:00 – 10:00', pillar: 'Project', task: 'Draw architecture diagram on Excalidraw — include Redis + queue layer' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — sliding window or binary search, timed, no hints' },
        { time: '11:00 – 1:00', pillar: 'Project', task: 'Add WebSocket support (or real-time feature) to project — basic working implementation' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'Design patterns: Singleton + Factory — implement both in TypeScript/Node, understand when to use' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Timed drill: 3 mediums in 75 min — simulate OA pressure, track solve rate' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — logical reasoning, 20 min timed' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — stack/heap/queue patterns, timed, explain complexity after' },
        { time: '11:00 – 1:00', pillar: 'Project', task: 'Write Jest/Vitest tests for new features — at least 5 meaningful tests' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'Design patterns: Observer + Strategy — implement, understand real use cases in your stack' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'DP: 2 problems from your weakest DP pattern — targeted fix' },
        { time: '9:00 – 10:00', pillar: 'Project', task: 'Prepare verbal explanation: "what does Redis do in your project and why did you choose it?"' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — backtracking or tree, timed, no hints' },
        { time: '11:00 – 1:00', pillar: 'Project', task: 'Update README: add architecture diagram, tech decisions, deployment link, Loom video' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'OOPs verbal Q&A: 15 common interview Qs — answer aloud, timed, crisp' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Re-solve: 3 old problems you originally got wrong — clean code, explain after' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Record: 2-min project walkthrough cold — no notes, present like in an interview' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems in 90 min — note solve rate vs W2' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA review: fix every unsolved problem, clean re-solve' },
        { time: '3:00 – 5:00', pillar: 'Project', task: 'Final project polish: pin on GitHub, add to LinkedIn featured, update portfolio' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'OOPs full revision: your notes — 10 verbal Q&A aloud' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs mixed — light, maintain habit' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — track pattern improvement vs W1/W2' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve: understand every problem you couldn\'t finish' },
        { time: '3:00 – 4:00', pillar: 'Project', task: 'Verbal prep: "walk me through your upgraded project" — time it, refine' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'Design patterns revision + relate to Next.js/Prisma codebase you know' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '15 Qs light — habit only' },
      ],
    },
  },

  w4: {
    title: 'Week 4 — CS Core Deep Dive + Resume',
    sub: 'OS, DBMS, CN mastery. Resume v1 finalized. Off-campus applications begin.',
    cols: [
      { label: 'CS Core', color: '#7F77DD', items: ['OS: complete revision — all weak areas from W1 + new topics', 'DBMS: transactions, stored procedures, complex SQL', 'CN: deep dive — HTTP/2, WebSockets, REST design', 'Daily: 10 verbal Q&A per subject, timed answers'] },
      { label: 'DSA', color: '#378ADD', items: ['2 mediums/day — maintain momentum, don\'t break streak', '1 hard attempt on Tuesday + Friday', 'Weekly contest Sunday as usual'] },
      { label: 'Resume', color: '#639922', items: ['Jake\'s template, 1 page, ATS-optimized', 'Quantify every bullet — "reduced X by Y%"', 'Internship experience front and center', 'All 3 projects with tech stack + impact'] },
      { label: 'Apply', color: '#D4537E', items: ['Set up: LinkedIn, Wellfound, Instahyre, Hirist profiles', 'Target: 10 Tier 2 companies identified with portals', 'Start referral outreach — 3 DMs this week'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs/day — start adding verbal section', '1 full Tier 3 mock (TCS NQT style) this week'] },
      { label: 'Sys Design', color: '#D85A30', items: ['1 hr only: read URL shortener design — relate to Redis knowledge'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — any pattern, timed, think aloud, no hints' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS deep revision: virtual memory, page replacement (LRU/FIFO/Optimal), thrashing' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'OS verbal drill: 15 common OS interview Qs — answer each in under 60 sec' },
        { time: '7:00 – 9:00', pillar: 'Resume', task: 'Resume v1 draft: write all bullets — quantify, use action verbs, 1 page' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — quant + verbal mix, 20 min timed' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard problem attempt — 45 min, then full review of approach' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS deep: transactions, ACID, concurrency control, 2PL, MVCC' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'SQL practice: 10 complex queries — window functions, CTEs, recursive queries' },
        { time: '7:00 – 9:00', pillar: 'Resume', task: 'Resume review pass: fix formatting, ensure every project has tech + impact bullet' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Set up Wellfound + Instahyre + Hirist profiles — complete and polished' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — timed, pick patterns you haven\'t touched this week' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CN deep: HTTP/1.1 vs HTTP/2, WebSockets vs polling, REST vs GraphQL, CORS' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'CN verbal drill: 15 CN interview Qs — answer each under 60 sec, record yourself' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'DBMS verbal drill: 15 DBMS Qs — normalization, indexing, transactions' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'LinkedIn: optimize headline, about section, featured projects — fully complete' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '2 mediums — simulate OA, timed 35 min each, track solve rate' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS: system calls, file systems (inode, FAT), I/O management' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'Mixed CS round simulation: 10 OS + 10 DBMS + 10 CN — verbal, 2 min each' },
        { time: '7:00 – 9:00', pillar: 'Resume', task: 'Resume v1 final: share with 2 seniors for feedback, prepare to send by week end' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: 'Full TCS NQT style mock — all sections, strict time limit, analyse mistakes' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard attempt — 45 min, no hints, then review editorial and re-implement' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS: stored procedures, triggers, views, transactions — write SQL for each' },
        { time: '3:00 – 5:00', pillar: 'Sys Design', task: 'Read URL shortener design: understand caching + DB + hashing — relate to your Redis work' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'CN: DNS resolution, CDN concepts, load balancing basics — understand flow' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Referral outreach: 3 warm DMs to Tier 2 engineers — specific, short, with GitHub link' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems in 90 min — track solve rate vs W3' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA review + weak pattern targeted practice' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'Full CS round simulation: OS + DBMS + CN combined — 30 min verbal, timed' },
        { time: '7:00 – 9:00', pillar: 'Resume', task: 'Resume finalized — send 5 applications to Tier 2 companies this evening' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Apply to 5 more: LinkedIn Easy Apply (Tier 2) + Wellfound startups' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — track pattern improvement, note any new freezes' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve + pattern log update' },
        { time: '3:00 – 4:00', pillar: 'CS', task: 'Week 4 CS revision: read your own OS + DBMS + CN summaries' },
        { time: '7:00 – 9:00', pillar: 'CS', task: '20 random CS interview Qs verbal — OS/DBMS/CN/OOPs rotated' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Track: spreadsheet of all applications sent — company, tier, date, status' },
      ],
    },
  },

  w5: {
    title: 'Week 5 — Mock Interviews + Aggressive Applying',
    sub: 'Communication becomes daily. Target: 20+ applications sent this week.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['1.5 hrs/day — hard problem + 1 medium re-solve', 'Focus: problems at Juspay/Razorpay difficulty', 'Timed OA simulation Saturday'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['Pramp: 2 mocks this week', 'Record every problem solve — watch back', 'STAR stories: prepare 6 behavioural answers', 'Communication: slow down, think aloud, ask clarifiers'] },
      { label: 'CS Core', color: '#7F77DD', items: ['Revision mode: 10 verbal Q&A per subject daily', 'SQL: complex queries — write from memory', 'OOPs: relate every answer to TypeScript/Next.js'] },
      { label: 'Apply', color: '#D4537E', items: ['Target: 5 applications/day — Tier 2 priority', 'Platforms: Wellfound, Instahyre, Hirist, direct portals', 'Referral: 5 DMs/day to engineers at target companies'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs/day — only quant + logical, no over-investing', '1 Accenture-style mock this week'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Design rate limiter — understand token bucket, sliding window', 'Relevant to Juspay/Razorpay payment interview'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard problem — 45 min, then re-solve 1 old problem clean' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OS verbal: 15 Qs timed — answer under 60 sec each, record yourself' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Pramp mock session — full 45 min, review feedback deeply' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Juspay-style problems: functional programming patterns, stream processing LC problems' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 applications: Tier 2 company portals — Juspay, Razorpay, Zepto, Zomato, Groww' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard graph problem — timed, then 1 medium re-solve' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'DBMS verbal: 15 Qs — transactions, indexes, query optimization, SQL on whiteboard' },
        { time: '3:00 – 5:00', pillar: 'Sys Design', task: 'Design rate limiter — token bucket + sliding window, explain tradeoffs verbally 20 min' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Hard DP: 1 problem + 1 medium DP revision' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 DMs to engineers at Tier 2 companies — referral request, attach GitHub + resume' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Timed: 2 mediums in 50 min — simulate first-round OA' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CN verbal: 15 Qs — HTTP, WebSockets, REST, TCP handshake, DNS — crisp answers' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'STAR stories: write and record 3 behavioural answers — leadership, conflict, challenge' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Backtracking + recursion: 2 problems — Tier 2 companies frequently ask these' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 applications: LinkedIn Easy Apply + Wellfound — Tier 2 startups' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard tree/graph — 45 min, then deep review of approach' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'OOPs verbal + design: explain Singleton in your Next.js codebase, SOLID examples' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Pramp mock + record yourself — watch back and note filler words and hesitations' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Heap + priority queue: 2 hard problems — scheduling, median finder' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs — logical reasoning, verbal, 20 min timed' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard problem — simulate full interview: explain approach, code, test, optimize' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Mixed CS drill: 5 OS + 5 DBMS + 5 CN + 5 OOPs — all verbal, 2 min each' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'STAR stories 4-6 + "why Juspay/Razorpay/Zepto" — prepare for 3 Tier 2 targets' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'String + array hard: 2 problems — Zomato/Zepto frequently test these' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Follow up on W4 applications — LinkedIn message + check portal status' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems in 90 min — Tier 2 difficulty, track solve rate' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA deep review — fix every unsolved problem' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Full loop mock: DSA problem + CS round + behavioural — 90 min, 1 sitting' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'SQL: write 10 complex queries from memory — no reference' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: 'Accenture-style mock — all sections, strict time, analyse mistakes' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — aim for 3 solves, note remaining freeze patterns' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve + update pattern log' },
        { time: '3:00 – 4:00', pillar: 'CS', task: 'CS revision — read your own W4 summaries' },
        { time: '7:00 – 9:00', pillar: 'Apply', task: 'Application tracking: update spreadsheet, plan next week\'s 25+ targets' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: '20 Qs light — habit only' },
      ],
    },
  },

  w6: {
    title: 'Week 6 — Full Application Grind + Interview Readiness',
    sub: '25+ applications this week. Referrals are now critical. Start Tier 1 stretch applications.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['1 hard/day — interview-level, timed, verbalize', 'Focus: patterns most asked at Tier 2 companies', 'Timed OA simulation Saturday'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['3 Pramp mocks this week — improve quality each time', 'Full loop mock (DSA+CS+Behav) on Saturday', 'Record and watch every mock — fix communication'] },
      { label: 'CS Core', color: '#7F77DD', items: ['Consolidation: 10 verbal Q&A per subject daily', 'SQL complex query writing from memory', 'Relate all CS answers to your project/stack'] },
      { label: 'Apply', color: '#D4537E', items: ['Target: 25+ applications total this week', 'Tier 1: apply to Google/Microsoft/Atlassian via referral', 'Tier 2: daily portal checks + LinkedIn alerts', 'Referral: 5 DMs/day, track response rate'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs/day — Deloitte numerical + abstract this week', '1 full Deloitte/Accenture mock'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Design Juspay payment gateway — directly relevant to campus', 'Understand: idempotency, retries, 2PC'] },
    ],
    mode: 'rotate',
    days: {
      Mon: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard graph problem — full interview simulation: approach → code → optimize → edge cases' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CS verbal: 10 OS + 10 DBMS — crisp answers, timed, simulate actual interview round' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Pramp mock — full round, record, watch feedback session' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Hard DP: 1 problem — relate to patterns you know, explain every state transition' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 Tier 2 applications + 2 Tier 1 (referral route) — track in spreadsheet' },
      ],
      Tue: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard tree/backtracking — timed 45 min, no hints' },
        { time: '11:00 – 1:00', pillar: 'Sys Design', task: 'Juspay payment gateway HLD: idempotency keys, retry logic, 2PC — draw and explain' },
        { time: '3:00 – 5:00', pillar: 'CS', task: 'CN + OOPs verbal: 10 CN + 10 OOPs — relate answers to Next.js/TypeScript experience' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Razorpay-style: data structures problems — implement LRU cache, design patterns in DSA' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 DMs: Tier 2 engineers — personalized referral request with GitHub + specific project' },
      ],
      Wed: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 2 hards in 75 min — no hints, push to solve both' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'SQL mastery: 10 hard queries from memory — window functions, recursive CTE, explain plan' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Pramp mock + STAR story refinement — especially "tell me about your project" depth' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'String manipulation hard problems — often asked at Zepto/Zomato' },
        { time: '9:00 – 10:00', pillar: 'Apti', task: 'Deloitte numerical + abstract: 30 Qs timed — practice speed' },
      ],
      Thu: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard heap/graph hybrid — full simulation with verbal explanation' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Mixed round simulation: 5 each from OS, DBMS, CN, OOPs — 2 min verbal, timed' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Pramp mock — focus on communication improvement over last mock' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Bit manipulation + math problems — Cred/Groww frequently test these' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: '5 Tier 2 applications via company career pages — not just LinkedIn' },
      ],
      Fri: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: '1 hard problem — write on paper (whiteboard simulation), no IDE' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Deep dive: your project\'s CS connections — "how does Prisma handle transactions?", "how does Next.js server-side rendering work?"' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Full loop mock (90 min): DSA problem + CS round + behavioural — record it' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Weak pattern: targeted 3 problems — whatever your log shows as most frequent failure' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Follow up all W5 applications + send 5 more — Instahyre + Hirist' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems 90 min — track improvement vs W5' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA deep review — re-solve everything clean' },
        { time: '3:00 – 5:00', pillar: 'Mock/Comm', task: 'Full loop mock (90 min): all pillars — watch recording after' },
        { time: '7:00 – 9:00', pillar: 'Apti', task: 'Full Deloitte/Accenture mock — all sections, strict time' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Application tracking review: response rate, follow-ups needed, adjust strategy' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — target 3 solves confidently' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve + final pattern log — you should have < 3 weak patterns remaining' },
        { time: '3:00 – 4:00', pillar: 'Sys Design', task: 'Revise: URL shortener + rate limiter + payment gateway — 5 min verbal each' },
        { time: '7:00 – 9:00', pillar: 'CS', task: 'CS full revision: your summaries — OS + DBMS + CN + OOPs' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Plan Week 7 targets — 25+ more, include Tier 1 referrals follow-up' },
      ],
    },
  },

  w7: {
    title: 'Week 7 — Deep Interview Simulation',
    sub: 'Treat every day as a real interview. No new learning. Only sharpening.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['Full interview simulation daily: 2 problems in 45 min', 'Write code on paper or whiteboard once daily', 'Complexity analysis mandatory for every solution'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['1 full loop mock every single day', 'Record and review every mock', 'Fix remaining communication issues — hesitation, filler words', 'Prepare 3 smart questions per target company'] },
      { label: 'CS Core', color: '#7F77DD', items: ['Verbal rounds only — no new reading', '10 rapid-fire Q&A per subject daily', 'LLD: design 2 systems verbally (parking lot, ATM)'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs/day — maintain speed and accuracy', 'TCS NQT official mock this week', 'No new topic investment — Tier 3 is secured'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Juspay payment + rate limiter — 20 min timed verbal explains', 'Know 3 designs cold'] },
      { label: 'Apply', color: '#D4537E', items: ['5 applications/day — still going strong', 'Follow up on all pending responses', 'Referral pipeline: keep warm contacts warm'] },
    ],
    mode: 'all',
    days: {
      Mon: [
        { time: '9:00 – 10:30', pillar: 'DSA', task: 'Interview simulation: 2 problems in 45 min — no hints, think aloud, full write-up after' },
        { time: '10:30 – 1:00', pillar: 'CS', task: 'Full CS round simulation: 10 OS + 10 DBMS verbal — timed, crisp, under 90 sec each' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock (90 min) — DSA problem + CS Qs + behavioural, record it' },
        { time: '4:30 – 5:00', pillar: 'Apti', task: '20 Qs speed drill — quant + logical, 20 min, maintain accuracy' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'Write 1 problem on paper — simulate whiteboard, no IDE, clean code' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '5 applications + 3 referral DMs — Tier 2 and Tier 1 follow-ups' },
      ],
      Tue: [
        { time: '9:00 – 10:30', pillar: 'DSA', task: 'Interview simulation: 1 hard in 45 min — explain every decision aloud' },
        { time: '10:30 – 1:00', pillar: 'CS', task: 'CN + OOPs verbal: 10 each — relate OOPs to your TypeScript codebase' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — focus on improving one specific weakness from yesterday\'s recording' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'Juspay payment gateway: 20 min verbal explanation — idempotency, retries, HLD' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'LLD in code: design LRU cache + implement — TypeScript preferred' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '5 applications + update tracking spreadsheet + follow up pending' },
      ],
      Wed: [
        { time: '9:00 – 10:30', pillar: 'DSA', task: '2 problems: 1 graph + 1 DP — 45 min timed, explain complexity mandatory' },
        { time: '10:30 – 1:00', pillar: 'CS', task: 'Mixed CS verbal: 5 each from OS, DBMS, CN, OOPs — rapid fire 90 sec each' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — behavioural focus: 5 STAR stories must come naturally' },
        { time: '4:30 – 5:00', pillar: 'Apti', task: 'TCS NQT official mock — full attempt, track score vs last attempt' },
        { time: '7:00 – 8:30', pillar: 'CS', task: 'LLD: design parking lot verbally — class diagram, explain design choices' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '5 applications + write 2 personalized cover notes for Tier 1 companies' },
      ],
      Thu: [
        { time: '9:00 – 10:30', pillar: 'DSA', task: '1 hard problem — write on paper, no IDE at all, full simulation' },
        { time: '10:30 – 1:00', pillar: 'CS', task: 'SQL mastery session: 10 hard queries from memory — explain query plan' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — track: are you still freezing? are explanations improving?' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'Rate limiter design: 20 min verbal — token bucket vs sliding window tradeoffs' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'Weak pattern final fix: 3 targeted problems — by now you should have < 2 patterns left' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '5 applications + LinkedIn activity (comment, post, engage — visibility matters)' },
      ],
      Fri: [
        { time: '9:00 – 10:30', pillar: 'DSA', task: 'Full interview simulation: 2 problems 45 min — highest pressure, record the session' },
        { time: '10:30 – 1:00', pillar: 'CS', task: 'Your own project deep Q&A: "how does auth work in your app?", "what would you scale first?", "why Prisma?"' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock (90 min) — best performance of the week, treat it as real' },
        { time: '4:30 – 5:00', pillar: 'Apti', task: 'Deloitte/Accenture mock section — 30 Qs, maintain speed' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'LLD: design ATM machine — verbally, class diagram, then implement key classes' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: 'Application sprint: 5 more + follow up everything from W5+W6' },
      ],
      Sat: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'Full OA simulation: 3 problems 90 min — final benchmark before placements' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'OA review — this should be your cleanest solve rate yet' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock: all pillars — record, this is your pre-final dress rehearsal' },
        { time: '4:30 – 5:00', pillar: 'Apti', task: 'Mixed full mock: quant + logical + verbal — final full practice' },
        { time: '7:00 – 8:30', pillar: 'CS', task: 'All-CS rapid fire: 30 random Qs — OS/DBMS/CN/OOPs, verbal, 90 sec each' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: 'Review all applications: who responded? follow up. Update Tier targets for W8' },
      ],
      Sun: [
        { time: '9:00 – 11:00', pillar: 'DSA', task: 'LC Weekly contest — solve with confidence, note final remaining weak spots' },
        { time: '11:00 – 1:00', pillar: 'DSA', task: 'Upsolve — final pattern log: aim to have zero unresolved patterns' },
        { time: '3:00 – 4:00', pillar: 'CS', task: 'Light revision: your summaries only — OS + DBMS + CN, no new reading' },
        { time: '7:00 – 8:30', pillar: 'Mock/Comm', task: 'Prepare: 3 questions to ask each interviewer + "why this company?" for every target' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: 'Plan W8 + Aug 9 on-campus strategy — know Juspay, Deloitte, Accenture process cold' },
      ],
    },
  },

  w8: {
    title: 'Week 8 — D-Day Readiness (Aug 9 placements begin)',
    sub: 'Stay sharp, not stressed. No new topics. On-campus from Aug 9, off-campus continues.',
    cols: [
      { label: 'DSA', color: '#378ADD', items: ['1 medium warm-up daily — confidence, not difficulty', 'Pattern cheat sheet: re-read every morning', 'No new patterns — trust the work done'] },
      { label: 'Mock/Comm', color: '#D4537E', items: ['1 full loop mock daily until Aug 9', 'After Aug 9: debrief after each real interview', '"Why this company?" polished for every campus target'] },
      { label: 'CS Core', color: '#7F77DD', items: ['3 verbal Q&A per subject daily — fast and confident', 'SQL: 5 queries per day from memory', 'Know your projects cold — every tech decision'] },
      { label: 'Apti', color: '#EF9F27', items: ['20 Qs morning habit — Tier 3 safety maintained', 'TCS NQT official: 1 more attempt this week', 'Juspay: no aptitude — skip for them'] },
      { label: 'Sys Design', color: '#D85A30', items: ['Revise 3 designs: payment gateway, rate limiter, URL shortener', '5 min verbal each — crisp and confident'] },
      { label: 'Apply', color: '#D4537E', items: ['3–5 off-campus applications/day — keep pipeline alive', 'Follow up on everything — a response can come any time'] },
    ],
    mode: 'all',
    days: {
      Mon: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 medium warm-up — easy pace, build confidence, think aloud' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: '20 Qs timed — quant morning drill, stay sharp' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CS verbal: 5 OS + 5 DBMS + 5 CN — under 60 sec each, fast and confident' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock (90 min) — pre-campus warm-up' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'Payment gateway: 5 min verbal — crisp, no hesitation' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'Pattern cheat sheet walkthrough: solve 1 example per major pattern — confidence drill' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '3 off-campus applications + follow up pending responses' },
      ],
      Tue: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 medium warm-up — timed 25 min, stay in flow state' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: 'TCS NQT official mock — full attempt, confirm you\'re hitting 80%+' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Project deep review: "why did you use X?", "how does auth work?", "what would you scale?" — aloud' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — focus: zero filler words, slow down on hard Qs' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'Rate limiter: 5 min verbal — token bucket, real-world use cases' },
        { time: '7:00 – 8:30', pillar: 'CS', task: 'SQL: 5 complex queries from memory — explain each one aloud' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '3 applications + LinkedIn activity — stay visible' },
      ],
      Wed: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 medium warm-up — write on paper this time, clean code' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: 'Deloitte/Accenture: 20 Qs mixed — maintain speed' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'CS rapid fire: 30 random Qs — OS/DBMS/CN/OOPs, 90 sec each' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — treat it exactly like the real thing tomorrow' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'URL shortener: 5 min verbal — hashing, redirects, DB design' },
        { time: '7:00 – 8:30', pillar: 'DSA', task: 'LLD: implement LRU + design ATM — in code, clean TypeScript' },
        { time: '8:30 – 10:00', pillar: 'Apply', task: '3 applications + all W7 follow-ups + referral check-ins' },
      ],
      Thu: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 medium warm-up — confidence mode, you know this' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: '20 Qs morning drill — habit, not pressure' },
        { time: '11:00 – 1:00', pillar: 'CS', task: '"Why this company?" + "tell me about yourself" + 3 STAR stories — all polished, rehearsed' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Final pre-placement full loop mock — record, this is your last benchmark' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'All 3 designs back-to-back: 5 min each — Juspay, rate limiter, URL shortener' },
        { time: '7:00 – 8:30', pillar: 'CS', task: 'Final CS verbal: your hardest 20 Qs — nail every one' },
        { time: '8:30 – 10:00', pillar: 'DSA', task: 'Pattern cheat sheet final read — internalize, trust yourself' },
      ],
      Fri: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 easy warm-up only — stay confident, no stress problems' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: '15 Qs light — just to stay in rhythm' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Light mental revision only — walk through key concepts in your head' },
        { time: '3:00 – 4:00', pillar: 'Mock/Comm', task: '3 questions to ask interviewer — one per company, smart and specific' },
        { time: '4:00 – 5:00', pillar: 'Apply', task: '3 off-campus applications — keep pipeline warm even during on-campus week' },
        { time: '7:00 – 8:00', pillar: 'DSA', task: 'Rest — light read of your pattern cheat sheet only' },
        { time: '8:00 – 10:00', pillar: 'Mock/Comm', task: 'Relax: review, plan clothes, sleep early. You\'re ready.' },
      ],
      Sat: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: '1 medium — calm, confident, this is just maintenance' },
        { time: '10:00 – 11:00', pillar: 'Apti', task: '20 Qs — final drill, Juspay = skip aptitude section' },
        { time: '11:00 – 1:00', pillar: 'CS', task: 'Juspay-specific prep: functional programming, streams, payment flows, system reliability' },
        { time: '3:00 – 4:30', pillar: 'Mock/Comm', task: 'Full loop mock — Juspay simulation: hard DSA + deep CS + behavioural' },
        { time: '4:30 – 5:00', pillar: 'Sys Design', task: 'Juspay payment gateway final verbal — 10 min detailed, no hesitation' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Juspay-style problems: functional/stream LC problems, design patterns in code' },
        { time: '9:00 – 10:00', pillar: 'Apply', task: 'Off-campus final push: 5 applications + LinkedIn post about your project upgrade' },
      ],
      Sun: [
        { time: '9:00 – 10:00', pillar: 'DSA', task: 'LC contest — calm attempt, enjoy it, you\'ve done the work' },
        { time: '10:00 – 11:00', pillar: 'CS', task: 'Final light revision: your own notes only' },
        { time: '11:00 – 1:00', pillar: 'Mock/Comm', task: '"Tell me about yourself" final version — timed, natural, confident' },
        { time: '3:00 – 4:00', pillar: 'Apply', task: 'Follow up all pending applications one last time' },
        { time: '7:00 – 9:00', pillar: 'DSA', task: 'Rest — light pattern cheat sheet read if anxious, otherwise sleep' },
        { time: '9:00 – 10:00', pillar: 'Mock/Comm', task: 'Mental prep: you have 350+ LC, 8.0 CGPA, 3 projects, internship. You\'re ready. Sleep well.' },
      ],
    },
  },
};

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
