// src/data/course/sections/section5-control-flow.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'control-flow',
    title: 'Section 5 — Control Flow',
    summary: 'if/elif/else, for/while loops, break/continue, loop-else, and useful patterns.',
    duration: 55,
    content:
      'Decide what your program should do (conditions) and how many times it should do it (loops). Then combine them with common patterns.',
    startHere: {
      goals: [
        'Write clear decisions with if/elif/else (and guard clauses).',
        'Loop over sequences with for, numbers with range(), and keep indexes with enumerate().',
        'Use while for “keep going until…” problems (sentinel loops).',
        'Control loops using break/continue and understand loop-else.',
        'Apply patterns: accumulate, search, count, max/min, zip through lists.'
      ],
      prerequisites: [
        'Section 2 — Python Syntax Essentials',
        'Section 3 — Variables & Types',
        'Section 4 — Operators & Expressions'
      ],
      resources: [
        { label: 'Tutorial — if statements', href: 'https://docs.python.org/3/tutorial/controlflow.html#if-statements' },
        { label: 'Tutorial — for statements', href: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements' },
        { label: 'Tutorial — break/continue and else', href: 'https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops' }
      ],
      tip: 'Prefer small blocks and “guard clauses”: return early when input is bad; it keeps the main path de-indented and easy to read.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'if-elif-else',
        title: 'Decisions: if / elif / else',
        body: `Use \`if\` to choose a path. Use \`elif\` for more checks. \`else\` is the “otherwise”.
Prefer **elif** over nested \`if\` to stay flat. For quick one-liners, you can use the **conditional expression** (“ternary”).

Guard clause: check a “bad case” first and return/continue early.`,
        codes: [
          {
            label: 'Basics',
            text: `x = int(input("Score: "))
if x >= 90:
    grade = "A"
elif x >= 80:
    grade = "B"
elif x >= 70:
    grade = "C"
elif x >= 60:
    grade = "D"
else:
    grade = "F"
print(grade)`
          },
          {
            label: 'Guard clause & ternary',
            text: `def safe_percent(num: float, den: float) -> float | None:
    if den == 0:           # guard clause
        return None
    return (num / den) * 100

age = int(input("Age: "))
ticket = "child" if age < 12 else "adult"  # conditional expression
print(ticket)`
          }
        ]
      },

      {
        id: 'for-loops',
        title: 'for loops: iterate sequences',
        body: `\`for\` walks through items in a sequence. Use \`range(n)\` for 0..n-1.
\`enumerate(seq)\` gives index and item. \`zip(a,b)\` loops pairs. Loop dicts via \`d.items()\`.`,
        codes: [
          {
            label: 'range & enumerate',
            text: `for i in range(3):
    print("i =", i)

nums = [10, 20, 30]
for idx, val in enumerate(nums):
    print(idx, "->", val)`
          },
          {
            label: 'zip and dicts',
            text: `names = ["Asha", "Raj", "Mia"]
scores = [88, 92, 79]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

prices = {"apple": 99, "banana": 40}
for fruit, price in prices.items():
    print(fruit, "=", price)`
          }
        ]
      },

      {
        id: 'while-loops',
        title: 'while loops: “keep going until…”',
        body: `\`while\` repeats while a condition is True. Update the state inside to avoid infinite loops.
Great for “ask until valid input” or reading from a stream.`,
        codes: [
          {
            label: 'Sentinel loop',
            text: `while True:
    txt = input("Positive number: ")
    try:
        n = int(txt)
        if n > 0:
            break
    except ValueError:
        pass
    print("Try again...")
print("OK:", n)`
          },
          {
            label: 'Countdown',
            text: `n = 5
while n > 0:
    print(n)
    n -= 1
print("Blast off!")`
          }
        ]
      },

      {
        id: 'break-continue-else',
        title: 'break / continue / loop-else',
        body: `\`break\` leaves the loop now. \`continue\` skips to the next iteration.
**Loop-else** runs only if the loop *was not broken* (useful for “search not found”).`,
        codes: [
          {
            label: 'continue & break',
            text: `for x in range(1, 8):
    if x % 2 == 0:
        continue         # skip evens
    print("odd:", x)
    if x > 5:
        break            # stop when > 5`
          },
          {
            label: 'for-else searching',
            text: `nums = [6, 10, 15, 21]
target = 14
for n in nums:
    if n == target:
        print("found")
        break
else:
    print("not found")  # runs because no break happened`
          }
        ]
      },

      {
        id: 'patterns',
        title: 'Useful loop patterns',
        body: `Common tasks you’ll write all the time: accumulate, find max/min, count items, filter/build new lists.`,
        codes: [
          {
            label: 'Accumulate & average',
            text: `nums = [10, 20, 30]
total = 0
for x in nums:
    total += x
avg = total / len(nums)
print(total, avg)`
          },
          {
            label: 'Max / min (manual)',
            text: `nums = [5, 12, 7, 9]
best = nums[0]
for x in nums[1:]:
    if x > best:
        best = x
print("max =", best)   # (min is similar)`
          },
          {
            label: 'Counting with dict',
            text: `text = "banana"
counts: dict[str, int] = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`
          },
          {
            label: 'Build new list (filter/map)',
            text: `nums = [1, 2, 3, 4, 5, 6]
evens = []
for x in nums:
    if x % 2 == 0:
        evens.append(x)
squares = [x*x for x in nums]  # comprehension
print(evens, squares)`
          }
        ]
      },

      {
        id: 'pitfalls',
        title: 'Pitfalls & tips',
        body: `Avoid classic mistakes:
• Off-by-one: check your \`range()\` start/stop.  
• Don’t modify a list while iterating it — build a new one or loop on a copy.  
• Prefer iterating items directly over \`range(len(seq))\` (except when you truly need indexes).`,
        codes: [
          {
            label: 'Modify while iterating (bad) → copy (ok)',
            text: `items = ["a","bad","b","bad","c"]
# BAD: removing while iterating the same list
# for x in items:
#     if x == "bad":
#         items.remove(x)

# OK: build new
clean = [x for x in items if x != "bad"]
print(clean)

# Or iterate over a copy
items = ["a","bad","b"]
for x in items[:]:
    if x == "bad":
        items.remove(x)
print(items)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's5-fizzbuzz',
        title: 'FizzBuzz',
        prompt: 'Print numbers 1..100. For multiples of 3 print Fizz, of 5 print Buzz, of both print FizzBuzz.',
        solution: `for n in range(1, 101):
    out = ""
    if n % 3 == 0: out += "Fizz"
    if n % 5 == 0: out += "Buzz"
    print(out or n)`
      },
      {
        id: 's5-password-strength',
        title: 'Password strength (simple)',
        prompt: 'Ask for a password. If length >= 8 and it has a digit and a letter, print "OK", else "Weak". Use any()/all().',
        solution: `pw = input("Password: ")
has_digit = any(ch.isdigit() for ch in pw)
has_alpha = any(ch.isalpha() for ch in pw)
print("OK" if len(pw) >= 8 and has_digit and has_alpha else "Weak")`
      },
      {
        id: 's5-first-prime',
        title: 'First prime in a range',
        prompt: 'Ask for start/end and print the first prime number found or "none". Use for-else for primality.',
        solution: `a = int(input("start: "))
b = int(input("end: "))
found = False
for n in range(max(2, a), b+1):
    for d in range(2, int(n**0.5)+1):
        if n % d == 0:
            break
    else:
        print(n)
        found = True
        break
if not found:
    print("none")`
      },
      {
        id: 's5-top-scorer',
        title: 'Top scorer',
        prompt: 'Given names and scores lists, print the name with the highest score (use zip and a loop).',
        starterCode: `names = ["Asha","Raj","Mia","Lee"]
scores = [88, 92, 79, 92]`,
        solution: `names = ["Asha","Raj","Mia","Lee"]
scores = [88, 92, 79, 92]
best_name = names[0]
best_score = scores[0]
for name, score in zip(names, scores):
    if score > best_score:
        best_name, best_score = name, score
print(best_name, best_score)`
      },
      {
        id: 's5-menu-loop',
        title: 'Menu loop',
        prompt: 'Show a small menu (1:Add, 2:List, 3:Quit). Keep asking until Quit. Use a while True loop.',
        solution: `items: list[str] = []
while True:
    print("1:Add  2:List  3:Quit")
    choice = input("> ")
    if choice == "1":
        items.append(input("Item: "))
    elif choice == "2":
        print(items)
    elif choice == "3":
        break
    else:
        print("Try 1/2/3")`
      }
    ]
  }
]
