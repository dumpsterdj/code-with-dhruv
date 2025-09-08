// export type Lesson = {
//   slug: string
//   title: string
//   summary: string
//   duration: number
//   content: string
//   code?: string
// }

// export const course: { title: string; totalHours: number; lessons: Lesson[] } = {
//   title: 'Python for Beginners',
//   totalHours: 6,
//   lessons: [
//     {
//       slug: 'hello-python',
//       title: 'Hello, Python',
//       summary: 'Set up Python and run your first script.',
//       duration: 15,
//       content: 'Install Python, verify your version, and run a simple print statement.',
//       code: 'print("Hello, Python!")'
//     },
//     {
//       slug: 'variables-and-types',
//       title: 'Variables & Types',
//       summary: 'Numbers, strings, booleans, lists, dicts.',
//       duration: 25,
//       content: 'Learn Python data types with mini exercises.'
//     },
//     {
//       slug: 'control-flow',
//       title: 'Control Flow',
//       summary: 'If/else and for/while loops.',
//       duration: 30,
//       content: 'Write simple programs using conditionals and loops.'
//     },
//     {
//       slug: 'functions',
//       title: 'Functions',
//       summary: 'Define and use functions with parameters & return values.',
//       duration: 30,
//       content: 'Refactor logic into reusable functions.'
//     }
//   ]
// }

// // src/data/pythonCourse.ts
// export type Subsection = {
//   id: string          // anchor id, e.g. #why-python
//   title: string
//   body: string
//   code?: string
//   collapsed?: boolean
// }

// export type Lesson = {
//   slug: string
//   title: string
//   summary: string
//   duration: number
//   content: string
//   code?: string
//   subsections?: Subsection[]   // NEW: only for lessons that are “multi-section”
// }

// export const course: { title: string; totalHours: number; lessons: Lesson[] } = {
//   title: 'Python for Beginners',
//   totalHours: 8,
//   lessons: [
//     // ---- Section 1 as ONE page with 4 subsections ----
//     {
//       slug: 'intro-setup',
//       title: 'Section 1 — Introduction & Setup',
//       summary: 'Why Python, install steps, IDE setup, and your first program.',
//       duration: 60,
//       content:
//         'Start here. Work through each subsection in order. Use the table of contents to jump around.',
//       subsections: [
//         {
//           id: 'why-python',
//           title: 'What is Python? Why Learn It?',
//           body: `Python is a high-level, interpreted language known for readability and a huge ecosystem (PyPI).
// Common uses: automation/SRE, data analysis, web & APIs, scripting, AI/ML, and education.

// Why it’s great for beginners:
// • Clean syntax → focus on concepts, not boilerplate
// • Massive community & libraries
// • Cross-platform (Windows/macOS/Linux)

// Mini-exercise:
// 1) Skim python.org/about to see real-world uses.
// 2) Write down 3 things you’d like to build with Python.`
//         },
//         {
//           id: 'install-python',
//           title: 'Install Python (Windows/Mac/Linux)',
//           body: `Windows
// • Microsoft Store or winget:
//   winget install -e --id Python.Python.3.12
// • Verify:  py -V    or   python --version

// macOS
// • Homebrew:
//   brew install python
// • Verify:  python3 --version    pip3 --version

// Linux (Debian/Ubuntu)
// • Install:
//   sudo apt update && sudo apt install -y python3 python3-pip
// • Verify:  python3 --version

// Notes
// • If 'python' not found, try 'python3'.
// • Ensure pip works: pip --version (or pip3 --version).`
//         },
//         {
//           id: 'set-up-ide',
//           title: 'Set up an IDE (VS Code / PyCharm / Jupyter)',
//           body: `VS Code
// 1) Install VS Code + "Python" extension (Microsoft).
// 2) Ctrl+Shift+P → "Python: Select Interpreter" → choose Python 3.x.
// 3) Create hello.py and run with ▶ or "Run Python File".

// PyCharm (Community)
// 1) New Project → select Python 3.x interpreter.
// 2) Right-click hello.py → Run.

