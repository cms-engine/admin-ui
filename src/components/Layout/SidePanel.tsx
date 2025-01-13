'use client'
import React from 'react'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material'

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
    <Box role='presentation'>
      <List>
        {[
          { text: 'Dashboard', href: '/' },
          { text: 'Layouts', href: '#' },
          { text: 'Pages', href: '#' },
          { text: 'Brands', href: '/brands' },
        ].map(({ text, href }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component='a' href={href}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default SidePanel
