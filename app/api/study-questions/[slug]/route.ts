import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = 'main'

function readLocal(slug: string): Record<string, string[]> {
  const file = path.join(process.cwd(), `data/study-questions/${slug}.json`)
  if (!fs.existsSync(file)) return {}
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

async function githubGetSHA(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  return (await res.json()).sha ?? null
}

async function githubWrite(slug: string, data: Record<string, string[]>) {
  const filePath = `data/study-questions/${slug}.json`
  const sha = await githubGetSHA(filePath)
  const body: Record<string, string> = {
    message: `Update study questions: ${slug}`,
    content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return NextResponse.json(readLocal(slug))
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data: Record<string, string[]> = await req.json()
  const res = await githubWrite(slug, data)
  if (!res.ok) return NextResponse.json({ error: 'GitHub write failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
