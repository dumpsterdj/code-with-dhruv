import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'pandas-intro-setup',
    title: 'Section 1 — Intro & Setup (Pandas)',
    summary: 'Why pandas, install steps, notebook/editor setup, quick CSV tour.',
    duration: 55,
    content:
      'Start here. Create a venv, install pandas, choose Jupyter or VS Code, then read a small CSV, inspect with head/info/describe, make a simple selection, and save results. You’ll also learn the copies vs chained-assignment rule.',
    startHere: {
      goals: [
        'Install pandas inside a per-project virtual environment.',
        'Use JupyterLab (notebook) or VS Code (script) comfortably.',
        'Read a CSV and inspect with head(), info(), describe().',
        'Filter rows, select columns, and save to CSV.',
        'Understand copies vs chained assignment to avoid warnings.'
      ],
      prerequisites: [
        'Basic Python (variables, lists/dicts, files)',
        'Python 3 installed on Windows/macOS/Linux'
      ],
      resources: [
        { label: 'pandas — Getting started', href: 'https://pandas.pydata.org/docs/getting_started/index.html' },
        { label: 'JupyterLab Install', href: 'https://jupyter.org/install' }
      ],
      tip: 'Use `python -m pip install ...` so packages install to the interpreter in your venv. In notebooks, restart the kernel after installs.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'install-venv',
        title: 'Install pandas (venv)',
        body: `Create and activate a virtual environment, then install pandas (and Jupyter if you want notebooks).`,
        codes: [
          {
            label: 'Windows (PowerShell)',
            text: `python -m venv .venv
.\.venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
python -m pip install pandas jupyterlab
python -c "import pandas as pd; print(pd.__version__)"   # verify`
          },
          {
            label: 'macOS / Linux',
            text: `python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install pandas jupyterlab
python -c "import pandas as pd; print(pd.__version__)"   # verify`
          }
        ]
      },

      {
        id: 'choose-editor',
        title: 'Pick your editor: Jupyter or VS Code',
        body: `Jupyter is great for exploration; VS Code is great for scripts. Use either.`,
        codes: [
          {
            label: 'Jupyter basics',
            text: `# Launch:
jupyter lab
# New Notebook ▸ Python 3
# Run cells with Shift+Enter`
          },
          {
            label: 'VS Code basics',
            text: `# Create file: hello_pandas.py
# Run it from terminal in your venv:
python hello_pandas.py`
          }
        ]
      },

      {
        id: 'create-sample-data',
        title: 'Create a tiny dataset (people.csv)',
        body: `Make a data/ folder and add people.csv with 3 columns: name, age, city.`,
        codes: [
          {
            label: 'CSV contents (copy/paste)',
            text: `# file: data/people.csv
name,age,city
Asha,12,Pune
Raj,19,Delhi
Mia,17,Goa
Lee,22,Pune
Zara,30,Bengaluru`
          },
          {
            label: 'Generate with pandas (optional)',
            text: `import pandas as pd, pathlib
pathlib.Path("data").mkdir(exist_ok=True)
df = pd.DataFrame({
    "name": ["Asha","Raj","Mia","Lee","Zara"],
    "age":  [12,19,17,22,30],
    "city": ["Pune","Delhi","Goa","Pune","Bengaluru"]
})
df.to_csv("data/people.csv", index=False)`
          }
        ]
      },

      {
        id: 'quick-tour',
        title: 'Quick tour: read → inspect → summarize',
        body: `Load the CSV into a DataFrame, peek at rows, and view types/summary.`,
        codes: [
          {
            label: 'Read & peek',
            text: `import pandas as pd
df = pd.read_csv("data/people.csv")
print(df.head())
print(df.shape)          # (rows, cols)`
          },
          {
            label: 'Info & describe',
            text: `df.info()                          # columns, dtypes, non-nulls
print(df.describe(numeric_only=True))  # numeric summary`
          }
        ]
      },

      {
        id: 'selection-basics',
        title: 'Selection basics (columns, rows, masks)',
        body: `Select a column (Series) or multiple (DataFrame). Use .loc for labels and boolean masks; .iloc for positions.`,
        codes: [
          {
            label: 'Columns & rows',
            text: `print(df["age"].head())            # Series
print(df[["name","city"]].head())  # DataFrame
print(df.loc[0, "name"])           # first row, name
print(df.iloc[:3, :2])             # first 3 rows, first 2 cols`
          },
          {
            label: 'Filter with a mask',
            text: `adults = df[df["age"] >= 18]
print(adults[["name","age"]])`
          }
        ]
      },

      {
        id: 'save-results',
        title: 'Save a result (to_csv)',
        body: `Write filtered results to out/ without the index column.`,
        codes: [
          {
            label: 'Write adults only',
            text: `import pathlib
pathlib.Path("out").mkdir(exist_ok=True)
adults = df[df["age"] >= 18][["name","age","city"]]
adults.to_csv("out/adults.csv", index=False, encoding="utf-8")`
          }
        ]
      },

      {
        id: 'copies-chained',
        title: 'Copies vs chained assignment',
        body: `Some selections return views; modifying them can show a SettingWithCopyWarning. Prefer making a copy, then assign with .loc.`,
        codes: [
          {
            label: 'Safe pattern',
            text: `kids = df[df["age"] < 18].copy()  # explicit copy
kids.loc[:, "is_minor"] = True
print(kids.head())`
          },
          {
            label: 'Avoid this',
            text: `# df[df["age"] < 18]["is_minor"] = True
# ^ may or may not update the original df. Use .copy() + .loc.`
          }
        ]
      },

      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        body: `Common fixes for first-day issues.`,
        codes: [
          {
            label: 'ModuleNotFoundError',
            text: `python -m pip show pandas   # verify installed in THIS venv
# In Jupyter: restart the kernel after installing.`
          },
          {
            label: 'File not found',
            text: `import os; print(os.getcwd())   # check working directory
# ensure data/people.csv exists relative to cwd`
          },
          {
            label: 'Encoding / index',
            text: `df.to_csv("out/file.csv", index=False, encoding="utf-8")`
          }
        ]
      }
    ],

    practice: [
      {
        id: 'p1-read-peek',
        title: 'Read & peek',
        prompt: 'Load data/people.csv and print head(), shape, and info().',
        solution: `import pandas as pd
df = pd.read_csv("data/people.csv")
print(df.head()); print(df.shape); df.info()`
      },
      {
        id: 'p1-filter-save',
        title: 'Filter & save (adults)',
        prompt: 'Filter rows with age ≥ 18 and save name,age,city to out/adults.csv (no index).',
        solution: `adults = df[df["age"] >= 18][["name","age","city"]]
adults.to_csv("out/adults.csv", index=False)`
      },
      {
        id: 'p1-series-mean',
        title: 'Average age',
        prompt: 'Select the age column as a Series and print the mean.',
        solution: `ages = df["age"]; print(float(ages.mean()))`
      },
      {
        id: 'p1-copy-assign',
        title: 'Copy + assign safely',
        prompt: 'Create df_minors as a copy of rows with age < 18 and add is_minor=True using .loc.',
        solution: `df_minors = df[df["age"] < 18].copy()
df_minors.loc[:, "is_minor"] = True
print(df_minors.head())`
      },
      {
        id: 'p1-jupyter',
        title: 'Try Jupyter (optional)',
        prompt: 'Launch JupyterLab, create a new notebook, import pandas, and show df.head().',
        solution: `import pandas as pd
df = pd.read_csv("data/people.csv")
df.head()`
      }
    ]
  }
]
