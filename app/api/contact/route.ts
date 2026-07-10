import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, how, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const toEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!
    const fromDomain = process.env.RESEND_FROM_DOMAIN ?? toEmail.split('@')[1]

    await resend.emails.send({
      from: `Portfolio <noreply@${fromDomain}>`,
      to: toEmail,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;font-size:13px;color:#333;max-width:500px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>How they heard:</strong> ${how || 'Not informed'}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
