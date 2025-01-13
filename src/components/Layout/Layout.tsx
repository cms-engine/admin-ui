'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Box, CssBaseline, Drawer, Toolbar, IconButton } from '@mui/material'
import Header from '@/components/Layout/Header'
import SidePanel from '@/components/Layout/SidePanel'
import CloseIcon from '@mui/icons-material/Close'

type LayoutProps = {
  children: React.ReactNode
}

const drawerWidth = 240

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <Header onToggleSidePanel={toggleSidePanel} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Drawer
          variant='temporary'
          open={isSidePanelOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              boxShadow: 'none',
            },
          }}
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleSidePanel}
              sx={{ marginLeft: 'auto' }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <SidePanel />
        </Drawer>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            transition: 'margin-left 0.3s ease',
            padding: 3,
            overflow: 'auto',
            backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
            color: theme === 'dark' ? '#e0e0e0' : '#000000',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
