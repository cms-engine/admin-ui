'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store'
import { toggleTheme } from '@/store/features/theme/themeSlice'
/**
 * Props for the Header component.
 * @typedef {Object} HeaderProps
 * @property {() => void} onToggleSidePanel - Callback function to toggle the visibility of the side panel.
 */
interface HeaderProps {
  onToggleSidePanel: () => void
}
/**
 * Header component that displays a navigation bar with a logo, search bar,
 * current time, theme switcher, and user menu dropdown.
 *
 * @param {HeaderProps} props - The props object.
 * @param {() => void} props.onToggleSidePanel - Function to toggle the side panel.
 * @returns {React.ReactElement} The rendered Header component.
 */
const Header: React.FC<HeaderProps> = ({ onToggleSidePanel }) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  /**
   * Effect hook to update the current time every second.
   */

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
  /**
   * Effect hook to track window resize events and determine if the device is mobile.
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /**
   * Toggles the visibility of the user dropdown menu.
   * This function updates the state to show or hide the dropdown.
   */
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev)
  }

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
          <div className={`dropdown ${isDropdownVisible ? 'show' : ''}`}>
            <button
              className='btn btn-light dropdown-toggle'
              type='button'
              id='userMenuButton'
              onClick={toggleDropdown}
              data-bs-toggle='dropdown'
              aria-expanded={isDropdownVisible}
            >
              John Doe
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                isDropdownVisible ? 'show' : ''
              }`}
              style={{
                maxWidth: '200px',
                overflow: 'hidden',
                position: 'absolute',
                right: '0px',
              }}
            >
              <li>
                <a className='dropdown-item' href='#'>
                  Personal Settings
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
