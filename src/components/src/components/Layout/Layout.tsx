import React from 'react'
import Header from '@/components/src/components/Layout/Header'
import SidePanel from '@/components/src/components/Layout/SidePanel'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className='layout'>
      <Header />
      <div className='layout-body'>
        <SidePanel />
        <main className='content'>{children}</main>
      </div>
    </section>
  )
}

export default Layout
