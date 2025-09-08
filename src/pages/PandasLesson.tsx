// src/pages/PandasLesson.tsx
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { pandasCourse as course } from '../data/pandas'

/* ------------ Per-lesson checklist (localStorage) ------------ */
function useChecklist(ids: string[], storageKey: string) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Record<string, boolean>
        return ids.reduce((m, id) => ((m[id] = !!saved[id]), m), {} as Record<string, boolean>)
      } catch {}
    }
    return ids.reduce((m, id) => ((m[id] = false), m), {} as Record<string, boolean>)
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [storageKey, checked])

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  const reset  = () => setChecked(ids.reduce((m, id) => ((m[id] = false), m), {} as Record<string, boolean>))
  const done   = Object.values(checked).filter(Boolean).length

  return { checked, toggle, reset, done, total: ids.length }
}

/* ------------ Utilities ------------ */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] || '')
  useEffect(() => {
    if (!ids.length) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids.join('|')])
  return active
}

function CodeBlock({ text, badge }: { text: string; badge?: string }) {
  const copy = async () => { try { await navigator.clipboard.writeText(text) } catch {} }
  return (
    <figure className="doc-codewrap">
      <div className="doc-codehdr">
        {badge ? <span className="doc-chip">{badge}</span> : <span />}
        <button className="doc-copy" onClick={copy} type="button">Copy</button>
      </div>
      <pre className="doc-code"><code>{text}</code></pre>
    </figure>
  )
}

