"use client";

export default function Roadmap() {
  const data = [
    {
      topic: "DSA (High Priority)",
      sections: [
        {
          name: "Arrays & Strings",
          items: ["Two pointers", "Sliding window", "Prefix sum", "Kadane's algorithm", "String manipulation"],
        },
        {
          name: "Hashing",
          items: ["Frequency maps", "HashMap problems", "Collision resolution basics"],
        },
        {
          name: "Recursion & Backtracking",
          items: ["Subsets", "Permutations", "Combinations", "N-Queens", "Sudoku solver"],
        },
        {
          name: "Binary Search",
          items: ["On arrays", "On rotated array", "Find peak element", "Search on answer space"],
        },
        {
          name: "Linked Lists",
          items: ["Reverse linked list", "Cycle detection", "Operations in LL", "Fast-slow pointer", "Dummy nodes"],
        },
        {
          name: "Stacks & Queues",
          items: ["Monotonic stack", "Next greater element", "Queue using stacks", "Stack using queues"],
        },
        {
          name: "Trees",
          items: ["DFS", "BFS", "LCA", "Diameter", "Validate BST", "Path sum problems"],
        },
        {
          name: "Graphs",
          items: ["DFS/BFS", "Detect cycle", "Topological sort", "Connected components", "Shortest path"],
        },
        {
          name: "Dynamic Programming",
          items: ["1D DP", "Memo vs Tabulation", "Knapsack", "Edit distance", "Subset sum", "Partition DP & MCM", "DP on grid", "DP on tree & graph", "Bitmask DP", "Digit DP"],
        },
      ],
    },
    {
      topic: "System Design",
      sections: [
        {
          name: "Fundamentals",
          items: ["Client-Server Architecture", "REST API Design", "Database Schema Design", "Caching", "Load Balancing", "Authentication", "CDN"],
        },
        {
          name: "Practice Systems",
          items: ["URL Shortener", "Todo App Backend", "Chat Application", "Voting System", "File Upload System"],
        },
      ],
    },
    {
      topic: "Full Stack (MERN + Next.js)",
      sections: [
        {
          name: "React / Next.js",
          items: ["JSX & Components", "Props vs State", "Hooks", "Routing", "SSR vs SSG vs ISR", "Performance Optimization"],
        },
        {
          name: "Backend",
          items: ["Node.js", "Express", "JWT Authentication", "Mongoose", "File Uploads", "Error Handling"],
        },
        {
          name: "JavaScript",
          items: ["Closures", "this keyword", "Promises", "Event Loop", "Prototypes", "Array methods"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📘 SDE Roadmap</h1>

      {data.map((topic, index) => (
        <div
          key={index}
          className="mb-4 bg-white rounded-xl shadow-md p-4"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-3">{topic.topic}</h2>

          <div className="mt-3 space-y-3 grid grid-cols-3">
            {topic.sections.map((section, i) => (
              <div
                key={i}
                className=""
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 border-2 border-gray-400 rounded-sm"></span>

                  <h3 className="font-semibold text-gray-800 ">{section.name}</h3>
                </div>

                <ul className="space-y-2 ml-7">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2"
                    >
                      {/* Checkbox Graphic */}
                      <span className="w-5 h-5 border-2 border-gray-400 rounded-sm"></span>

                      {/* Text */}
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
