// src/data/course/sections/section6-strings-text-basics.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'strings-text-basics',
    title: 'Section 6 — Strings & Text Basics',
    summary: 'Slicing/indexing, useful methods, split/join, f-strings, and basic formatting & escapes.',
    duration: 55,
    content:
      'Master everyday text skills: grab parts of a string, clean and search text, build readable outputs with f-strings, and handle escapes/formatting.',
    startHere: {
      goals: [
        'Index and slice strings (start/stop/step, negative indexes, reverse).',
        'Use common methods: strip/replace/lower/title/find, startswith/endswith.',
        'Split text into pieces and join it back together cleanly.',
        'Format values with f-strings (width, alignment, decimals, thousands).',
        'Know escapes (\\n, \\t) and raw strings; escape braces in templates.'
      ],
      prerequisites: [
        'Section 2 — Python Syntax Essentials',
        'Section 3 — Variables & Types',
        'Section 4 — Operators & Expressions'
      ],
      resources: [
        { label: 'str type (docs)', href: 'https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str' },
        { label: 'Format Specification Mini-Language', href: 'https://docs.python.org/3/library/string.html#format-specification-mini-language' }
      ],
      tip: 'Strings are immutable. Methods like .strip() return new strings—remember to capture the result.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'slicing',
        title: 'Indexing & Slicing',
        body: `Strings are sequences of characters. Indexing starts at 0. Slicing uses \`s[start:stop:step]\`. The \`stop\` is **excluded**. You can use negative indexes and even a negative step to reverse.`,
        codes: [
          {
            label: 'Index & length',
            text: `s = "Python"
print(s[0], s[1], s[-1])   # P y n
print(len(s))              # 6`
          },
          {
            label: 'Basic slices',
            text: `s = "strawberry"
print(s[0:5])     # straw   (0..4)
print(s[:5])      # straw   (start default 0)
print(s[5:])      # berry   (till end)
print(s[-5:])     # berry   (last 5)`
          },
          {
            label: 'Step & reverse',
            text: `t = "0123456789"
print(t[::2])     # 02468   (step=2)
print(t[1::2])    # 13579
print(t[::-1])    # 9876543210  (reverse)`
          },
          {
            label: 'Safe slicing vs IndexError',
            text: `s = "cat"
# print(s[99])    # IndexError
print(s[2:99])    # 't' (slices are safe even if stop > len)`
          }
        ]
      },

      {
        id: 'methods',
        title: 'Everyday Methods (clean, search, change case)',
        body: `Most string tasks are a method away. Remember: they return **new** strings.`,
        codes: [
          {
            label: 'Trim & case',
            text: `name = "  dhruv  "
print(name.strip())       # 'dhruv'
print(name.strip().title()) # 'Dhruv'
print("MIXed".lower())    # 'mixed'
print("nice".upper())     # 'NICE'`
          },
          {
            label: 'Search & check',
            text: `s = "banana"
print(s.find("na"))       # 2  (or -1 if not found)
print(s.rfind("na"))      # 4
print(s.startswith("ba")) # True
print(s.endswith("na"))   # True
print(s.count("a"))       # 3`
          },
          {
            label: 'Replace (all)',
            text: `msg = "2025-09-04"
print(msg.replace("-", "/"))  # 2025/09/04`
          },
          {
            label: 'is* checks',
            text: `"123".isdigit()     # True
"3.14".isdigit()    # False (dot not a digit)
"abc".isalpha()     # True
"abc123".isalnum()  # True
" \\t\\n".isspace()  # True`
          }
        ]
      },

      {
        id: 'split-join',
        title: 'Split & Join',
        body: `Use \`split()\` to break text into a list (by spaces or a separator). Use \`join()\` to glue pieces back with a chosen separator.`,
        codes: [
          {
            label: 'Split on whitespace',
            text: `line = "alpha   beta   gamma"
parts = line.split()  # ['alpha','beta','gamma']
print(parts)`
          },
          {
            label: 'Split on commas',
            text: `row = "a,b,c,,d"
print(row.split(","))        # ['a','b','c','','d']
print(row.split(",", maxsplit=2))  # ['a','b','c,,d']`
          },
          {
            label: 'Join pieces',
            text: `words = ["fast","clean","Python"]
print(" ".join(words))     # 'fast clean Python'
print("-".join(words))     # 'fast-clean-Python'`
          },
          {
            label: 'CSV-ish cleanup',
            text: `raw = "  red , blue , green  "
colors = [c.strip() for c in raw.split(",")]
print(colors)  # ['red','blue','green']`
          }
        ]
      },

      {
        id: 'fstrings',
        title: 'f-Strings (modern formatting)',
        body: `f-strings are the clearest way to format values. Use \`{expr:spec}\` for width, alignment, decimals, commas, percentages, and more. Python 3.8+ also supports the **debug** form \`{name=}\`.`,
        codes: [
          {
            label: 'Basics',
            text: `name = "Asha"; score = 94.258
print(f"Hi {name}, score={score}")     # Hi Asha, score=94.258
print(f"{score:.2f}")                  # 94.26 (2 decimals)
x = 42
print(f"{x=}")                         # x=42 (debug form)`
          },
          {
            label: 'Width, alignment, fill',
            text: `item = "Pad"
print(f"[{item:<6}]")   # [Pad   ] left align width=6
print(f"[{item:>6}]")   # [   Pad] right align
print(f"[{item:^6}]")   # [ Pad ] center
print(f"[{item:.^6}]")  # [..Pad.] fill with '.'`
          },
          {
            label: 'Numbers (commas, %)',
            text: `n = 1234567
print(f"{n:,}")          # 1,234,567
ratio = 0.8732
print(f"{ratio:.1%}")    # 87.3%`
          },
          {
            label: 'Dates & expressions',
            text: `from datetime import date
today = date(2025, 9, 4)
print(f"Today is {today:%b %d, %Y}")  # Sep 04, 2025
a, b = 5, 7
print(f"{a} + {b} = {a + b}")`
          }
        ]
      },

      {
        id: 'formatting-escapes',
        title: 'Basic .format(), Escapes & Raw Strings',
        body: `\`str.format()\` is an older (still useful) alternative to f-strings—handy for templates.  
Escape sequences: \`\\n\` newline, \`\\t\` tab, \`\\'\`/\\\`"\` quotes. **Raw strings** (prefix \`r\`) don’t treat backslashes as escapes (great for regex and Windows paths). Escape braces in templates with \`{{\` and \`}}\`.`,
        codes: [
          {
            label: 'str.format()',
            text: `"Hello, {0}! You have {1} new messages.".format("Mia", 3)
"X={x}, Y={y}".format(x=10, y=20)
"{:>8}".format("pad")   # right align width=8`
          },
          {
            label: 'Escapes & raw strings',
            text: `print("Line1\\nLine2")     # newline
print("Tab\\tSeparated")  # tab
print(r"C:\\Users\\Dhruv") # raw, shows backslashes`
          },
          {
            label: 'Escape braces',
            text: `"{{ total }} items: {}".format(3)   # '{ total } items: 3'`
          },
          {
            label: 'Multiline strings',
            text: `msg = """Dear user,
Thanks for joining.
- Team"""
print(msg)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's6-last-three',
        title: 'Last 3 characters',
        prompt: 'Read a word and print its last 3 characters (or the whole word if shorter).',
        solution: `w = input("Word: ")
print(w[-3:] if len(w) >= 3 else w)`
      },
      {
        id: 's6-email-username',
        title: 'Email → username',
        prompt: 'Given an email like "name@example.com", print the part before "@". Use slicing with .find().',
        solution: `e = input("Email: ")
at = e.find("@")
print(e[:at] if at != -1 else e)`
      },
      {
        id: 's6-clean-colors',
        title: 'Clean color list',
        prompt: 'Input: " red , blue , green ". Print a list [\'red\', \'blue\', \'green\'] (no spaces).',
        solution: `raw = input("Colors: ")
colors = [c.strip() for c in raw.split(",")]
print(colors)`
      },
      {
        id: 's6-receipt',
        title: 'Receipt line',
        prompt: 'Format item, qty, price so it looks like: "Apple .... x2 .... ₹39.98" (price with 2 decimals).',
        starterCode: `item = "Apple"; qty = 2; price = 19.99
total = qty * price`,
        solution: `item = "Apple"; qty = 2; price = 19.99
total = qty * price
print(f"{item:.<12} x{qty:<2} ₹{total:,.2f}")`
      },
      {
        id: 's6-title-name',
        title: 'Title case name',
        prompt: 'Ask for first and last name with extra spaces; print "First Last" properly capitalized.',
        solution: `first = input("First: ").strip().title()
last  = input("Last: ").strip().title()
print(f"{first} {last}")`
      }
    ]
  }
]
