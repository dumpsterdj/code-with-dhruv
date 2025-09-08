// src/data/course/sections/section13-testing-debugging.ts
import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    slug: 'testing-debugging',
    title: 'Section 13 — Testing & Debugging',
    summary: 'pytest basics, asserts, fixtures & tmp paths, debugging with pdb/breakpoint(), and logging.',
    duration: 60,
    content:
      'Write small, fast tests with pytest; use clean assertions, fixtures, and tmp files; drop into the debugger when things break; and add logging you can verify in tests.',
    startHere: {
      goals: [
        'Install and run pytest; understand test discovery and naming.',
        'Write clear asserts (values, exceptions, approx).',
        'Use fixtures and tmp_path for isolated, repeatable tests.',
        'Debug failing tests with breakpoint()/pdb and selective runs.',
        'Capture and assert logs with logging + caplog.'
      ],
      prerequisites: [
        'Section 9 — Functions',
        'Section 10 — Modules, Packages & Environments'
      ],
      resources: [
        { label: 'pytest docs (getting started)', href: 'https://docs.pytest.org/en/stable/getting-started.html' },
        { label: 'pytest fixtures', href: 'https://docs.pytest.org/en/stable/how-to/fixtures.html' }
      ],
      tip: 'Name files like test_*.py and functions like test_* so pytest finds them automatically.',
      showJumpTo: false
    },

    subsections: [
      {
        id: 'pytest-setup',
        title: 'pytest setup & discovery',
        body: `Install pytest into your project’s venv and run it from the project root.  
pytest discovers tests in files named \`test_*.py\` or \`*_test.py\`, functions \`test_*\`, and classes named \`Test*\` (no __init__).`,
        codes: [
          {
            label: 'Install & run',
            text: `python -m pip install pytest
python -m pytest              # run all tests
python -m pytest -q           # quiet
python -m pytest -k "math"    # only tests matching 'math'
python -m pytest -x           # stop after first failure
python -m pytest -vv          # extra verbose`
          },
          {
            label: 'Example project',
            text: `# mathx.py
def add(a, b): return a + b

# test_mathx.py
from mathx import add

def test_add_simple():
    assert add(2, 3) == 5`
          }
        ]
      },

      {
        id: 'asserts',
        title: 'Assertions: values, exceptions, approx',
        body: `Use plain \`assert\` in pytest—no need for unittest methods.  
Check exceptions with \`pytest.raises\`. For floats, use \`pytest.approx\` or \`math.isclose\`.`,
        codes: [
          {
            label: 'Values & messages',
            text: `def mean(nums): return sum(nums) / len(nums)

def test_mean_value():
    assert mean([2, 4, 6]) == 4

def test_mean_empty():
    try:
        mean([])
    except ZeroDivisionError:
        pass
    else:
        assert False, "expected ZeroDivisionError"`
          },
          {
            label: 'Exceptions (pytest.raises)',
            text: `import pytest

def divide(a, b): return a / b

def test_divide_raises():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)`
          },
          {
            label: 'Approx for floats',
            text: `import pytest
def circle_area(r): return 3.141592653589793 * r * r

def test_area_approx():
    assert circle_area(10) == pytest.approx(314.159, rel=1e-3)`
          },
          {
            label: 'Parametrize table',
            text: `import pytest

@pytest.mark.parametrize("a,b,ans", [(1,2,3), (5,7,12), (-1,1,0)])
def test_add_table(a, b, ans):
    assert a + b == ans`
          }
        ]
      },

      {
        id: 'fixtures-tmp',
        title: 'Fixtures & tmp paths',
        body: `Fixtures are reusable setup/teardown helpers.  
Built-in \`tmp_path\` gives a fresh temporary directory per test (safe, isolated).`,
        codes: [
          {
            label: 'Simple fixture',
            text: `import pytest

@pytest.fixture
def sample_numbers():
    return [10, 20, 30]   # fresh copy each test

def test_total(sample_numbers):
    assert sum(sample_numbers) == 60`
          },
          {
            label: 'tmp_path for files',
            text: `def write_report(path, lines):
    p = path / "report.txt"
    p.write_text("\\n".join(lines) + "\\n", encoding="utf-8")
    return p

def test_write_report(tmp_path):
    f = write_report(tmp_path, ["alpha", "beta"])
    assert f.exists()
    assert f.read_text(encoding="utf-8").splitlines() == ["alpha","beta"]`
          },
          {
            label: 'Yield fixtures (teardown)',
            text: `import pytest

@pytest.fixture
def db():
    # setup
    conn = {"open": True}
    yield conn
    # teardown
    conn["open"] = False

def test_db(db):
    assert db["open"] is True`
          }
        ]
      },

      {
        id: 'debugging',
        title: 'Debugging: breakpoint(), pdb, selective runs',
        body: `Use \`breakpoint()\` (built-in) to drop into the debugger at a failing line.  
Run only what you need with \`-k\` or by pointing at a file::testname. Use \`-x\` to stop at first failure.  
To see prints during tests, add \`-s\`.`,
        codes: [
          {
            label: 'breakpoint() in code',
            text: `def buggy_sum(a, b):
    total = a + b
    breakpoint()     # inspect variables here
    return total

def test_buggy():
    assert buggy_sum(2, 3) == 5

# run:
# python -m pytest -k buggy -s`
          },
          {
            label: 'Debug inside tests',
            text: `import pdb

def test_math():
    a, b = 2, 3
    pdb.set_trace()     # step through
    assert a + b == 5`
          },
          {
            label: 'Run a specific test',
            text: `python -m pytest tests/test_math.py::TestAlgebra::test_addition -q`
          }
        ]
      },

      {
        id: 'logging',
        title: 'Logging & testing logs',
        body: `Set up \`logging.basicConfig\` in your app (not tests). In tests, capture logs with \`caplog\` and assert their content/level.`,
        codes: [
          {
            label: 'App code with logging',
            text: `import logging
log = logging.getLogger(__name__)

def load_user(name: str):
    if not name:
        log.warning("empty name")
        return None
    log.info("loading user %s", name)
    return {"name": name}`
          },
          {
            label: 'Test captured logs (caplog)',
            text: `import logging
from app import load_user

def test_logs(caplog):
    with caplog.at_level(logging.INFO):
        user = load_user("Asha")
        assert user and user["name"] == "Asha"
        assert any("loading user" in msg for msg in caplog.messages)

def test_warning(caplog):
    load_user("")
    assert "empty name" in caplog.text`
          }
        ]
      },

      {
        id: 'tips',
        title: 'Tips: structure & speed',
        body: `• Keep tests tiny and independent (Arrange-Act-Assert).  
• Avoid global state; prefer fixtures.  
• Use marks: \`@pytest.mark.skip\`, \`@pytest.mark.xfail\` for known issues.  
• Keep the slow stuff at the edges (I/O, network); mock or isolate later.`,
        codes: [
          {
            label: 'Skip / xfail examples',
            text: `import pytest, sys

@pytest.mark.skip(reason="not implemented yet")
def test_todo():
    ...

@pytest.mark.xfail(sys.platform.startswith("win"), reason="bug #123", strict=False)
def test_sometimes_fails():
    assert 1/0 == 0`
          }
        ]
      }
    ],

    // ========= Practice =========
    practice: [
      {
        id: 's13-install-run',
        title: 'Install & run pytest',
        prompt: 'Install pytest in your venv and run it on an empty project (0 tests) to verify it works.',
        solution: `python -m pip install pytest
python -m pytest -q`
      },
      {
        id: 's13-test-percent',
        title: 'Test percent() (values & errors)',
        prompt: 'Write percent(part, whole) that raises ValueError if whole <= 0. Add tests for good inputs and ValueError.',
        solution: `# app.py
def percent(part: float, whole: float) -> float:
    if whole <= 0:
        raise ValueError("whole must be > 0")
    return (part / whole) * 100

# test_app.py
import pytest
from app import percent

def test_percent_ok():
    assert percent(30, 50) == 60

def test_percent_raises():
    with pytest.raises(ValueError):
        percent(1, 0)`
      },
      {
        id: 's13-param-pal',
        title: 'Parametrized palindrome',
        prompt: 'Write is_pal(s) and a parametrized test with at least 5 strings (True/False cases).',
        solution: `# pal.py
def is_pal(s: str) -> bool:
    t = "".join(ch.lower() for ch in s if ch.isalnum())
    return t == t[::-1]

# test_pal.py
import pytest
from pal import is_pal

@pytest.mark.parametrize("s,expected", [
    ("madam", True),
    ("racecar", True),
    ("hello", False),
    ("A man, a plan, a canal: Panama", True),
    ("No lemon, no melon", True),
])
def test_is_pal(s, expected):
    assert is_pal(s) == expected`
      },
      {
        id: 's13-tmp-csv',
        title: 'Use tmp_path to write & read CSV',
        prompt: 'Write write_csv(path, rows) then test it with tmp_path, verifying content and row count.',
        solution: `# util.py
import csv
def write_csv(path, rows):
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f); w.writerows(rows)

# test_util.py
import csv
def test_write_csv(tmp_path):
    p = tmp_path / "data.csv"
    write_csv(p, [["a",1],["b",2]])
    with open(p, "r", encoding="utf-8", newline="") as f:
        r = list(csv.reader(f))
    assert r == [["a","1"],["b","2"]]`
      },
      {
        id: 's13-caplog',
        title: 'Assert a warning log',
        prompt: 'In a function, log a WARNING when input is empty. Test it with caplog.',
        solution: `# logx.py
import logging
log = logging.getLogger(__name__)
def greet(name: str | None):
    if not name:
        log.warning("empty name")
        return "?"
    return f"Hi {name}"

# test_logx.py
def test_warn(caplog):
    greet("")
    assert "empty name" in caplog.text`
      },
      {
        id: 's13-breakpoint',
        title: 'Debug a failing test',
        prompt: 'Create a failing test and use breakpoint() to inspect local variables while running pytest -s.',
        solution: `def buggy(a, b): return a*b + 1

def test_buggy():
    x = buggy(2, 3)
    breakpoint()
    assert x == 6  # see x and fix buggy()`
      }
    ]
  }
]
