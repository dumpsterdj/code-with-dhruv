// src/data/course/sections/section7-collections-i.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'collections-i',
    title: 'Section 7 — Collections I (Lists & Tuples)',
    summary: 'Lists & tuples, indexing & slicing, mutability, copying, and basic loop patterns.',
    duration: 50,
    content:
      'Learn the two most common sequence types in Python: lists (changeable) and tuples (read-only). Master indexing, slicing, mutating, and safe copying.',
    startHere: {
      goals: [
        'Create and index lists; slice safely (start/stop/step, negatives).',
        'Use core list methods and understand in-place mutation.',
        'Copy lists correctly; know reference vs copy, shallow vs deep.',
        'Use tuples for fixed/read-only data; pack/unpack values.',
        'Iterate with for/enumerate/zip and write simple list builds.'
      ],
      prerequisites: [
        'Section 3 — Variables & Types',
        'Section 4 — Operators & Expressions',
        'Section 5 — Control Flow'
      ],
      resources: [
        { label: 'Sequence Types (docs)', href: 'https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range' },
        { label: 'list methods', href: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists' },
        { label: 'copy module', href: 'https://docs.python.org/3/library/copy.html' }
      ],
      tip: 'Many list methods mutate and return None (e.g., .sort(), .append()). Use the return value only if docs say so.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'lists-basics',
        title: 'Lists: create, index, slice',
        body: `A **list** holds an ordered collection and is **mutable** (changeable).
Indexing starts at 0. Slicing uses start:stop:step; stop is excluded. Slices never fail if stop is too large.`,
        codes: [
          {
            label: 'Create & index',
            text: `nums = [10, 20, 30, 40]
print(nums[0], nums[-1])     # 10 40
nums[1] = 99                 # mutate
print(nums)                  # [10, 99, 30, 40]`
          },
          {
            label: 'Slicing',
            text: `s = ["a","b","c","d","e"]
print(s[1:4])     # ['b','c','d']
print(s[:3])      # first 3
print(s[3:])      # from index 3 to end
print(s[::-1])    # reversed copy`
          },
          {
            label: 'Nested lists (2D)',
            text: `grid = [[1,2,3],[4,5,6]]
print(grid[0][2])   # 3
row = grid[1]
print(row)          # [4,5,6]`
          }
        ]
      },

      {
        id: 'list-methods',
        title: 'List mutability & common methods',
        body: `Lists change in place. Key methods:
• add: .append(x), .extend(iter), .insert(i,x)
• remove: .remove(x) (first match), .pop([i]) (returns item), .clear()
• order: .sort(key=..., reverse=...), .reverse()
**sorted(iterable)** returns a new list without changing the original.`,
        codes: [
          {
            label: 'Add & remove',
            text: `items = ["a","c"]
items.append("d")           # ['a','c','d']
items.insert(1, "b")        # ['a','b','c','d']
items.remove("c")           # ['a','b','d']
last = items.pop()          # removes 'd'; last == 'd'
print(items, last)`
          },
          {
            label: 'Sort vs sorted',
            text: `nums = [3,1,2]
sorted_nums = sorted(nums)      # new list
print(nums, sorted_nums)        # [3,1,2] [1,2,3]
nums.sort(reverse=True)         # mutate in place
print(nums)                     # [3,2,1]`
          },
          {
            label: 'Reverse & extend',
            text: `a = [1,2,3]
a.reverse()                     # [3,2,1]
a.extend([4,5])                 # [3,2,1,4,5]
print(a)`
          }
        ]
      },

      {
        id: 'copying',
        title: 'Copies, references & shallow vs deep',
        body: `Assignment copies the **reference**, not the data. To copy a list: slice \`a[:]\`, call \`list(a)\` or \`a.copy()\`.
These are **shallow** copies: nested lists still point to the same inner objects. Use \`copy.deepcopy\` for independent deep copies.`,
        codes: [
          {
            label: 'Reference vs copy',
            text: `a = [1,2]
b = a            # same list
b.append(3)
print(a)         # [1,2,3]  (changed!)

a = [1,2]
c = a[:]         # shallow copy
c.append(3)
print(a, c)      # [1,2] [1,2,3]`
          },
          {
            label: 'Shallow pitfall',
            text: `m1 = [[1],[2]]
m2 = m1[:]              # shallow copy
m2[0].append(99)
print(m1)               # [[1,99],[2]] (shares inner list!)`
          },
          {
            label: 'Deep copy',
            text: `import copy
m1 = [[1],[2]]
m3 = copy.deepcopy(m1)  # independent
m3[0].append(99)
print(m1, m3)           # [[1],[2]] [[1,99],[2]]`
          }
        ]
      },

      {
        id: 'tuples',
        title: 'Tuples: read-only sequences',
        body: `A **tuple** is like a list but **immutable** (can’t change). Good for fixed records or as dict keys.
Create with parentheses (or just commas). Single-element tuples need a trailing comma.`,
        codes: [
          {
            label: 'Create & use',
            text: `pt = (10, 20)
print(pt[0])           # 10
# pt[0] = 99           # TypeError (immutable)
user = ("Asha", 12)    # name, age`
          },
          {
            label: 'Packing & unpacking',
            text: `x, y = 1, 2         # pack/unpack
x, y = y, x           # swap
t = (5,)              # single-element tuple
print(t, len(t))      # (5,) 1`
          },
          {
            label: 'As dict keys',
            text: `rates = {("USD","INR"): 83.2}
print(rates[("USD","INR")])  # 83.2`
          }
        ]
      },

      {
        id: 'loop-patterns',
        title: 'Looping lists/tuples (patterns)',
        body: `Iterate items directly; use \`enumerate\` for index+value and \`zip\` to walk lists together.
Build filtered/mapped results with simple loops (we’ll go deeper with comprehensions later).`,
        codes: [
          {
            label: 'for & enumerate',
            text: `fruits = ["apple","banana","guava"]
for f in fruits:
    print(f)

for i, f in enumerate(fruits):
    print(i, f)`
          },
          {
            label: 'zip through two lists',
            text: `names = ["Asha","Raj","Mia"]
scores = [88, 92, 79]
for name, sc in zip(names, scores):
    print(f"{name}: {sc}")`
          },
          {
            label: 'Build new lists',
            text: `nums = [1,2,3,4,5,6]
evens = []
for x in nums:
    if x % 2 == 0:
        evens.append(x)
squares = []
for x in nums:
    squares.append(x*x)
print(evens, squares)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's7-middle-three',
        title: 'Middle three',
        prompt: 'Given a list with odd length, print the middle three elements (use slicing).',
        starterCode: `data = [3, 8, 9, 12, 15, 18, 21]  # example
# your code`,
        solution: `n = len(data)
mid = n // 2
print(data[mid-1:mid+2])`
      },
      {
        id: 's7-inplace-zero-neg',
        title: 'Zero out negatives (in place)',
        prompt: 'Replace all negative numbers in a list with 0 (mutate the list).',
        starterCode: `nums = [3, -2, 5, -7, 0, 4]
# your code`,
        solution: `for i, v in enumerate(nums):
    if v < 0:
        nums[i] = 0
print(nums)`
      },
      {
        id: 's7-unique-order',
        title: 'Unique while keeping order',
        prompt: 'Remove duplicates from a list while preserving the first occurrence order.',
        solution: `seen = set()
out = []
for x in [1,2,1,3,2,4,1]:
    if x not in seen:
        seen.add(x)
        out.append(x)
print(out)`
      },
      {
        id: 's7-min-max-index',
        title: 'Min, max, and positions',
        prompt: 'Print the min and max values and their first index in the list.',
        starterCode: `nums = [5, 2, 9, 2, 7]
# your code`,
        solution: `mn = min(nums); mx = max(nums)
print(mn, nums.index(mn))
print(mx, nums.index(mx))`
      },
      {
        id: 's7-tuple-swap',
        title: 'Swap with tuples',
        prompt: 'Read two values and swap them using tuple unpacking. Print before and after.',
        solution: `a = input("A: ")
b = input("B: ")
print("before:", a, b)
a, b = b, a
print("after:", a, b)`
      }
    ]
  }
]
