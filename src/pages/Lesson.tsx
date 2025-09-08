// import { useParams, Link } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { course } from '../data/pythonCourse'

// export default function Lesson(){
//   const { slug } = useParams()
//   const idx = course.lessons.findIndex(l => l.slug === slug)
//   const lesson = course.lessons[idx]

//   if (!lesson) {
//     return <div>Lesson not found. <Link to="/python">Back to syllabus</Link></div>
//   }

//   const prev = idx > 0 ? course.lessons[idx - 1] : null
//   const next = idx < course.lessons.length - 1 ? course.lessons[idx + 1] : null

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Course",
//     "name": lesson.title,
//     "description": lesson.summary,
//     "provider": { "@type": "Organization", "name": "PyCourse" }
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{lesson.title} — Python With Dhruv</title>
//         <meta name="description" content={lesson.summary} />
//         <link rel="canonical" href={`https://example.com/python/${lesson.slug}`} />
//         <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
//       </Helmet>

//       <article style={{display:'grid', gap:'1rem'}}>
//         <h1 style={{marginBottom:0}}>{lesson.title}</h1>
//         <p style={{color:'#666', marginTop:0}}>Estimated time: {lesson.duration} min</p>
//         <div style={{padding:'1rem', border:'1px solid #eaeaea', borderRadius:'0.75rem', background:'#fafafa'}}>
//           {lesson.code && (
//             <pre style={{overflowX:'auto'}}><code>{lesson.code}</code></pre>
//           )}
//           <p>{lesson.content}</p>
//         </div>

//         <nav style={{display:'flex', justifyContent:'space-between', marginTop:'1rem'}}>
//           {prev ? <Link to={`/python/${prev.slug}`}>&larr; {prev.title}</Link> : <span />}
//           {next ? <Link to={`/python/${next.slug}`}>{next.title} &rarr;</Link> : <span />}
//         </nav>
//         <div style={{marginTop:'1rem'}}><Link to="/python">Back to syllabus</Link></div>
//       </article>
//     </>
//   )
// }

// // src/Lesson.tsx
// import { useEffect } from 'react'
// import { Link, useLocation, useParams } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { course } from '../data/pythonCourse'

// /* ---------- Small, reusable code block with Copy button ---------- */
// function Code({ text }: { text: string }) {
//   const copy = async () => {
//     try { await navigator.clipboard.writeText(text) } catch {}
//   }

//   return (
//     <div className="k-codewrap">
//       <pre className="k-code"><code>{text}</code></pre>
//       <button className="k-copy" onClick={copy} aria-label="Copy code">Copy</button>
//     </div>
//   )
// }

// /* ---------- Pretty “Start here” intro card with 3 columns ---------- */
// function StartHere({ lesson }: { lesson: (typeof course.lessons)[number] }) {
//   const subs = lesson.subsections ?? []
//   return (
//     <section aria-labelledby="start-here" id="start-here" className="k-card">
//       <h2 className="k-h2">Start here</h2>

//       <div className="k-grid">
//         <div>
//           <div className="k-coltitle">🎯 Goals</div>
//           <ul className="k-list">
//             <li>Understand what Python is and why it’s popular.</li>
//             <li>Install Python 3 and verify your setup.</li>
//             <li>Pick an editor (VS Code / PyCharm / Jupyter).</li>
//             <li>Write & run <code>Hello, World!</code></li>
//           </ul>
//         </div>

//         <div>
//           <div className="k-coltitle">📋 Prerequisites</div>
//           <ul className="k-list">
//             <li>Basic computer usage (files, optional terminal).</li>
//             <li>Windows / macOS / Linux with admin rights.</li>
//             <li>~60 minutes of focused time.</li>
//           </ul>
//         </div>

//         <div>
//           <div className="k-coltitle">🔗 Jump to</div>
//           <ol className="k-list k-ol">
//             {subs.map(s => (
//               <li key={s.id}>
//                 <a href={`#${s.id}`} className="k-link">{s.title}</a>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>

