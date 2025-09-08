// src/data/course/sections/section4-operators-expressions.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'operators-expressions',
    title: 'Section 4 — Operators & Expressions',
    summary: 'Arithmetic, comparison, logical, and membership operators with real-world tips.',
    duration: 45,
    content:
      'Learn how to combine values with operators, compare things, make decisions with logic, and check if something is inside a collection.',
    startHere: {
      goals: [
        'Use arithmetic operators: +, -, *, /, //, %, **.',
        'Write safe and correct comparisons for numbers & strings.',
        'Understand short-circuit logic with and/or/not.',
        'Use membership checks with strings, lists, sets, and dicts.'
      ],
      prerequisites: [
        'Section 2 — Python Syntax Essentials',
        'Section 3 — Variables & Types'
      ],
      resources: [
        { label: 'Expressions (docs)', href: 'https://docs.python.org/3/reference/expressions.html' },
        { label: 'Built-in Types — Comparisons', href: 'https://docs.python.org/3/library/stdtypes.html#comparisons' },
        { label: 'Text sequence type — str', href: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str' }
      ],
      tip: 'Parentheses make intent clear. Remember: / keeps decimals, // floors the result, and % gives the remainder.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'arithmetic',
        title: 'Arithmetic operators',
        body: `Numbers support the usual maths:
\`+\` add, \`-\` subtract, \`*\` multiply, \`/\` true division, \`//\` floor division, \`%\` remainder, \`**\` power.

Notes
• \`/\` always returns a float.  
• \`//\` floors toward negative infinity (careful with negatives).  
• \`a % b\` has the same sign as \`b\`.  
• Use \`round(x, n)\` for display; for money consider \`decimal.Decimal\`.`,
        codes: [
          {
            label: 'Basics',
            text: `a, b = 7, 3
print(a + b, a - b, a * b)  # 10 4 21
print(a / b)    # 2.3333333333333335
print(a // b)   # 2
print(a % b)    # 1
print(2 ** 10)  # 1024`
          },
          {
            label: 'Negatives & floor',
            text: `print(-7 // 3)   # -3  (floors toward -inf)
print(-7 % 3)    # 2   (remainder has divisor's sign)`
          },
          {
            label: 'Rounding & Decimal',
            text: `print(round(2.675, 2))  # 2.67 (binary float quirk)
from decimal import Decimal, ROUND_HALF_UP
price = Decimal("2.675").quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
print(price)  # 2.68`
          }
        ]
      },

      {
        id: 'comparison',
        title: 'Comparison operators',
        body: `Use \`== \`/ \\\`!= \\\` for equality, \`<\` \`<=\` \`>\` \`>=\` for ordering.
Strings compare lexicographically (A–Z < a–z). You can **chain** comparisons like \`1 < x < 5\`.

Float note: comparing floats directly can be tricky; prefer \`math.isclose\` when values come from calculations.

Equality vs identity:
• \`==\` compares **values**.  
• \`is\` checks if two names point to the **same object** (use it for \`None\`).`,
        codes: [
          {
            label: 'Numbers & strings',
            text: `print(3 < 5, 5 <= 5)     # True True
print("Apple" < "banana")  # True (A < b by Unicode)
x = 3
print(1 < x < 5)           # True (chained)`
          },
          {
            label: 'Floats — isclose',
            text: `import math
a = 0.1 + 0.2
print(a == 0.3)                 # False (tiny rounding)
print(math.isclose(a, 0.3))     # True`
          },
          {
            label: 'Value vs identity',
            text: `a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(a == b)   # True  (same contents)
print(a is b)   # False (different objects)
print(a is c)   # True
val = None
print(val is None)  # Preferred check for None`
          }
        ]
      },

      {
        id: 'logical',
        title: 'Logical operators (and / or / not)',
        body: `\`and\` returns the **first false** value (or the last value if all are true).  
\`or\` returns the **first true** value.  
\`not\` flips truthiness.

Short-circuit:
• In \`A and B\`, B is **not** evaluated if A is false.  
• In \`A or B\`, B is **not** evaluated if A is true.

This is useful for defaults and for avoiding errors.`,
        codes: [
          {
            label: 'Truthiness',
            text: `print(bool(0), bool(""), bool([]))  # False False False
print(bool(42), bool("hi"))        # True True`
          },
          {
            label: 'Short-circuit safety',
            text: `x = 0
# Safe: right side not evaluated because left is False
print(x != 0 and 10 / x > 1)   # False`
          },
          {
            label: 'Return values (not just True/False)',
            text: `print("" or "guest")   # 'guest'   (default)
print("hi" and 123)    # 123      (last truthy)
print(None or 0 or "ok")  # 'ok'`
          },
          {
            label: "De Morgan's laws",
            text: `A, B = True, False
print(not (A and B) == (not A or not B))  # True
print(not (A or B) == (not A and not B))  # True`
          }
        ]
      },

      {
        id: 'membership',
        title: 'Membership operators (in / not in)',
        body: `Use \`in\` / \`not in\` to check containment.
Strings: case-sensitive substring check.  
Lists/tuples: linear search.  
Sets: very fast membership.  
Dicts: membership checks **keys**; use \`d.values()\` or \`d.items()\` for values/pairs.`,
        codes: [
          {
            label: 'Strings',
            text: `s = "Python"
print("Py" in s, "py" in s)  # True False (case matters)
print("th" in s)             # True`
          },
          {
            label: 'Lists & tuples',
            text: `nums = [10, 20, 30]
print(20 in nums)        # True
print(25 in nums)        # False`
          },
          {
            label: 'Dict keys vs values',
            text: `prices = {"apple": 99, "banana": 40}
print("apple" in prices)           # True (checks keys)
print(99 in prices.values())       # True
print(("apple", 99) in prices.items())  # True`
          },
          {
            label: 'Sets for speed',
            text: `blocked = {"spammer", "bot42", "xx_bad_xx"}
user = "bot42"
print(user in blocked)  # True`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's4-even-check',
        title: 'Even number check',
        prompt: 'Ask for an integer and print True if it is even, otherwise False (use %).',
        solution: `n = int(input("Number: "))
print(n % 2 == 0)`
      },
      {
        id: 's4-safe-div',
        title: 'Safe division',
        prompt: 'Ask for two numbers a and b. If b is 0, print "cannot divide"; else print a/b. Do it without try/except using short-circuit or if.',
        solution: `a = float(input("a: "))
b = float(input("b: "))
print("cannot divide" if b == 0 else a / b)`
      },
      {
        id: 's4-grade-band',
        title: 'Grade band',
        prompt: 'Ask for a score 0–100 and print A/B/C/D/F using comparisons and and/or logic.',
        hint: 'Use chained comparisons like 90 <= x <= 100.',
        solution: `x = int(input("Score: "))
if   90 <= x <= 100: print("A")
elif 80 <= x < 90:   print("B")
elif 70 <= x < 80:   print("C")
elif 60 <= x < 70:   print("D")
else:                print("F")`
      },
      {
        id: 's4-email-check',
        title: 'Email contains "@" and "." after it',
        prompt: 'Ask for an email string. Print True if it has "@" and a "." after the "@". Use membership and slicing.',
        solution: `email = input("Email: ")
ok = "@" in email and "." in email[email.index("@")+1:]
print(ok)`
      },
      {
        id: 's4-currency-dict',
        title: 'Currency lookup',
        prompt: 'Given a dict of currency rates, print True if a queried code exists; otherwise False. Then, if it exists, print the rate.',
        starterCode: `rates = {"USD": 83.2, "EUR": 90.5, "INR": 1.0}
code = input("Code (e.g. USD): ").upper()
# your code`,
        solution: `rates = {"USD": 83.2, "EUR": 90.5, "INR": 1.0}
code = input("Code (e.g. USD): ").upper()
print(code in rates)
if code in rates:
    print(rates[code])`
      }
    ]
  }
]
