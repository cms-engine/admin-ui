import React from 'react'

const SidePanel: React.FC = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <a href='#'>Dashboard</a>
        </li>
        <li>
          <a href='#'>Layouts</a>
        </li>
        <li>
          <a href='#'>Pages</a>
        </li>
        <li>
          <a href='#'>Charts</a>
        </li>
        <li>
          <a href='#'>Tables</a>
        </li>
      </ul>
    </nav>
  )
}

export default SidePanel
