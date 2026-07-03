import { NextRequest, NextResponse } from 'next/server'

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }
  if (!BUTTONDOWN_API_KEY) {
    return NextResponse.json({ error: 'Newsletter not configured.' }, { status: 500 })
  }

  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, tags: ['theologycheck'] }),
  })

  if (res.status === 201) {
    return NextResponse.json({ ok: true })
  }
  if (res.status === 400) {
    const data = await res.json()
    // Already subscribed
    if (JSON.stringify(data).includes('already')) {
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }
  return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 })
}
