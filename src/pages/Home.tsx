import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { course } from '../data/course'           // Python aggregator
import { pandasCourse } from '../data/pandas'     // ⬅️ Pandas aggregator

export default function Home() {
  // Python: start at Section 1
  const pythonStart = `/python/${course.lessons[0]?.slug ?? 'intro-setup'}`
  // Pandas: start at Section 1
  const pandasStart = `/pandas/${pandasCourse.lessons[0]?.slug ?? 'pandas-intro-setup'}`

  // catalog
  const courses = [
    {
      key: 'python',
      title: 'Basic Python',
      level: 'Beginner',
      duration: `${course.totalHours}h`,
      summary: 'Start from zero: variables, control flow, collections, functions, files, testing.',
      startTo: pythonStart,
      syllabusTo: '/python',
      active: true,
      tags: ['Beginner', 'Project-based']
    },
    {
      key: 'pandas',
      title: 'Data Analysis with Pandas',
      level: 'Intermediate',
      duration: `${pandasCourse.totalHours}h`,
      summary: 'Load, explore, clean, join, aggregate, reshape, and export data confidently.',
      startTo: pandasStart,       // ✅ goes to Section 1 of Pandas
      syllabusTo: '/pandas',      // ✅ Pandas syllabus
      active: true,               // ✅ make it available
      tags: ['Data', 'Pandas']
    },
    {
      key: 'flask',
      title: 'Web Apps with Flask',
      level: 'Intermediate',
      duration: 'Coming soon',
      summary: 'Routes, templates, forms, auth, deploy basics.',
      startTo: '#',
      syllabusTo: '#',
      active: false,
      tags: ['Web', 'Flask']
    }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((c, i) => ({
      '@type': 'Course',
      name: c.title,
      description: c.summary,
      position: i + 1,
      provider: { '@type': 'Organization', name: 'CodeD — Code With Dhruv' }
    }))
  }

  return (
    <>
      <Helmet>
        <title>CodeD - Code With Dhruv</title>
        <meta name="description" content="Professional, project-based Python learning. Start with Basic Python or browse the full syllabus." />
        <link rel="canonical" href="https://example.com/" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <style>{`
          .hero{display:grid;gap:1rem;padding:2rem 0 1.25rem}
          .hero h1{font-size:2.4rem;line-height:1.2;margin:0;letter-spacing:-.02em}
          .hero p{font-size:1.05rem;color:#475569;margin:0}
          .btnrow{display:flex;gap:.75rem;margin-top:.5rem;flex-wrap:wrap}
          .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-radius:.75rem;text-decoration:none;font-weight:600}
          .btn-primary{background:#111;color:#fff}
          .btn-ghost{border:1px solid #111;color:#111}
          .section-title{font-size:1.25rem;font-weight:700;margin:1.75rem 0 .75rem}
          .grid{display:grid;gap:1rem;grid-template-columns:repeat(1,minmax(0,1fr))}
          @media(min-width:720px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
          @media(min-width:1024px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
          .card{border:1px solid #e5e7eb;border-radius:1rem;padding:1rem;display:flex;flex-direction:column;gap:.5rem;background:#fff;transition:box-shadow .2s,transform .2s}
          .card:hover{box-shadow:0 8px 24px rgba(0,0,0,.06);transform:translateY(-1px)}
          .card h3{margin:.1rem 0;font-size:1.05rem}
          .card p{margin:0;color:#64748b}
          .meta{display:flex;gap:.5rem;align-items:center;color:#475569;font-size:.9rem}
          .dot{width:.35rem;height:.35rem;border-radius:50%;background:#94a3b8;display:inline-block}
          .tags{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.25rem}
          .tag{font-size:.75rem;background:#f1f5f9;color:#0f172a;padding:.15rem .45rem;border-radius:999px;border:1px solid #e2e8f0}
          .card-cta{margin-top:auto;display:flex;gap:.5rem}
          .badge{margin-left:.4rem;font-size:.75rem;padding:.1rem .4rem;border-radius:.4rem;background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe}
          .btn-muted{background:#f3f4f6;color:#111;cursor:not-allowed}
        `}</style>
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <h1>Learn Coding by building real projects</h1>
        <p>Short lessons, real code, auto-checked exercises, and quick quizzes.</p>
      </section>

      {/* Course catalog */}
      <section id="courses" aria-labelledby="courses-title">
        <div className="section-title" id="courses-title">Courses</div>
        <div className="grid">
          {courses.map(c => (
            <article key={c.key} className="card">
              <div className="meta">
                <span>{c.level}</span><span className="dot" /><span>{c.duration}</span>
                {!c.active && <span className="badge">Coming soon</span>}
              </div>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <div className="tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <div className="card-cta">
                {c.active ? (
                  <>
                    <Link to={c.startTo} className="btn btn-primary">Start</Link>
                    <Link to={c.syllabusTo} className="btn btn-ghost">See syllabus</Link>
                  </>
                ) : (
                  <>
                    <button className="btn btn-muted" disabled>Not yet available</button>
                    <a className="btn btn-ghost" href="mailto:dhruvjeet.1158@gmail.com?subject=Notify me: Course interest">Notify me</a>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
