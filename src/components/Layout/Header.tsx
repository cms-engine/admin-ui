'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store'

/**
 * Header component for the application.
 *
 * This component displays the main navigation header, including:
 * - A logo with a search form on the left.
 * - A clock that displays the current time, which updates every second.
 * - A theme switcher button for toggling between themes.
 * - A dropdown menu with user options (e.g., Personal Settings and Logout).
 *
 * Features:
 * - Automatically updates and displays the current time in 24-hour format.
 * - Dropdown toggle for user options.
 * - Utilizes `next/image` for optimized image rendering.
 *
 * @component
 * @returns {React.ReactElement} The rendered header component.
 */
const Header: React.FC = (): React.ReactElement => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false)
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()
  const toggleDropdown = () => setDropdownIsVisible(!dropdownIsVisible)

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
        <div className={`navbar-right ${styles.clockContainer}`}>
          <span className={styles.currentTime}>{currentTime}</span>
          <button
            id='themeSwitcher'
            className='btn btn-outline-dark btn-sm'
            onClick={() => dispatch({ type: 'theme/toggleTheme' })}
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon' : 'bi-sun'}`}></i>
          </button>
          <div className='dropdown'>
            <button
              className={`btn ${styles.dropdownToggle}`}
              onClick={toggleDropdown}
            >
              John Doe
            </button>
            <ul
              className={`${styles.dropdownMenu}
               ${dropdownIsVisible ? styles.showDropdown : ''}`}
            >
              <li>
                <a href='#'>Personal Settings</a>
              </li>
              <li>
                <a href='#'>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
