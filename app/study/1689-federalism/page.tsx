import outlineData from '@/data/study-outlines/1689-federalism.json'
import StudyClient from './StudyClient'

export type Quote = { number: string; title: string; content: string }
export type Subsection = { number: string; title: string; content: string; quotes: Quote[] }
export type Topic = { number: string; title: string; content: string; subsections: Subsection[] }

export default function Page() {
  return <StudyClient topics={outlineData as Topic[]} />
}
