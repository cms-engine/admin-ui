import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false)

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
      <div className={`container ${styles.headerContainer}`}>
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
          <span className='current-time'>{currentTime}</span>
          <button id='themeSwitcher' className='btn btn-outline-dark btn-sm'>
            <i className='bi bi-moon'></i>
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
