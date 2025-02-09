import * as React from 'react'
import { useState } from 'react'
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
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import { Button, Collapse, Box } from '@mui/material'
//import { Button, IconButton } from '@mui/material'

const mainListItems = [
  { text: 'All', icon: <HomeRoundedIcon /> },
  { text: 'Favourites', icon: <StarRateRoundedIcon /> },
  { text: 'Deleted', icon: <DeleteRoundedIcon /> }
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> }
]

export default function SideMenuContent({ selected, setSelected, tagItems }) {

  const [isOpen, setIsOpen] = useState(false)

  const handleCollapse = () => {
    setIsOpen(prev => !prev)
  }

  const handleClick = (item) => {
    console.log(item.text, " clicked")
    setSelected(item.text)
  }

  const selectTag = (item) => {
    setSelected('tag: ' + item.text)
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

        <ListItem disablePadding>
          <ListItemButton onClick={handleCollapse} >
            <ListItemIcon> <LocalOfferRoundedIcon /> </ListItemIcon>
            <ListItemText primary="Tags" />
            <ExpandMoreRounded
              sx={{
                transition: 'transform 0.3s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />

          </ListItemButton>
        </ListItem>

        <ListItem sx={{ pt: 0 }} >
          <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ pt: 0 }}>
            <List dense>
              {tagItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton selected={item.text === selected} onClick={() => selectTag(item)} >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {/* this is where ExpandMoreRounded used to come, add it later if possible */}
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
