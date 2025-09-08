// src/data/course/sections/section2-syntax-essentials.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'syntax-essentials',
    title: 'Section 2 — Python Syntax Essentials',
    summary: 'print & input, comments, indentation, and simple expressions — explained simply.',
    duration: 35,
    content:
      'In this section we learn how to talk to the computer (print & input), write friendly notes (comments), use spaces correctly (indentation), and do small maths (expressions).',
    startHere: {
      goals: [
        'Say things on screen with `print()`.',
        'Ask the user for text with `input()` and turn it into a number.',
        'Use comments as friendly notes for humans.',
        'Understand that spaces (indentation) show what belongs together.',
        'Do simple maths and make Python follow the right order.'
      ],
      prerequisites: ['Finished Section 1 — Introduction & Setup'],
      resources: [
        { label: 'Built-in print()', href: 'https://docs.python.org/3/library/functions.html#print' },
        { label: 'input()', href: 'https://docs.python.org/3/library/functions.html#input' },
        { label: 'Docstrings (PEP 257)', href: 'https://peps.python.org/pep-0257/' },
        { label: 'Operator Precedence', href: 'https://docs.python.org/3/reference/expressions.html#operator-precedence' }
      ],
      tip: 'If something looks wrong, add a tiny `print("here!")` to see what your code is doing.',
      showJumpTo: true
    },
    subsections: [
      {
        id: 'say-hello-and-ask',
        title: 'Say Hello & Ask a Question',
        body: `We use \`print()\` to *say things* on the screen.
We use \`input()\` to *ask a question*. \`input()\` always gives us **text**. If we want a number, we change it with \`int()\`.

**Try it:** Run each tab. Change the words. See what happens!`,
        codes: [
          {
            label: 'Print',
            text: `print("Hello!")              # Hello!
print("I like Python")     # I like Python

# Extra: control spaces and newlines
print("A", "B", "C")        # A B C
print("A","B","C", sep="-") # A-B-C
print("No newline", end="")
print(" <- continues same line")`
          },
          {
            label: 'Ask for input',
            text: `name = input("What is your name? ")
print("Nice to meet you,", name)`
          },
          {
            label: 'Make it pretty (f-strings)',
            text: `name = input("Name: ")
print(f"Hi {name}! Welcome!")   # easy and clean`
          },
          {
            label: 'Turn text into a number',
            text: `age_text = input("How old are you? ")
age = int(age_text)          # change text -> number
print(f"Next year you will be {age + 1}")`
          }
        ]
      },

      {
        id: 'comments-and-docstrings',
        title: 'Comments',
        body: `A **comment** starts with \`#\`. Python ignores it. We write comments to explain *why* we did something.

A **docstring** is a big note at the top of a function. It tells what the function does. Tools like \`help()\` can show it.

**Tip:** Short and clear comments are best.`,
        codes: [
          {
            label: 'Line comments',
            text: `# Add two numbers together
a = 4     # first number
b = 6     # second number
print(a + b)  # show the answer`
          },
          {
            label: 'Docstring',
            text: `def hello(name: str) -> None:
    """Say hello to a person by name."""
    print(f"Hello, {name}!")

help(hello)  # shows the docstring in the terminal`
          }
        ]
      },

      {
        id: 'indentation',
        title: 'Indentation',
        body: `Python cares about **spaces** at the start of the line (indentation).
When a line ends with a colon \`:\`, the next lines that are *indented* belong to it.

**Rule of thumb:** Use **4 spaces** for each level. Keep lines lined up neatly.`,
        codes: [
          {
            label: 'Blocks',
            text: `x = 7
if x > 5:
    print("x is big")
    print("these two lines are inside the if-block")
print("this line is outside the if-block")

def cheer():
    print("Go Python!")   # inside the function
cheer()                   # outside again`
          }
        ]
      },

      {
        id: 'expressions-easy-math',
        title: 'Expressions',
        body: `An **expression** is a little calculation that becomes a value.
Python follows an order (like school maths): first multiply/divide, then add/subtract.
We can use parentheses to make the order clear.

**Logic words:** \`and\` means both must be true, \`or\` means at least one is true.`,
        codes: [
          {
            label: 'Math order',
            text: `print(2 + 3 * 4)     # 14  (3*4 happens first)
print((2 + 3) * 4)   # 20  (parentheses first)`
          },
          {
            label: 'Logic',
            text: `is_raining = True
have_umbrella = False
print(is_raining and have_umbrella)  # False
print(is_raining or have_umbrella)   # True`
          },
          {
            label: 'Compare numbers',
            text: `age = 10
print(age >= 10)     # True
print(5 < age < 12)  # True (chained comparisons)`
          }
        ]
      },

    ],
    practice: [
      {
        id: 's2-favorite-color',
        title: 'Favorite color',
        prompt: 'Ask for a color and print: “I like <color> too!”',
        solution: `color = input("Favorite color: ")
print(f"I like {color} too!")`
      },
      {
        id: 's2-sum-two',
        title: 'Add two numbers',
        prompt: 'Ask for two numbers and print their sum.',
        starterCode: `a_text = input("First number: ")
b_text = input("Second number: ")
# convert and print the sum`,
        hint: 'Use int() to turn text into numbers.',
        solution: `a = int(a_text)
b = int(b_text)
print("Sum =", a + b)`
      },
      {
        id: 's2-teen-or-kid',
        title: 'Teen or Kid',
        prompt: 'Ask for age. If age is 13 or more, print “Teen”. Otherwise print “Kid”.',
        solution: `age = int(input("Age: "))
if age >= 13:
    print("Teen")
else:
    print("Kid")`
      }
    ]
  }
]
