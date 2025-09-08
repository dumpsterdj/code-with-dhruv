import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
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
            text: `winget install -e --id Python.Python.3.12
py -V
python --version`
          },
          {
            label: 'macOS (Homebrew)',
            text: `brew install python
python3 --version
pip3 --version`
          },
          {
            label: 'Linux (Debian/Ubuntu)',
            text: `sudo apt update && sudo apt install -y python3 python3-pip
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
      }
      
    ],
    practice: [
      {
        id: 's1-check-python',
        title: 'Check your Python',
        prompt: 'Open a terminal and print your Python version. Then try the Python REPL and exit it.',
        hint: 'Use `python --version` or `python3 --version`. In the REPL, type `exit()` or press Ctrl+Z(Win)/Ctrl+D(macOS/Linux).',
        solution: `python --version
python3 --version
python
print("Hello from REPL")
exit()`
      },
      {
        id: 's1-hello-name',
        title: 'Say hello with your name',
        prompt: 'Create a script that asks for your name and prints a greeting.',
        starterCode: `# hello_name.py
name = input("Your name: ")
# print a friendly message`,
        solution: `name = input("Your name: ")
print(f"Nice to meet you, {name}!")`
      },
      {
        id: 's1-jupyter',
        title: 'Try Jupyter (optional)',
        prompt: 'Install JupyterLab, create a new notebook, and run a cell that says Hello.',
        hint: 'Install with `pip install jupyterlab`, then run `jupyter lab`.',
        solution: `# In a notebook cell
print("Hello from Jupyter!")`
      }
    ]
    
  }
]
