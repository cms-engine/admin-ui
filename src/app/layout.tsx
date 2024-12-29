'use client'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </Provider>
  )
}
