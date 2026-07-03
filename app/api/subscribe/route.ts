import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
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

  // Send Jeff a ready-to-forward welcome email
  const resend = new Resend(resendKey)
  const welcomeHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5efe3;">
<div style="max-width:600px;margin:32px auto;background:#fff;border:1px solid #dfc99a;font-family:Georgia,serif;">
  <img src="https://theologycheck.blog/og-image.png" alt="Theology Check" style="width:100%;display:block;" />
  <div style="padding:32px 28px;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a6040;font-family:Georgia,serif;">Welcome · Theology Check</p>
    <h1 style="margin:0 0 16px;font-size:22px;color:#2a0e06;line-height:1.3;font-family:Georgia,serif;">Thank you for subscribing!</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;font-family:Georgia,serif;">
      Thank you for subscribing to Theology Check. I write about Reformed Baptist theology, classical theism, and the historic Christian tradition.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.7;font-family:Georgia,serif;">
      You will receive an email whenever a new post is published. In the meantime, feel free to browse the blog.
    </p>
    <a href="https://theologycheck.blog" style="display:inline-block;background:#7a3a10;color:#fff;padding:12px 24px;text-decoration:none;font-size:14px;font-family:Georgia,serif;letter-spacing:0.04em;">Visit the Blog →</a>
    <hr style="margin:32px 0;border:none;border-top:1px solid #e8d8b0;" />
    <p style="margin:0;font-size:12px;color:#2a0e06;font-family:Georgia,serif;">— Jeff Chavez<br><a href="https://theologycheck.blog" style="color:#8a6040;">theologycheck.blog</a></p>
  </div>
</div>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'Theology Check <onboarding@resend.dev>',
      to: 'jeffchavez0828@gmail.com',
      subject: `New subscriber: ${email} — forward this to welcome them`,
      html: welcomeHtml,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 })
  }
}
