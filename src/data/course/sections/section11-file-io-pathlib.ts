// src/data/course/sections/section11-file-io-pathlib.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'file-io-pathlib',
    title: 'Section 11 — File I/O & Pathlib',
    summary: 'Read/write text, CSV, JSON; context managers (with) and modern paths (pathlib).',
    duration: 65,
    content:
      'Work with files confidently: open safely with with-statements, handle encodings, use pathlib for paths, and read/write CSV & JSON like a pro.',
    startHere: {
      goals: [
        'Open files correctly with context managers and understand modes (r/w/a).',
        'Use pathlib for portable paths, listings, and simple reads/writes.',
        'Read/write text files line-by-line and all-at-once (UTF-8).',
        'Parse and write CSV with csv.reader / DictReader and DictWriter.',
        'Load and dump JSON with pretty printing and Unicode preserved.'
      ],
      prerequisites: [
        'Section 6 — Strings & Text Basics',
        'Section 7 — Collections I',
        'Section 8 — Collections II'
      ],
      resources: [
        { label: 'Reading and Writing Files', href: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files' },
        { label: 'pathlib — object-oriented filesystem paths', href: 'https://docs.python.org/3/library/pathlib.html' },
        { label: 'csv — CSV File Reading and Writing', href: 'https://docs.python.org/3/library/csv.html' },
        { label: 'json — JSON encoder and decoder', href: 'https://docs.python.org/3/library/json.html' }
      ],
      tip: 'Default to UTF-8: open(..., encoding="utf-8"). For CSV, also pass newline="".',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'files-with',
        title: 'Files 101: modes & with-statement',
        body: `Always open files using a **context manager** so they close automatically. Common modes:
• \`"r"\`: read (default), error if missing  
• \`"w"\`: write (truncate/create)  
• \`"a"\`: append (create if missing)  
• \`"x"\`: create new, error if exists  
Add \`"b"\` for binary, \`"t"\` for text (default). Always set \`encoding="utf-8"\` for text.`,
        codes: [
          {
            label: 'Read all / lines / iterate',
            text: `# Read whole file
with open("poem.txt", "r", encoding="utf-8") as f:
    data = f.read()

# Read lines into list
with open("poem.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Iterate lines (memory-friendly)
with open("poem.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())`
          },
          {
            label: 'Write & append (text)',
            text: `# Overwrite or create
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("Hello\\n")
    f.write("World\\n")

# Append
with open("out.txt", "a", encoding="utf-8") as f:
    f.write("Again!\\n")`
          },
          {
            label: 'Binary (images, bytes)',
            text: `# Copy file as bytes
with open("pic.jpg", "rb") as src, open("copy.jpg", "wb") as dst:
    dst.write(src.read())`
          }
        ]
      },

      {
        id: 'pathlib-basics',
        title: 'pathlib: modern, portable paths',
        body: `Use \`pathlib.Path\` for OS-independent paths. Join with \`/\`. Inspect with \`.exists()\`, \`.is_file()\`, \`.stat()\`.  
Create folders with \`.mkdir(parents=True, exist_ok=True)\`. List files with \`.iterdir()\`, \`.glob()\`, \`.rglob()\`.  
For simple text, \`.read_text()\` / \`.write_text()\` are handy (UTF-8 by default).`,
        codes: [
          {
            label: 'Join & inspect',
            text: `from pathlib import Path

base = Path("data")
report = base / "reports" / "2025" / "jan.txt"
print(report)                 # data/reports/2025/jan.txt
print(report.parent.exists()) # directory exists?
print(report.suffix)          # .txt`
          },
          {
            label: 'Make dirs & list',
            text: `imgs = Path("images")
imgs.mkdir(parents=True, exist_ok=True)

for p in imgs.glob("*.png"):
    print(p.name)

for p in Path(".").rglob("*.py"):
    print(p)    # recursive`
          },
          {
            label: 'Quick read/write',
            text: `p = Path("hello.txt")
p.write_text("Namaste\\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))`
          }
        ]
      },

      {
        id: 'text-patterns',
        title: 'Text file patterns',
        body: `Typical tasks: count lines, filter to another file, write lists as lines. Python normalizes newlines for you in text mode.`,
        codes: [
          {
            label: 'Count lines & chars',
            text: `from pathlib import Path
p = Path("poem.txt")
text = p.read_text(encoding="utf-8")
print("lines:", text.count("\\n") + (1 if text and not text.endswith("\\n") else 0))
print("chars:", len(text))`
          },
          {
            label: 'Filter lines (contains)',
            text: `with open("input.log","r",encoding="utf-8") as fin, open("errors.log","w",encoding="utf-8") as fout:
    for line in fin:
        if "ERROR" in line:
            fout.write(line)`
          },
          {
            label: 'Write list as lines',
            text: `lines = ["alpha","beta","gamma"]
with open("greek.txt","w",encoding="utf-8") as f:
    f.write("\\n".join(lines) + "\\n")`
          }
        ]
      },

      {
        id: 'csv-io',
        title: 'CSV: reader / DictReader and DictWriter',
        body: `Open CSV with \`newline=""\` and an explicit encoding. Use \`csv.reader\` (lists) or \`csv.DictReader\` (dicts). For writing, use \`csv.writer\` or \`csv.DictWriter\`.`,
        codes: [
          {
            label: 'Read rows (lists)',
            text: `import csv
with open("people.csv","r",encoding="utf-8",newline="") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)   # ['name','age'] ...`
          },
          {
            label: 'Read as dicts',
            text: `import csv
with open("people.csv","r",encoding="utf-8",newline="") as f:
    dr = csv.DictReader(f)  # uses header row
    ages = [int(r["age"]) for r in dr]
print(sum(ages)/len(ages))`
          },
          {
            label: 'Write dicts',
            text: `import csv
rows = [{"name":"Asha","age":12},{"name":"Raj","age":11}]
with open("out.csv","w",encoding="utf-8",newline="") as f:
    dw = csv.DictWriter(f, fieldnames=["name","age"])
    dw.writeheader()
    dw.writerows(rows)`
          }
        ]
      },

      {
        id: 'json-io',
        title: 'JSON: load & dump (pretty, Unicode)',
        body: `Use \`json.load\` and \`json.dump\` for files; \`json.dumps\` / \`loads\` for strings. Pretty print with \`indent=2\`. Keep Unicode readable with \`ensure_ascii=False\`.`,
        codes: [
          {
            label: 'Load / dump file',
            text: `import json
# load
with open("config.json","r",encoding="utf-8") as f:
    cfg = json.load(f)

# modify
cfg["debug"] = True

# dump pretty (Unicode)
with open("config.json","w",encoding="utf-8") as f:
    json.dump(cfg, f, indent=2, ensure_ascii=False)`
          },
          {
            label: 'String <-> JSON',
            text: `import json
s = '{"name":"Mía","age":12}'
obj = json.loads(s)
print(obj["name"])

txt = json.dumps(obj, indent=2, ensure_ascii=False)
print(txt)`
          }
        ]
      },

      {
        id: 'errors',
        title: 'Common errors & robust reads',
        body: `Catch file/permission/encoding issues. Offer fallbacks or helpful messages.`,
        codes: [
          {
            label: 'Try/except with hints',
            text: `from pathlib import Path
path = Path("data.txt")
try:
    data = path.read_text(encoding="utf-8")
except FileNotFoundError:
    print("File missing:", path)
except PermissionError:
    print("No permission for:", path)
except UnicodeDecodeError:
    # try a different encoding or replace errors
    data = path.read_text(encoding="utf-8", errors="replace")
    print("Warning: replaced undecodable characters")
else:
    print("OK, length:", len(data))`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's11-count-lines',
        title: 'Count lines & words',
        prompt: 'Read poem.txt and print lines and total words (split on whitespace).',
        solution: `from pathlib import Path
text = Path("poem.txt").read_text(encoding="utf-8")
lines = text.splitlines()
words = text.split()
print("lines:", len(lines), "words:", len(words))`
      },
      {
        id: 's11-csv-avg',
        title: 'Average from CSV',
        prompt: 'Given scores.csv with header name,score, compute the average score.',
        solution: `import csv
with open("scores.csv","r",encoding="utf-8",newline="") as f:
    dr = csv.DictReader(f)
    vals = [float(r["score"]) for r in dr]
print(sum(vals)/len(vals) if vals else 0.0)`
      },
      {
        id: 's11-json-merge',
        title: 'Merge JSON configs',
        prompt: 'Load base.json and local.json, merge (local overrides), write merged.json pretty with Unicode.',
        solution: `import json
with open("base.json","r",encoding="utf-8") as f: base = json.load(f)
with open("local.json","r",encoding="utf-8") as f: local = json.load(f)
merged = {**base, **local}
with open("merged.json","w",encoding="utf-8") as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)`
      },
      {
        id: 's11-list-py',
        title: 'List .py files (recursive) with sizes',
        prompt: 'Walk current folder recursively and print each .py path and size in bytes (use pathlib).',
        solution: `from pathlib import Path
for p in Path(".").rglob("*.py"):
    print(f"{p} - {p.stat().st_size} bytes")`
      },
      {
        id: 's11-project-skeleton',
        title: 'Create project skeleton',
        prompt: 'Using pathlib, create folders data/, logs/, and an empty README.md at the root.',
        solution: `from pathlib import Path
Path("data").mkdir(exist_ok=True)
Path("logs").mkdir(exist_ok=True)
Path("README.md").write_text("# Project\\n", encoding="utf-8")`
      }
    ]
  }
]