// Jupyter (great for notes)
// 1) pip install jupyterlab
// 2) jupyter lab → New Notebook → Python 3 → Shift+Enter to run cells.

// Tip: pick ONE tool to start; explore others later.`
//         },
//         {
//           id: 'first-program',
//           title: 'Your First Program',
//           body: `Create a file hello.py and run it from your IDE or terminal.

// Windows:
//   py hello.py    (or)   python hello.py
// macOS/Linux:
//   python3 hello.py

// Try the REPL:
//   python    (or)   python3
// Then type print("Hello, World!") and press Enter.

// Stretch exercise:
// • Ask for a name and greet the user.
// • Change the message and re-run to see edits.`,
//           code: `print("Hello, World!")
// name = input("Your name: ")
// print(f"Hi, {name}! Welcome to Python.")`
//         }
//       ]
//     },

//     // Keep the rest of your course as normal single-lesson pages
//     {
//       slug: 'variables-and-types',
//       title: 'Variables & Types',
//       summary: 'Numbers, strings, booleans, lists, dicts.',
//       duration: 25,
//       content: 'Learn Python data types with mini exercises.'
//     },
//     {
//       slug: 'control-flow',
//       title: 'Control Flow',
//       summary: 'If/else and for/while loops.',
//       duration: 30,
//       content: 'Write simple programs using conditionals and loops.'
//     },
//     {
//       slug: 'functions',
//       title: 'Functions',
//       summary: 'Define and use functions with parameters & return values.',
//       duration: 30,
//       content: 'Refactor logic into reusable functions.'
//     }
//   ]
// }

// src/data/pythonCourse.ts

/***** Types *****/
export type Subsection = {
  id: string            // anchor id, e.g. "why-python"
  title: string
  body: string          // supports backtick inline code for pills
  code?: string         // optional code block
  codes?: { label?: string; text: string }[]
}

export type ResourceLink = { label: string; href: string }

export type StartHereMeta = {
  goals: string[]
  prerequisites?: string[]
  resources?: ResourceLink[]
  tip?: string                 // supports `inline code` with backticks
  showJumpTo?: boolean         // if true and subsections exist, show a Jump-to column
}

export type Lesson = {
  slug: string
  title: string
  summary: string
  duration: number             // minutes
  content: string
  code?: string
  subsections?: Subsection[]
  startHere?: StartHereMeta
}

