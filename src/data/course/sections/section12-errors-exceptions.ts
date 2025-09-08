// src/data/course/sections/section12-errors-exceptions.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'errors-exceptions',
    title: 'Section 12 — Errors & Exceptions',
    summary: 'try/except/else/finally, catching the right exceptions, raise, custom exceptions, best practices.',
    duration: 60,
    content:
      'Handle the unexpected without crashing. Learn the anatomy of try/except/else/finally, when and how to raise errors, define your own exception types, and write safe, readable error-handling code.',
    startHere: {
      goals: [
        'Use try/except/else/finally correctly (small try blocks!).',
        'Catch specific exceptions (ValueError, KeyError, FileNotFoundError, etc.).',
        'Raise your own exceptions with useful messages.',
        'Create custom exception classes and use raise from for context.',
        'Know patterns like EAFP vs LBYL and when to use each.'
      ],
      prerequisites: [
        'Section 10 — Modules, Packages & Environments',
        'Section 11 — File I/O & Pathlib'
      ],
      resources: [
        { label: 'Errors & Exceptions (tutorial)', href: 'https://docs.python.org/3/tutorial/errors.html' },
        { label: 'Exceptions (reference)', href: 'https://docs.python.org/3/library/exceptions.html' },
        { label: 'traceback module', href: 'https://docs.python.org/3/library/traceback.html' }
      ],
      tip: 'Keep the try block minimal—only the line(s) that might fail. Put normal code outside to avoid hiding other bugs.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'anatomy',
        title: 'Anatomy: try / except / else / finally',
        body: `Basic shape:
• Code that might fail goes in \`try\`.  
• \`except\` handles specific error types.  
• \`else\` runs only if **no** exception happened.  
• \`finally\` always runs (cleanup).`,
        codes: [
          {
            label: 'Numbers from input',
            text: `txt = input("Enter an integer: ")
try:
    n = int(txt)                 # might raise ValueError
except ValueError:
    print("Please type digits only.")
else:
    print("OK! You typed", n)
finally:
    print("Done asking.")`
          },
          {
            label: 'Minimal try',
            text: `# Good: tiny try — only the risky line inside
price = input("Price: ")
try:
    value = float(price)  # risky
except ValueError:
    value = 0.0
total = value * 1.18
print(total)`
          }
        ]
      },

      {
        id: 'catch-specific',
        title: 'Catching the right exceptions',
        body: `Name the exceptions you expect—avoid bare \`except:\`.  
Group multiple types in a tuple. Use \`as e\` to read the message.  
Common built-ins: ValueError, TypeError, KeyError, IndexError, FileNotFoundError, ZeroDivisionError, PermissionError.`,
        codes: [
          {
            label: 'Specific is safer',
            text: `data = {"count": "10"}
try:
    # KeyError if missing; ValueError if not digits
    n = int(data["count"])
except KeyError as e:
    print("Missing key:", e)
except ValueError as e:
    print("Bad number:", e)`
          },
          {
            label: 'Group a few',
            text: `def safe_div(a, b):
    try:
        return a / b
    except (TypeError, ZeroDivisionError) as e:
        print("Cannot divide:", e)
        return None`
          },
          {
            label: 'Avoid bare except',
            text: `try:
    risky()
except Exception as e:          # still broad, but not bare
    print("Unexpected error:", e)
    # consider logging and re-raise for real apps
    # raise`
          }
        ]
      },

      {
        id: 'raise-custom',
        title: 'raise & custom exceptions',
        body: `Use \`raise SomeError("message")\` to signal problems.  
Define custom exceptions by subclassing \`Exception\`.  
Use \`raise ... from ...\` to chain exceptions (preserve original cause).`,
        codes: [
          {
            label: 'Raise with message',
            text: `def percent(part: float, whole: float) -> float:
    if whole <= 0:
        raise ValueError("whole must be > 0")
    return (part / whole) * 100

print(percent(30, 50))
# print(percent(10, 0))  # ValueError`
          },
          {
            label: 'Custom exception class',
            text: `class InsufficientFunds(Exception):
    pass

def withdraw(balance: float, amount: float) -> float:
    if amount > balance:
        raise InsufficientFunds(f"need {amount-balance:.2f} more")
    return balance - amount

try:
    withdraw(100.0, 250.0)
except InsufficientFunds as e:
    print("Withdraw failed:", e)`
          },
          {
            label: 'Chaining with "from"',
            text: `def parse_price(text: str) -> float:
    try:
        return float(text.replace(",", ""))
    except Exception as e:
        # keep original cause
        raise ValueError(f"bad price: {text!r}") from e`
          }
        ]
      },

      {
        id: 'else-finally-patterns',
        title: 'Patterns with else/finally',
        body: `\`else\` holds the normal path (only runs if try succeeded).  
\`finally\` is for cleanup (close files, release locks). Combine them for clear control flow.`,
        codes: [
          {
            label: 'File copy with reporting',
            text: `copied = False
try:
    with open("in.txt","rb") as src, open("out.txt","wb") as dst:
        dst.write(src.read())
        copied = True
except FileNotFoundError:
    print("Input file missing.")
else:
    print("Copy OK")      # only if no exception
finally:
    print("copied =", copied)  # always`
          }
        ]
      },

      {
        id: 'eafp-lbyl',
        title: 'EAFP vs LBYL',
        body: `**EAFP** (“Easier to Ask Forgiveness than Permission”): try the operation and catch errors.  
**LBYL** (“Look Before You Leap”): check conditions first.  
Prefer EAFP when checks race or are clunky (files, parsing). Prefer LBYL for cheap, clear checks.`,
        codes: [
          {
            label: 'Parsing (EAFP)',
            text: `def parse_int(txt: str) -> int | None:
    try:
        return int(txt)
    except ValueError:
        return None`
          },
          {
            label: 'Indexing (LBYL)',
            text: `def get_third(items: list[int]) -> int | None:
    if len(items) >= 3:
        return items[2]
    return None`
          }
        ]
      },

      {
        id: 'traceback-logging',
        title: 'Seeing the error: traceback & logging',
        body: `When debugging, you may want the full stack trace.  
Use \`traceback.format_exc()\` to capture it as text; or the \`logging\` module for production logs.`,
        codes: [
          {
            label: 'Print a stack trace',
            text: `import traceback
try:
    1 / 0
except Exception:
    print("Oops!")
    print(traceback.format_exc())`
          },
          {
            label: 'Minimal logging',
            text: `import logging
logging.basicConfig(level=logging.INFO)
try:
    risky()
except Exception as e:
    logging.exception("Failed in risky()")  # writes traceback`
          }
        ]
      },

      {
        id: 'assert-vs-exc',
        title: 'assert vs exceptions',
        body: `\`assert\` is for internal sanity checks during development/tests.  
Don’t use it for user input—\`python -O\` can disable asserts. For real validation, raise exceptions.`,
        codes: [
          {
            label: 'Do & don’t',
            text: `# Good (internal invariant)
def midpoint(a: int, b: int) -> float:
    assert a <= b, "a should be <= b"
    return (a + b) / 2

# Not for user input:
# assert user_age > 0  # don't do this for validation
# raise ValueError("age must be > 0")  # do this instead`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's12-safe-int',
        title: 'Safe integer input',
        prompt: 'Write read_int(prompt) that keeps asking until the user enters a valid int, then returns it.',
        solution: `def read_int(prompt: str = "Number: ") -> int:
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please type digits only.")`
      },
      {
        id: 's12-withdraw',
        title: 'Withdraw with custom exception',
        prompt: 'Create InsufficientFunds and a withdraw(balance, amount) function that raises it when needed; catch and print the message.',
        solution: `class InsufficientFunds(Exception): pass
def withdraw(balance: float, amount: float) -> float:
    if amount > balance:
        raise InsufficientFunds(f"need {amount-balance:.2f} more")
    return balance - amount

try:
    print(withdraw(100, 250))
except InsufficientFunds as e:
    print("Error:", e)`
      },
      {
        id: 's12-parse-price',
        title: 'Parse price with chaining',
        prompt: 'Implement parse_price("₹1,299.50") -> 1299.50. On failure, raise ValueError with raise from.',
        solution: `def parse_price(text: str) -> float:
    try:
        clean = text.replace(",", "").strip("₹$€£ ")
        return float(clean)
    except Exception as e:
        raise ValueError(f"bad price: {text!r}") from e`
      },
      {
        id: 's12-file-read',
        title: 'Robust file read',
        prompt: 'Write read_text(path) that returns the text or None, printing friendly messages for FileNotFoundError and UnicodeDecodeError.',
        solution: `def read_text(path: str):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print("Missing file:", path); return None
    except UnicodeDecodeError:
        print("Encoding problem in:", path); return None`
      },
      {
        id: 's12-percent',
        title: 'Validate and raise',
        prompt: 'Write percent(part, whole) that raises ValueError if whole <= 0; otherwise returns (part/whole)*100.',
        solution: `def percent(part: float, whole: float) -> float:
    if whole <= 0:
        raise ValueError("whole must be > 0")
    return (part / whole) * 100`
      }
    ]
  }
]