/* ------------ Start Here (data-driven) ------------ */
function StartHere({ lesson }: { lesson: (typeof course.lessons)[number] }) {
  const meta = lesson.startHere
  if (!meta) return null

  const { goals = [], prerequisites = [], resources = [], tip, showJumpTo = false } = meta
  const subs = lesson.subsections ?? []

  const withCode = (s: string) =>
    s.split(/`([^`]+)`/g).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : <span key={i}>{part}</span>))

  return (
    <section aria-labelledby="start-here" id="start-here" className="doc-card">
      <h2 className="doc-h2">Start here</h2>

      <div className="doc-grid">
        {goals.length > 0 && (
          <div>
            <div className="doc-coltitle">🎯 Goals</div>
            <ul className="doc-list">{goals.map((g, i) => <li key={i}>{withCode(g)}</li>)}</ul>
          </div>
        )}

        {prerequisites.length > 0 && (
          <div>
            <div className="doc-coltitle">📋 Prerequisites</div>
            <ul className="doc-list">{prerequisites.map((p, i) => <li key={i}>{withCode(p)}</li>)}</ul>
          </div>
        )}

        {showJumpTo && subs.length > 0 && (
          <div>
            <div className="doc-coltitle">🔗 Jump to</div>
            <ol className="doc-list doc-ol">
              {subs.map(s => (
                <li key={s.id}><a href={`#${s.id}`} className="doc-link">{s.title}</a></li>
              ))}
            </ol>
          </div>
        )}

        {resources.length > 0 && (
          <div>
            <div className="doc-coltitle">📚 Resources</div>
            <ul className="doc-list">
              {resources.map((r, i) => (
                <li key={i}><a className="doc-link" href={r.href} target="_blank" rel="noreferrer">{r.label}</a></li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {tip && (
        <div className="doc-tip">
          <strong>Tip:</strong> {withCode(tip)}
        </div>
      )}
    </section>
  )
}

/* ------------ Practice Panel ------------ */
function PracticePanel({
  items,
  slug
}: {
  items: NonNullable<(typeof course.lessons)[number]['practice']>
  slug: string
}) {
  if (!items?.length) return null
  const ids = items.map(i => i.id)
  const ctl = useChecklist(ids, `pyd:pandas:practice:${slug}`)

  return (
    <section id="practice" className="doc-card" style={{ marginTop: '1.25rem' }}>
      <h2 className="doc-h2">Practice (Let’s try!)</h2>
      <p style={{ marginTop: 0, color: '#64748b' }}>
        Mark a task when you finish. Your progress is saved on this device. Progress: {ctl.done}/{ctl.total}
      </p>
      <ol className="prac-list">
        {items.map((q, i) => (
          <li key={q.id} className="prac-item">
            <div className="prac-row">
              <label className="prac-check">
                <input
                  type="checkbox"
                  checked={!!ctl.checked[q.id]}
                  onChange={() => ctl.toggle(q.id)}
                  aria-label={`Mark "${q.title}" done`}
                />
                <span>Done</span>
              </label>
              <span className="prac-title">{i + 1}. {q.title}</span>
            </div>

            <p className="prac-prompt">{q.prompt}</p>

            {q.starterCode && <CodeBlock text={q.starterCode} badge="Starter" />}

            {q.hint && (
              <details className="prac-details"><summary>Hint</summary><p>{q.hint}</p></details>
            )}

            {q.solution && (
              <details className="prac-details"><summary>See one solution</summary>
                <CodeBlock text={q.solution} badge="Solution" />
              </details>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------ Main Pandas Lesson Page ------------ */
export default function PandasLesson() {
  const { slug } = useParams()
  const location = useLocation()

  const index = course.lessons.findIndex(l => l.slug === slug)
  const lesson = course.lessons[index]

  // Smooth scroll to anchors on hash change / first load
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.hash])

  if (!lesson) {
    return (
      <main style={{ padding: '1.5rem' }}>
        Lesson not found. <Link to="/pandas">Back to syllabus</Link>
      </main>
    )
  }

  const subs = useMemo(() => lesson.subsections?.map(s => s.id) ?? [], [lesson])
  const active = useActiveHeading(subs)
  const hasSubsections = !!lesson.subsections?.length

  // progress per subsection (separate namespace for Pandas)
  const storageKey = useMemo(() => `pyd:pandas:progress:${lesson.slug}`, [lesson.slug])
  const checklist = useChecklist(subs, storageKey) // eslint-disable-line @typescript-eslint/no-unused-vars

  const prev = index > 0 ? course.lessons[index - 1] : null
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: lesson.title,
    description: lesson.summary,
    provider: { '@type': 'Organization', name: 'CodeD' }
  }

  return (
    <div className="doc-shell">
      <Helmet>
        <title>{lesson.title} — Data Analysis with Pandas</title>
        <meta name="description" content={lesson.summary} />
        <link rel="canonical" href={`https://example.com/pandas/${lesson.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        {/* Page-scoped styles (same system as Python) */}
        <style>{`
          html { scroll-behavior: smooth; }
          .doc-shell { max-width: 1200px; margin: 0 auto; padding: 1rem 1.25rem; }
          .doc-layout { display: grid; grid-template-columns: 260px 1fr; gap: 1.5rem; }
          @media (max-width: 980px) { .doc-layout { grid-template-columns: 1fr; } }

          .doc-aside {
            position: sticky; top: 64px; align-self: start;
            height: calc(100vh - 80px); overflow: auto; padding-right: .5rem;
            border-right: 1px solid #f0f0f0;
          }
          @media (max-width: 980px) { .doc-aside { position: static; height: auto; border-right: none; } }

          .doc-brand { font-weight: 700; margin: .25rem 0 .75rem; }
          .doc-nav { list-style: none; margin: 0; padding: 0; }
          .doc-nav li { margin: .25rem 0; }
          .doc-nav a {
            display: block; padding: .45rem .6rem; border-radius: 8px; text-decoration: none; color: #1f2937;
          }
          .doc-nav a:hover { background: #f7f7f7; }
          .doc-nav a.active {
            background: #f0fdf4; color: #065f46; border-left: 3px solid #10b981;
          }

          /* Code blocks */
          .doc-codewrap {
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            background: #f6f8fa;
            overflow: hidden;
            margin-top: .6rem;
            position: relative;
          }
          .doc-codehdr {
            display: flex; align-items: center; justify-content: space-between;
            gap: .75rem; padding: .35rem .6rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
          }
          .doc-chip {
            font-size: .8rem; color: #374151; background: #eef2ff; border: 1px solid #c7d2fe;
            border-radius: 999px; padding: .1rem .5rem;
          }
          .doc-code {
            margin: 0; background: transparent; color: #111827; padding: .9rem 1rem; border: 0; overflow-x: auto;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
          }
          .doc-copy {
            font-size: 12px; padding: 4px 8px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer;
          }

          .doc-main { padding-bottom: 2rem; }
          .doc-h1 { font-size: 2rem; margin: .25rem 0; }
          .doc-meta { color: #64748b; margin-bottom: .75rem; }

          .doc-card { padding: 1rem 1.25rem; border: 1px solid #eaeaea; border-radius: 12px; background: #fafafa; }
          .doc-h2 { margin: 0 0 .5rem; font-size: 1.1rem; }
          .doc-grid { display: grid; gap: .9rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
          .doc-coltitle { font-weight: 600; margin-bottom: .35rem; }
          .doc-list { margin: .35rem 0 0 1rem; line-height: 1.6; }
          .doc-ol { margin-left: 1.25rem; }

          .doc-main code {
            background: #f6f8fa; border: 1px solid #e5e7eb; border-radius: 6px;
            padding: .05rem .35rem; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
            font-size: .95em;
          }

          .doc-tip {
            margin-top: .8rem; padding: .6rem .8rem; border-left: 3px solid #60a5fa;
            background: #f8fbff; border-radius: 8px;
          }

          .doc-subsection { scroll-margin-top: 88px; margin: 2rem 0; }
          .doc-subsection h2 { font-size: 1.35rem; margin: 0 0 .35rem; }

          .doc-navrow { display: flex; justify-content: space-between; gap: .75rem; margin-top: 1.25rem; flex-wrap: wrap; }
          .doc-btn { color: #111; text-decoration: none; border: 1px solid #eee; border-radius: 10px; padding: .5rem .75rem; background: #fff; }
          .doc-btn:hover { background: #fafafa; }

          /* Practice panel */
          .prac-list { margin: .25rem 0 0 1.1rem; }
          .prac-item { margin: 1rem 0; }
          .prac-row { display: flex; align-items: center; gap: .75rem; }
          .prac-check { display: flex; align-items: center; gap: .4rem; color: #64748b; font-size: .9rem; }
          .prac-check input { width: 1rem; height: 1rem; }
          .prac-title { font-weight: 600; }
          .prac-prompt { margin: .25rem 0 .5rem; }
          .prac-details summary { cursor: pointer; color: #2563eb; margin-top: .25rem; }

          /* Mobile mini ToC */
          .doc-toc { display: none; margin: 1rem 0 1.25rem; padding: .75rem 1rem; border-left: 3px solid #ddd; background: #fafafa; border-radius: 8px; }
          @media (max-width: 980px) { .doc-toc { display: block; } }
          .doc-toc h3 { margin: 0 0 .3rem; font-size: 1rem; }
          .doc-toc ol { margin: .25rem 0 0 1.2rem; line-height: 1.7; }
          .doc-link { color: #2563eb; text-decoration: none; }
          .doc-link:hover { text-decoration: underline; }
        `}</style>
      </Helmet>

      <div className="doc-layout">
        {/* Sidebar */}
        <aside className="doc-aside" aria-label="Lesson navigation">
          <div className="doc-brand">{course.title}</div>
          {hasSubsections ? (
            <ul className="doc-nav">
              {lesson.subsections!.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="doc-nav">
              <li><a href="#top" className="active">{lesson.title}</a></li>
            </ul>
          )}
        </aside>

        {/* Main content */}
        <main className="doc-main" id="top">
          <h1 className="doc-h1">{lesson.title}</h1>
          <p className="doc-meta">Estimated time: {lesson.duration} min</p>

          {/* Start Here panel */}
          <StartHere lesson={lesson} />

          {/* Mobile “On this page” ToC */}
          {hasSubsections && (
            <nav className="doc-toc" aria-label="On this page">
              <h3>On this page</h3>
              <ol>
                {lesson.subsections!.map(s => (
                  <li key={s.id}><a className="doc-link" href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ol>
            </nav>
          )}

          {/* Subsections */}
          {hasSubsections ? (
            lesson.subsections!.map(s => (
              <section key={s.id} id={s.id} className="doc-subsection">
                <h2>{s.title}</h2>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{s.body}</p>
                {s.codes?.length
                  ? s.codes.map((b, i) => (
                      <div key={i} style={{ marginTop: '0.75rem' }}>
                        <CodeBlock text={b.text} badge={b.label} />
                      </div>
                    ))
                  : (s.code ? <CodeBlock text={s.code} /> : null)
                }
              </section>
            ))
          ) : (
            <section className="doc-card" style={{ marginTop: '1rem' }}>
              <p>{lesson.content}</p>
              {lesson.code ? <CodeBlock text={lesson.code} /> : null}
            </section>
          )}

          {/* Practice panel */}
          {lesson.practice?.length ? <PracticePanel items={lesson.practice} slug={lesson.slug} /> : null}

          {/* Prev / Next + Back */}
          <nav className="doc-navrow">
            {prev ? <Link className="doc-btn" to={`/pandas/${prev.slug}`}>&larr; {prev.title}</Link> : <span />}
            {next ? <Link className="doc-btn" to={`/pandas/${next.slug}`}>{next.title} &rarr;</Link> : <span />}
          </nav>

          <p style={{ marginTop: '1rem' }}>
            <Link className="doc-link" to="/pandas">Back to syllabus</Link>
          </p>
        </main>
      </div>
    </div>
  )
}