export const course: { title: string; totalHours: number; lessons: Lesson[] } = {
  title: 'Python for Beginners',
  totalHours: 8,
  lessons: [
    /***** SECTION 1 as a single page with four subsections *****/
    {
      slug: 'intro-setup',
      title: 'Section 1 — Introduction & Setup',
      summary: 'Why Python, install steps, IDE setup, and your first program.',
      duration: 60,
      content: 'Start here. Work through each subsection in order. Use the table of contents to jump around.',
      startHere: {
        goals: [
          'Understand what Python is and why it’s popular.',
          'Install Python 3 and verify your setup.',
          'Pick an editor (VS Code / PyCharm / Jupyter).',
          'Write & run `Hello, World!`'
        ],
        prerequisites: [
          'Windows / macOS / Linux device',
          'Admin rights to install software',
          '~60 minutes of focused time'
        ],
        resources: [
          { label: 'Python Downloads', href: 'https://www.python.org/downloads/' },
          { label: 'VS Code + Python Extension', href: 'https://code.visualstudio.com/docs/python/python-tutorial' },
          { label: 'PyCharm (Community)', href: 'https://www.jetbrains.com/pycharm/download/' },
          { label: 'JupyterLab Install', href: 'https://jupyter.org/install' }
        ],
        tip: 'If `python` is not found, try `python3`. On Windows, `py -V` shows the launcher version.',
        showJumpTo: false
      },
      subsections: [
        {
          id: 'why-python',
          title: 'What is Python? Why Learn It?',
          body: `Python is a high-level, interpreted language known for readability and a massive library ecosystem (PyPI).
Common uses: automation/SRE, data analysis, web & APIs, scripting, AI/ML, and education.

Why it’s great for beginners
• Clean syntax → focus on concepts, not boilerplate
• Huge community & libraries
• Cross-platform (Windows/macOS/Linux)

Mini-exercise
1) Visit \`python.org/about\` and skim real-world uses.
2) Write down 3 things you’d like to build with Python.`
        },
        {
          id: 'install-python',
          title: 'Install Python (Windows/Mac/Linux)',
          body: `Pick your OS and run the commands below. Then verify the installation.

Notes
• If python not found, try python3.
• Ensure pip works: pip --version (or pip3 --version).`,
  codes: [
    {
      label: 'Windows (winget)',
      text: `

winget install -e --id Python.Python.3.12

py -V

python --version`
    },
    {
      label: 'macOS (Homebrew)',
      text: `
      
brew install python

python3 --version

pip3 --version`
    },
    {
      label: 'Linux (Debian/Ubuntu)',
      text: `
      
sudo apt update && sudo apt install -y python3 python3-pip

python3 --version`
    }
  ]
        },
        {
          id: 'set-up-ide',
          title: 'Set up an IDE (VS Code / PyCharm / Jupyter)',
          body: `VS Code
1) Install VS Code + "Python" extension (Microsoft).
2) \`Ctrl+Shift+P\` → "Python: Select Interpreter" → choose Python 3.x.
3) Create \`hello.py\` and click ▶ "Run Python File".

PyCharm (Community)
1) New Project → select Python 3.x interpreter.
2) Right-click \`hello.py\` → Run.

Jupyter (great for notes/experiments)
1) \`pip install jupyterlab\`
2) \`jupyter lab\` → New Notebook → Python 3 → run cells with \`Shift+Enter\`.

Tip: pick ONE tool to start; explore others later.`
        },
        {
          id: 'first-program',
          title: 'Your First Program',
          body: `Create a file \`hello.py\` and run it from your IDE or terminal.

Windows:
  \`py hello.py\`  (or)  \`python hello.py\`
macOS/Linux:
  \`python3 hello.py\`

Try the REPL:
  \`python\`  (or)  \`python3\`
Then type \`print("Hello, World!")\` and press Enter.

Stretch exercise
• Ask for a name and greet the user.
• Change the message and re-run to see edits.`,
          code: `print("Hello, World!")
name = input("Your name: ")
print(f"Hi, {name}! Welcome to Python.")`
        }
      ]
    },

    /***** Remaining lessons (single-page each) *****/
    {
      slug: 'variables-and-types',
      title: 'Variables & Types',
      summary: 'Numbers, strings, booleans, lists, dicts.',
      duration: 25,
      content: 'Learn Python data types with mini exercises.',
      startHere: {
        goals: [
          'Declare variables and understand dynamic typing.',
          'Work with `int`, `float`, `str`, `bool`, and `None`.',
          'Use lists, tuples, sets, and dicts.'
        ],
        prerequisites: ['Complete Section 1 — Introduction & Setup'],
        resources: [{ label: 'Built-in Types (docs)', href: 'https://docs.python.org/3/library/stdtypes.html' }],
        tip: 'Use `type(x)` to check a variable’s type.'
      }
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      summary: 'If/else and for/while loops.',
      duration: 30,
      content: 'Write simple programs using conditionals and loops.',
      startHere: {
        goals: [
          'Write branching logic with `if`/`elif`/`else`.',
          'Loop with `for` and `while`; use `break`/`continue`.',
          'Practice tracing loop execution.'
        ],
        prerequisites: ['Comfort with variables & booleans'],
        tip: 'When a loop seems stuck, add `print()` inside to see state each iteration.'
      }
    },
    {
      slug: 'functions',
      title: 'Functions',
      summary: 'Define and use functions with parameters & return values.',
      duration: 30,
      content: 'Refactor logic into reusable functions.',
      startHere: {
        goals: [
          'Define functions with parameters and return values.',
          'Use default parameters and docstrings.',
          'Understand scope and return early.'
        ],
        prerequisites: ['Control flow basics'],
        resources: [{ label: 'Defining Functions (docs)', href: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' }],
        tip: 'Keep functions small; if a function exceeds ~20 lines, consider splitting.'
      }
    }
  ]
}
