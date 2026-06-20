import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const tagsFile = path.join(process.cwd(), 'data/tags.json')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = 'main'

function readTags(): string[] {
  if (!fs.existsSync(tagsFile)) return []
  return JSON.parse(fs.readFileSync(tagsFile, 'utf8'))
}

async function githubGetSHA(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  return (await res.json()).sha ?? null
}

async function githubWriteTags(tags: string[], message: string) {
  const sha = await githubGetSHA('data/tags.json')
  const body: Record<string, string> = {
    message,
    content: Buffer.from(JSON.stringify(tags, null, 2)).toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/tags.json`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
}

export async function GET() {
  return NextResponse.json(readTags())
}

// POST — add new tag
export async function POST(req: NextRequest) {
  const { name } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const tags = readTags()
  if (tags.includes(name.trim())) return NextResponse.json({ tags })
  const updated = [...tags, name.trim()]
  const res = await githubWriteTags(updated, `Add tag: ${name.trim()}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json({ tags: updated })
}

// PUT — rename tag
export async function PUT(req: NextRequest) {
  const { old: oldName, name: newName } = await req.json()
  if (!oldName?.trim() || !newName?.trim()) return NextResponse.json({ error: 'Both names required' }, { status: 400 })
  const tags = readTags()
  const updated = tags.map(t => t === oldName.trim() ? newName.trim() : t)
  const res = await githubWriteTags(updated, `Rename tag: ${oldName} → ${newName}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json({ tags: updated })
}

// DELETE — remove tag
export async function DELETE(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const tags = readTags()
  const updated = tags.filter(t => t !== name)
  const res = await githubWriteTags(updated, `Remove tag: ${name}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json({ tags: updated })
}
