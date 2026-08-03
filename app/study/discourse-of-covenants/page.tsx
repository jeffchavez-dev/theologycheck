import outlineData from '@/data/study-outlines/discourse-of-covenants.json'
import StudyClient from './StudyClient'

export type OutlineNode = { text: string; children: OutlineNode[] }
export type Chapter = { number: number; title: string; nodes: OutlineNode[] }

export default function Page() {
  return <StudyClient chapters={outlineData as Chapter[]} />
}
