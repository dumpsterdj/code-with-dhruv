// src/data/course/sections/section8-collections-ii.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'collections-ii',
    title: 'Section 8 — Collections II (Dicts & Sets, Comprehensions & Useful Data Structures)',
    summary: 'Dictionaries & sets, common operations, comprehensions, and handy containers from collections/heapq.',
    duration: 60,
    content:
      'Store key→value pairs with dict, unique items with set, build new containers quickly with comprehensions, and reach for purpose-built structures when needed.',
    startHere: {
      goals: [
        'Create/modify dictionaries; iterate keys/values/items, and merge safely.',
        'Use sets for uniqueness and fast membership; apply set algebra.',
        'Write list/dict/set comprehensions (with filters & simple transforms).',
        'Know when to use Counter, defaultdict, deque, heapq, and dataclasses.'
      ],
      prerequisites: [
        'Section 7 — Collections I (Lists & Tuples)'
      ],
      resources: [
        { label: 'Dicts (docs)', href: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict' },
        { label: 'Sets (docs)', href: 'https://docs.python.org/3/library/stdtypes.html#set' },
        { label: 'collections module', href: 'https://docs.python.org/3/library/collections.html' },
        { label: 'heapq', href: 'https://docs.python.org/3/library/heapq.html' }
      ],
      tip: 'Dict keys and set items must be hashable (immutable) — e.g., str, int, tuple. Lists/dicts cannot be keys.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'dict-basics',
        title: 'Dictionaries: key → value basics',
        body: `A **dict** maps keys to values. Keys must be hashable (immutable). Common ops: read/write with \`[]\`, safe read with \`.get()\`, add/update with \`[]\` or \`.update()\`, delete with \`del\` or \`.pop()\`. Merge with \`|\\\` (3.9+).`,
        codes: [
          {
            label: 'Create & access',
            text: `user = {"name": "Asha", "age": 12}
print(user["name"])          # Asha
user["city"] = "Pune"        # add/update
print(user.get("email"))     # None (safe)
print(user.get("email", "")) # '' default`
          },
          {
            label: 'Delete & merge',
            text: `del user["age"]
removed = user.pop("city", "N/A")  # returns removed value
a = {"x": 1, "y": 2}
b = {"y": 20, "z": 3}
c = a | b        # Python 3.9+: merge, right wins
print(c)         # {'x':1,'y':20,'z':3}`
          },
          {
            label: 'Nested dict',
            text: `profile = {
    "name": "Raj",
    "scores": {"math": 92, "eng": 85}
}
print(profile["scores"]["math"])  # 92`
          }
        ]
      },

      {
        id: 'dict-iterate',
        title: 'Iterating dicts & transforming with comprehension',
        body: `Loop over keys (default), values with \`.values()\`, pairs with \`.items()\`.  
Dict comprehensions build new dicts from sequences or existing dicts, often with a simple transform or filter.`,
        codes: [
          {
            label: 'Iterate',
            text: `prices = {"apple": 99, "banana": 40}
for k in prices:              # keys
    print(k, prices[k])
for v in prices.values():     # values
    print(v)
for k, v in prices.items():   # pairs
    print(k, v)`
          },
          {
            label: 'Dict comprehension',
            text: `names = ["mia","lee","ASHA"]
norm = {n.lower(): len(n) for n in names}
print(norm)  # {'mia':3,'lee':3,'asha':4}

# filter: keep only expensive items
prices = {"apple":99,"banana":40,"cherry":120}
exp = {k:v for k,v in prices.items() if v >= 100}
print(exp)   # {'cherry': 120}`
          },
          {
            label: 'Sort by value (view)',
            text: `scores = {"Asha":94, "Raj":88, "Mia":79}
for name, sc in sorted(scores.items(), key=lambda kv: kv[1], reverse=True):
    print(name, sc)`
          }
        ]
      },

      {
        id: 'sets-basics',
        title: 'Sets: uniqueness & set algebra',
        body: `A **set** holds unique, unordered items. Fast membership tests. Use set algebra: union \`|\\\`, intersection \`&\\\`, difference \`-\\\`, symmetric diff \`^\\\`.  
Methods: \`.add()\`, \`.update()\`, \`.remove()\` (KeyError) vs \`.discard()\` (safe), \`.pop()\`. Use \`frozenset\` for an immutable set (hashable).`,
        codes: [
          {
            label: 'Create & membership',
            text: `s = {1, 2, 2, 3}
print(s)            # {1,2,3}
print(2 in s)       # True
empty = set()       # {} would be a dict`
          },
          {
            label: 'Algebra',
            text: `a = {1,2,3}; b = {3,4,5}
print(a | b)   # {1,2,3,4,5}
print(a & b)   # {3}
print(a - b)   # {1,2}
print(a ^ b)   # {1,2,4,5}`
          },
          {
            label: 'Modify safely',
            text: `s = {1,2}
s.add(3)         # {1,2,3}
s.discard(9)     # no error
# s.remove(9)    # KeyError
fs = frozenset([1,2])  # immutable`
          }
        ]
      },

      {
        id: 'comprehensions',
        title: 'Comprehensions: list / set / dict',
        body: `Comprehensions build containers succinctly. Keep them simple and readable (one loop + small condition). For complex logic, use normal loops.`,
        codes: [
          {
            label: 'List & set comps',
            text: `nums = [1,2,3,4,5,6]
squares = [x*x for x in nums]                # list
evens = {x for x in nums if x % 2 == 0}      # set
print(squares, evens)`
          },
          {
            label: 'Dict comp (transform)',
            text: `prices = {"apple": 99, "banana": 40}
with_tax = {k: round(v*1.18, 2) for k, v in prices.items()}
print(with_tax)`
          },
          {
            label: 'Nested loops (small only)',
            text: `pairs = [(x,y) for x in [1,2,3] for y in ["a","b"]]
print(pairs)   # [(1,'a'), (1,'b'), (2,'a'), ...]`
          }
        ]
      },

      {
        id: 'useful-ds',
        title: 'Useful data structures: Counter, defaultdict, deque, heapq, dataclass',
        body: `Reach for the **collections** and **heapq** modules when tasks match these patterns: counting, grouping, queues/stacks, top-k, and simple records.`,
        codes: [
          {
            label: 'Counter (frequencies)',
            text: `from collections import Counter
words = "red blue red green blue blue".split()
cnt = Counter(words)
print(cnt)          # Counter({'blue':3,'red':2,'green':1})
print(cnt.most_common(2))  # top-2`
          },
          {
            label: 'defaultdict (grouping)',
            text: `from collections import defaultdict
by_len: dict[int, list[str]] = defaultdict(list)
for w in ["a","to","tea","go","from"]:
    by_len[len(w)].append(w)
print(dict(by_len))`
          },
          {
            label: 'deque (fast ends)',
            text: `from collections import deque
dq = deque([1,2])
dq.append(3); dq.appendleft(0)
print(dq)           # deque([0,1,2,3])
dq.pop(); dq.popleft()
print(dq)           # deque([1,2])`
          },
          {
            label: 'heapq (top-k / priority)',
            text: `import heapq
nums = [7,2,9,4,1,8]
print(heapq.nsmallest(3, nums))  # [1,2,4]
print(heapq.nlargest(2, nums))   # [9,8]`
          },
          {
            label: 'dataclass (simple records)',
            text: `from dataclasses import dataclass
@dataclass
class Student:
    name: str
    score: int = 0

s = Student("Asha", 92)
print(s)            # Student(name='Asha', score=92)`
          }
        ]
      },

      {
        id: 'pitfalls',
        title: 'Pitfalls & tips',
        body: `• Keys/items must be hashable: tuples okay; lists/dicts are not.  
• Don’t mutate a dict/set while iterating it; iterate over a copy or collect changes.  
• Dict \`.update()\` and merge \`|\\\` overwrite existing keys (right-hand wins).  
• Copying: \`d.copy()\` and \`set(s)\` are shallow. Use \`copy.deepcopy\` for nested structures.`,
        codes: [
          {
            label: 'Bad key vs good key',
            text: `# bad: TypeError: unhashable type: 'list'
# d = {[1,2]: "oops"}

good = {(1,2): "ok"}   # tuple is hashable
print(good[(1,2)])`
          },
          {
            label: 'Iterate while mutating (avoid)',
            text: `d = {"a":1,"bad":0,"b":2}
# BAD:
# for k in d:
#     if k == "bad":
#         del d[k]

# Good: build new
clean = {k:v for k,v in d.items() if k != "bad"}
print(clean)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's8-word-count',
        title: 'Word count',
        prompt: 'Given a line of text, print word → frequency sorted by highest count.',
        starterCode: `line = input("Text: ")
# normalize: lower() and split()`,
        solution: `from collections import Counter
cnt = Counter(line.lower().split())
for w, c in cnt.most_common():
    print(w, c)`
      },
      {
        id: 's8-invert-groups',
        title: 'Invert mapping into groups',
        prompt: 'Given student→grade dict, build grade→[students] dict (grouping).',
        starterCode: `grades = {"Asha":"A","Raj":"B","Mia":"A","Lee":"C"}`,
        solution: `from collections import defaultdict
out: dict[str, list[str]] = defaultdict(list)
for name, g in grades.items():
    out[g].append(name)
print(dict(out))`
      },
      {
        id: 's8-set-ops',
        title: 'Email campaign set ops',
        prompt: 'Given two email lists (A and B), print: common, only in A, only in B.',
        starterCode: `A = {"a@x.com","b@x.com","c@x.com"}
B = {"b@x.com","d@x.com"}`,
        solution: `print("common:", A & B)
print("only A:", A - B)
print("only B:", B - A)`
      },
      {
        id: 's8-price-merge',
        title: 'Merge price catalogs (right wins)',
        prompt: 'Merge two dicts of prices with the right dict taking priority, then list items >= 100.',
        starterCode: `old = {"apple": 90, "banana": 40}
new = {"banana": 45, "cherry": 120}`,
        solution: `merged = old | new
exp = {k:v for k,v in merged.items() if v >= 100}
print(merged)
print("expensive:", exp)`
      },
      {
        id: 's8-top3',
        title: 'Top 3 numbers',
        prompt: 'Read N numbers (space-separated) and print the largest 3 using heapq.',
        solution: `import heapq
nums = list(map(int, input().split()))
print(heapq.nlargest(3, nums))`
      },
      {
        id: 's8-unique-words',
        title: 'Unique words (case-insensitive) sorted',
        prompt: 'Read a sentence and print sorted unique lowercase words.',
        solution: `words = {w.lower() for w in input().split()}
print(sorted(words))`
      }
    ]
  }
]
