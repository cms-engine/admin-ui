import React from 'react'
import styles from './SidePanel.module.css'
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
const SidePanel: React.FC = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a className={styles.navLink} href='#'>
            Dashboard
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href='#'>
            Layouts
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href='#'>
            Pages
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href='#'>
            Charts
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href='#'>
            Tables
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default SidePanel
