import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_DOMAINS = [
  'prod-files-secure.s3.us-east-1.amazonaws.com',
  's3.us-west-2.amazonaws.com',
  'www.notion.so',
  'notion.so',
]

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  const allowed = ALLOWED_DOMAINS.some(
    domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
  )

  if (!allowed) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 400 })
  }

  try {
    const upstream = await fetch(rawUrl)
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
    }

    const headers = new Headers()
    headers.set('Content-Type', upstream.headers.get('content-type') ?? 'image/jpeg')
    const len = upstream.headers.get('content-length')
    if (len) headers.set('Content-Length', len)
    headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable')

    return new NextResponse(upstream.body, { status: 200, headers })
  } catch (err) {
    console.error('[notion-image] fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 })
  }
}
