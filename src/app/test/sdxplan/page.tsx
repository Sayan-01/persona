import React from "react";

export default function FebruaryRoadmap() {
  const roadmapData = {
    weeks: [
      {
        id: 1,
        week: "W1",
        dates: "FEB 1-2",
        timeBlocks: {
          block1: "DSA Revision - 3hrs",
          block2: "Core CS Theory - 2hrs",
          block3: "DSA+CP Practice - 1hr",
        },
        dsaFocus: {
          topics: [
            {
              title: "RECURSION & BACKTRACKING",
              items: ["• Subset/Combination patts", "• N-Queens, Sudoku Solver", "• Permutations variations", "• Word Search, Palindrome Partitioning"],
              practice: "Practice: 15-18 problems",
            },
            {
              title: "LINKED LIST (Revival)",
              items: ["• Reverse", "• Fast-slow pointer (cycle)", "• Reversal patterns", "• Merge/Sort LL", "• Clone with random pointer", "• Dummy node"],
              practice: "Practice: 12-15 problems",
            },
            {
              title: "TREE",
              items: ["• DFS", "• BFS", "• LCA", "• Diameter", "• Validate BST", "• Path sum problems"],
              practice: "",
            },
          ],
        },
        cpLeetcode: {
          daily: "2 Medium + 1 Hard",
          contest: "Contest: Weekly 385",
          rating: "Rating goal: 1700",
          schedule: ["Mon-Tue: 4 problems", "Wed-Thu: 5 problems", "Fri-Sat: Contest prep"],
        },
        coreSubjects: {
          title: "OOPs (Complete)",
          sections: [
            {
              day: "Day 1-2: 4 Pillars",
              items: ["- Classes, Objects", "- Inheritance types", "- Polymorphism", "- Encapsulation", "- Abstraction"],
            },
            {
              day: "Day 3-4: Advanced",
              items: ["- Virtual functions", "- Constructor types", "- Destructor", "- Abstract class vs Interface", "- Friend function"],
            },
          ],
          note: "Make concise notes",
        },
        lld: {
          timing: "3PM-5PM (Mon, Wed, Fri)",
          hours: "2hrs/session = 6hrs/week",
          sessions: [
            {
              day: "Day 1 (Mon):",
              title: "• SOLID Principles Deep",
              items: ["  - Single Responsibility", "  - Open/Closed", "  - Liskov Substitution", "  - Interface Segregation", "  - Dependency Inversion", "• Code examples for each"],
            },
            {
              day: "Day 3 (Wed):",
              title: "• Design Patterns Intro",
              items: ["  - Singleton Pattern", "  - Factory Pattern", "  - Builder Pattern", "  - Strategy Pattern"],
            },
            {
              day: "Day 5 (Fri):",
              title: "• Basic LLD Practice",
              items: ["  - Design Parking Lot", "  - Classes, relationships", "  - UML diagram basics"],
            },
          ],
        },
        development: {
          title: "Review Projects",
          items: ["• Document both projects", "• Tech stack clarity", "• Features list", "• Architecture diagram"],
          section2: {
            day: "Day 5-6: MERN stack interview Qs",
            items: ["• State management", "• Authentication flow", "• Database design", "• REST API patterns", "20 questions prepared"],
          },
        },
        sunday: {
          title: "SUN (Feb 2):",
          tasks: ["• Portfolio setup/update", "• LinkedIn optimization", "• Mock Interview #1 (Platform)", "• Aptitude diagnostic test", "• Time: 2-3hrs"],
          note: {
            title: "Notes:",
            text: "Start small spiral notebook for each subject",
          },
        },
      },
      {
        id: 2,
        week: "W2",
        dates: "FEB 8-9",
        timeBlocks: {
          block1: "DSA Revision - 3hrs",
          block2: "Aptitude + LLD - 2hrs",
          block3: "DSA+CP Practice - 1hr",
        },
        dsaFocus: {
          topics: [
            {
              title: "GRAPHS (Deep Dive)",
              items: ["• BFS/DFS patterns (islands, rotting oranges)", "• Shortest path (Dijkstra, Bellman, Floyd)", "• Topological sort, SCC", "• MST (Prim, Kruskal)", "• Bipartite, Union-Find"],
              practice: "Practice: 20-25 problems",
            },
            {
              title: "BINARY SEARCH ON ANSWER",
              items: ["• Search space identification", "• Monotonic functions", "• Allocation problems", "• Min/Max optimization"],
              practice: "Practice: 10-12 problems",
            },
          ],
        },
        cpLeetcode: {
          daily: "2 Medium + 1 Hard",
          contest: "Contest: Weekly 386",
          rating: "Rating goal: 1750",
          schedule: ["Mon-Tue: 4 problems", "Wed-Thu: 5 problems", "Fri-Sat: Contest prep"],
        },
        coreSubjects: {
          title: "DBMS (Priority)",
          sections: [
            {
              day: "Day 8-9: Fundamentals",
              items: ["- ER diagrams", "- Normalization (1NF to BCNF)", "- Keys (Primary, Foreign, Candidate)"],
            },
            {
              day: "Day 10-11: Advanced",
              items: ["- Transactions (ACID)", "- Indexing", "- SQL queries (Joins, Group By, Having)"],
            },
            {
              day: "Day 12: SQL practice",
              items: ["- 15 medium queries"],
            },
          ],
          note: "**Make query sheets**",
        },
        lld: {
          timing: "**3PM-5PM (Mon, Wed, Fri)**",
          hours: "2hrs/session = 6hrs/week",
          sessions: [
            {
              day: "Day 8 (Mon):",
              title: "• Design Library Management",
              items: ["  - Book, Member, Librarian", "  - Issue/Return system", "  - Fine calculation", "  - Search functionality"],
            },
            {
              day: "Day 10 (Wed):",
              title: "• Design Hotel Booking",
              items: ["  - Room types, booking", "  - Payment processing", "  - Cancellation policy"],
            },
            {
              day: "Day 12 (Fri):",
              title: "• Design Elevator System",
              items: ["  - Multiple elevators", "  - Request handling", "  - Optimal algorithm"],
            },
          ],
        },
        development: {
          title: "Next.js Basics",
          items: ["• SSR vs CSR concepts", "• App router structure", "• API routes"],
          section2: {
            day: "Day 11-12: Practice",
            items: ["• Explain both projects in LLD context", "• Draw system diagrams"],
          },
        },
        sunday: {
          title: "SUN (Feb 9):",
          tasks: ["• Mock Interview #2", "• System Design basics study", "• LeetCode weekly analysis", "• Weak topic focused practice", "• Review OOPs + SOLID notes", "• Time: 3hrs"],
          note: {
            title: "Aptitude Focus:",
            items: ["• Quantitative (3 topics/week)", "• Logical reasoning", "• 30min daily (Mon-Sat)"],
          },
        },
      },
      {
        id: 3,
        week: "W3",
        dates: "FEB 15-16",
        timeBlocks: {
          block1: "DSA Revision - 3hrs",
          block2: "Aptitude + LLD - 2hrs",
          block3: "DSA+CP Intense - 1hr",
        },
        dsaFocus: {
          topics: [
            {
              title: "DYNAMIC PROGRAMMING",
              items: [
                "• 1D DP (Fibonacci, Climb, House Robber patterns)",
                "• 2D DP (Grid, LCS, Edit distance)",
                "• Knapsack variations",
                "• Partition DP",
                "• DP on trees/strings",
                "• State machine DP",
              ],
              practice: "Practice: 25-30 problems",
            },
            {
              title: "CP BOOST (Guardian Push)",
              items: ["• Greedy algorithms", "• Math/Number theory"],
              practice: "Practice: 15 CP problems",
            },
          ],
        },
        cpLeetcode: {
          daily: "2 Medium + 2 Hard",
          contest: "Contest: Weekly 387",
          rating: "Rating goal: 1850",
          schedule: ["Mon-Tue: 5 problems", "Wed-Thu: 5 problems", "Fri-Sat: 6 problems"],
          cpTopics: {
            title: "**CP Topics:**",
            items: ["• Number theory basics", "• Modular arithmetic", "• Combinatorics", "• GCD/LCM problems", "Week contests: 2-3"],
          },
        },
        coreSubjects: {
          title: "**OS Fundamentals**",
          sections: [
            {
              day: "Day 15-16: Processes",
              items: ["- States, scheduling", "- Threads vs Process", "- Synchronization"],
            },
            {
              day: "Day 17-18: Memory",
              items: ["- Paging, Segmentation", "- Virtual memory", "- Deadlock"],
            },
            {
              day: "Day 19: Disk & File",
              items: ["- Disk scheduling", "- File systems"],
            },
          ],
          note: "**Concise notes**",
        },
        lld: {
          timing: "**3PM-5PM (Mon-Fri)**",
          hours: "2hrs/session = 10hrs/week",
          heavy: "**HEAVY LLD WEEK**",
          sessions: [
            {
              day: "Day 15 (Mon):",
              title: "• Design Splitwise",
              items: ["  - User, Group, Expense", "  - Settlement algorithm", "  - Simplify debt", "  - Transaction history"],
            },
            {
              day: "Day 16 (Tue):",
              title: "• Design Snake & Ladder",
              items: ["  - Board, Dice, Players", "  - Snake/Ladder positions", "  - Win condition"],
            },
            {
              day: "Day 17 (Wed):",
              title: "• Design Tic-Tac-Toe",
              items: ["  - Board representation", "  - Win detection algorithm", "  - Strategy pattern use"],
            },
            {
              day: "Day 18 (Thu):",
              title: "• Design LRU Cache",
              items: ["  - HashMap + DoublyLinkedL", "  - O(1) get/put operations", "  - Eviction policy"],
            },
            {
              day: "Day 19 (Fri):",
              title: "• Design LFU Cache",
              items: ["  - Frequency tracking", "  - Evict least frequent", "  - Implementation details"],
            },
          ],
        },
        development: {
          title: "Next.js Advanced",
          items: ["• Server components", "• Middleware patterns", "• Data fetching"],
          section2: {
            day: "Day 19-20: Advanced",
            items: ["• Record demo videos", "• Performance tuning", "• Deployment strategies"],
          },
        },
        sunday: {
          title: "**SUN (Feb 16):**",
          tasks: ["• Mock Interview #3 & #4", "• 2 interviews (back-to-back)", "• CP contest participation", "• Review all weak problems", "• GSOC org exploration (2hrs)", "• Time: 4hrs"],
          note: {
            title: "**Aptitude Boost:**",
            items: ["• Full mock test (2hrs)", "• Data interpretation"],
          },
        },
      },
      {
        id: 4,
        week: "W4",
        dates: "FEB 22-28",
        timeBlocks: {
          block1: "Mixed Practice - 2.5hrs",
          block2: "Mixed Prep - 1.5hrs",
          block3: "Interview Mode - 2hrs",
        },
        dsaFocus: {
          topics: [
            {
              title: "**FINAL REVISION**",
              items: ["• Topic-wise rapid fire", "• Weak topics only", "• Pattern revision sheets", "• Company-tagged problems (if targeting specific)"],
              practice: "Practice: 20 mixed problems",
            },
            {
              title: "**INTERVIEW PATTERNS**",
              items: ["• Arrays: Sliding window, two pointer", "• Trees: Traversals, LCA", "• Strings: KMP, Rabin-Karp", "• Top 50 interview problems"],
            },
            {
              title: "**MOCK INTERVIEW PREP**",
              items: ["• Behavioral questions", "• STAR method practice", "• Project explanation (5min)", '• "Tell me about yourself"'],
            },
          ],
        },
        cpLeetcode: {
          daily: "Contest Daily + Hard problems",
          rating: "Rating goal: 2000+",
          schedule: ["Daily: 3-4 Hard problems", "Mon-Thu: Topic contests", "Fri-Sat: Rated contests"],
          guardianPush: {
            title: "**Guardian Level Push:**",
            items: ["• Codeforces Div 2", "• AtCoder Beginner", "• 5-6 contests this week"],
          },
        },
        coreSubjects: {
          title: "**CN (Computer Net)**",
          sections: [
            {
              day: "Day 22-23: Basics",
              items: ["- OSI/TCP-IP models", "- IP addressing", "- Subnetting"],
            },
            {
              day: "Day 24-25: Protocols",
              items: ["- HTTP/HTTPS", "- TCP/UDP", "- DNS, DHCP"],
            },
            {
              day: "Day 26: Security",
              items: ["- Encryption", "- Firewalls"],
            },
          ],
          note: "**Quick reference**",
        },
        lld: {
          timing: "**3PM-5PM (Mon-Thu)**",
          hours: "2hrs/session = 8hrs/week",
          heavy: "**ADVANCED LLD + INTERVIEW**",
          sessions: [
            {
              day: "Day 22 (Mon):",
              title: "• Design Rate Limiter",
              items: ["  - Token bucket algorithm", "  - Sliding window counter", "  - Distributed systems"],
            },
            {
              day: "Day 23 (Tue):",
              title: "• Design URL Shortener",
              items: ["  - Hash function design", "  - Collision handling", "  - Custom URL feature", "  - Analytics tracking"],
            },
            {
              day: "Day 24 (Wed):",
              title: "• Design Notification System",
              items: ["  - Push, Email, SMS", "  - Priority queue", "  - Retry mechanism"],
            },
            {
              day: "Day 25 (Thu):",
              title: "• LLD Interview Practice",
              items: ["  - Design Cab Booking App", "  - Design Food Delivery", "  - Design ATM System", "  - Pick any 2 for practice"],
            },
          ],
        },
        development: {
          title: "Full Stack Polish",
          items: ["• Next.js interview prep", "• SSR vs CSR vs SSG", "• API routes, middleware", "• Server components", "• App router deep dive", "30 Next.js questions"],
          section2: {
            day: "Day 26-27: Project Deep Dive",
            items: ["• Record demo videos", "• Deployment checklist", "• Error handling", "• Performance optimization"],
          },
          section3: {
            day: "Day 28: Final touches",
            items: ["• Resume bullets perfect", "• GitHub readme polish", "• LinkedIn post projects"],
          },
        },
        sunday: {
          title: "**SUN (Feb 23):**",
          tasks: [
            "• Mock Interview #5 & #6",
            "• Full day interview simulation",
            "• Morning: DSA (2 rounds)",
            "• Afternoon: System Design",
            "• Evening: HR + Behavioral",
            "• GSOC proposal draft start",
            "• Time: 5-6hrs",
          ],
          saturday: {
            title: "**SAT (Feb 22):**",
            items: ["• Mock Interview #7", "• Company-specific prep"],
          },
          finalWeek: {
            title: "**Final Week Intensity:**",
            items: ["• Mock interviews: #8-12", "• Spread across Feb 24-28", "• 1-2 per day in last 4 days"],
          },
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          🔥 ULTIMATE FEBRUARY COMEBACK ROADMAP - ENHANCED WITH LLD COLUMN
        </h1>

        <div className="overflow-x-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-2 border-2 border-orange-500">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-orange-500">
                  <th className="p-2 text-left border-r border-gray-600">WEEK</th>
                  <th className="p-2 text-left border-r border-gray-600">
                    TIME BLOCKS (6hrs/day)
                    <br />
                    10AM-1PM | 3PM-5PM | 6PM-10PM
                  </th>
                  <th className="p-2 text-left border-r border-gray-600">
                    DSA FOCUS
                    <br />
                    Topics + Practice Count
                  </th>
                  <th className="p-2 text-left border-r border-gray-600">
                    CP/LEETCODE
                    <br />
                    Daily Target
                  </th>
                  <th className="p-2 text-left border-r border-gray-600">
                    CORE SUBJECTS
                    <br />
                    Topics + Notes
                  </th>
                  <th className="p-2 text-left border-r border-gray-600">
                    LLD (Low Level Design)
                    <br />
                    TIMING + Topics
                  </th>
                  <th className="p-2 text-left border-r border-gray-600">
                    DEVELOPMENT/PROJECTS
                    <br />
                    Prep + Practice
                  </th>
                  <th className="p-2 text-left">
                    SPECIAL TASKS (SUNDAYS)
                    <br />
                    Sunday Deep Dives
                  </th>
                </tr>
              </thead>
              <tbody>
                {roadmapData.weeks.map((week) => (
                  <tr
                    key={week.id}
                    className={week.id < 4 ? "border-b border-gray-700" : ""}
                  >
                    {/* Week Column */}
                    <td className="p-2 border-r border-gray-600 align-top font-bold">
                      {week.week}
                      <br />
                      {week.dates.split(" ")[0]}
                      <br />
                      {week.dates.split(" ")[1]}
                    </td>

                    {/* Time Blocks Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      <div>{week.timeBlocks.block1}</div>
                      <div>{week.timeBlocks.block2}</div>
                      <div>{week.timeBlocks.block3}</div>
                    </td>

                    {/* DSA Focus Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      {week.dsaFocus.topics.map((topic, idx) => (
                        <div key={idx}>
                          <div className={`font-bold ${idx > 0 ? "mt-4" : ""} mb-2`}>{topic.title}</div>
                          {topic.items.map((item, i) => (
                            <div key={i}>{item}</div>
                          ))}
                          <div className="mt-2">{topic.practice}</div>
                        </div>
                      ))}
                    </td>

                    {/* CP/LeetCode Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      <div>{week.cpLeetcode.daily}</div>
                      {week.cpLeetcode.contest && <div className="mt-2">{week.cpLeetcode.contest}</div>}
                      <div className="mt-2">{week.cpLeetcode.rating}</div>
                      <div className="mt-4">
                        {week.cpLeetcode.schedule.map((item, idx) => (
                          <div key={idx}>{item}</div>
                        ))}
                      </div>
                      {week.cpLeetcode.cpTopics && (
                        <>
                          <div className="mt-4 font-bold">{week.cpLeetcode.cpTopics.title}</div>
                          {week.cpLeetcode.cpTopics.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                      {week.cpLeetcode.guardianPush && (
                        <>
                          <div className="mt-4 font-bold">{week.cpLeetcode.guardianPush.title}</div>
                          {week.cpLeetcode.guardianPush.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                    </td>

                    {/* Core Subjects Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      <div className="font-bold mb-2">{week.coreSubjects.title}</div>
                      {week.coreSubjects.sections.map((section, idx) => (
                        <div
                          key={idx}
                          className={idx > 0 ? "mt-2" : ""}
                        >
                          <div>{section.day}</div>
                          {section.items.map((item, i) => (
                            <div key={i}>{item}</div>
                          ))}
                        </div>
                      ))}
                      <div className="mt-2 font-bold">{week.coreSubjects.note}</div>
                    </td>

                    {/* LLD Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      <div className="font-bold mb-2">{week.lld.timing}</div>
                      <div>{week.lld.hours}</div>
                      {week.lld.heavy && <div className="mt-2 font-bold">{week.lld.heavy}</div>}
                      {week.lld.sessions.map((session, idx) => (
                        <div
                          key={idx}
                          className="mt-4"
                        >
                          <div>{session.day}</div>
                          <div>{session.title}</div>
                          {session.items.map((item, i) => (
                            <div key={i}>{item}</div>
                          ))}
                        </div>
                      ))}
                    </td>

                    {/* Development Column */}
                    <td className="p-2 border-r border-gray-600 align-top">
                      <div>{week.development.title}</div>
                      {week.development.items && (
                        <div className="mt-2">
                          {week.development.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </div>
                      )}
                      {week.development.section2 && (
                        <>
                          <div className="mt-4">{week.development.section2.day}</div>
                          {week.development.section2.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                      {week.development.section3 && (
                        <>
                          <div className="mt-4">{week.development.section3.day}</div>
                          {week.development.section3.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                    </td>

                    {/* Sunday Tasks Column */}
                    <td className="p-2 align-top">
                      <div className="font-bold mb-2">{week.sunday.title}</div>
                      {week.sunday.tasks.map((task, idx) => (
                        <div key={idx}>{task}</div>
                      ))}
                      {week.sunday.note && (
                        <>
                          <div className="mt-4 font-bold">{week.sunday.note.title}</div>
                          {week.sunday.note.text && <div>{week.sunday.note.text}</div>}
                          {week.sunday.note.items && week.sunday.note.items.map((item, idx) => <div key={idx}>{item}</div>)}
                        </>
                      )}
                      {week.sunday.saturday && (
                        <>
                          <div className="mt-4 font-bold">{week.sunday.saturday.title}</div>
                          {week.sunday.saturday.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                      {week.sunday.finalWeek && (
                        <>
                          <div className="mt-4 font-bold">{week.sunday.finalWeek.title}</div>
                          {week.sunday.finalWeek.items.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
