import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const FILE_PATH = 'data/subscribers.json'

async function githubRead() {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' }, cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  const list = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'))
  return { list, sha: data.sha as string }
}

async function githubWrite(list: { email: string; subscribedAt: string }[], sha: string, message: string) {
  await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: Buffer.from(JSON.stringify(list, null, 2) + '\n').toString('base64'), sha, branch: 'main' }),
    }
  )
}

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) return NextResponse.json([])
  const current = await githubRead()
  if (!current) return NextResponse.json([])
  return NextResponse.json(current.list)
}

// PUT — edit email
export async function PUT(req: NextRequest) {
  const { oldEmail, newEmail } = await req.json()
  if (!newEmail || !newEmail.includes('@')) return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  const current = await githubRead()
  if (!current) return NextResponse.json({ error: 'Could not read subscribers.' }, { status: 500 })
  const idx = current.list.findIndex(s => s.email.toLowerCase() === oldEmail.toLowerCase())
  if (idx === -1) return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 })
  current.list[idx].email = newEmail
  await githubWrite(current.list, current.sha, `Update subscriber ${oldEmail} → ${newEmail}`)
  return NextResponse.json({ ok: true })
}

// DELETE — remove subscriber
export async function DELETE(req: NextRequest) {
  const { email } = await req.json()
  const current = await githubRead()
  if (!current) return NextResponse.json({ error: 'Could not read subscribers.' }, { status: 500 })
  const filtered = current.list.filter(s => s.email.toLowerCase() !== email.toLowerCase())
  await githubWrite(filtered, current.sha, `Remove subscriber ${email}`)
  return NextResponse.json({ ok: true })
}
