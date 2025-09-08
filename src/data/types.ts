
export type Subsection = {
  id: string
  title: string
  body: string              
  code?: string            
  codes?: { label?: string; text: string }[] 
}

export type ResourceLink = { label: string; href: string }

export type StartHereMeta = {
  goals: string[]
  prerequisites?: string[]
  resources?: ResourceLink[]
  tip?: string
  showJumpTo?: boolean
}

export type PracticeItem = {
  id: string
  title: string
  prompt: string
  starterCode?: string
  hint?: string
  solution?: string
}

export type Lesson = {
  slug: string
  title: string
  summary: string
  duration: number          
  content: string
  code?: string
  subsections?: Subsection[]
  startHere?: StartHereMeta
  practice?: PracticeItem[] 
}

export type Course = {
  title: string
  totalHours: number
  lessons: Lesson[]
}
