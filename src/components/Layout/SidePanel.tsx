'use client'
import React from 'react'
import styles from './SidePanel.module.css'
import Link from 'next/link'
/**
 * SidePanel component for displaying a navigation sidebar.
 *
 * This component renders a vertical navigation panel with a list of links to different sections
 * or pages, such as Dashboard, Layouts, Pages, Charts, and Tables. It is styled using a CSS module
 * to ensure scoped styles.
 *
 * @component
 * @returns {React.ReactElement} The rendered SidePanel component.
 */

const SidePanel: React.FC<{ isVisible: boolean }> = ({
  isVisible,
}): React.ReactElement => {
  return (
    <nav className={`${styles.sidebar} ${isVisible ? styles.open : ''}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href='/'>
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href='#'>
            Layouts
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href='#'>
            Pages
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href='/brands'>
            Brands
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SidePanel
