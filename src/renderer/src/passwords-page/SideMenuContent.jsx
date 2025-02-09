import * as React from 'react'
//import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import { ExpandMoreRounded } from '@mui/icons-material'

const mainListItems = [
  { text: 'All', icon: <HomeRoundedIcon /> },
  { text: 'Favourites', icon: <StarRateRoundedIcon /> },
  { text: 'Deleted', icon: <DeleteRoundedIcon /> }
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> }
]

export default function SideMenuContent({ selected, setSelected }) {

  const handleClick = (item) => {
    console.log(item.text, " clicked")
    setSelected(item.text)
  }


  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={item.text === selected} onClick={() => handleClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem sx={{ display: 'flex' }}>
          <ListItemText>
            Categories
            <ListItemIcon>
              <ExpandMoreRounded />
            </ListItemIcon>
          </ListItemText>
        </ListItem>
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
