import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const FILE_PATH = 'data/subscribers.json'

async function githubRead(): Promise<{ list: { email: string; subscribedAt: string }[]; sha: string } | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' }, cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  const list = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'))
  return { list, sha: data.sha }
}

async function githubWrite(list: { email: string; subscribedAt: string }[], sha: string) {
  await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Add subscriber`,
        content: Buffer.from(JSON.stringify(list, null, 2) + '\n').toString('base64'),
        sha,
        branch: 'main',
      }),
    }
  )
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Newsletter not configured.' }, { status: 500 })
  }

  // Persist to subscribers.json
  if (GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO) {
    const current = await githubRead()
    if (current) {
      const already = current.list.some(s => s.email.toLowerCase() === email.toLowerCase())
      if (!already) {
        current.list.push({ email, subscribedAt: new Date().toISOString() })
        await githubWrite(current.list, current.sha)
      }
    }
  }

  // Notify Jeff
  try {
    await resend.emails.send({
      from: 'Theology Check <onboarding@resend.dev>',
      to: 'jeffchavez0828@gmail.com',
      subject: 'New subscriber: ' + email,
      text: `${email} just subscribed to Theology Check.`,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 })
  }
}
