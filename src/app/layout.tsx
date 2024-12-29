'use client'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
//
// export const metadata = {
//   title: 'Dashboard app',
//   description: 'The dashboard app',
//   icons: {
//     icon: '/logo.png',
//   },
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
