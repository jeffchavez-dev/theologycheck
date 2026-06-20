import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const authorsFile = path.join(process.cwd(), 'data/authors.json')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = 'main'

function readAuthors(): string[] {
  if (!fs.existsSync(authorsFile)) return ['Jeff Chavez']
  return JSON.parse(fs.readFileSync(authorsFile, 'utf8'))
}

async function githubGetSHA(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  return (await res.json()).sha ?? null
}

async function githubWriteAuthors(authors: string[], message: string) {
  const sha = await githubGetSHA('data/authors.json')
  const body: Record<string, string> = {
    message,
    content: Buffer.from(JSON.stringify(authors, null, 2)).toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/authors.json`,
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
  return NextResponse.json(readAuthors())
}

// POST — add new author
export async function POST(req: NextRequest) {
  const { name } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const authors = readAuthors()
  if (authors.includes(name.trim())) return NextResponse.json({ authors })
  const updated = [...authors, name.trim()]
  const res = await githubWriteAuthors(updated, `Add author: ${name.trim()}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save author' }, { status: 500 })
  return NextResponse.json({ authors: updated })
}

// PUT — rename author
export async function PUT(req: NextRequest) {
  const { old: oldName, name: newName } = await req.json()
  if (!oldName?.trim() || !newName?.trim()) return NextResponse.json({ error: 'Both names required' }, { status: 400 })
  const authors = readAuthors()
  const updated = authors.map(a => a === oldName.trim() ? newName.trim() : a)
  const res = await githubWriteAuthors(updated, `Rename author: ${oldName} → ${newName}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save author' }, { status: 500 })
  return NextResponse.json({ authors: updated })
}

// DELETE — remove author
export async function DELETE(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const authors = readAuthors()
  const updated = authors.filter(a => a !== name)
  const res = await githubWriteAuthors(updated, `Remove author: ${name}`)
  if (!res.ok) return NextResponse.json({ error: 'Failed to save author' }, { status: 500 })
  return NextResponse.json({ authors: updated })
}
