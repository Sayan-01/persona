export interface SubPattern {
  name: string;
  color: string;
  signals: string[];
  howTo: string;
  examples: string[];
}

export interface Pattern {
  name: string;
  subPatterns: SubPattern[];
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  colorClass: string;
  patterns: Pattern[];
}

export const CATEGORIES: Category[] = [
  {
    id: "arrays",
    icon: "🔢",
    title: "Arrays & Strings",
    colorClass: "s-arrays",
    patterns: [
      {
        name: "Sliding Window",
        subPatterns: [
          {
            name: "Fixed size",
            color: "c-purple",
            signals: ["window of size k", "subarray length k", "every k elements"],
            howTo: "Compute initial window of size <code>k</code>. Slide: <b>add</b> <code>arr[r]</code>, <b>remove</b> <code>arr[r-k]</code>. Update answer each step. O(n) time.",
            examples: ["Max sum subarray size k", "Average of subarrays size k", "Permutation in string"]
          },
          {
            name: "Variable size",
            color: "c-purple",
            signals: ["longest/shortest", "at most k", "contiguous", "need O(n)"],
            howTo: "Two ptrs <code>l,r</code>. Expand <code>r</code> always. <b>Shrink</b> <code>l</code> when constraint breaks. Hashmap tracks window state. Answer = <code>max(r-l+1)</code>.",
            examples: ["Longest substring no repeat", "Minimum window substring", "Max consecutive ones III"]
          }
        ]
      },
      {
        name: "Two Pointers",
        subPatterns: [
          {
            name: "Opposite ends",
            color: "c-teal",
            signals: ["sorted array", "pair with sum", "palindrome", "two elements"],
            howTo: "Place <code>l=0, r=n-1</code>. Move toward center based on condition: if sum too small → <code>l++</code>; too big → <code>r--</code>. O(n) on sorted input.",
            examples: ["Two sum (sorted array)", "Valid palindrome II", "Container with most water"]
          },
          {
            name: "Same direction",
            color: "c-teal",
            signals: ["remove duplicates", "in-place modify", "read/write ptr"],
            howTo: "<b>Read ptr</b> <code>r</code> scans all. <b>Write ptr</b> <code>w</code> marks next valid position. Copy <code>arr[r]</code> → <code>arr[w]</code> only when condition met.",
            examples: ["Remove duplicates from sorted array", "Move zeroes", "Remove element"]
          },
          {
            name: "Three pointers",
            color: "c-teal",
            signals: ["3sum", "triplet", "sort colors"],
            howTo: "Fix one element, apply two-pointer for remaining pair. Skip duplicates at each level. Also: Dutch National Flag uses 3 ptrs <code>lo, mid, hi</code>.",
            examples: ["3Sum", "Sort colors (DNF)", "3Sum closest"]
          }
        ]
      },
      {
        name: "Prefix Sum",
        subPatterns: [
          {
            name: "1D prefix",
            color: "c-green",
            signals: ["range sum query", "subarray sum = k", "multiple queries"],
            howTo: "Build <code>pre[i] = pre[i-1] + arr[i]</code>. Range sum <code>[l,r]</code> = <code>pre[r] - pre[l-1]</code>. For sum=k: use hashmap of prefix counts.",
            examples: ["Subarray sum equals k", "Range sum query", "Count of subarrays with equal 0s and 1s"]
          },
          {
            name: "2D prefix",
            color: "c-green",
            signals: ["matrix region sum", "2D grid queries"],
            howTo: "Build <code>pre[i][j]</code> = sum of rectangle (0,0) → (i,j). Region sum = inclusion-exclusion of 4 corners. Precompute O(mn), query O(1).",
            examples: ["Range sum query 2D", "Max sum rectangle", "Count submatrices with all ones"]
          }
        ]
      },
      {
        name: "Kadane's / Subarray",
        subPatterns: [
          {
            name: "Max subarray",
            color: "c-amber",
            signals: ["max subarray sum", "contiguous", "negative numbers"],
            howTo: "Track <code>curSum</code> = max(<code>num</code>, <code>curSum+num</code>). Reset to 0 when goes negative. <code>maxSum</code> = running max of <code>curSum</code>. O(n).",
            examples: ["Maximum subarray", "Max product subarray", "Circular max subarray"]
          },
          {
            name: "Max product",
            color: "c-amber",
            signals: ["max product", "negatives flip sign"],
            howTo: "Track both <code>curMax</code> and <code>curMin</code> (neg × neg = pos). At each step: <code>curMax = max(num, num*curMax, num*curMin)</code>. Similarly for <code>curMin</code>.",
            examples: ["Maximum product subarray", "Maximum product of three numbers", "Product of array except self"]
          }
        ]
      },
      {
        name: "Intervals",
        subPatterns: [
          {
            name: "Merge intervals",
            color: "c-coral",
            signals: ["overlapping intervals", "merge", "meeting rooms"],
            howTo: "Sort by start time. Iterate: if <code>cur.start ≤ prev.end</code> → merge (extend end). Else push new interval. Output merged list.",
            examples: ["Merge intervals", "Insert interval", "Non-overlapping intervals"]
          },
          {
            name: "Sweep line",
            color: "c-coral",
            signals: ["meeting rooms needed", "max overlap", "events on timeline"],
            howTo: "Create events: +1 at start, -1 at end. Sort events. Sweep: track running count. Max count = answer (peak simultaneous overlap).",
            examples: ["Meeting rooms II", "Car pooling", "My calendar III"]
          }
        ]
      }
    ]
  },
  {
    id: "search",
    icon: "🔍",
    title: "Binary Search",
    colorClass: "s-search",
    patterns: [
      {
        name: "Binary Search",
        subPatterns: [
          {
            name: "Classic",
            color: "c-teal",
            signals: ["sorted array", "find target", "O(log n) needed"],
            howTo: "<code>l=0, r=n-1</code>. <code>mid=(l+r)//2</code>. If <code>arr[mid]==target</code> → return. If <code>arr[mid]&lt;target</code> → <code>l=mid+1</code> else <code>r=mid-1</code>.",
            examples: ["Binary search", "Search insert position", "Guess number higher/lower"]
          },
          {
            name: "Find boundary",
            color: "c-teal",
            signals: ["first/last position", "leftmost/rightmost"],
            howTo: "On match: record answer, then keep searching left (for first) or right (for last). <code>r=mid-1</code> for leftmost, <code>l=mid+1</code> for rightmost. Never stop early.",
            examples: ["Find first and last position", "Count of element in sorted array", "Leftmost column with 1 (matrix)"]
          },
          {
            name: "Rotated array",
            color: "c-teal",
            signals: ["rotated sorted", "pivot", "one side always sorted"],
            howTo: "One half is always sorted. Check which half: if <code>arr[l]≤arr[mid]</code> left is sorted. Decide which half target falls in. Recurse on that half.",
            examples: ["Search in rotated sorted array", "Find minimum in rotated array", "Search in rotated array II (with dups)"]
          },
          {
            name: "Search on answer",
            color: "c-teal",
            signals: ["minimum maximum", "feasible?", "monotonic condition"],
            howTo: "BS on the answer space. Write <code>feasible(mid)</code> → bool. If feasible, try smaller (minimize) or larger (maximize). Shrink range until converged.",
            examples: ["Koko eating bananas", "Minimum days to make m bouquets", "Split array largest sum"]
          },
          {
            name: "Matrix binary search",
            color: "c-teal",
            signals: ["sorted matrix", "search 2D", "treat as 1D"],
            howTo: "Map <code>mid</code> index to 2D: <code>row=mid//cols</code>, <code>col=mid%cols</code>. Run standard BS on virtual 1D array of size <code>m×n</code>.",
            examples: ["Search a 2D matrix", "Kth smallest in sorted matrix", "Find peak element II"]
          }
        ]
      }
    ]
  },
  {
    id: "linked",
    icon: "🔗",
    title: "Linked List",
    colorClass: "s-linked",
    patterns: [
      {
        name: "Fast & Slow Pointers",
        subPatterns: [
          {
            name: "Cycle detection",
            color: "c-green",
            signals: ["cycle", "circular", "loop in list"],
            howTo: "Floyd's: <code>slow=fast=head</code>. Move slow 1 step, fast 2 steps. If they meet → cycle exists. To find entry: reset slow to head, move both 1 step until meet again.",
            examples: ["Linked list cycle", "Linked list cycle II (entry point)", "Happy number"]
          },
          {
            name: "Middle / Nth",
            color: "c-green",
            signals: ["middle node", "nth from end", "palindrome list"],
            howTo: "For middle: fast moves 2, slow moves 1 — slow lands at middle. For nth from end: advance fast by n first, then move both until fast hits end.",
            examples: ["Middle of linked list", "Remove nth from end", "Palindrome linked list"]
          }
        ]
      },
      {
        name: "Reversal",
        subPatterns: [
          {
            name: "Full reverse",
            color: "c-amber",
            signals: ["reverse linked list", "reorder"],
            howTo: "Three ptrs: <code>prev=None, cur=head</code>. Each step: save <code>nxt=cur.next</code>, set <code>cur.next=prev</code>, advance <code>prev=cur, cur=nxt</code>. Return <code>prev</code>.",
            examples: ["Reverse linked list", "Reorder list", "Reverse nodes in even length groups"]
          },
          {
            name: "Partial reverse",
            color: "c-amber",
            signals: ["reverse k group", "reverse sublist", "between m and n"],
            howTo: "Find sublist boundaries. Detach sublist, reverse it, re-attach. Use dummy head to simplify edge cases at head. Repeat for k-group variant.",
            examples: ["Reverse linked list II", "Reverse nodes in k-group", "Swap nodes in pairs"]
          }
        ]
      },
      {
        name: "Merge / Sort",
        subPatterns: [
          {
            name: "Merge sorted lists",
            color: "c-coral",
            signals: ["merge k lists", "sorted lists", "merge sort"],
            howTo: "Two lists: compare heads, take smaller, advance that pointer. Use dummy head. K lists: use min-heap of (val, node). Poll min, push its next. O(n log k).",
            examples: ["Merge two sorted lists", "Merge k sorted lists", "Sort list (merge sort)"]
          }
        ]
      }
    ]
  },
  {
    id: "trees",
    icon: "🌳",
    title: "Trees",
    colorClass: "s-trees",
    patterns: [
      {
        name: "DFS on Trees",
        subPatterns: [
          {
            name: "Pre/In/Post order",
            color: "c-amber",
            signals: ["traversal", "visit all nodes", "inorder sorted BST"],
            howTo: "Preorder: process → left → right. Inorder: left → process → right (BST gives sorted). Postorder: left → right → process (bottom-up, good for heights/deletion).",
            examples: ["Binary tree inorder traversal", "Validate BST", "Construct tree from pre+inorder"]
          },
          {
            name: "Path problems",
            color: "c-amber",
            signals: ["root-to-leaf path", "path sum", "max path"],
            howTo: "DFS with running sum. At leaf: check if sum == target. For max path through node: <code>gain = max(0, left_gain) + max(0, right_gain) + node.val</code>. Update global max.",
            examples: ["Path sum II", "Binary tree max path sum", "Sum root to leaf numbers"]
          },
          {
            name: "LCA",
            color: "c-amber",
            signals: ["lowest common ancestor", "common node", "distance between nodes"],
            howTo: "If root is null or equals p or q → return root. Recurse left and right. If both return non-null → root is LCA. Else return whichever is non-null.",
            examples: ["LCA of binary tree", "LCA of BST", "Smallest common region"]
          },
          {
            name: "Tree DP",
            color: "c-amber",
            signals: ["at each node decide", "include/exclude", "rob the tree"],
            howTo: "Return tuple from each node: <code>(with_root, without_root)</code>. Parent uses both values to decide. Classic post-order DP — children computed first.",
            examples: ["House robber III", "Diameter of binary tree", "Balanced binary tree"]
          }
        ]
      },
      {
        name: "BFS on Trees",
        subPatterns: [
          {
            name: "Level order",
            color: "c-blue",
            signals: ["level by level", "width", "zigzag", "right side view"],
            howTo: "Queue with level separator. Start: push root. Each iteration: process all nodes at current level (snapshot queue size), push their children. Collect per-level results.",
            examples: ["Binary tree level order traversal", "Binary tree right side view", "Zigzag level order traversal"]
          },
          {
            name: "Min depth / spread",
            color: "c-blue",
            signals: ["minimum depth", "shortest path tree", "closest leaf"],
            howTo: "BFS finds shortest path first. Stop at first leaf node reached — that's minimum depth. No need to visit entire tree unlike DFS.",
            examples: ["Minimum depth of binary tree", "Find closest leaf in binary tree", "All nodes at distance k in binary tree"]
          }
        ]
      },
      {
        name: "BST Operations",
        subPatterns: [
          {
            name: "BST property use",
            color: "c-pink",
            signals: ["kth smallest", "BST", "inorder gives sorted"],
            howTo: "Inorder of BST = sorted array. Use this for kth element, range queries. Insert/delete maintain BST property. For range: prune branches outside [lo,hi].",
            examples: ["Kth smallest in BST", "Range sum of BST", "Delete node in BST"]
          }
        ]
      }
    ]
  },
  {
    id: "graphs",
    icon: "🕸️",
    title: "Graphs",
    colorClass: "s-graphs",
    patterns: [
      {
        name: "Graph Traversal",
        subPatterns: [
          {
            name: "DFS (graph)",
            color: "c-coral",
            signals: ["connected components", "islands", "cycle detect", "flood fill"],
            howTo: "Visited set + recursive DFS or iterative stack. Mark node visited before recursing. For grid: 4-directional DFS. Cycle detection: use 3-color (white/gray/black) states.",
            examples: ["Number of islands", "Course schedule (cycle detect)", "Pacific Atlantic water flow"]
          },
          {
            name: "BFS (graph)",
            color: "c-coral",
            signals: ["shortest path unweighted", "min steps", "spread/infection"],
            howTo: "Queue + visited set. Push source, mark visited. Each level = 1 step/distance. First time reaching target = shortest path. Multi-source BFS: push all sources at once.",
            examples: ["Rotting oranges", "Word ladder", "01 matrix"]
          },
          {
            name: "Multi-source BFS",
            color: "c-coral",
            signals: ["distance to nearest", "spread from multiple"],
            howTo: "Push ALL source nodes into queue simultaneously at step 0. BFS spreads outward simultaneously. Each cell gets distance from its nearest source.",
            examples: ["Distance to nearest 0 in matrix", "Walls and gates", "Map of highest peak"]
          }
        ]
      },
      {
        name: "Shortest Path",
        subPatterns: [
          {
            name: "Dijkstra",
            color: "c-blue",
            signals: ["weighted graph", "min cost path", "non-negative weights"],
            howTo: "Min-heap of <code>(cost, node)</code>. Pop smallest cost, skip if already visited. Push neighbors with updated cost. First time popping a node = shortest distance found.",
            examples: ["Network delay time", "Path with min effort", "Cheapest flights within k stops"]
          },
          {
            name: "Bellman-Ford",
            color: "c-blue",
            signals: ["negative weights", "negative cycle", "at most k edges"],
            howTo: "Relax ALL edges N-1 times. <code>dist[v] = min(dist[v], dist[u]+w)</code>. After N-1 rounds, run one more — if any distance still decreases → negative cycle exists.",
            examples: ["Cheapest flights within k stops", "Negative cycle detection", "Minimum cost to reach destination"]
          }
        ]
      },
      {
        name: "Union Find",
        subPatterns: [
          {
            name: "Basic DSU",
            color: "c-green",
            signals: ["connected components", "union groups", "dynamic connectivity"],
            howTo: "Two ops: <b>find(x)</b> with path compression, <b>union(x,y)</b> with rank. <code>find</code>: recurse to root, flatten path. <code>union</code>: attach smaller tree under larger.",
            examples: ["Number of provinces", "Redundant connection", "Accounts merge"]
          },
          {
            name: "Kruskal MST",
            color: "c-green",
            signals: ["minimum spanning tree", "connect all nodes min cost"],
            howTo: "Sort edges by weight. Iterate: if endpoints in different components → add edge (union them). Stop when N-1 edges added. Total cost = MST weight.",
            examples: ["Min cost to connect all points", "Optimize water distribution", "Find critical and pseudo-critical edges"]
          }
        ]
      },
      {
        name: "Topological Sort",
        subPatterns: [
          {
            name: "Kahn's (BFS)",
            color: "c-pink",
            signals: ["dependency order", "course schedule", "prerequisites", "DAG"],
            howTo: "Compute in-degree of all nodes. Push 0-in-degree nodes to queue. Pop node, append to result, decrement neighbors' in-degree. Push any that reach 0. If result size &lt; N → cycle exists.",
            examples: ["Course schedule II", "Alien dictionary", "Sequence reconstruction"]
          },
          {
            name: "DFS topo sort",
            color: "c-pink",
            signals: ["task ordering", "build order"],
            howTo: "DFS with 3-color visited (0=unvisited, 1=in-progress, 2=done). Push to stack AFTER all descendants are done. Reverse stack = topological order. In-progress revisit = cycle.",
            examples: ["Course schedule (detect cycle)", "Find eventual safe states", "Parallel courses"]
          }
        ]
      }
    ]
  },
  {
    id: "dp",
    icon: "🧩",
    title: "Dynamic Programming",
    colorClass: "s-dp",
    patterns: [
      {
        name: "1D DP",
        subPatterns: [
          {
            name: "Linear DP",
            color: "c-pink",
            signals: ["choices at each index", "climb stairs", "rob houses"],
            howTo: "Define <code>dp[i]</code> = answer up to index i. Transition from previous state(s). Often: <code>dp[i] = max/min(dp[i-1]+x, dp[i-2]+y, ...)</code>. Space can be optimized to O(1) if only last few states needed.",
            examples: ["Climbing stairs", "House robber", "Decode ways"]
          },
          {
            name: "LIS (Longest Inc. Subseq.)",
            color: "c-pink",
            signals: ["longest increasing", "non-decreasing subsequence"],
            howTo: "O(n²): <code>dp[i] = max(dp[j]+1)</code> for all j&lt;i where <code>arr[j]&lt;arr[i]</code>. O(n log n): maintain tails array, binary search for correct position to place each element.",
            examples: ["Longest increasing subsequence", "Russian doll envelopes", "Number of LIS"]
          },
          {
            name: "State machine",
            color: "c-pink",
            signals: ["buy/sell stock", "cooldown", "at most k transactions"],
            howTo: "Model states: hold/not-hold, cooldown/ready. Transitions between states at each day. <code>dp[i][state]</code>. Works for all stock problems including cooldown and k-transactions.",
            examples: ["Best time to buy/sell stock III", "Stock with cooldown", "Stock with transaction fee"]
          }
        ]
      },
      {
        name: "2D DP",
        subPatterns: [
          {
            name: "Grid DP",
            color: "c-purple",
            signals: ["unique paths", "grid", "min cost path"],
            howTo: "<code>dp[i][j]</code> = answer at cell (i,j). Transition from top <code>dp[i-1][j]</code> and left <code>dp[i][j-1]</code>. Handle obstacles by setting to 0 or ∞. Fill row by row.",
            examples: ["Unique paths II", "Minimum path sum", "Dungeon game"]
          },
          {
            name: "LCS / Edit distance",
            color: "c-purple",
            signals: ["two strings", "common subsequence", "edit distance"],
            howTo: "<code>dp[i][j]</code> comparing first i chars of s1, j chars of s2. Match: <code>dp[i][j]=dp[i-1][j-1]+1</code>. Mismatch: take max/min from left, top, diagonal based on operation.",
            examples: ["Longest common subsequence", "Edit distance", "Distinct subsequences"]
          },
          {
            name: "Interval DP",
            color: "c-purple",
            signals: ["burst balloons", "palindrome partition", "matrix chain"],
            howTo: "Fill by increasing interval length. <code>dp[i][j]</code> = answer for range [i,j]. Try all split points <code>k</code> in [i,j]. Process smaller intervals first (bottom-up by length).",
            examples: ["Burst balloons", "Strange printer", "Minimum cost to cut a stick"]
          }
        ]
      },
      {
        name: "Knapsack",
        subPatterns: [
          {
            name: "0/1 Knapsack",
            color: "c-teal",
            signals: ["subset sum", "partition equal", "each item once"],
            howTo: "<code>dp[i][w]</code> = max value with first i items, capacity w. Either skip item: <code>dp[i-1][w]</code> or take: <code>dp[i-1][w-wt]+val</code>. Space optimize: iterate w in reverse.",
            examples: ["Partition equal subset sum", "Target sum (assign +/-)", "Last stone weight II"]
          },
          {
            name: "Unbounded Knapsack",
            color: "c-teal",
            signals: ["coin change", "unlimited use", "complete knapsack"],
            howTo: "Same as 0/1 but iterate capacity <b>forward</b> (not reverse), allowing reuse. <code>dp[w] = min(dp[w], dp[w-coin]+1)</code>. Item can be picked multiple times.",
            examples: ["Coin change", "Coin change II (ways)", "Perfect squares"]
          }
        ]
      },
      {
        name: "Bitmask DP",
        subPatterns: [
          {
            name: "DP on subsets",
            color: "c-amber",
            signals: ["n ≤ 20", "all subsets", "TSP-like", "assign to all"],
            howTo: "<code>dp[mask]</code> = answer for subset represented by mask. Transition: try adding each unset bit. <code>mask|(1&lt;&lt;i)</code> to include element i. Iterate masks from 0 to 2^n-1.",
            examples: ["Minimum cost to hire workers", "Shortest path visiting all nodes", "Stickers to spell word"]
          }
        ]
      }
    ]
  },
  {
    id: "stack",
    icon: "📚",
    title: "Stack & Queue",
    colorClass: "s-stack",
    patterns: [
      {
        name: "Monotonic Stack",
        subPatterns: [
          {
            name: "Next greater",
            color: "c-blue",
            signals: ["next greater element", "next warmer day", "visible buildings"],
            howTo: "Stack stores indices. For each element: while stack not empty AND <code>arr[stack.top()] &lt; curr</code> → pop and assign answer. Push current index. Stack stays decreasing.",
            examples: ["Daily temperatures", "Next greater element I/II", "Online stock span"]
          },
          {
            name: "Histogram / area",
            color: "c-blue",
            signals: ["largest rectangle", "trapped water", "max area"],
            howTo: "Maintain increasing stack of indices. When curr height &lt; stack top: pop, compute area with popped bar as height. Width = distance to current left boundary. Classic for histogram and trapping water.",
            examples: ["Largest rectangle in histogram", "Trapping rain water", "Maximal rectangle"]
          },
          {
            name: "Expression eval",
            color: "c-blue",
            signals: ["evaluate expression", "parentheses", "calculator"],
            howTo: "Push numbers and prev operator to stack when encountering <code>(</code> or operator. On <code>)</code>: pop and compute. Handle precedence by computing +/- lazily and */÷ eagerly.",
            examples: ["Basic calculator II", "Evaluate reverse polish notation", "Decode string"]
          }
        ]
      },
      {
        name: "Special Stack",
        subPatterns: [
          {
            name: "Min/Max stack",
            color: "c-teal",
            signals: ["getMin in O(1)", "max stack", "track extremes"],
            howTo: "Maintain auxiliary stack of minimums. Push: if <code>val ≤ minStack.top()</code>, push to minStack too. Pop: if top equals minStack top, pop both. <code>getMin()</code> = minStack top.",
            examples: ["Min stack", "Max stack", "Sliding window maximum (deque variant)"]
          },
          {
            name: "Monotonic deque",
            color: "c-teal",
            signals: ["sliding window max/min", "window of size k", "O(n) window extreme"],
            howTo: "Deque stores indices in decreasing order (for max). Add right: pop from back while back &lt; curr. Remove left: pop front if out of window. Front = current window max.",
            examples: ["Sliding window maximum", "Shortest subarray sum ≥ k", "Max value of equation"]
          }
        ]
      }
    ]
  },
  {
    id: "heap",
    icon: "⛰️",
    title: "Heap / Priority Queue",
    colorClass: "s-heap",
    patterns: [
      {
        name: "Heap Patterns",
        subPatterns: [
          {
            name: "Top K elements",
            color: "c-coral",
            signals: ["top k", "kth largest", "k most frequent"],
            howTo: "Min-heap of size k. For each element: push, then if size &gt; k → pop. At end, heap contains top K largest. For kth largest: heap top is answer. O(n log k).",
            examples: ["Kth largest element", "Top K frequent elements", "K closest points to origin"]
          },
          {
            name: "Two heaps",
            color: "c-coral",
            signals: ["median of stream", "sliding median", "balance two halves"],
            howTo: "Max-heap for lower half, min-heap for upper half. Keep sizes equal (or lower = upper+1). Median = top of lower (odd total) or average of both tops (even). Rebalance after each insert.",
            examples: ["Find median from data stream", "Sliding window median", "IPO (capital problem)"]
          },
          {
            name: "K-way merge",
            color: "c-coral",
            signals: ["merge k sorted", "kth smallest in matrix", "multiple sorted streams"],
            howTo: "Push first element of each list into min-heap with (val, list_idx, elem_idx). Pop min, push next from same list. Repeat k times for kth smallest. Merges k streams in O(n log k).",
            examples: ["Merge k sorted lists", "Kth smallest in sorted matrix", "Smallest range covering k lists"]
          }
        ]
      }
    ]
  },
  {
    id: "back",
    icon: "↩️",
    title: "Backtracking",
    colorClass: "s-back",
    patterns: [
      {
        name: "Backtracking",
        subPatterns: [
          {
            name: "Subsets",
            color: "c-green",
            signals: ["all subsets", "power set", "combinations"],
            howTo: "DFS with start index. At each node: add current path to result. For each i from start: add <code>arr[i]</code>, recurse with <code>i+1</code> (or <code>i</code> for repetition), remove <code>arr[i]</code>.",
            examples: ["Subsets", "Subsets II (with duplicates)", "Combination sum"]
          },
          {
            name: "Permutations",
            color: "c-green",
            signals: ["all permutations", "arrangements", "order matters"],
            howTo: "Use visited array. At each step: try all unvisited elements, mark visited, recurse, unmark. For duplicates: sort first, skip if <code>arr[i]==arr[i-1]</code> and prev not visited.",
            examples: ["Permutations", "Permutations II (duplicates)", "Next permutation"]
          },
          {
            name: "Grid/Maze BT",
            color: "c-green",
            signals: ["word search", "paths in grid", "N-queens"],
            howTo: "Mark cell visited before recursing, unmark after. Explore 4 directions. Prune early if current path can't possibly reach target (length exceeded, wrong char etc.).",
            examples: ["Word search", "N-queens", "Sudoku solver"]
          },
          {
            name: "Pruning",
            color: "c-green",
            signals: ["large search space", "prune branches", "TLE without pruning"],
            howTo: "Sort input. Skip duplicate choices at same level. Prune if: remaining sum impossible, path already exceeds target, constraint violated. Transforms exponential to feasible.",
            examples: ["Palindrome partitioning", "Letter combinations of phone number", "Expression add operators"]
          }
        ]
      }
    ]
  },
  {
    id: "math",
    icon: "⚡",
    title: "Math & Bit Manipulation",
    colorClass: "s-math",
    patterns: [
      {
        name: "Bit Manipulation",
        subPatterns: [
          {
            name: "XOR tricks",
            color: "c-amber",
            signals: ["single number", "find missing", "pairs cancel out"],
            howTo: "XOR all elements: pairs cancel to 0, single remains. <code>a^a=0, a^0=a</code>. For two singles: XOR all, find set bit, partition array by that bit, XOR each partition.",
            examples: ["Single number", "Single number III", "Missing number"]
          },
          {
            name: "Bit ops",
            color: "c-amber",
            signals: ["count bits", "power of 2", "subset enumeration"],
            howTo: "<code>n&(n-1)</code> clears lowest set bit (power of 2 check, count bits). <code>n&(-n)</code> isolates lowest set bit. Iterate subsets of mask: <code>for sub=mask; sub&gt;0; sub=(sub-1)&mask</code>.",
            examples: ["Number of 1 bits", "Counting bits", "Reverse bits"]
          },
          {
            name: "Cyclic sort",
            color: "c-amber",
            signals: ["array 1 to n", "find missing/duplicate", "in-place sort"],
            howTo: "Each number should be at index <code>num-1</code>. While <code>arr[i] != arr[arr[i]-1]</code>: swap <code>arr[i]</code> with <code>arr[arr[i]-1]</code>. After: check which index has wrong number = missing/duplicate.",
            examples: ["Find all missing numbers", "Find all duplicates", "First missing positive"]
          }
        ]
      },
      {
        name: "Math Tricks",
        subPatterns: [
          {
            name: "Modular / Fast pow",
            color: "c-green",
            signals: ["pow(x,n)", "modulo large", "exponentiation"],
            howTo: "Fast power: <code>if n%2==0: return pow(x,n//2)²</code> else <code>x * pow(x,n-1)</code>. O(log n). For modular: apply mod at each multiplication step to prevent overflow.",
            examples: ["Pow(x, n)", "Super pow", "Count good numbers"]
          },
          {
            name: "Number theory",
            color: "c-green",
            signals: ["GCD/LCM", "prime sieve", "digit problems"],
            howTo: "GCD: Euclidean — <code>gcd(a,b) = gcd(b, a%b)</code>. Sieve of Eratosthenes for all primes up to n in O(n log log n). Digit DP for counting numbers with digit constraints.",
            examples: ["Ugly number II", "Count primes", "Excel sheet column number"]
          }
        ]
      }
    ]
  },
  {
    id: "adv",
    icon: "🚀",
    title: "Advanced Patterns",
    colorClass: "s-adv",
    patterns: [
      {
        name: "Trie",
        subPatterns: [
          {
            name: "Basic trie",
            color: "c-blue",
            signals: ["prefix search", "word dictionary", "autocomplete"],
            howTo: "Each node: array/map of 26 children + <code>isEnd</code> flag. Insert: create nodes along path. Search: traverse, check <code>isEnd</code>. StartsWith: traverse, check existence of path.",
            examples: ["Implement trie", "Design add and search words", "Longest word in dictionary"]
          },
          {
            name: "Trie + backtrack",
            color: "c-blue",
            signals: ["word search II", "find all words", "board search"],
            howTo: "Build trie from word list. DFS on board: at each cell navigate trie simultaneously. If <code>trie.isEnd</code> → found word. Prune DFS branch if no trie child exists for current char.",
            examples: ["Word search II", "Concatenated words", "Maximum XOR of two numbers (XOR trie)"]
          }
        ]
      },
      {
        name: "Segment Tree",
        subPatterns: [
          {
            name: "Range query",
            color: "c-amber",
            signals: ["range min/max/sum", "point update", "dynamic range queries"],
            howTo: "Build tree bottom-up. Query [l,r]: if node range fully inside → return. If outside → return identity. Split and combine children. Point update propagates up. O(log n) per op.",
            examples: ["Range sum query - mutable", "Count of smaller numbers after self", "The skyline problem"]
          },
          {
            name: "BIT/Fenwick",
            color: "c-amber",
            signals: ["prefix sums with updates", "order statistics"],
            howTo: "Simpler than seg tree for prefix sums. Update: <code>i += i&(-i)</code> to propagate up. Query prefix sum: <code>i -= i&(-i)</code> to collect. O(log n) both ops, constant factor better than seg tree.",
            examples: ["Range sum query mutable", "Count of range sum", "Reverse pairs"]
          }
        ]
      },
      {
        name: "Matrix as Graph",
        subPatterns: [
          {
            name: "2D → Graph",
            color: "c-teal",
            signals: ["grid BFS/DFS", "island", "surrounded regions", "maze"],
            howTo: "Each cell is a node. Neighbors = 4-directional (or 8). BFS for shortest path, DFS for connected components. Use <code>(row,col)</code> as node ID. Mark visited in-place (modify grid) or use visited set.",
            examples: ["Surrounded regions", "Shortest path in binary matrix", "Number of closed islands"]
          }
        ]
      },
      {
        name: "Meet in Middle",
        subPatterns: [
          {
            name: "Split + merge",
            color: "c-pink",
            signals: ["n ≈ 40", "subset sum large n", "2^n too slow"],
            howTo: "Split array in half. Enumerate all 2^(n/2) subsets of each half. Sort one half's sums. For each sum in other half, binary search complement. Reduces O(2^n) to O(2^(n/2) log n).",
            examples: ["Partition to k equal subsets", "Split array with same average", "4Sum (meet in middle variant)"]
          }
        ]
      },
      {
        name: "Hashmap Patterns",
        subPatterns: [
          {
            name: "Frequency / index map",
            color: "c-coral",
            signals: ["uniqueness", "two sum", "group anagrams", "seen before?"],
            howTo: "Map element → index for O(1) lookup (Two Sum). Map sort/tuple → group (Anagrams). Map prefix → count (subarray sum). Map char → last index (sliding window uniqueness).",
            examples: ["Two sum", "Group anagrams", "Longest consecutive sequence"]
          }
        ]
      }
    ]
  }
];
