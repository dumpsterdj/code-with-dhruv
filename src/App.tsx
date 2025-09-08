import { Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Course from './pages/Course'
import Lesson from './pages/Lesson'

// ⬇️ Add these imports
import PandasCourse from './pages/PandasCourse'
import PandasLesson from './pages/PandasLesson'

export default function App() {
  return (
    <HelmetProvider>{/* keep this ONLY if you didn't wrap in main.tsx */}
      <div className="min-h-screen flex flex-col" style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
        <Navbar />
        <main style={{flex:1, padding:'1.5rem', maxWidth: '1100px', margin: '0 auto'}}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Basic Python */}
            <Route path="/python" element={<Course />} />
            <Route path="/python/:slug" element={<Lesson />} />

            {/* Pandas */}
            <Route path="/pandas" element={<PandasCourse />} />
            <Route path="/pandas/:slug" element={<PandasLesson />} />

            {/* catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}
