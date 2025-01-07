'use client'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '@/store'
import type { RootState } from '@/store'

/**
 * ThemeLayout is responsible for applying the theme logic.
 */
const ThemeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme)

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : ''
  }, [theme])

  return <>{children}</>
}

/**
 * RootLayout wraps the application with Redux Provider and other global setups.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <ThemeLayout>{children}</ThemeLayout>
        </Provider>
      </body>
    </html>
  )
}
