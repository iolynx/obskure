import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MenuContent from './SideMenuContent'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Button, IconButton, Tooltip } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

const drawerWidth = 215

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box'
  }
})

export default function SideMenu({ selected, setSelected }) {
  const navigate = useNavigate()

  const logoutClicked = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper'
        }
      }}
    >
      <MenuContent selected={selected} setSelected={setSelected} />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Vishal Ravi
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            echelora@gmail.com
          </Typography>
        </Box>

        <Tooltip title="Logout">
          <IconButton aria-label="LogoutRounded" size="small" onClick={logoutClicked}>
            <LogoutRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Drawer>
  )
}
