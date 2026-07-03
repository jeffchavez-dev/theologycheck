import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ count: 0 })
  const redis = getRedis()
  if (!redis) return NextResponse.json({ count: 0 })
  const count = (await redis.get<number>(`hearts:${slug}`)) ?? 0
  return NextResponse.json({ count })
}

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  const redis = getRedis()
  if (!redis) return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  const count = await redis.incr(`hearts:${slug}`)
  return NextResponse.json({ count })
}
