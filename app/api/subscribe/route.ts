import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Newsletter not configured.' }, { status: 500 })
  }

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
