import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Box,
} from '@mui/material'
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import type { RootState } from '@/store'
import { toggleTheme } from '@/store/features/theme/themeSlice'

interface HeaderProps {
  onToggleSidePanel: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidePanel }) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' color='primary' sx={{ height: '64px' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '64px',
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge='start' color='inherit' onClick={onToggleSidePanel}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              height: '40px',
            }}
          >
            <SearchIcon />
            <InputBase placeholder='Search' sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body1' color='inherit'>
            {currentTime}
          </Typography>
          <IconButton color='inherit' onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <Button color='inherit' onClick={handleMenuOpen}>
            John Doe
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: '200px',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Personal settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