//       <div className="k-tip">
//         <strong>Tip:</strong> If <code>python</code> isn’t found, try <code>python3</code>.
//         On Windows, <code>py -V</code> shows the launcher version.
//       </div>
//     </section>
//   )
// }

// /* ---------- Main Lesson Page ---------- */
// export default function Lesson() {
//   const { slug } = useParams()
//   const location = useLocation()

//   const index = course.lessons.findIndex(l => l.slug === slug)
//   const lesson = course.lessons[index]

//   // Smooth scroll to anchors when hash changes / on first load
//   useEffect(() => {
//     if (location.hash) {
//       const el = document.getElementById(location.hash.slice(1))
//       if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     } else {
//       window.scrollTo({ top: 0 })
//     }
//   }, [location.hash])

//   if (!lesson) {
//     return (
//       <main style={{ padding: '1.5rem' }}>
//         Lesson not found. <Link to="/python">Back to syllabus</Link>
//       </main>
//     )
//   }

//   const hasSubsections = !!lesson.subsections?.length
//   const prev = index > 0 ? course.lessons[index - 1] : null
//   const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null

//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'Course',
//     name: lesson.title,
//     description: lesson.summary,
//     provider: { '@type': 'Organization', name: 'PyD' }
//   }

//   return (
//     <main id="top" className="k-container">
//       <Helmet>
//         <title>{lesson.title} — Python With Dhruv</title>
//         <meta name="description" content={lesson.summary} />
//         <link rel="canonical" href={`https://example.com/python/${lesson.slug}`} />
//         <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

//         {/* lightweight page-scoped styles */}
//         <style>{`
//           html { scroll-behavior: smooth; }
//           .k-container { max-width: 900px; margin: 0 auto; padding: 1.5rem; }
//           .k-h1 { font-size: 2rem; margin: 0 0 .25rem; }
//           .k-meta { color: #666; margin: .1rem 0 1rem; }

//           .k-card {
//             padding: 1rem 1.25rem;
//             border: 1px solid #eaeaea;
//             border-radius: 12px;
//             background: #fafafa;
//           }
//           .k-h2 { margin: 0 0 .5rem; font-size: 1.1rem; }
//           .k-grid {
//             display: grid; gap: .9rem;
//             grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           }
//           .k-coltitle { font-weight: 600; margin-bottom: .35rem; }
//           .k-list { margin: .35rem 0 0 1rem; line-height: 1.6; }
//           .k-ol { margin-left: 1.25rem; }
//           .k-link { color: #3b82f6; text-decoration: none; }
//           .k-link:hover { text-decoration: underline; }

//           .k-tip {
//             margin-top: .8rem; padding: .6rem .8rem;
//             border-left: 3px solid #60a5fa;
//             background: #f8fbff; border-radius: 8px;
//           }

//           .k-toc {
//             position: sticky; top: 8px;
//             margin: 1rem 0 1.5rem; padding: .75rem 1rem;
//             border-left: 3px solid #ddd; background: #fafafa; border-radius: 8px;
//           }
//           .k-toc h3 { margin: 0 0 .25rem; font-size: 1rem; }
//           .k-toc ol { margin: .25rem 0 0 1.2rem; line-height: 1.7; }

//           .k-subsection { scroll-margin-top: 80px; margin: 2rem 0; }
//           .k-subsection h2 { font-size: 1.35rem; margin: 0 0 .35rem; }

//           .k-codewrap { position: relative; margin-top: .5rem; }
//           .k-code {
//             background: #0f172a; color: #e5e7eb;
//             padding: .9rem 1rem; border-radius: 10px; overflow-x: auto;
//           }
//           .k-copy {
//             position: absolute; top: 6px; right: 6px;
//             font-size: 12px; padding: 4px 8px;
//             border-radius: 8px; border: 1px solid #e5e7eb;
//             background: #fff; cursor: pointer;
//           }

