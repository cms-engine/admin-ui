import { NextResponse } from 'next/server'

export function middleware(req) {
  // Example middleware logic
  const url = req.nextUrl.clone()
  console.log(`Middleware triggered for ${url.pathname}`)
  return NextResponse.next()
}
