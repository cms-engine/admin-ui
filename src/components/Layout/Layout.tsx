'use client'
import React, { useState } from 'react'
import Header from '@/components/Layout/Header'
import SidePanel from '@/components/Layout/SidePanel'
import styles from './Layout.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme)

  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false)

  const toggleSidePanel = () => {
    console.log('Toggle SidePanel:', !isSidePanelVisible)
    setIsSidePanelVisible((prev) => !prev)
  }

  return (
    <section
      className={`container-fluid ${styles.layout} ${
        theme === 'dark' ? styles.darkTheme : ''
      }`}
    >
      <Header onToggleSidePanel={toggleSidePanel} />
      <div className={styles.layoutBody}>
        <aside
          className={`${styles.sidePanel} ${isSidePanelVisible ? styles.open : ''}`}
        >
          <SidePanel isVisible={isSidePanelVisible} />
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </section>
  )
}

export default Layout
