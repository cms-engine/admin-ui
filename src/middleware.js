import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl.clone()
  console.log(`Middleware triggered for ${url.pathname}`)
  return NextResponse.next()
}
