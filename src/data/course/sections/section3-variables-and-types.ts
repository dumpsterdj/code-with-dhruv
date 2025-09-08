// src/data/course/sections/section3-variables-and-types.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'variables-and-types',
    title: 'Section 3 — Variables & Types',
    summary: 'Numbers, strings, booleans, None, and type casting (conversions).',
    duration: 45,
    content:
      'Learn how Python stores data in variables, what the basic data types are, and how to convert safely between them.',
    startHere: {
      goals: [
        'Use clear variable names and understand dynamic typing.',
        'Work with numbers (int/float), strings, booleans, and None.',
        'Know truthiness and the difference between == and is.',
        'Convert safely with int()/float()/str()/bool().'
      ],
      prerequisites: ['Section 2 — Python Syntax Essentials'],
      resources: [
        { label: 'Built-in Types (docs)', href: 'https://docs.python.org/3/library/stdtypes.html' },
        { label: 'Numbers (docs)', href: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex' },
        { label: 'Text Sequence Type — str', href: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str' }
      ],
      tip: 'Use short, lower_snake_case names. Reserve UPPER_CASE for constants (e.g., TAX_RATE = 0.18).',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'variables-basics',
        title: 'Variables: names, assignment, dynamic typing',
        body: `A **variable** is a name that points to a value in memory.
Python is **dynamically typed**: the type is tied to the value, not the name.
Use lower_snake_case names; keep them descriptive but short.

Facts
• Reassignment moves the name to a new value.
• Multiple assignment and swapping are built in.
• Augmented assignment (+=, -=, etc.) updates in place for some types.`,
        codes: [
          {
            label: 'Assignment & naming',
            text: `age = 12
name = "Anaya"
pi_approx = 3.14

# invalid names: 2cats, my-name, class (keyword)
# good names: total, first_name, is_admin`
          },
          {
            label: 'Multiple assignment & swap',
            text: `x, y = 10, 20
x, y = y, x         # swap without a temp variable
total = 0
total += 5          # 5
total *= 2          # 10`
          },
          {
            label: 'What type is it?',
            text: `print(type(42))        # <class 'int'>
print(type(3.5))      # <class 'float'>
print(type("hi"))     # <class 'str'>`
          }
        ]
      },

      {
        id: 'numbers',
        title: 'Numbers: int and float',
        body: `Python has **int** (no size limit) and **float** (double precision).
Use / for true division, // for floor division, % for remainder, ** for power.

Floating-point is approximate; for money, consider decimal.Decimal.`,
        codes: [
          {
            label: 'Arithmetic',
            text: `a = 7; b = 3
print(a + b, a - b, a * b)  # 10 4 21
print(a / b)   # 2.3333333333333335 (float)
print(a // b)  # 2  (floor division)
print(a % b)   # 1
print(2 ** 10) # 1024`
          },
          {
            label: 'Rounding & precision',
            text: `print(round(2.675, 2))   # 2.67 (binary float quirk)

from decimal import Decimal, ROUND_HALF_UP
price = Decimal("2.675").quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
print(price)  # 2.68  (exact, for currency)`
          }
        ]
      },

      {
        id: 'strings',
        title: 'Strings: text data',
        body: `Strings are **immutable** sequences of characters.
Use single or double quotes; triple quotes for multi-line.
Indexing starts at 0. Slicing uses start:stop (stop excluded).`,
        codes: [
          {
            label: 'Basics & slicing',
            text: `s = "Python"
print(s[0], s[-1])   # P n
print(s[1:4])        # yth
print(len(s))        # 6
print("thon" in s)   # True`
          },
          {
            label: 'Methods & f-strings',
            text: `name = "  dhruv  "
print(name.strip().title())  # Dhruv
print("a,b,c".split(","))    # ['a', 'b', 'c']
print("-".join(["a","b","c"]))  # a-b-c

score = 94.258
print(f"Score: {score:.1f}")    # Score: 94.3`
          }
        ]
      },

      {
        id: 'booleans-none',
        title: 'Booleans & None',
        body: `**Booleans** are True/False results from comparisons and logic.
**None** means “no value” or “not set yet”.

Truthiness: values considered False → 0, 0.0, '', [], {}, set(), None.
Everything else is True.`,
        codes: [
          {
            label: 'Comparisons & logic',
            text: `x = 10
print(x >= 5)           # True
print(5 < x < 12)       # True (chained)
print(True and False)   # False
print(True or False)    # True
print(not True)         # False`
          },
          {
            label: 'None & identity',
            text: `mystery = None
print(mystery is None)  # True  (use "is" for None)
print(mystery == None)  # True, but prefer "is"

# Truthiness:
print(bool(0), bool(""), bool([]), bool(None))  # False False False False
print(bool("0"), bool([0]))  # True True`
          }
        ]
      },

      {
        id: 'casting',
        title: 'Type casting (conversions)',
        body: `Convert between types with built-ins.
Be careful: \`int("3.7")\` fails; convert to float first. \`bool("False")\` is True (any non-empty string is True).`,
        codes: [
          {
            label: 'Common conversions',
            text: `int("42")       # 42
float("3.14")   # 3.14
str(123)        # '123'
bool(0)         # False
bool("")        # False
bool("False")   # True  (non-empty string)`
          },
          {
            label: 'Safe number input',
            text: `while True:
    txt = input("Enter an integer: ")
    try:
        n = int(txt)
        break
    except ValueError:
        print("Please type digits only!")

print("You typed", n)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's3-swap',
        title: 'Swap two numbers',
        prompt: 'Ask for two integers and print them swapped (no temp variable).',
        starterCode: `a = int(input("A: "))
b = int(input("B: "))
# swap here`,
        hint: 'Use tuple unpacking: a, b = b, a',
        solution: `a = int(input("A: "))
b = int(input("B: "))
a, b = b, a
print("A =", a, "B =", b)`
      },
      {
        id: 's3-c-to-f',
        title: 'Celsius → Fahrenheit',
        prompt: 'Ask for temperature in °C (can be a decimal) and print °F to 1 decimal place.',
        starterCode: `c = float(input("°C: "))
# F = C * 9/5 + 32`,
        solution: `c = float(input("°C: "))
f = c * 9/5 + 32
print(f"{f:.1f} °F")`
      },
      {
        id: 's3-name-clean',
        title: 'Name cleaner',
        prompt: 'Ask for first and last name with extra spaces, then print a neat "First Last".',
        solution: `first = input("First: ").strip().title()
last  = input("Last: ").strip().title()
print(f"{first} {last}")`
      },
      {
        id: 's3-price-parse',
        title: 'Parse a price string',
        prompt: 'Given text like "₹1,299.50" or "$1,299.50", remove symbols/commas and convert to float.',
        starterCode: `raw = input("Price (e.g. ₹1,299.50): ")
# keep digits and dot`,
        hint: 'Replace "," and strip currency symbols using .replace() and .strip() or a simple loop.',
        solution: `raw = input("Price: ")
clean = raw.replace(",", "").strip("₹$€£ ")
value = float(clean)
print(value)`
      },
      {
        id: 's3-truthy',
        title: 'Truthy or Falsey?',
        prompt: 'Write a script that prints True/False for each of these: 0, 1, "", "0", [], [0], None.',
        solution: `items = [0, 1, "", "0", [], [0], None]
for x in items:
    print(x, "=>", bool(x))`
      }
    ]
  }
]
