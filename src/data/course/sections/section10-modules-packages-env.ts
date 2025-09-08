// src/data/course/sections/section10-modules-packages-env.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'modules-packages-env',
    title: 'Section 10 — Modules, Packages & Environments',
    summary: 'import statements, pip installs, virtual environments (venv), and simple project layout.',
    duration: 60,
    content:
      'Organize code with modules and packages, isolate dependencies with virtual environments, and structure small projects cleanly.',
    startHere: {
      goals: [
        'Import from the standard library and your own files/packages.',
        'Install/manage third-party packages with pip & requirements.txt.',
        'Create/activate a virtual environment and use pip inside it.',
        'Understand package layout, __init__.py, and running modules with -m.',
        'Use __name__ == "__main__" and avoid common import pitfalls.'
      ],
      prerequisites: [
        'Section 7 — Collections I',
        'Section 8 — Collections II',
        'Section 9 — Functions'
      ],
      resources: [
        { label: 'The import system', href: 'https://docs.python.org/3/reference/import.html' },
        { label: 'venv — Creating virtual environments', href: 'https://docs.python.org/3/library/venv.html' },
        { label: 'pip User Guide', href: 'https://pip.pypa.io/en/stable/user_guide/' }
      ],
      tip: 'Prefer `python -m pip ...` so you install to the interpreter you’re actually using (especially inside venvs).',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'imports-101',
        title: 'Imports 101: modules, packages, aliases',
        body: `A **module** is one .py file. A **package** is a folder with \`__init__.py\` that contains modules (and subpackages).
Import styles:
• \`import pkg.mod\`  (use prefix when calling)
• \`from pkg import mod\`  (import a name into your namespace)
• \`from pkg.mod import name as alias\` (rename for clarity)
Absolute imports are preferred; use explicit relatives inside a package (\`from .sub import x\`).`,
        codes: [
          {
            label: 'Standard library imports',
            text: `import math
from datetime import date
import statistics as stats

print(math.sqrt(16))
print(date.today())
print(stats.mean([10, 20, 30]))`
          },
          {
            label: 'Your own module (same folder)',
            text: `# file: util.py
def greet(name: str) -> str:
    return f"Hello, {name}"

# file: app.py
import util
from util import greet as hello

print(util.greet("Asha"))
print(hello("Raj"))`
          },
          {
            label: '__main__ guard (only run when executed)',
            text: `# file: script.py
def run():
    print("Doing work...")

if __name__ == "__main__":
    run()  # runs only when ` + "`python script.py`" + ``
          }
        ]
      },

      {
        id: 'pip-basics',
        title: 'pip basics & requirements.txt',
        body: `Use pip to install packages from PyPI. Always prefer \`python -m pip\` so the right interpreter is used (esp. in venvs).  
Pin dependencies in \`requirements.txt\`. Version rules: \`==\` exact, \`>=\` at least, \`<\` less than, wildcards like \`==2.*\`.`,
        codes: [
          {
            label: 'Install / list / show / remove',
            text: `python -m pip install requests
python -m pip list
python -m pip show requests
python -m pip uninstall requests`
          },
          {
            label: 'Freeze & install from file',
            text: `python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt`
          },
          {
            label: 'Version specifiers',
            text: `# requirements.txt examples
requests==2.32.3
flask>=3.0,<4
pydantic==2.*`
          }
        ]
      },

      {
        id: 'venv',
        title: 'Virtual environments (venv)',
        body: `A **virtual environment** is a private folder containing its own Python and site-packages.  
Use one venv **per project** to keep dependencies isolated. Activate it before using pip/run scripts. Remember to add \`.venv/\` to \`.gitignore\`.`,
        codes: [
          {
            label: 'Windows (PowerShell)',
            text: `python -m venv .venv
.\.venv\\Scripts\\Activate.ps1
python -V
python -m pip install requests

# deactivate when done
deactivate`
          },
          {
            label: 'macOS / Linux',
            text: `python3 -m venv .venv
source .venv/bin/activate
python3 -V
python -m pip install requests

# deactivate when done
deactivate`
          },
          {
            label: '.gitignore',
            text: `.venv/
__pycache__/
*.pyc`
          }
        ]
      },

      {
        id: 'project-layout',
        title: 'Project layout & running with -m',
        body: `Two tiny layouts:
**Flat script** (good for one file).  
**Package layout** (scales to multiple modules). Use \`python -m package\` to run the package’s \`__main__.py\`.  
Inside packages, prefer relative imports (\`from .util import x\`).`,
        codes: [
          {
            label: 'Flat script',
            text: `project/
  hello.py

# hello.py
def main():
    print("Hello!")
if __name__ == "__main__":
    main()`
          },
          {
            label: 'Package (src layout)',
            text: `project/
  pyproject.toml        # optional (later sections)
  src/
    app/
      __init__.py
      __main__.py
      util.py

# util.py
def greet(n): return f"Hi {n}"

# __main__.py (entry point)
from .util import greet
print(greet("world"))

# run from project root:
# python -m app         (if PYTHONPATH includes src)
# or run with:
# python -m pip install -e .   (editable install, later)
`
          },
          {
            label: 'Run a module with -m',
            text: `# Run a package’s entry point
python -m app

# Run a submodule as a script
python -m app.util`
          }
        ]
      },

      {
        id: 'import-mechanics',
        title: 'Import mechanics, sys.path & common pitfalls',
        body: `Python searches modules on **sys.path** (current dir, installed site-packages, etc.).  
Use absolute imports from the project root, or explicit relative imports inside a package. Avoid circular imports.  
For hot-reloading in REPL, use \`import importlib; importlib.reload(mod)\`.`,
        codes: [
          {
            label: 'Inspect import paths',
            text: `import sys, pprint
pprint.pprint(sys.path)`
          },
          {
            label: 'Explicit relative import (inside package)',
            text: `# src/app/main.py
from .util import helper  # relative (same package)
# from app.util import helper  # absolute (works when app is importable)`
          },
          {
            label: 'Reload a module (REPL)',
            text: `import mymod
# edit mymod.py ...
import importlib
importlib.reload(mymod)`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's10-make-venv',
        title: 'Make and use a venv',
        prompt: 'Create .venv, activate it, install requests, and freeze requirements.txt.',
        solution: `# Windows (PowerShell)
python -m venv .venv
.\.venv\\Scripts\\Activate.ps1
python -m pip install requests
python -m pip freeze > requirements.txt

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
python -m pip install requests
python -m pip freeze > requirements.txt`
      },
      {
        id: 's10-small-package',
        title: 'Tiny package with __main__',
        prompt: 'Create package folder app/ with __init__.py, __main__.py, util.py. In __main__, import greet() from util and print a message. Run it with python -m app.',
        solution: `# app/util.py
def greet(name: str) -> str:
    return f"Hello, {name}"

# app/__main__.py
from .util import greet
print(greet("from package"))

# run:
python -m app`
      },
      {
        id: 's10-relative-import',
        title: 'Practice explicit relative import',
        prompt: 'Inside a package pkg/, create a.py and b.py. In a.py import hi() from b.py using a relative import and call it.',
        solution: `# pkg/b.py
def hi():
    print("hi from b")

# pkg/a.py
from .b import hi
hi()`
      },
      {
        id: 's10-reqs-pin',
        title: 'Pin versions',
        prompt: 'Write a requirements.txt that pins requests exactly and allows any Flask 3.x.',
        solution: `requests==2.32.3
flask==3.*`
      },
      {
        id: 's10-import-guard',
        title: '__main__ guard',
        prompt: 'Create a module that prints a message only when executed directly, not when imported.',
        solution: `# tool.py
def run():
    print("Running tool")

if __name__ == "__main__":
    run()`
      }
    ]
  }
]
