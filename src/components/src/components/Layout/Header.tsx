import React from 'react'
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Image
          src={'/public/logo.png'}
          alt={'The website logo'}
          width={40}
          height={40}
        />
      </div>
      <form className='search-bar'>
        <label>
          <input type='search' placeholder='Search...' />
        </label>
        <button type='submit'>
          <i className='bi bi-search'></i>
        </button>
      </form>
      <div className='navbar-right'>
        <button id='themeSwitcher' className='btn btn-outline-light btn-sm'>
          <i className='bi bi-moon'></i>
        </button>
        <div className='dropdown'>
          <button className='btn dropdown-toggle'>John Doe</button>
          <ul className='dropdown-menu'>
            <li>
              <a href='#'>Personal Settings</a>
            </li>
            <li>
              <a href='#'>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