//           .k-navrow {
//             display: flex; justify-content: space-between; gap: .75rem;
//             margin-top: 1rem; flex-wrap: wrap;
//           }
//           .k-a { color: #111; text-decoration: none; border: 1px solid #eee; border-radius: 10px; padding: .5rem .75rem; background: #fff; }
//           .k-a:hover { background: #fafafa; }
//           .k-back { margin-top: 1rem; }
//         `}</style>
//       </Helmet>

//       <h1 className="k-h1">{lesson.title}</h1>
//       <p className="k-meta">Estimated time: {lesson.duration} min</p>

//       {/* Organized intro panel */}
//       <StartHere lesson={lesson} />

//       {/* Sticky 'On this page' table of contents */}
//       {/* {hasSubsections && (
//         <nav className="k-toc" aria-label="On this page">
//           <h3>On this page</h3>
//           <ol>
//             {lesson.subsections!.map(s => (
//               <li key={s.id}><a className="k-link" href={`#${s.id}`}>{s.title}</a></li>
//             ))}
//           </ol>
//         </nav>
//       )} */}

//       {/* Subsections */}
//       {hasSubsections ? (
//         lesson.subsections!.map(s => (
//           <section key={s.id} id={s.id} className="k-subsection">
//             <h2>{s.title}</h2>
//             <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{s.body}</p>
//             {s.code ? <Code text={s.code} /> : null}
//             {/* <p style={{ marginTop: '.5rem' }}>
//               <a className="k-link" href="#top">Back to top ↑</a>
//             </p> */}
//           </section>
//         ))
//       ) : (
//         <section className="k-card" style={{ marginTop: '1rem' }}>
//           <p>{lesson.content}</p>
//           {lesson.code ? <Code text={lesson.code} /> : null}
//         </section>
//       )}

//       {/* Prev / Next + Back to syllabus */}
//       <nav className="k-navrow">
//         {prev ? <Link className="k-a" to={`/python/${prev.slug}`}>&larr; {prev.title}</Link> : <span />}
//         {next ? <Link className="k-a" to={`/python/${next.slug}`}>{next.title} &rarr;</Link> : <span />}
//       </nav>
//       <div className="k-back">
//         <Link className="k-link" to="/python">Back to syllabus</Link>
//       </div>
//     </main>
//   )
// }

// src/Lesson.tsx
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
// import { course } from '../data/pythonCourse'
import { course } from '../data/course'



/* ------------ Per-lesson checklist (localStorage) ------------ */
function useChecklist(ids: string[], storageKey: string) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Record<string, boolean>
        // ensure we only keep current ids
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

// function CodeBlock({ text }: { text: string }) {
//   const copy = async () => { try { await navigator.clipboard.writeText(text) } catch {} }
//   return (
//     <div className="doc-codewrap">
//       <pre className="doc-code"><code>{text}</code></pre>
//       <button className="doc-copy" onClick={copy} aria-label="Copy code">Copy</button>
//     </div>
//   )
// }

// function CodeBlock({ text, badge }: { text: string; badge?: string }) {
//   const copy = async () => { try { await navigator.clipboard.writeText(text) } catch {} }
//   return (
//     <div className="doc-codewrap">
//       {badge && <span className="doc-badge">{badge}</span>}
//       <pre className="doc-code"><code>{text}</code></pre>
//       <button className="doc-copy" onClick={copy} aria-label="Copy code">Copy</button>
//     </div>
//   )
// }


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

  // Render backtick-delimited inline code: `like this`
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

