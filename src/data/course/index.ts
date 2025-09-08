import type { Course, Lesson } from '../types'

// Import lessons from each section file
import { lessons as s1 } from './sections/section1-intro-setup'
import { lessons as s2 } from './sections/section2-syntax-essentials'
import { lessons as s3 } from './sections/section3-variables-and-types'
import { lessons as s4 } from './sections/section4-operators-expressions'
import { lessons as s5 } from './sections/section5-control-flow'
import { lessons as s6 } from './sections/section6-strings-text-basics'
import { lessons as s7 } from './sections/section7-collections-i'
import { lessons as s8 } from './sections/section8-collections-ii'
import { lessons as s9 } from './sections/section9-functions'
import { lessons as s10 } from './sections/section10-modules-packages-env'
import { lessons as s11 } from './sections/section11-file-io-pathlib'
import { lessons as s12 } from './sections/section12-errors-exceptions'
import { lessons as s13 } from './sections/section13-testing-debugging'
// ...add more as you create them

const lessons: Lesson[] = [
  ...s1,
  ...s2,
  ...s3,
  ...s4,
  ...s5,
  ...s6,
  ...s7,
  ...s8,
  ...s9,
  ...s10,
  ...s11,
  ...s12,
  ...s13,
  // ...add more as you create them 

]

// derive total hours from lesson durations (to 1 decimal)
const totalMinutes = lessons.reduce((sum, l) => sum + (l.duration || 0), 0)
const totalHours = Number((totalMinutes / 60).toFixed(1))

export const course: Course = {
  title: 'Python for Beginners',
  totalHours,
  lessons
}
