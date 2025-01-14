import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import { IconButton, TextField } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded'
import WifiPasswordRoundedIcon from '@mui/icons-material/WifiPasswordRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Typography, Input } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledInput = styled(Input)(() => ({
  marginTop: 0,
  marginBottom: 0,
  input: {
    color: 'rgba(206, 236, 238, 0.7)',
    fontSize: 15
  },
  fontWeight: 200,
  '&:before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.0)' // Default underline
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)' // Hover state
  },
  '&:after': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.6)' // Focus state
  }
}))

// TODO: getting mainlist items from the electron api
const mainListItems = [
  { text: 'All', icon: <HomeRoundedIcon /> },
  { text: 'Passkeys', icon: <KeyRoundedIcon /> },
  { text: 'Wifi', icon: <WifiPasswordRoundedIcon /> },
  { text: 'Deleted', icon: <DeleteRoundedIcon /> }
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> }
]

export default function SideMenuContent({ curFolder, setCurFolder }) {
  const [folders, setFolders] = useState([])
  const [showField, setShowField] = useState(false)

  useEffect(() => {
    async function fetchFolders() {
      try {
        const result = await window.electronAPI.getFolders()
        if (result.error) {
          console.log(result.error)
        } else {
          console.log('result: ', result, 'sd')
          setFolders(result)
        }
      } catch (err) {
        console.error('Error fetching passwords:', err)
      }
    }
    fetchFolders()
  }, [showField])

  const createFolder = () => {
    setShowField(true)
  }

  async function deleteFolder(item) {
    try {
      const result = await window.electronAPI.deleteFolder(item)
      setFolders(result)
      setCurFolder(folders[0])
    } catch (err) {
      console.log('error while deleting folder: ', err)
    }
  }

  async function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setShowField(false)
    } else if (e.key === 'Enter') {
      const value = e.target.value
      console.log(value)
      try {
        const result = await window.electronAPI.createFolder(value)
        setCurFolder(value)
      } catch (err) {
        console.error('Error: Could not create folder : ', err)
        //TODO: add a popup that displays the error
      }
      // add some code to insert a new folder named 'value' in the database
      setShowField(false)
    }
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={item.text === curFolder}
              onClick={() => setCurFolder(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {folders.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: 'block',
              position: 'relative',
              '&:hover .hover-icon': { opacity: 1, visibility: 'visible' }
            }}
          >
            <ListItemButton
              selected={item === curFolder}
              onClick={() => setCurFolder(item)}
              sx={{ height: '32px' }}
            >
              <ListItemText primary={item} />
              <IconButton
                onClick={() => deleteFolder(item)}
                className="hover-icon"
                sx={{
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'opacity 0.1s, visibility 0.1s',
                  scale: 0.8
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}

        {showField && (
          <ListItem disablePadding sx={{ display: 'block', borderRadius: '10px' }}>
            <TextField
              name="service"
              placeholder="Enter Folder Name"
              onKeyDown={handleKeyDown}
              margin="normal"
              sx={{
                mt: 0,
                ml: 0
              }}
            />
          </ListItem>
        )}

        {showField ? (
          <></>
        ) : (
          <ListItem
            key="add"
            disablePadding
            sx={{ display: 'block', border: '1px dashed grey', borderRadius: '10px' }}
          >
            <ListItemButton onClick={createFolder}>
              <ListItemIcon>
                <AddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Folder" />
            </ListItemButton>
          </ListItem>
        )}
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
