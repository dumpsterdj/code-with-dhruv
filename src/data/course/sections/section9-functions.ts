// src/data/course/sections/section9-functions.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'functions',
    title: 'Section 9 — Functions',
    summary:
      'Define functions, parameters & return values, *args/**kwargs, lambdas, docstrings, and scope/closures.',
    duration: 60,
    content:
      'Write small, reusable functions. Learn parameters (positional, keyword, defaults), flexible *args/**kwargs, lambdas for tiny callbacks, good docstrings, and how Python scope works (LEGB).',
    startHere: {
      goals: [
        'Define clear functions with parameters, defaults, and return values.',
        'Use *args/**kwargs to accept flexible inputs and to forward arguments.',
        'Apply lambdas for tiny throwaway functions (e.g., sort keys).',
        'Write helpful docstrings and add type hints.',
        'Understand scope (LEGB), closures, and avoid the mutable default pitfall.'
      ],
      prerequisites: [
        'Section 5 — Control Flow',
        'Section 6 — Strings & Text Basics',
        'Section 7 — Collections I',
        'Section 8 — Collections II'
      ],
      resources: [
        { label: 'Tutorial — Defining Functions', href: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' },
        { label: 'Function definitions (ref)', href: 'https://docs.python.org/3/reference/compound_stmts.html#function-definitions' },
        { label: 'PEP 257 Docstrings', href: 'https://peps.python.org/pep-0257/' }
      ],
      tip: 'Prefer many small functions over one long one. Keep names verbs for actions and nouns for calculators.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'define-return',
        title: 'Define & return values',
        body: `Use \`def name(params):\` to define a function. Return a value with \`return\`.  
You can give **default values**, return **multiple values** (as a tuple), and add **type hints** for clarity.`,
        codes: [
          {
            label: 'Basics + defaults + multiple returns',
            text: `def area_rect(w: float, h: float = 1.0) -> float:
    return w * h

print(area_rect(5))        # 5.0 (h defaulted to 1.0)
print(area_rect(5, 2))     # 10.0

def divmod2(a: int, b: int) -> tuple[int, int]:
    q = a // b
    r = a % b
    return q, r           # tuple
print(divmod2(14, 5))      # (2, 4)`
          },
          {
            label: 'Keyword arguments & readability',
            text: `def rectangle(w: float, h: float) -> float:
    return w * h

print(rectangle(w=3.0, h=4.0))  # keywords improve clarity`
          },
          {
            label: 'Guard clause pattern',
            text: `def percent(part: float, whole: float) -> float | None:
    if whole == 0:          # guard "bad case" early
        return None
    return (part / whole) * 100`
          }
        ]
      },

      {
        id: 'args-kwargs',
        title: 'Flexible parameters: *args and **kwargs',
        body: `Use \`*args\` to accept any number of **positional** args (as a tuple).  
Use \`**kwargs\` to accept any number of **keyword** args (as a dict).  
You can also **forward** arguments to other functions.`,
        codes: [
          {
            label: '*args (sum many)',
            text: `def sum_all(*args: float) -> float:
    total = 0.0
    for x in args:
        total += x
    return total

print(sum_all(1, 2, 3, 4.5))   # 10.5`
          },
          {
            label: '**kwargs (options dict)',
            text: `def connect(**opts):
    host = opts.get("host", "localhost")
    port = opts.get("port", 5432)
    secure = opts.get("secure", False)
    print(host, port, secure)

connect(host="db", secure=True)`
          },
          {
            label: 'Forwarding args/kwargs',
            text: `def log_call(fn, *args, **kwargs):
    print("calling", fn.__name__, args, kwargs)
    return fn(*args, **kwargs)

def mul(a, b, scale=1):
    return a * b * scale

print(log_call(mul, 3, 5, scale=2))`
          }
        ]
      },

      {
        id: 'lambdas',
        title: 'Lambdas & higher-order functions',
        body: `A **lambda** is a tiny anonymous function: \`lambda params: expression\`.  
Great as a short callback (e.g., \`key=\` for \`sorted\`). Prefer normal \`def\` for anything non-trivial.`,
        codes: [
          {
            label: 'Sort with a key',
            text: `names = ["asha","Mia","lee","RAJ"]
print(sorted(names))                 # case-sensitive
print(sorted(names, key=str.lower))  # case-insensitive`
          },
          {
            label: 'Map/filter (small) vs comprehensions',
            text: `nums = [1,2,3,4,5]
print(list(map(lambda x: x*x, nums)))          # [1,4,9,16,25]
print(list(filter(lambda x: x%2==0, nums)))    # [2,4]
# In real code, prefer comprehensions:
squares = [x*x for x in nums]
evens   = [x for x in nums if x%2==0]`
          }
        ]
      },

      {
        id: 'docstrings',
        title: 'Docstrings & type hints',
        body: `Put a triple-quoted string at the top of a function to document **what** it does and important **args/returns** notes.  
Type hints make call sites and tools happier.`,
        codes: [
          {
            label: 'Docstring example',
            text: `def greet(name: str, excited: bool = False) -> str:
    """Return a friendly greeting.

    Args:
        name: Person's name.
        excited: If True, add an exclamation.

    Returns:
        A short greeting line.
    """
    msg = f"Hello, {name}"
    return msg + "!" if excited else msg

print(greet.__doc__ is not None)`
          }
        ]
      },

      {
        id: 'scope-closures',
        title: 'Scope (LEGB), global/nonlocal & closures',
        body: `Python looks up names in **L**ocal → **E**nclosing → **G**lobal → **B**uiltins.  
Avoid \`global\` for shared state. \`nonlocal\` allows inner functions to modify enclosing variables.  
**Closures** remember values from their enclosing scope.`,
        codes: [
          {
            label: 'LEGB lookup',
            text: `x = "global"
def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)        # local
    inner()
    print(x)            # enclosing
outer()
print(x)                # global`
          },
          {
            label: 'nonlocal (modify enclosing)',
            text: `def make_counter():
    count = 0
    def inc():
        nonlocal count
        count += 1
        return count
    return inc

c = make_counter()
print(c(), c(), c())   # 1 2 3`
          },
          {
            label: 'Closure (function factory)',
            text: `def make_multiplier(n: int):
    def mul(x: int) -> int:
        return n * x
    return mul

times3 = make_multiplier(3)
print(times3(10))   # 30`
          }
        ]
      },

      {
        id: 'mutable-defaults',
        title: 'Pitfall: mutable default parameters',
        body: `Never use a **mutable** object (like \`[]\` or \`{}\`) as a default. It is created **once** at function definition time and reused.  
Use \`None\` as the default and create a new object inside.`,
        codes: [
          {
            label: 'Buggy vs fixed',
            text: `def add_item_bad(x, bucket=[]):  # BAD
    bucket.append(x)
    return bucket

print(add_item_bad(1))  # [1]
print(add_item_bad(2))  # [1, 2]  (surprising!)

def add_item_ok(x, bucket=None):   # GOOD
    if bucket is None:
        bucket = []
    bucket.append(x)
    return bucket

print(add_item_ok(1))   # [1]
print(add_item_ok(2))   # [2]`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's9-greet-default',
        title: 'Greeting with default',
        prompt: 'Write greet(name="World") -> "Hello, <name>!"',
        solution: `def greet(name: str = "World") -> str:
    return f"Hello, {name}!"
print(greet(), greet("Dhruv"))`
      },
      {
        id: 's9-sum-all',
        title: 'Sum all (*args)',
        prompt: 'Implement sum_all(*args) that returns the sum of any number of numbers.',
        solution: `def sum_all(*args: float) -> float:
    total = 0.0
    for x in args:
        total += x
    return total

print(sum_all(1,2,3,4.5))`
      },
      {
        id: 's9-apply-discount',
        title: 'Keyword-only option',
        prompt: 'Write apply_discount(price, *, rate=0.1) that returns price*(1-rate).',
        solution: `def apply_discount(price: float, *, rate: float = 0.1) -> float:
    return price * (1 - rate)

print(apply_discount(100.0))
print(apply_discount(100.0, rate=0.25))`
      },
      {
        id: 's9-top-n',
        title: 'Top-N with key (lambda)',
        prompt: 'Write top_n(items, n=3, key=None) that returns the largest n items using sorted(..., key=key).',
        solution: `from typing import Callable, Iterable, Any

def top_n(items: Iterable[Any], n: int = 3, key: Callable[[Any], Any] | None = None):
    return sorted(items, key=key, reverse=True)[:n]

print(top_n(["aa","b","cccc"], n=2, key=len))`
      },
      {
        id: 's9-multiplier-factory',
        title: 'Closure factory',
        prompt: 'Write make_multiplier(n) that returns a function f(x)=n*x. Show f(10) when n=3.',
        solution: `def make_multiplier(n: int):
    def mul(x: int) -> int:
        return n * x
    return mul

times3 = make_multiplier(3)
print(times3(10))  # 30`
      },
      {
        id: 's9-fix-mutable-default',
        title: 'Fix the mutable default bug',
        prompt: 'Refactor add_item_bad(x, bucket=[]) to the safe None pattern.',
        starterCode: `def add_item_bad(x, bucket=[]):
    bucket.append(x)
    return bucket`,
        solution: `def add_item_ok(x, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(x)
    return bucket`
      }
    ]
  }
]
