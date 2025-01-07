'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store'
import { toggleTheme } from '@/store/features/theme/themeSlice'

interface HeaderProps {
  onToggleSidePanel: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidePanel }) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', { hour12: false })
      setCurrentTime(time)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className='navbar'>
      <div className={`container-fluid ${styles.headerContainer}`}>
        <div className={`navbar-left ${styles.searchContainer}`}>
          <Image
            src={'/logo.png'}
            alt={'The website logo'}
            width={40}
            height={40}
          />
          <form className={styles.searchForm}>
            <label className={styles.searchLabel}>
              <i className={`bi bi-search ${styles.searchIcon}`}></i>
              <input
                type='search'
                placeholder='Search'
                className={styles.searchInput}
              />
            </label>
          </form>
        </div>
        {isMobile && (
          <button
            className={`btn btn-primary ${styles.burgerButton}`}
            onClick={onToggleSidePanel}
          >
            ☰
          </button>
        )}
        <div className={`navbar-right ${styles.clockContainer}`}>
          <span className={styles.currentTime}>{currentTime}</span>
          <button
            id='themeSwitcher'
            className='btn btn-outline-dark btn-sm'
            onClick={() => dispatch(toggleTheme())}
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon' : 'bi-sun'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
