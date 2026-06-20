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
  const data = await res.json()
  return data.sha ?? null
}

export async function GET() {
  return NextResponse.json(readAuthors())
}

export async function POST(req: NextRequest) {
  const { name } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const authors = readAuthors()
  if (authors.includes(name.trim())) return NextResponse.json({ authors })

  const updated = [...authors, name.trim()]
  const content = Buffer.from(JSON.stringify(updated, null, 2)).toString('base64')
  const sha = await githubGetSHA('data/authors.json')

  const body: Record<string, string> = {
    message: `Add author: ${name.trim()}`,
    content,
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(
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

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'Failed to save author' }, { status: 500 })
  }

  return NextResponse.json({ authors: updated })
}
