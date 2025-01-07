'use client'
import React from 'react'
import Header from '@/components/Layout/Header'
import SidePanel from '@/components/Layout/SidePanel'
import styles from './Layout.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

type LayoutProps = {
  children: React.ReactNode
}
/**
 * Layout component for wrapping the main structure of the application.
 *
 * This component provides:
 * - A `Header` at the top of the layout for navigation and other utilities.
 * - A `SidePanel` for displaying a sidebar with additional navigation or tools.
 * - A `main` section to render dynamic content passed as children.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the main section of the layout.
 * @returns {React.ReactElement} The rendered layout component.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme)

  return (
    <section
      className={`container-fluid ${styles.layout} ${
        theme === 'dark' ? styles.darkTheme : ''
      }`}
    >
      <Header />
      <div className={styles.layoutBody}>
        <aside className={styles.sidePanel}>
          <SidePanel />
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </section>
  )
}

export default Layout
