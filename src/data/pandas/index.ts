import type { Course, Lesson } from '../types'
import { lessons as s1 } from './sections/section1-intro-setup-pandas'
// import { lessons as s2 } from './sections/section2-series'
// import { lessons as s3 } from './sections/section3-dataframe'
// import { lessons as s4 } from './sections/section4-import-export'

const lessons: Lesson[] = [
  ...s1,
  // add more sections as you build them
]

const totalMinutes = lessons.reduce((sum, l) => sum + (l.duration || 0), 0)
const totalHours = Number((totalMinutes / 60).toFixed(1))

export const pandasCourse: Course = {
  title: 'Data Analysis with Pandas',
  totalHours,
  lessons,
}
