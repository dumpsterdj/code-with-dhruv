import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { pandasCourse as course } from '../data/pandas'

export default function PandasCourse(){
  return (
    <>
      <Helmet>
        <title>{course.title} — Syllabus</title>
        <meta name="description" content="Pandas course syllabus: modules, lessons, durations, and outcomes." />
        <link rel="canonical" href="https://example.com/pandas" />
      </Helmet>

      <h1 style={{fontSize:'1.75rem'}}>Course syllabus</h1>
      <p style={{color:'#444'}}>Total lessons: {course.lessons.length} • Estimated time: {course.totalHours}h</p>

      <div style={{display:'grid', gap:'0.75rem', marginTop:'1rem'}}>
        {course.lessons.map(lesson => (
          <Link key={lesson.slug} to={`/pandas/${lesson.slug}`} style={{padding:'0.75rem 1rem', border:'1px solid #eaeaea', borderRadius:'0.75rem', textDecoration:'none', color:'#111'}}>
            <strong>{lesson.title}</strong>
            <div style={{fontSize:'0.9rem', color:'#666'}}>{lesson.summary}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