/* ------------ Practice Panel (kid-friendly) ------------ */
function PracticePanel({
  items,
  slug
}: {
  items: NonNullable<(typeof course.lessons)[number]['practice']>
  slug: string
}) {
  if (!items?.length) return null
  const ids = items.map(i => i.id)
  const ctl = useChecklist(ids, `pyd:practice:${slug}`)

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


/* ------------ Main Lesson Page ------------ */
export default function Lesson() {
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
        Lesson not found. <Link to="/python">Back to syllabus</Link>
      </main>
    )
  }

  const subs = useMemo(() => lesson.subsections?.map(s => s.id) ?? [], [lesson])
  const active = useActiveHeading(subs)
  const hasSubsections = !!lesson.subsections?.length
  // after you compute `subs`:
  const storageKey = useMemo(() => `pyd:progress:${lesson.slug}`, [lesson.slug])
  const checklist = useChecklist(subs, storageKey)


  const prev = index > 0 ? course.lessons[index - 1] : null
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: lesson.title,
    description: lesson.summary,
    provider: { '@type': 'Organization', name: 'PyD' }
  }

  return (
    <div className="doc-shell">
      <Helmet>
        <title>{lesson.title} — Python With Dhruv</title>
        <meta name="description" content={lesson.summary} />
        <link rel="canonical" href={`https://example.com/python/${lesson.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        {/* Page-scoped styles */}
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

          /* container becomes a bordered box */
.doc-codewrap {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f6f8fa;
  overflow: hidden;
  margin-top: .6rem;
}

/* header row (label + copy) */
.doc-codehdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  padding: .35rem .6rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

/* small pill for the label */
.doc-chip {
  font-size: .8rem;
  color: #374151;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 999px;
  padding: .1rem .5rem;
}

/* code area (no absolute elements anymore) */
.doc-code {
  margin: 0;
  background: transparent;
  color: #111827;
  padding: .9rem 1rem;
  border: 0;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}

/* copy button now sits in the header */
.doc-copy {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

          .doc-main { padding-bottom: 2rem; }
          .doc-h1 { font-size: 2rem; margin: .25rem 0; }
          .doc-meta { color: #64748b; margin-bottom: .75rem; }

          .doc-card {
            padding: 1rem 1.25rem; border: 1px solid #eaeaea; border-radius: 12px; background: #fafafa;
          }
          .doc-h2 { margin: 0 0 .5rem; font-size: 1.1rem; }
          .doc-grid { display: grid; gap: .9rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
          .doc-coltitle { font-weight: 600; margin-bottom: .35rem; }
          .doc-list { margin: .35rem 0 0 1rem; line-height: 1.6; }
          .doc-ol { margin-left: 1.25rem; }

          /* Inline code pills */
          .doc-main code {
            background: #f6f8fa; border: 1px solid #e5e7eb; border-radius: 6px;
            padding: .05rem .35rem; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
            font-size: .95em;
          }

          /* Code blocks */
          .doc-codewrap { position: relative; margin-top: .6rem; }
          .doc-code {
            background: #f6f8fa; color: #111827; border: 1px solid #e5e7eb;
            padding: .9rem 1rem; border-radius: 10px; overflow-x: auto;
          }
          .doc-copy {
            position: absolute; top: 6px; right: 6px; font-size: 12px; padding: 4px 8px;
            border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer;
          }

          .doc-tip {
            margin-top: .8rem; padding: .6rem .8rem; border-left: 3px solid #60a5fa;
            background: #f8fbff; border-radius: 8px;
          }

          .doc-badge {
  position: absolute; top: 6px; left: 8px;
  font-size: 11px; color: #64748b; background: #f8fafc;
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 2px 6px;
}
.doc-codewrap { position: relative; margin-top: .6rem; } /* you already have this; OK to keep duplicate */

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
          .doc-toc {
            display: none; margin: 1rem 0 1.25rem; padding: .75rem 1rem;
            border-left: 3px solid #ddd; background: #fafafa; border-radius: 8px;
          }
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
          <div className="doc-brand">Python Special Functions</div>
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
{/* Practice panel at the end of the section */}
{lesson.practice?.length ? <PracticePanel items={lesson.practice} slug={lesson.slug} /> : null}

          {/* Prev / Next + Back */}
          <nav className="doc-navrow">
            {prev ? <Link className="doc-btn" to={`/python/${prev.slug}`}>&larr; {prev.title}</Link> : <span />}
            {next ? <Link className="doc-btn" to={`/python/${next.slug}`}>{next.title} &rarr;</Link> : <span />}
          </nav>

          <p style={{ marginTop: '1rem' }}>
            <Link className="doc-link" to="/python">Back to syllabus</Link>
          </p>
        </main>
      </div>
    </div>
  )
}
